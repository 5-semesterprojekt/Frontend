import { notification } from 'antd';

const notify = (
  type: 'success' | 'error',
  message: string,
  description: string,
) => {
  switch (type) {
    case 'success':
      notification.success({
        message,
        description,
        placement: 'bottomRight',
      });
      break;
    case 'error':
      notification.error({
        message,
        description,
        placement: 'bottomRight',
      });
      break;
  }
};

export { notify };
