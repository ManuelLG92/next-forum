import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import SeasonTable from '@/app/ui/seasons/table';
import { CommonList } from '@/app/ui/common-list';

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'School', href: '/dashboard/' },
          { label: 'Season', href: '/dashboard/seasons', active: true },
        ]}
      />
      <CommonList
        table={{
          element: <SeasonTable currentPage={1} query={'2'} />,
          totalPages: 1,
        }}
      />
    </main>
  );
}
