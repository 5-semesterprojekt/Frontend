import { DatePicker, Form, Input, Modal } from 'antd';
import NiceModal, { antdModalV5, useModal } from '@ebay/nice-modal-react';
import { useCallback } from 'react';
import { useForm } from 'antd/es/form/Form';
import { Event } from '../types/event';
import { useRecoilRefresher_UNSTABLE } from 'recoil';
import { GetEvents } from '../state/event';

const EventModal = NiceModal.create(() => {
  const modal = useModal('EventModal');
  const [form] = useForm();
  const refreshEvents = useRecoilRefresher_UNSTABLE(GetEvents);

  const onOk = useCallback(async () => {
    try {
      await form.validateFields();
      const results = form.getFieldsValue();

      const event: Event = {
        title: results.title,
        description: results.description || '',
        start: results.range[0].$d,
        end: results.range[1].$d,
      };

      event.start.setSeconds(0);
      event.end.setSeconds(0);
      event.start.setMilliseconds(0);
      event.end.setMilliseconds(0);

      await fetch(
        import.meta.env.VITE_BACKEND_URL +
          '/events/' +
          import.meta.env.VITE_ORGANIZATION_ID,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(event),
        },
      );

      refreshEvents();
      modal.hide();
    } catch (error) {}
  }, []);

  return (
    <Modal title="Ny begivenhed" {...antdModalV5(modal)} onOk={onOk}>
      <Form form={form} layout="vertical">
        <Form.Item
          label="Titel"
          name="title"
          rules={[{ required: true, message: 'Titel er påkrævet!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Start og slut"
          name="range"
          rules={[{ required: true, message: 'Dato er påkrævet!' }]}
        >
          <DatePicker.RangePicker
            format="YYYY-MM-DD HH:mm"
            showTime
            showSecond={false}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item label="Beskrivelse" name="description">
          <Input.TextArea rows={4} style={{ resize: 'none' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
});

NiceModal.register('EventModal', EventModal);

export default function showEventModal() {
  return NiceModal.show('EventModal');
}
