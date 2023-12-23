import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { notFound } from 'next/navigation';
import { fetchSectionById } from '@/app/lib/api/section/retrieveById';
import RetrieveSection from '@/app/ui/section/retrieve-form';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const section = await fetchSectionById({ id });
  if (!section) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Sections', href: '/dashboard/sections' },
          {
            label: 'Section',
            href: `/dashboard/sections/${id}`,
            active: true,
          },
        ]}
      />
      <RetrieveSection section={section} />
    </main>
  );
}
