import { fetcher, HTTP_METHODS } from '@/app/lib/api';
import { BASE_USERS } from '@/app/lib/api/users';

export interface UpdateUserParams {
  id: string;
  name: string;
  email: string;
}

export const updateUser = async ({
  id,
  ...rest
}: UpdateUserParams): Promise<void> => {
  const data = await fetcher({
    url: `${BASE_USERS}/${id}`,
    method: HTTP_METHODS.PUT,
    body: rest,
  });
  return data;
};
