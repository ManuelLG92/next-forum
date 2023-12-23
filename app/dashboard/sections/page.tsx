import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import SectionTable from '@/app/ui/section/page';

import { fetchSections } from '@/app/lib/api/section/retrieve';
import { CommonList } from '@/app/ui/common-list';

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
  const totalPages = await fetchSections({
    currentPage,
    limit: currentLimit,
    like: currentLike,
  });

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'School', href: '/dashboard/' },
          { label: 'Section', href: '/dashboard/sections', active: true },
        ]}
      />
      <div>
        <CommonList
          table={{
            element: <SectionTable data={totalPages} />,
            totalPages: totalPages.count,
          }}
          create={{ ctx: 'Section', destination: '/dashboard/sections/create' }}
        />
      </div>
    </main>
  );
}
