'use client';

import { Course } from '@/app/lib/api/types';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RetrieveCourse({ course }: { course: Course }) {
  const router = useRouter();

  return (
    <>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <h2 className="text-center">{course.name}</h2>
          <div className="flex justify-around">
            <p>Created at {course.createdAt}</p>
            <p>Updated at: {course.updatedAt}</p>
          </div>
        </div>
        <hr />

        <hr />
        <div className="mb-4">
          <h3 className="my-4 text-center">
            Current season: {course.seasons[0].name}
          </h3>
          <div className="flex justify-around">
            <p>
              Start at:
              {course.seasons.length ? course.seasons[0].startAt : 'N/A'}
            </p>
            <p>
              End at: {course.seasons.length ? course.seasons[0].endAt : 'N/A'}
            </p>
          </div>
        </div>

        <hr />

        <div className="mb-4">
          <h3 className="my-6 text-center">Sections</h3>
          <div className="flex text-center">
            <div className="m-auto mt-2 rounded-md">
              <table className="table-auto bg-white">
                <thead className="rounded-lg border-b-2 border-gray-400 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Student count
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {course.sections.length ? (
                    course.sections.map((item) => (
                      <tr key={item.id}>
                        <td className="whitespace-nowrap px-3 py-3">
                          <Link href={`/dashboard/sections/${item.id}`}>
                            <p>{item.name}</p>
                          </Link>
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                          {item.students.length}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <>
                      <tr>
                        <td colSpan={2} className="text-center">
                          No sections
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <hr />
        <div className="mb-4 ">
          <h3 className="my-4 text-center">Subjects</h3>
          <div className="flex">
            <ul className="relative m-auto w-2/3 bg-white p-4 text-center">
              {course.subjects.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <div
          onClick={() => router.back()}
          className="aria-disabled:opacity-50', flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:cursor-pointer hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed"
        >
          Back
        </div>
        {/*<Button type="submit">Edit Invoice</Button>*/}
      </div>
    </>
  );
}
