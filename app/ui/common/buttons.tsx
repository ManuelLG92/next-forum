import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteInvoice } from '@/app/lib/actions';

export type CreateInvoiceProps = {
  destination: string;
  createCtx: string;
};

const defaultCreateInvoice: CreateInvoiceProps = {
  destination: '/dashboard/invoices/create',
  createCtx: 'Invoice',
};

export function CreateInvoice({
  destination,
  createCtx,
}: Partial<CreateInvoiceProps>) {
  return (
    <Link
      href={destination ?? defaultCreateInvoice.destination}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">
        Create {createCtx ?? defaultCreateInvoice.createCtx}
      </span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/invoices/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  const deleteWithId = deleteInvoice.bind(null, id);
  return (
    <form action={deleteWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}