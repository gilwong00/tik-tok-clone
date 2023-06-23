import { MutationObserverOptions, useMutation } from 'react-query';
import { createPost } from '../api';
import { Post } from '../@types';

interface UseCreatePostParams {
  config?: MutationObserverOptions;
}

export interface CreatePostPayload {
  userId: number;
  uri: string;
  thumbnailUri: string;
  description: string;
  blob: Blob;
}

export const useCreatePost = ({ config }: UseCreatePostParams) => {
  return useMutation<unknown, unknown, any, unknown>({
    mutationFn: (payload: CreatePostPayload) => createPost(payload),
    ...config
  });
};
