import Breadcrumbs from '@/app/ui/common/breadcrumbs';
import { notFound } from 'next/navigation';
import { fetchPostById } from '@/app/lib/api/posts/retrieveById';
import RetrievePost from '@/app/ui/posts/retrieve-form';

export default async function Page({
  params,
}: Readonly<{ params: { id: string } }>) {
  const { id } = params;
  const post = await fetchPostById({ id });
  if (!post) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Posts', href: '/dashboard/posts' },
          { label: 'post', href: `/dashboard/posts/${id}`, active: true },
        ]}
      />
      <RetrievePost post={post} />
    </main>
  );
}
