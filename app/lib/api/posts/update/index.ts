import { fetcher, HTTP_METHODS } from '@/app/lib/api';
import { BASE_POSTS } from '@/app/lib/api/posts';
import { CreatePostParams } from '@/app/lib/api/posts/create';

export interface UpdatePostParams extends Omit<CreatePostParams, 'created_by'> {
  id: string;
}
export const updatePost = async ({
  id,
  ...rest
}: UpdatePostParams): Promise<void> => {
  const data = await fetcher({
    url: `${BASE_POSTS}/${id}`,
    method: HTTP_METHODS.PUT,
    body: rest,
  });
  return data;
};
