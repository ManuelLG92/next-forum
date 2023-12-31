import { BaseList } from '@/app/lib/api/types';
import { buildFilters, fetcher, HTTP_METHODS } from '@/app/lib/api';
import { User } from '@/app/lib/definitions';
import { BASE_USERS } from '@/app/lib/api/users';

export const fetchUsers = async ({
  currentPage,
  limit,
  like,
}: {
  currentPage: number;
  limit: number;
  like?: string;
}): Promise<BaseList<User>> => {
  const search = buildFilters({ page: currentPage, limit, like });
  return await fetcher({
    url: `${BASE_USERS}?${search}`,
    method: HTTP_METHODS.GET,
  });
};
