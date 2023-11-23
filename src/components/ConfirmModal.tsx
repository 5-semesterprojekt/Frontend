import { ButtonProps, Modal } from 'antd';
import NiceModal, { antdModalV5, useModal } from '@ebay/nice-modal-react';
import { useState } from 'react';

export interface ConfirmModalProps {
  title: string;
  message: string;
  okText?: string;
  okButtonProps?: ButtonProps;
  onOk: () => Promise<void>;
}

// eslint-disable-next-line react-refresh/only-export-components
const ConfirmModal = NiceModal.create(
  ({ props }: { props: ConfirmModalProps }) => {
    const modal = useModal('ConfirmModal');
    const [working, setWorking] = useState(false);

    const onOk = async () => {
      setWorking(true);

      await props?.onOk();

      modal.hide();
      setWorking(false);
    };

    return (
      <Modal
        title={props.title}
        {...antdModalV5(modal)}
        onOk={onOk}
        okText={props.okText}
        okButtonProps={{ ...props.okButtonProps, loading: working }}
        cancelText="Annullér"
      >
        {props?.message}
      </Modal>
    );
  },
);

NiceModal.register('ConfirmModal', ConfirmModal);

export default function showConfirmModal(props?: ConfirmModalProps) {
  return NiceModal.show('ConfirmModal', { props });
}
