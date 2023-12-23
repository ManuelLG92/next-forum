import { formatDateString } from '@/app/lib/utils';
import { Section } from '@/app/lib/api/types';

export const BASE_SECTION = 'sections';

export type SectionState = {
  errors?: {
    name?: string[];
    coursesId?: string[];
    studentIds?: string[];
  };
  message?: string | null;
};

export const sectionMapper = (item: Section) => {
  return {
    ...item,
    createdAt: formatDateString(item.createdAt),
    ...(item.updatedAt && { updatedAt: formatDateString(item.updatedAt) }),
    students:
      item.students?.map((student) => ({
        ...student,
        createdAt: formatDateString(student.createdAt),
        ...(student.updatedAt && {
          updatedAt: formatDateString(student.updatedAt),
        }),
        section: undefined as unknown as Section,
        parents: [],
      })) ?? [],
  };
};
