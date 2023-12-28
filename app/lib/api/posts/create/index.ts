import { fetcher, HTTP_METHODS } from '@/app/lib/api';
import { BASE_POSTS } from '@/app/lib/api/posts';

export interface CreatePostParams {
  title: string;
  content: string;
  created_by: string;
}

export interface CreateId {
  id: string;
}
export const createPost = async (body: CreatePostParams): Promise<CreateId> => {
  const data = await fetcher({
    url: BASE_POSTS,
    method: HTTP_METHODS.POST,
    body,
  });
  return data;
};
