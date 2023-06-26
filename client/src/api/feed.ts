import axios from 'axios';
import { authTokenInterceptor } from './auth';
import { promiseHandler } from '../utils';
import { Post } from '../@types';

const feedClient = axios.create({
  baseURL: 'http://localhost:5000/api/feed'
});

feedClient.interceptors.request.use(authTokenInterceptor);

export const getFeed = async (limit: number, cursor: number | undefined) => {
  let endpoint = `?limit=${limit}`;
  if (!!cursor) endpoint = `${endpoint}&cursor=${cursor}`;
  const [feed, error] = await promiseHandler<Array<Post>, Error>(
    feedClient.get(endpoint)
  );
  if (error) throw error;
  return feed;
};
