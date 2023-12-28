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

export function UpdateLink({ url }: { url: string }) {
  return (
    <Link href={url} className="rounded-md border p-2 hover:bg-gray-100">
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteButton({
  context,
  onClick,
}: {
  context?: string;
  onClick?: () => void;
}) {
  return (
    <button
      className="rounded-md border p-2 hover:bg-gray-100"
      onClick={onClick ? onClick : () => {}}
    >
      <span className="sr-only">Delete {context && context}</span>
      <TrashIcon className="w-5" />
    </button>
  );
}
