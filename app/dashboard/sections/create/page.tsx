import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import CreateSectionForm from '@/app/ui/section/create-form';

import { fetchCourses } from '@/app/lib/api/courses/retrieve';

export default async function Page() {
  const result = await fetchCourses({});
  const courses = result.data;

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'School', href: '/dashboard/' },
          { label: 'Sections', href: '/dashboard/sections' },
          {
            label: 'Section',
            href: '/dashboard/sections/create',
            active: true,
          },
        ]}
      />
      <CreateSectionForm courses={courses} />
    </main>
  );
}
