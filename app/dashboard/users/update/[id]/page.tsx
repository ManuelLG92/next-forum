import Breadcrumbs from '@/app/ui/common/breadcrumbs';
import { fetchUsersById } from '@/app/lib/api/users/retrieveById';
import UpdateUserForm from '@/app/ui/users/update-form';

export default async function Page({
  params,
}: Readonly<{
  params: {
    id: string;
  };
}>) {
  const user = await fetchUsersById({ id: params.id });
  if (!user) {
    return <div>User not found</div>;
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Users', href: '/dashboard/users' },
          {
            label: 'Update User',
            href: '/dashboard/users/update',
            active: true,
          },
        ]}
      />
      <UpdateUserForm user={user} />
    </main>
  );
}
