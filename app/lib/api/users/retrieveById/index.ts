import { fetcher, HTTP_METHODS } from '@/app/lib/api';
import { User } from '@/app/lib/definitions';


export const fetchUsersById = async ({
  id,
}: {
  id: string;
}): Promise<User | null> => {
  return fetcher(`users/${id}`, HTTP_METHODS.GET)
  
}
