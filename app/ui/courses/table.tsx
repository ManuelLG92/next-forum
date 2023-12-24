import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import { BaseList } from '@/app/lib/api/types';
import Link from 'next/link';
import { User } from '@/app/lib/definitions';

export default async function UsersTable({ schools }: { schools: BaseList<User> }) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {schools.data.map((school) => (
              <div
                key={school.data.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <Link href={`/dashboard/courses/${school.data.id}`}>
                      <p>Name: {school.data.name}</p>
                    </Link>
                  </div>
                  
                </div>

                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      Created at: N/A
                    </p>

                    <p>Updated at: N/A</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-3 py-5 font-medium">
                  Id
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Since
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Posts
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  Actions
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {schools.data.map((item) => (
                <tr
                  key={item.data.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    <Link href={`/dashboard/users/${item.data.id}`}>
                      <p>{item.data.id}</p>
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                      <p>{item.data.name}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                  N/A
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {item.posts.length ? (
                    item.posts.map((item) => (
                      <tr key={item.id}>
                        <td className="whitespace-nowrap px-3 py-3">
                          <Link href={`/dashboard/posts/${item.id}`}>
                            <p>{item.title}</p>
                          </Link>
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                          {item.content}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                        <td colSpan={2} className="text-center">
                          No Posts
                        </td>
                      </tr>
                  )}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateInvoice id={item.data.id} />
                      <DeleteInvoice id={item.data.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
