import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { notFound } from 'next/navigation';
import { fetchCoursesById } from '@/app/lib/api/courses/retrieveById';
import { fetchUsersById } from '@/app/lib/api/users/retrieveById';
import RetrieveUser from '@/app/ui/courses/retrieve-form';

export default async function Page({ params }: Readonly<{ params: { id: string } }>) {
  const { id } = params;
  const course = await fetchUsersById({ id });
  if (!course) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Users', href: '/dashboard/users' },
          { label: 'User', href: `/dashboard/users/${id}`, active: true },
        ]}
      />
      <RetrieveUser course={course} />
    </main>
  );
}
