'use client';
import { DeleteButton, UpdateLink } from '@/app/ui/common/buttons';
import { BaseList } from '@/app/lib/api/types';
import Link from 'next/link';
import { User } from '@/app/lib/definitions';
import React from 'react';

export default function UsersTable({ users }: { users: BaseList<User> }) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {users.data.map((school) => (
              <div
                key={school.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <Link href={`/dashboard/users/${school.id}`}>
                      <p>Name: {school.name}</p>
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
                  <p>Since #{user.created_at.split('T')[0]}</p>
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
                    <DeleteButton
                      context={'Delete post'}
                      onClick={() => {
                        console.log('WIP');
                      }}
                    />
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
