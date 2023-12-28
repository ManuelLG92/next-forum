'use client';
import { BaseList } from '@/app/lib/api/types';
import Link from 'next/link';
import { Posts } from '@/app/lib/api/posts';
import useUserStore from '@/app/store/user';
import { DeleteButton, UpdateLink } from '@/app/ui/common/buttons';
import React, { useState } from 'react';
import { deletePostById } from '@/app/lib/api/posts/deleteById';
import { useRouter } from 'next/navigation';
import DeletePrompt from '@/app/ui/posts/delete-post';

export default function PostsTable({ posts }: { posts: BaseList<Posts> }) {
  const { id } = useUserStore();
  const router = useRouter();
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  return (
    <div className="mt-6 flow-root">
      {isDeleted && (
        <div
          id="toast-success"
          className="mb-4 flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400"
          role="alert"
        >
          <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="sr-only">Check icon</span>
          </div>
          <div className="ms-3 text-sm font-normal">
            Post removed successfully.
          </div>
          <button
            type="button"
            className="-mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
            data-dismiss-target="#toast-success"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              className="h-3 w-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}
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
                            router.refresh();
                            setTimeout(() => {
                              setIsDeleted(false);
                            }, 2500);
                          }
                          console.log('clocked', confirmed);
                        }}
                      />
                    </div>
                  </div>
                  <DeletePrompt
                    context={'post'}
                    onCancel={() => {
                      console.log('cancelled');
                    }}
                    onConfirm={() => {
                      console.log('cancelled');
                    }}
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
