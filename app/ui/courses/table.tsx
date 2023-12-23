import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { Course } from '@/app/lib/api/types';
import Link from 'next/link';

export default async function CourseTable({ schools }: { schools: Course[] }) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {schools?.map((school) => (
              <div
                key={school.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <Link href={`/dashboard/courses/${school.id}`}>
                      <p>Name: {school.name}</p>
                    </Link>
                  </div>
                  <InvoiceStatus
                    status={school.createdAt ? 'paid' : 'pending'}
                  />
                </div>

                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">Sections</p>

                    {school.sections.length ? (
                      <li className={'ml-6'}>
                        {school.sections.map((item) => (
                          <ul key={item.id}>{item.name}</ul>
                        ))}
                      </li>
                    ) : (
                      <p>Not sections attached to this courses</p>
                    )}
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={school.id} />
                    <DeleteInvoice id={school.id} />
                  </div>
                </div>

                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      Created at: {school.createdAt}
                    </p>

                    <p>Updated at: {school.updatedAt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-3 py-5 font-medium">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Created at
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Updated At
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Sections
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Subjects
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  Actions
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {schools?.map((item) => (
                <tr
                  key={item.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    <Link href={`/dashboard/courses/${item.id}`}>
                      <p>{item.name}</p>
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {item.createdAt}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {item.updatedAt}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <select className={'w-36'}>
                      {item.sections.map((item) => (
                        <option key={item.id}>{item.name}</option>
                      ))}
                    </select>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-center">
                    <select className={'w-36'}>
                      {item.subjects.map((item) => (
                        <option key={item.id}>{item.name}</option>
                      ))}
                    </select>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateInvoice id={item.id} />
                      <DeleteInvoice id={item.id} />
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
