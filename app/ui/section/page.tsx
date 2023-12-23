import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';

import { SectionDto } from '@/app/lib/api/section/retrieve';
import Link from 'next/link';

const SectionTable = async ({ data }: { data: SectionDto }) => {
  const sections = data.data;
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {sections?.map((invoice) => (
              <div
                key={invoice.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Link href={`/sections/${invoice.id}`}>
                        <p>Name: {invoice.name}</p>
                      </Link>
                    </div>
                    {/*<p className="text-sm text-gray-500">{invoice.name}</p>*/}
                  </div>
                </div>

                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">Students</p>

                    <p>{invoice.students.length}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={invoice.id} />
                    <DeleteInvoice id={invoice.id} />
                  </div>
                </div>

                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      Start at: {invoice.createdAt}
                    </p>

                    <p>End at: {invoice.updatedAt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Start at
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  End At
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Students
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Course
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {sections?.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Link href={`/dashboard/sections/${invoice.id}`}>
                        <p>{invoice.name}</p>
                      </Link>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {invoice.createdAt}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {invoice.updatedAt}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {invoice.students.length}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {invoice.courses?.length ? invoice.courses[0].name : 'N/A'}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateInvoice id={invoice.id} />
                      <DeleteInvoice id={invoice.id} />
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
};

export default SectionTable;
