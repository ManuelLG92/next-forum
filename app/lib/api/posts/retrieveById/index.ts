import { fetcher, HTTP_METHODS } from '@/app/lib/api';
import { BASE_POSTS, Posts } from '@/app/lib/api/posts';

export const fetchPostById = async ({
  id,
}: {
  id: string;
}): Promise<Posts | null> => {
  const data = await fetcher({
    url: `${BASE_POSTS}/${id}`,
    method: HTTP_METHODS.GET,
  });
  console.log(data);
  return data;
};
