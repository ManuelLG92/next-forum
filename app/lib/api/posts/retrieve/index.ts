import { BaseList } from '@/app/lib/api/types';
import { buildFilters, fetcher, HTTP_METHODS } from '@/app/lib/api';
import { BASE_POSTS, Posts } from '@/app/lib/api/posts';

export const fetchPosts = async ({
  currentPage,
  limit,
  like,
}: {
  currentPage: number;
  limit: number;
  like?: string;
}): Promise<BaseList<Posts>> => {
  const search = buildFilters({ page: currentPage, limit, like });
  const data = await fetcher({
    url: `${BASE_POSTS}?${search}`,
    method: HTTP_METHODS.GET,
  });
  return data;
};
