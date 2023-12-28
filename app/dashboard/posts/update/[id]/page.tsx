import Breadcrumbs from '@/app/ui/common/breadcrumbs';
import UpdatePostForm from '@/app/ui/posts/update-form';
import { fetchPostById } from '@/app/lib/api/posts/retrieveById';

export default async function Page({
  params,
}: Readonly<{
  params: {
    id: string;
  };
}>) {
  const post = await fetchPostById({ id: params.id });
  if (!post) {
    return <div>Post not found</div>;
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Posts', href: '/dashboard/posts' },
          {
            label: 'Update Post',
            href: '/dashboard/posts/update',
            active: true,
          },
        ]}
      />
      <UpdatePostForm props={post} />
    </main>
  );
}
