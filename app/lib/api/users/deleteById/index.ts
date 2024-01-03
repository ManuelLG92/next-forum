import { fetcher, HTTP_METHODS } from '@/app/lib/api';
import { BASE_USERS } from '@/app/lib/api/users';

export const deleteUserById = async ({ id }: { id: string }): Promise<void> => {
  return fetcher({ url: `${BASE_USERS}/${id}`, method: HTTP_METHODS.DELETE });
};
