import { BaseList } from '@/app/lib/api/types';
import { fetcher, HTTP_METHODS } from '@/app/lib/api';
import { User } from '@/app/lib/definitions';
import { BASE_USERS } from '@/app/lib/api/users';

export const fetchUsers = async (): Promise<BaseList<User>> => {
  const data: Array<User> = await fetcher(BASE_USERS, HTTP_METHODS.GET);
  return {
    data,
    count: 1,
    currentPage: 1,
  };
};
