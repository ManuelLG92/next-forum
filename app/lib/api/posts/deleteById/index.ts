import { fetcher, HTTP_METHODS } from '@/app/lib/api';
import { BASE_POSTS, Posts } from '@/app/lib/api/posts';

export const deletePostById = async ({
  id,
}: {
  id: string;
}): Promise<Posts | null> => {
  try {
    const data = await fetcher({
      url: `${BASE_POSTS}/${id}`,
      method: HTTP_METHODS.DELETE,
    });
    return data;
  } catch (error) {
    return null;
  }
};
