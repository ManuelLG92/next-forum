'use client';
import { BaseList } from '@/app/lib/api/types';
import Link from 'next/link';
import { Posts } from '@/app/lib/api/posts';
import useUserStore from '@/app/store/user';
import { DeleteButton, UpdateLink } from '@/app/ui/common/buttons';
import React, { useState } from 'react';
import { deletePostById } from '@/app/lib/api/posts/deleteById';
import { useRouter } from 'next/navigation';
import ToastSuccess from '@/app/ui/common/toast-success';

export default function PostsTable({ posts }: { posts: BaseList<Posts> }) {
  const { id } = useUserStore();
  const router = useRouter();
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  return (
    <div className="mt-6 flow-root">
      {isDeleted && <ToastSuccess context={'Post removed successfully'} />}
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
              <hr className="my-4 border-gray-200 dark:border-gray-700 sm:mx-auto lg:mb-4" />

              {post.user.id === id && (
                <>
                  <div className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateLink url={`/dashboard/posts/update/${post.id}`} />
                      <DeleteButton
                        onClick={async () => {
                          const confirmed = window.confirm(
                            `Are you sure you want to delete the post ${post.title}? This action cannot be undone.`,
                          );
                          if (confirmed) {
                            await deletePostById({ id: post.id });
                            setIsDeleted(true);
                            setTimeout(() => {
                              setIsDeleted(false);
                              router.refresh();
                            }, 2500);
                          }
                        }}
                        context={'Delete post'}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
