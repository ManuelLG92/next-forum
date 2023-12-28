import { BaseList } from '@/app/lib/api/types';
import Link from 'next/link';
import { Posts } from '@/app/lib/api/posts';

export default async function PostsTable({
  posts,
}: {
  posts: BaseList<Posts>;
}) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {posts.data.map((post) => (
            <div
              className="my-12 min-w-full overflow-hidden rounded text-gray-900 shadow-lg"
              key={post.id}
            >
              <div className="my-12 px-6">
                <div className="mb-2 flex justify-between text-xl font-bold">
                  <Link href={`/dashboard/posts/${post.id}`}>
                    <p>{post.title}</p>
                  </Link>
                  <Link href={`/dashboard/users/${post.user.id}`}>
                    <p>{post.user.name}</p>
                  </Link>
                </div>
                <hr />
                <p className="mt-8 text-base text-gray-700">{post.content} </p>
                <p className="mt-8 text-end text-gray-700">
                  #{post.created_at.split('T')[0]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
