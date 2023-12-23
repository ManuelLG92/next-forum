import Search from '@/app/ui/search';
import Limit from '@/app/ui/invoices/limit';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import Pagination from '@/app/ui/invoices/pagination';
import React from 'react';

export function CommonList({
  create,
  table,
}: {
  create?: { ctx: string; destination: string };
  table: {
    element: React.ReactNode;
    totalPages: number;
  };
}) {
  return (
    <>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder={`Search ${create?.ctx ?? ''} ...`} />
        <Limit />
        {create && (
          <CreateInvoice
            createCtx={create.ctx}
            destination={create.destination}
          />
        )}
        {/*<CreateInvoice*/}
        {/*  createCtx="Course"*/}
        {/*  destination="/dashboard/course/create"*/}
        {/*/>*/}
      </div>

      {table.element}
      <Pagination totalPages={table.totalPages} />
    </>
  );
}
