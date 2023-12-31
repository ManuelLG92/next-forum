'use client';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Posts } from '@/app/lib/api/posts';
import { updatePost, UpdatePostParams } from '@/app/lib/api/posts/update';

interface Fields {
  isInit: boolean;
  value: string;
  message: string;
  error: string | undefined;
}

const defaultFieldsValues: Fields = {
  isInit: false,
  value: '',
  message: '',
  error: '',
};
export default function UpdatePostForm({
  props: { title: originalTitle, content: originalContent, id: postId },
}: {
  props: Posts;
}) {
  const [title, setTitle] = useState<Fields>({
    ...defaultFieldsValues,
    value: originalTitle,
  });
  const [content, setContent] = useState<Fields>({
    ...defaultFieldsValues,
    value: originalContent,
  });
  const [isValid, setIsValid] = useState<boolean>(false);
  const [invalidRequest, setInvalidRequest] = useState<{
    result?: boolean | undefined;
    message?: string;
  }>({});
  const router = useRouter();

  useEffect(() => {
    if (!title.isInit || !content.isInit || title.error || content.error) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [title, content]);

  const handleStringChange = ({
    event,
    minLength,
    maxLength,
    context,
    handler,
  }: {
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>;
    minLength: number;
    maxLength: number;
    context: string;
    handler: (value: React.SetStateAction<Fields>) => void;
  }) => {
    if (event.target.value.length < minLength) {
      handler({
        isInit: true,
        value: event.target.value,
        message: '',
        error: `${context} must be at least ${minLength} characters long`,
      });
      return;
    }
    if (event.target.value.length > maxLength) {
      handler({
        isInit: true,
        value: event.target.value,
        message: '',
        error: `${context} must be at most ${maxLength} characters long`,
      });
      return;
    }

    handler({
      isInit: true,
      value: event.target.value,
      message: `Valid ${context}`,
      error: undefined,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const body: UpdatePostParams = {
      content: content.value,
      title: title.value,
      id: postId,
    };
    updatePost(body)
      .then(() => router.push(`/dashboard/posts/${postId}?toList=true`))
      .catch((e) => {
        setInvalidRequest({ result: false, message: e.message });
        console.log(e);
      });
  };

  return (
    <>
      {invalidRequest.result === false && (
        <div
          id="toast-danger"
          className="mb-4 flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400"
          role="alert"
        >
          <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
            </svg>
            <span className="sr-only">Error icon</span>
          </div>
          <div className="ms-3 text-sm font-normal">
            {invalidRequest.message}
          </div>
          <button
            type="button"
            className="-mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
            data-dismiss-target="#toast-danger"
            aria-label="Close"
            onClick={() => setInvalidRequest({ result: true })}
          >
            <span className="sr-only">Close</span>
            <svg
              className="h-3 w-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}
      <form>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          {/* Title */}
          <div className="mb-4">
            <label htmlFor="title" className="mb-2 block text-sm font-medium">
              Title
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="title"
                  name="title"
                  type="text"
                  step="0.01"
                  placeholder="Enter title"
                  className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="title-error"
                  value={title.value}
                  onChange={(e) =>
                    handleStringChange({
                      event: e,
                      minLength: 5,
                      maxLength: 25,
                      context: 'Title',
                      handler: setTitle,
                    })
                  }
                />
              </div>
              <div id="title-error" aria-live="polite" aria-atomic="true">
                {title.isInit && title.error ? (
                  <p className="mt-2 text-sm text-red-500">{title.error}</p>
                ) : (
                  <p className="mt-2 text-sm text-green-500">{title.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="mb-2 block text-sm font-medium">
              Content
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <textarea
                  id="content"
                  name="content"
                  placeholder="Enter content"
                  className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="content-error"
                  value={content.value}
                  onChange={(e) =>
                    handleStringChange({
                      event: e,
                      minLength: 7,
                      maxLength: 25,
                      context: 'Content',
                      handler: setContent,
                    })
                  }
                />
              </div>
              <div id="content-error" aria-live="polite" aria-atomic="true">
                {content.isInit && content.error ? (
                  <p className="mt-2 text-sm text-red-500">{content.error}</p>
                ) : (
                  <p className="mt-2 text-sm text-green-500">
                    {content.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href={'/dashboard/posts'}
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button
            className={isValid ? '' : 'cursor-not-allowed'}
            type="submit"
            disabled={!isValid}
            onClick={handleSubmit}
          >
            Update
          </Button>
        </div>
      </form>
    </>
  );
}
