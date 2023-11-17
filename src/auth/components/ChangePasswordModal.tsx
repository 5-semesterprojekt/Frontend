import { Form, Input, Modal } from 'antd';
import NiceModal, { antdModalV5, useModal } from '@ebay/nice-modal-react';
import { useCallback, useState } from 'react';
import { useForm } from 'antd/es/form/Form';

import { required } from '@/lib/validation/common';
import {
  passwordLength,
  passwordCommonNotAllowed,
} from '@/lib/validation/password';

// eslint-disable-next-line react-refresh/only-export-components
const ChangePasswordModal = NiceModal.create(() => {
  const modal = useModal('ChangePasswordModal');
  const [working, setWorking] = useState(false);
  const [form] = useForm();

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
  }, []);

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
      <Form form={form} colon={false}>
        <Form.Item
          label="Ny adgangskode"
          name="password"
          rules={[required, passwordLength, passwordCommonNotAllowed]}
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
