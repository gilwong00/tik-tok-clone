import axios from 'axios';
import { Post } from '../@types';
import { promiseHandler } from '../utils';
import { authTokenInterceptor } from './auth';
import { CreatePostPayload } from '../hooks';

const postClient = axios.create({
  baseURL: 'http://localhost:5000/api/post'
});
const feedClient = axios.create({
  baseURL: 'http://localhost:5000/api/feed'
});
postClient.interceptors.request.use(authTokenInterceptor);
feedClient.interceptors.request.use(authTokenInterceptor);

export const createPost = async (payload: CreatePostPayload) => {
  const [post, error] = await promiseHandler<Post, Error>(
    postClient.post('/create', payload)
  );

  if (error !== null) throw error;
  return post as Post;
};

export const getUserPosts = async (userId: number) => {
  const [posts, error] = await promiseHandler<Array<Post>, Error>(
    postClient.get(`/${userId}`)
  );
  if (error) throw error;
  return posts;
};

export const getFeed = async (limit: number, cursor: number | undefined) => {
  let endpoint = `?limit=${limit}`;
  if (!!cursor) endpoint = `${endpoint}&cursor=${cursor}`;
  const [feed, error] = await promiseHandler<Array<Post>, Error>(
    feedClient.get(endpoint)
  );
  if (error) throw error;
  return feed;
};
