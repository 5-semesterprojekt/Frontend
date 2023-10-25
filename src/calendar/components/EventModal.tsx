import { Modal } from 'antd';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

const EventModal = NiceModal.create(() => {
  const modal = useModal('EventModal');

  return (
    <Modal
      title="Hello Antd"
      onOk={() => modal.hide()}
      visible={modal.visible}
      onCancel={() => modal.hide()}
      afterClose={() => modal.remove()}
    >
      Hello!
    </Modal>
  );
});

NiceModal.register('EventModal', EventModal);

export default function showEventModal() {
  return NiceModal.show('EventModal');
}
