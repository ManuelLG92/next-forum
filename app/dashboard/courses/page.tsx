import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import CourseTable from '@/app/ui/courses/table';
import { CommonList } from '@/app/ui/common-list';

import { fetchCourses } from '@/app/lib/api/courses/retrieve';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    limit?: string;
    page?: string;
    like?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const currentLimit = Number(searchParams?.limit) || 10;
  const currentLike = searchParams?.query;

  const data = await fetchCourses({
    currentPage,
    limit: currentLimit,
    like: currentLike,
  });

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'School', href: '/dashboard' },
          { label: 'Courses', href: '/dashboard/courses', active: true },
        ]}
      />
      <CommonList
        table={{
          element: <CourseTable schools={data.data} />,
          totalPages: data.count,
        }}
        create={{ ctx: 'Course', destination: '/dashboard/course/create' }}
      />
    </main>
  );
}
