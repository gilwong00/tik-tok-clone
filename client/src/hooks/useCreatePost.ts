import { MutationObserverOptions, useMutation } from 'react-query';
import { createPost } from '../api';

interface UseCreatePostParams {
  config?: MutationObserverOptions;
}
export const useCreatePost = ({ config }: UseCreatePostParams) => {
  return useMutation({
    mutationFn: (payload: any) => createPost(payload),
    ...config
  });
};
