import { BaseList, Course } from '@/app/lib/api/types';
import { buildFilters, fetcher, HTTP_METHODS } from '@/app/lib/api';
import { BASE_COURSE, courseMapper } from '@/app/lib/api/courses';

export const fetchCourses = async ({
  currentPage,
  limit,
  like,
}: {
  currentPage?: number;
  limit?: number;
  like?: string;
}): Promise<BaseList<Course>> => {
  const search = buildFilters({ page: currentPage, limit, like });

  const data: BaseList<Course> = await fetcher(
    `${BASE_COURSE}?${search}`,
    HTTP_METHODS.GET,
  );
  return {
    ...data,
    data: data.data.map((item) => courseMapper(item)),
  };
};
