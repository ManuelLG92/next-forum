import { School, Season } from '@/app/lib/api/types';
import { formatDateString } from '@/app/lib/utils';
import { fetcher, HTTP_METHODS } from '@/app/lib/api/index';

export const fetchSchools = async () => {
  const data: School[] = await fetcher('schools', HTTP_METHODS.GET);
  return data.map(
    (item): School => ({
      ...item,
      createdAt: formatDateString(item.createdAt),
      updatedAt: item.updatedAt ? formatDateString(item.updatedAt) : undefined,
      seasons: item.seasons.map((season) => ({
        ...season,
        startAt: formatDateString(season.startAt),
        endAt: formatDateString(season.endAt),
        createdAt: formatDateString(season.createdAt),
        ...(item.updatedAt && { updatedAt: formatDateString(item.updatedAt) }),
      })),
    }),
  );
};

export const fetchSeasons = async () => {
  const data: Season[] = await fetcher('seasons', HTTP_METHODS.GET);
  return data.map((item) => ({
    ...item,
    createdAt: formatDateString(item.createdAt),
    startAt: formatDateString(item.startAt),
    endAt: formatDateString(item.endAt),
    ...(item.updatedAt && { updatedAt: formatDateString(item.updatedAt) }),
  }));
};
