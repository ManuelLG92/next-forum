'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Posts } from '@/app/lib/api/posts';

export default function RetrievePost({ post }: { post: Posts }) {
  const router = useRouter();

  return (
    <>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
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
                <p>By: {post.user.name}</p>
              </Link>
            </div>
            <hr />
            <p className="mt-8 text-base text-gray-700">{post.content} </p>
            <p className="mt-8 text-end text-gray-700">
              #{post.created_at.split('T')[0]}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <div
          onClick={() => router.back()}
          className="aria-disabled:opacity-50', flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:cursor-pointer hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed"
        >
          Back
        </div>
        {/*<Button type="submit">Edit Invoice</Button>*/}
      </div>
    </>
  );
}
