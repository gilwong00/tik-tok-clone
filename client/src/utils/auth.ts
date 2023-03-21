import { InternalAxiosRequestConfig } from 'axios';
import { useUserStore } from '../store';

export const authTokenInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = useUserStore().authToken;
  if (config.headers) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
};
