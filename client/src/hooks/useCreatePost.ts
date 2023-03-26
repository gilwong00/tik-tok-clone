import { useMutation } from 'react-query';
import { QueryConfig } from '../@types';
import { createPost } from '../api';

interface UseCreatePostParams {
  config?: QueryConfig<typeof createPost>;
}
export const useCreatePost = ({ config }: UseCreatePostParams) => {
  return useMutation({
    mutationFn: (payload: any) => createPost(payload),
    ...config
  });
};
