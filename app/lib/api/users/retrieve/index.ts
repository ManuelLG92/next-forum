import { BaseList } from '@/app/lib/api/types';
import { fetcher, HTTP_METHODS } from '@/app/lib/api';
import { BASE_COURSE } from '@/app/lib/api/courses';

export interface User { id: string; name: string;}
export const fetchCourses = async (): Promise<BaseList<User>> => {

  const data: BaseList<User> = await fetcher(
    `${BASE_COURSE}?users`,
    HTTP_METHODS.GET,
  );
  return {
    ...data
  };
};
