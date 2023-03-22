import axios from 'axios';
import { Post } from '../@types';
import { promiseHandler } from '../utils';
import { authTokenInterceptor } from './auth';

const postClient = axios.create({
  baseURL: 'localhost:5000/api/post'
});
postClient.interceptors.request.use(authTokenInterceptor);

export const createPost = async (payload: any) => {
  const [post, error] = await promiseHandler<Post, Error>(
    postClient.post('/', payload)
  );

  if (error !== null) {
    throw error;
  }
  return post as Post;
};
