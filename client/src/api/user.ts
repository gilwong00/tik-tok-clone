import axios, { AxiosResponse } from 'axios';
import { AuthResponse, User } from '../@types';
import { promiseHandler } from '../utils';
import { authTokenInterceptor } from './auth';

const userClient = axios.create({
  baseURL: 'http://localhost:5000/api/user'
});
userClient.interceptors.request.use(authTokenInterceptor);

export interface CreateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type AuthUserPayload = Pick<CreateUserPayload, 'email' | 'password'>;

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

export const createUser = async (payload: CreateUserPayload) => {
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

export const searchUsers = async (query: string) => {
  const [users, error] = await promiseHandler<
    AxiosResponse<Array<User>>,
    Error
  >(userClient.get(`/search?query=${query}`));

  if (error !== null) {
    throw error;
  }
  return users?.data ?? [];
};
