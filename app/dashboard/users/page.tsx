import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { CommonList } from '@/app/ui/common-list';
import { fetchUsers } from '@/app/lib/api/users/retrieve';
import UsersTable from '@/app/ui/courses/table';

export default async function Page({
  searchParams,
}: Readonly<{
  searchParams?: {
    query?: string;
    limit?: string;
    page?: string;
    like?: string;
  };
}>) {

  const data = await fetchUsers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Users', href: '/dashboard/users', active: true },
        ]}
      />
      <CommonList
        table={{
          element: <UsersTable schools={data} />,
          totalPages: data.count,
        }}
        create={{ ctx: 'User', destination: '/dashboard/users/create' }}
      />
    </main>
  );
}
