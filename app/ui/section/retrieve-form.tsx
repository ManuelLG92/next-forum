'use client';

import {
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Section } from '@/app/lib/api/types';
import { useRouter } from 'next/navigation';

export default function RetrieveSection({ section }: { section: Section }) {
  const router = useRouter();

  return (
    <>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Section Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              readOnly
              value={section.name}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Course */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Course
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="course"
                name="course"
                type="text"
                value={section.courses.length ? section.courses[0].name : 'N/A'}
                readOnly
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Students
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="student"
                name="student"
                type="text"
                value={section.students.length ?? 'N/A'}
                readOnly
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="created-at"
            className="mb-2 block text-sm font-medium"
          >
            Created at
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="created-at"
                name="created-at"
                type="text"
                value={section.createdAt}
                readOnly
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="updated-at"
            className="mb-2 block text-sm font-medium"
          >
            Updated at
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="updated-at"
                name="updated-at"
                type="text"
                value={section.updatedAt}
                readOnly
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <div
          onClick={() => router.back()}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:cursor-pointer hover:bg-gray-200"
        >
          Back
        </div>
        {/*<Button type="submit">Edit Invoice</Button>*/}
      </div>
    </>
  );
}
