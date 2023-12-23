import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { notFound } from 'next/navigation';
import { fetchCoursesById } from '@/app/lib/api/courses/retrieveById';
import RetrieveCourse from '@/app/ui/courses/retrieve-form';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const course = await fetchCoursesById({ id });
  if (!course) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'School', href: '/dashboard' },
          { label: 'Courses', href: '/dashboard/courses' },
          { label: 'Course', href: `/dashboard/courses/${id}`, active: true },
        ]}
      />
      <RetrieveCourse course={course} />
    </main>
  );
}
