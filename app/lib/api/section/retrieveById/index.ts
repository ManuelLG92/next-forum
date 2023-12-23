import { Section } from '@/app/lib/api/types';
import { fetcher, HTTP_METHODS } from '@/app/lib/api';
import { BASE_SECTION, sectionMapper } from '@/app/lib/api/section';

export const fetchSectionById = async ({
  id,
}: {
  id: string;
}): Promise<Section | null> => {
  return fetcher(`${BASE_SECTION}/${id}`, HTTP_METHODS.GET)
    .then((re) => sectionMapper(re))
    .catch(() => {
      return null;
    });
};
