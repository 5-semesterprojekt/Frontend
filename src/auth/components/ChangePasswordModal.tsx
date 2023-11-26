import { Form, Input, Modal } from 'antd';
import NiceModal, { antdModalV5, useModal } from '@ebay/nice-modal-react';
import { useCallback, useState } from 'react';
import { useForm, useWatch } from 'antd/es/form/Form';

import PasswordInput from './PasswordInput';
import { required, mustEqual } from '@/lib/validation/forms/common';
import {
  passwordLength,
  passwordCommonNotAllowed,
} from '@/lib/validation/forms/password';

// eslint-disable-next-line react-refresh/only-export-components
const ChangePasswordModal = NiceModal.create(() => {
  const modal = useModal('ChangePasswordModal');
  const [working, setWorking] = useState(false);
  const [form] = useForm();
  const password = useWatch('password', form);

  const onOk = useCallback(async () => {
    try {
      setWorking(true);
      modal.resolve(form.getFieldValue('password'));
      await modal.hide();
    } catch (error: unknown) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setWorking(false);
    }
  }, [form, modal]);

  return (
    <Modal
      title="Ændr adgangskode"
      {...antdModalV5(modal)}
      onOk={onOk}
      onCancel={async () => {
        modal.reject();
        await modal.hide();
      }}
      okButtonProps={{ loading: working }}
      cancelText="Annullér"
    >
      <Form form={form} colon={false} layout="vertical">
        <Form.Item
          label="Ny adgangskode"
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
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
});

NiceModal.register('ChangePasswordModal', ChangePasswordModal);

export default function showChangePasswordModal(): Promise<string> {
  return NiceModal.show('ChangePasswordModal');
}
