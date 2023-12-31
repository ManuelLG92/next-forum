'use client';
import { DeleteButton, UpdateLink } from '@/app/ui/common/buttons';
import { BaseList } from '@/app/lib/api/types';
import Link from 'next/link';
import { User } from '@/app/lib/definitions';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ToastSuccess from '@/app/ui/common/toast-success';
import { deleteUserById } from '@/app/lib/api/users/deleteById';
import { formatDateString } from '@/app/lib/utils';

export default function UsersTable({ users }: { users: BaseList<User> }) {
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const router = useRouter();

  return (
    <div className="mt-6 flow-root">
      {isDeleted && <ToastSuccess context={'User removed successfully'} />}
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {users.data.map((user) => (
              <div
                key={user.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <Link href={`/dashboard/users/${user.id}`}>
                      <p>
                        Name: {user.name} - id: {user.id}
                      </p>
                    </Link>
                  </div>
                </div>

                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">Created at: N/A</p>

                    <p>Updated at: N/A</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {users.data.map((user) => (
            <div
              className="my-12 min-w-full overflow-hidden rounded text-gray-900 shadow-lg"
              key={user.id}
            >
              <div className="my-12 px-6">
                <div className="mb-2 flex justify-between text-xl font-bold">
                  <Link href={`/dashboard/users/${user.id}`}>
                    <h1>{user.name}</h1>
                  </Link>
                  <p>Since #{formatDateString(user.created_at)}</p>
                </div>
                <hr />
                <div className="mt-8 pl-4 text-gray-700">
                  <h2 className="mb-6 underline">Posts:</h2>
                  <ul>
                    {user.posts?.length ? (
                      user.posts.map((post) => (
                        <li key={post.id}>
                          <Link href={`/dashboard/posts/${post.id}`}>
                            <p>- {post.title}</p>
                          </Link>
                        </li>
                      ))
                    ) : (
                      <p>N/A</p>
                    )}
                  </ul>
                </div>
                <hr className="my-4 border-gray-200 dark:border-gray-700 sm:mx-auto lg:mb-4" />

                <div className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex justify-end gap-3">
                    <UpdateLink url={`/dashboard/users/update/${user.id}`} />
                    <div className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <DeleteButton
                          onClick={async () => {
                            const confirmed = window.confirm(
                              `Are you sure you want to delete the user ${user.name}? This action cannot be undone.`,
                            );
                            if (confirmed) {
                              await deleteUserById({ id: user.id });
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
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
