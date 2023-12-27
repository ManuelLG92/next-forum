import Breadcrumbs from '@/app/ui/common/breadcrumbs';
import { CommonList } from '@/app/ui/common/common-list';
import { fetchPosts } from '@/app/lib/api/posts/retrieve';
import PostsTable from '@/app/ui/posts/table';

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
  const currentPage = Number(searchParams?.page) || 1;
  const currentLimit = Number(searchParams?.limit) || 10;
  const currentLike = searchParams?.query;
  const data = await fetchPosts({
    currentPage,
    limit: currentLimit,
    like: currentLike,
  });

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Posts', href: '/dashboard/posts', active: true },
        ]}
      />
      <CommonList
        table={{
          element: <PostsTable posts={data} />,
          totalPages: data.pages,
        }}
        create={{ ctx: 'Posts', destination: '/dashboard/posts/create' }}
      />
    </main>
  );
}
