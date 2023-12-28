import Breadcrumbs from '@/app/ui/common/breadcrumbs';
import CreatePostForm from '@/app/ui/posts/create-form';

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Posts', href: '/dashboard/posts' },
          {
            label: 'Create Post',
            href: '/dashboard/posts/create',
            active: true,
          },
        ]}
      />
      <CreatePostForm />
    </main>
  );
}
