import Breadcrumbs from '@/app/ui/common/breadcrumbs';
import { notFound } from 'next/navigation';
import { fetchPostById } from '@/app/lib/api/posts/retrieveById';
import RetrievePost from '@/app/ui/posts/retrieve-form';
import { Posts } from '@/app/lib/api/posts';

export default async function Page({
  params,
  searchParams,
}: Readonly<{ params: { id: string }; searchParams: { toList: string } }>) {
  const { id } = params;
  let post: Posts | null;
  post = await fetchPostById({ id });
  if (!post) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Posts', href: '/dashboard/posts' },
          { label: 'Post', href: `/dashboard/posts/${id}`, active: true },
        ]}
      />
      <RetrievePost post={post} toPostList={searchParams?.toList === 'true'} />
    </main>
  );
}
