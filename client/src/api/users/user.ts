import axios from 'axios';
import { AuthResponse } from '../../@types';
import { authTokenInterceptor, promiseHandler } from '../../utils';

const userClient = axios.create({
  baseURL: 'localhost:5000/api/user'
});
userClient.interceptors.request.use(authTokenInterceptor);

export const authUser = async (payload: {
  email: string;
  password: string;
}) => {
  const [authUser, error] = await promiseHandler<AuthResponse, Error>(
    userClient.post('/auth', payload)
  );

  if (error !== null) {
    throw error;
  }
  return authUser as AuthResponse;
};
