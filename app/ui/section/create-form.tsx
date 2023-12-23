'use client';
import Link from 'next/link';
import {
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useFormState } from 'react-dom';
import { Course } from '@/app/lib/api/types';
import React from 'react';

import { createSection } from '@/app/lib/api/section/create';

export default function CreateSectionForm({ courses }: { courses: Course[] }) {
  const initialState = { message: undefined, errors: {} };
  const [state, dispatch] = useFormState(createSection, initialState);

  return (
    <form action={dispatch}>
      <div
        className="rounded-md bg-gray-50 p-4 md:p-6"
        aria-describedby="creation-error"
      >
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="courses" className="mb-2 block text-sm font-medium">
            Choose courses
          </label>
          <div className="relative">
            <select
              id="courses"
              name="courseId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="courses-error"
            >
              <option key={'ssss'} value="ssss" disabled>
                Select a course
              </option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="courses-error" aria-live="polite" aria-atomic="true">
            {state.errors?.coursesId &&
              state.errors.coursesId.map((error: string, idx: number) => (
                <p key={idx} className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Choose an name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                step="0.01"
                placeholder="Enter a name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.name &&
                state.errors.name.map((error: string, idx: number) => (
                  <p key={idx} className="mt-2 text-sm text-red-500">
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        <div id="creation-error" aria-live="polite" aria-atomic="true">
          {state.message && (
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
          )}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={'/dashboard/invoices'}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Section</Button>
      </div>
    </form>
  );
}
