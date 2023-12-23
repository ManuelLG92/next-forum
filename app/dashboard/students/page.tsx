import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { CommonList } from '@/app/ui/common-list';
import { fetchStudents } from '@/app/lib/api/students/retrieve';
import StudentTable from '@/app/ui/students/page';

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
  const totalPages = await fetchStudents({
    currentPage,
    limit: currentLimit,
    like: currentLike,
  });

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'School', href: '/dashboard/' },
          { label: 'Students', href: '/dashboard/students', active: true },
        ]}
      />
      <div>
        <CommonList
          table={{
            element: <StudentTable data={totalPages.data} />,
            totalPages: totalPages.count,
          }}
          create={{ ctx: 'Section', destination: '/dashboard/sections/create' }}
        />
      </div>
    </main>
  );
}
