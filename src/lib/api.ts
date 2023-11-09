import { create } from 'apisauce';
import { AxiosRequestConfig } from 'axios';

import { getAccessToken } from '../auth/service/tokens';

const backendUrl: string = import.meta.env.VITE_BACKEND_URL as string | '';

const mainApi = create({ baseURL: backendUrl });

const transformRequest = (request: AxiosRequestConfig): void => {
  request.params = request.params || {};
  request.headers = request.headers || {};

  const token = getAccessToken();

  if (token) {
    request.headers['Authorization'] = token;
  }
};

mainApi.addRequestTransform(transformRequest);

export { mainApi };
