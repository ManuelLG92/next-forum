import { fetcher, HTTP_METHODS } from '@/app/lib/api';
import { CreateId } from '@/app/lib/api/posts/create';
import { BASE_USERS } from '@/app/lib/api/users';

export interface CreateUserParams {
  name: string;
  email: string;
  password: string;
}

export const createUser = async (body: CreateUserParams): Promise<CreateId> => {
  const data = await fetcher({
    url: BASE_USERS,
    method: HTTP_METHODS.POST,
    body,
  });
  return data;
};
