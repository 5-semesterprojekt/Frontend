import {
  Avatar,
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Space,
  Typography,
} from 'antd';
import { useState } from 'react';
import { useForm } from 'antd/es/form/Form';

import { useAuth } from './hooks/use-auth';
import { User } from './types/user';
import showChangePasswordModal from './components/ChangePasswordModal';

import Page from '@/components/Page';
import { AccountIcon, DeleteIcon, KeyIcon } from '@/components/Icons';
import showConfirmModal from '@/components/Confirm.modal';
import { notify } from '@/services/NotificationService';
import { required } from '@/lib/validation/common';
import {
  nameCharset,
  nameDontWrapWithSpace,
  nameLength,
  nameStartWithUppercase,
} from '@/lib/validation/name';

export default function AccountPage() {
  const [working, setWorking] = useState(false);
  const { user, updateAccount, signOutUser, deleteAccount } = useAuth();
  const [informationForm] = useForm();

  const changePasswordCallback = async () => {
    setWorking(true);

    try {
      const password: string = await showChangePasswordModal();
      await updateAccount({ password });
      signOutUser('/log-ind');
      notify('success', 'Adgangskode ændret');
    } catch (error: any) {
      if (error) {
        if (error.problem && error.problem === 'NETWORK_ERROR') {
          notify(
            'error',
            'Kunne ikke ændre adgangskode',
            'Der kunne ikke skabes forbindelse til serveren.',
          );
        } else {
          notify('error', 'Kunne ikke ændre adgangskode');
        }
      }
    }

    setWorking(false);
  };

  const updateAccountCallback = async () => {
    setWorking(true);

    try {
      const user: User = await informationForm.getFieldsValue();
      await updateAccount(user);
      notify('success', 'Konto opdateret');
    } catch (error: any) {
      if (error.problem && error.problem === 'NETWORK_ERROR') {
        notify(
          'error',
          'Kunne ikke opdatere kontoen',
          'Der kunne ikke skabes forbindelse til serveren.',
        );
      } else {
        notify('error', 'Kunne ikke opdatere kontoen');
      }
    }

    setWorking(false);
  };

  const deleteAccountCallback = async () => {
    setWorking(true);

    showConfirmModal({
      title: 'Slet konto',
      message: 'Er du sikker på at du vil slette kontoen?',
      okText: 'Slet',
      okButtonProps: { danger: true },
      onOk: async () => {
        try {
          await deleteAccount();
          notify('success', 'Konto slettet');
        } catch (error: any) {
          if (error.problem === 'NETWORK_ERROR') {
            notify(
              'error',
              'Kunne ikke slette konto',
              'Der kunne ikke skabes forbindelse til serveren.',
            );
          } else {
            notify('error', 'Kunne ikke slette konto');
          }
        }
      },
    });

    setWorking(false);
  };

  const initialValues = user;

  return (
    <Page title="Konto">
      <Row gutter={16}>
        <Col span={4} style={{ textAlign: 'center' }}>
          <Avatar size={128} icon={<AccountIcon />} />
        </Col>
        <Col span={20}>
          <Typography.Title level={3} style={{ marginTop: 0 }}>
            Oplysninger
          </Typography.Title>
          <Form
            form={informationForm}
            initialValues={initialValues}
            labelCol={{ span: 3 }}
            labelAlign="left"
            colon={false}
          >
            <Form.Item
              name="firstName"
              label="Fornavn"
              rules={[
                required,
                nameCharset,
                nameLength,
                nameStartWithUppercase,
                nameDontWrapWithSpace,
              ]}
            >
              <Input value={user?.firstName} />
            </Form.Item>
            <Form.Item
              name="lastName"
              label="Efternavn"
              rules={[
                required,
                nameCharset,
                nameLength,
                nameStartWithUppercase,
                nameDontWrapWithSpace,
              ]}
            >
              <Input value={user?.lastName} />
            </Form.Item>
            <Button onClick={updateAccountCallback} disabled={working}>
              Gem ændringer
            </Button>
          </Form>
          <Divider />
          <Typography.Title level={3}>Konto</Typography.Title>
          <Form labelCol={{ span: 3 }} labelAlign="left" colon={false}>
            <Form.Item label="E-mail">
              <Input value={user?.email} disabled />
            </Form.Item>
            <Space>
              <Button
                onClick={changePasswordCallback}
                disabled={working}
                icon={<KeyIcon />}
                danger
              >
                Ændr adgangskode
              </Button>
              <Button
                onClick={deleteAccountCallback}
                disabled={working}
                icon={<DeleteIcon />}
                danger
              >
                Slet konto
              </Button>
            </Space>
          </Form>
        </Col>
      </Row>
    </Page>
  );
}
