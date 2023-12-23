import { Course } from '@/app/lib/api/types';
import { formatDateString } from '@/app/lib/utils';

export const BASE_COURSE = 'courses';
export const courseMapper = (item: Course): Course => ({
  ...item,
  createdAt: formatDateString(item.createdAt),
  ...(item.updatedAt && { updatedAt: formatDateString(item.updatedAt) }),
  seasons: item.seasons.map((season) => ({
    ...season,
    startAt: formatDateString(season.startAt),
    endAt: formatDateString(season.endAt),
    createdAt: formatDateString(season.createdAt),
    ...(item.updatedAt && { updatedAt: formatDateString(item.updatedAt) }),
  })),
});
