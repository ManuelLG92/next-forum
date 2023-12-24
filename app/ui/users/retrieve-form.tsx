'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User } from '@/app/lib/definitions';

export default function RetrieveUser({ course }: { course: User }) {
  const router = useRouter();

  return (
    <>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <h2 className="text-center">{course.data.name}</h2>
          <div className="flex justify-around">
            <p>Created at n/a</p>
            <p>Updated at: n/a</p>
          </div>
        </div>
        <hr />

        <div className="mb-4">
          <h3 className="my-6 text-center">Posts</h3>
          <div className="flex text-center">
            <div className="m-auto mt-2 rounded-md">
              <table className="table-auto bg-white">
                <thead className="rounded-lg border-b-2 border-gray-400 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-3 py-5 font-medium">
                      title
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      content
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {course.posts.length ? (
                    course.posts.map((item) => (
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
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <hr />
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
