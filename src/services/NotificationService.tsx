import { notification } from 'antd';

const notifySuccess = (message: string, description: string) => {
  notification.success({
    message,
    description,
    placement: 'bottomRight',
  });
};

const notifyError = (message: string, description: string) => {
  notification.error({
    message,
    description,
    placement: 'bottomRight',
  });
};

export { notifySuccess, notifyError };
