import { DatePicker, Form, Input, Modal } from 'antd';
import NiceModal, { antdModalV5, useModal } from '@ebay/nice-modal-react';
import { useCallback, useState } from 'react';
import { useForm } from 'antd/es/form/Form';
import { Event } from '../types/event';
import { useRecoilRefresher_UNSTABLE } from 'recoil';
import { GetEvents } from '../state/event';
import dayjs from 'dayjs';
import { mainApi } from '../../lib/api';
import { notify } from '../../services/NotificationService';

// eslint-disable-next-line react-refresh/only-export-components
const EventModal = NiceModal.create(({ event }: { event?: Event }) => {
  const modal = useModal('EventModal');
  const [form] = useForm();
  const refreshEvents = useRecoilRefresher_UNSTABLE(GetEvents);
  const [working, setWorking] = useState(false);

  const initialValues = {
    title: event?.title,
    description: event?.description,
    range: [dayjs(event?.start), dayjs(event?.end)],
  };

  const onOk = useCallback(async () => {
    try {
      setWorking(true);
      await form.validateFields();
      const results = form.getFieldsValue();

      const payload: Event = {
        title: results.title,
        description: results.description || '',
        start: results.range[0].$d,
        end: results.range[1].$d,
      };

      payload.start.setSeconds(0);
      payload.end.setSeconds(0);
      payload.start.setMilliseconds(0);
      payload.end.setMilliseconds(0);

      let response;

      if (event) {
        response = await mainApi.put(
          `/events/${import.meta.env.VITE_ORGANIZATION_ID}/${event.id}`,
          payload,
        );
      } else {
        response = await mainApi.post(
          `/events/${import.meta.env.VITE_ORGANIZATION_ID}`,
          payload,
        );
      }

      if (response && response.ok) {
        refreshEvents();
        modal.hide();
        notify(
          'success',
          'Succes',
          event ? 'Begivenheden blev ændret' : 'Begivenheden blev tilføjet',
        );
      } else {
        console.log(response);
        notify(
          'error',
          'Fejl',
          event
            ? 'Kunne ikke ændre begivenheden'
            : 'Kunne ikke tilføje begivenheden',
        );
      }
    } catch (error: unknown) {
      console.log(error);
    } finally {
      setWorking(false);
    }
  }, [event, form, modal, refreshEvents]);

  return (
    <Modal
      title={event ? 'Ændr begivenhed' : 'Ny begivenhed'}
      {...antdModalV5(modal)}
      onOk={onOk}
      okButtonProps={{ loading: working }}
      cancelText="Annullér"
    >
      <Form form={form} initialValues={initialValues} layout="vertical">
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
            placeholder={['Start', 'Slut']}
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

export default function showEventModal(event?: Event) {
  return NiceModal.show('EventModal', { event });
}
