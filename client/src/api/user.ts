import axios, { AxiosResponse } from 'axios';
import { AuthResponse, User } from '../@types';
import { promiseHandler } from '../utils';
import { authTokenInterceptor } from './auth';

const userClient = axios.create({
  baseURL: 'http://localhost:5000/api/user'
});
userClient.interceptors.request.use(authTokenInterceptor);

export const authUser = async (payload: {
  email: string;
  password: string;
}) => {
  const [authUser, error] = await promiseHandler<
    AxiosResponse<AuthResponse>,
    Error
  >(userClient.post('/auth', payload));

  if (error !== null) {
    throw error;
  }
  return authUser?.data as AuthResponse;
};

export const createUser = async (payload: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const [user, error] = await promiseHandler<AxiosResponse<User>, Error>(
    userClient.post('/create', payload)
  );

  if (error !== null) {
    throw error;
  }
  return user?.data as User;
};

export const whoami = async () => {
  const [user, error] = await promiseHandler<AxiosResponse<User>, Error>(
    userClient.get('/whoami')
  );

  if (error !== null) {
    throw error;
  }
  return user?.data as User;
};
