import { Student } from '@/app/lib/api/types';
import { formatDateString } from '@/app/lib/utils';
import { sectionMapper } from '@/app/lib/api/section';

export const BASE_STUDENT = 'students';

export const studentMapper = (item: Student): Student => ({
  ...item,
  createdAt: formatDateString(item.createdAt),
  updatedAt: item.updatedAt ? formatDateString(item.updatedAt) : 'N/A',
  section: sectionMapper(item.section),
  parents: item.parents.map((parent) => ({
    ...parent,
    createdAt: formatDateString(parent.createdAt),
    updatedAt: parent.updatedAt ? formatDateString(parent.updatedAt) : 'N/A',
  })),
});
