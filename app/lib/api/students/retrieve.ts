import { BaseList, Student } from '@/app/lib/api/types';
import { buildFilters, fetcher, HTTP_METHODS } from '@/app/lib/api';
import { BASE_STUDENT, studentMapper } from '@/app/lib/api/students/index';

export const fetchStudents = async ({
  currentPage,
  limit,
  like,
}: {
  currentPage?: number;
  limit?: number;
  like?: string;
}): Promise<BaseList<Student>> => {
  const search = buildFilters({ page: currentPage, limit, like });

  const data: BaseList<Student> = await fetcher(
    `${BASE_STUDENT}?${search}`,
    HTTP_METHODS.GET,
  );
  return {
    ...data,
    data: data.data.map((item) => studentMapper(item)),
  };
};
