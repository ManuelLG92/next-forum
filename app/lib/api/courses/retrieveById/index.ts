import { Course } from '@/app/lib/api/types';
import { fetcher, HTTP_METHODS } from '@/app/lib/api';
import { BASE_COURSE, courseMapper } from '@/app/lib/api/courses';

export const fetchCoursesById = async ({
  id,
}: {
  id: string;
}): Promise<Course | null> => {
  return fetcher(`${BASE_COURSE}/${id}`, HTTP_METHODS.GET)
    .then((re) => courseMapper(re))
    .catch(() => {
      return null;
    });
};
