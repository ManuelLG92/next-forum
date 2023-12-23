import { BaseList, Section } from '@/app/lib/api/types';
import { buildFilters, fetcher, HTTP_METHODS } from '@/app/lib/api';
import { BASE_SECTION, sectionMapper } from '@/app/lib/api/section';

export type SectionDto = {
  data: Section[];
  count: number;
  page: number;
};
export const fetchSections = async ({
  currentPage,
  limit,
  like,
}: {
  currentPage?: number;
  limit?: number;
  like?: string;
}): Promise<SectionDto> => {
  const search = buildFilters({ page: currentPage, limit, like });
  const result: BaseList<Section> = await fetcher(
    `${BASE_SECTION}?${search}`,
    HTTP_METHODS.GET,
  );
  const data = result.data;
  const sections = data.map((item) => sectionMapper(item));
  return {
    data: sections,
    count: result.count,
    page: result.currentPage,
  };
};
