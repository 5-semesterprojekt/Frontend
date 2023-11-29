import { Button, Col, Form, Input, Row, Space, Typography } from 'antd';
import { useForm, useWatch } from 'antd/es/form/Form';
import { Link } from 'react-router-dom';

import { useAuth } from './hooks/useAuth';
import PasswordInput from './components/PasswordInput';

import Page from '@/components/Page';
import { notify } from '@/services/NotificationService';
import { emailFormat } from '@/lib/validation/forms/email';
import {
  passwordCommonNotAllowed,
  passwordLength,
} from '@/lib/validation/forms/password';
import { mustEqual, required } from '@/lib/validation/forms/common';
import {
  nameCharset,
  nameDontWrapWithSpace,
  nameLength,
  nameStartWithUppercase,
} from '@/lib/validation/forms/name';

export default function RegisterPage() {
  const [form] = useForm();
  const { registerUser } = useAuth();
  const password = useWatch('password', form);

  const onFinish = async () => {
    try {
      const newUser = await form.getFieldsValue();
      await registerUser(newUser);
      notify('success', 'Registreret!');
      form.resetFields();
    } catch (error: any) {
      if (error.problem === 'NETWORK_ERROR') {
        notify(
          'error',
          'Kunne ikke logge ind',
          'Der kunne ikke skabes forbindelse til serveren.',
        );
      } else {
        notify(
          'error',
          'Kunne ikke registreres',
        );
      }
    }
  };

  return (
    <Page title="Opret bruger">
      <Row justify="center">
        <Col span={16}>
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Typography.Title level={3}>Opret bruger</Typography.Title>
            <Row justify="space-between" gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Fornavn"
                  name="firstName"
                  rules={[
                    required,
                    nameCharset,
                    nameLength,
                    nameStartWithUppercase,
                    nameDontWrapWithSpace,
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Efternavn"
                  name="lastName"
                  rules={[
                    required,
                    nameCharset,
                    nameLength,
                    nameStartWithUppercase,
                    nameDontWrapWithSpace,
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="E-mail"
              name="email"
              rules={[required, emailFormat]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Adgangskode"
              name="password"
              rules={[required, passwordLength, passwordCommonNotAllowed]}
            >
              <PasswordInput />
            </Form.Item>
            <Form.Item
              label="Gentag adgangskode"
              name="repeatPassword"
              dependencies={['password']}
              rules={[required, mustEqual(password)]}
            >
              <PasswordInput showStrength={false} />
            </Form.Item>
            <Form.Item>
              <Space align="start">
                <Button type="primary" size="large" htmlType="submit">
                  Opret
                </Button>
                <Link to="/log-ind">Har du allerede en bruger?</Link>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Page>
  );
}
