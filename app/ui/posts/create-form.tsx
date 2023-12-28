'use client';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import React, { useEffect, useState } from 'react';
import useUserStore from '@/app/store/user';
import { createPost, CreatePostParams } from '@/app/lib/api/posts/create';
import { useRouter } from 'next/navigation';

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
export default function CreatePostForm() {
  const [title, setTitle] = useState<Fields>(defaultFieldsValues);
  const [content, setContent] = useState<Fields>(defaultFieldsValues);
  const [isValid, setIsValid] = useState<boolean>(false);
  const { id } = useUserStore();
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
    const body: CreatePostParams = {
      content: content.value,
      title: title.value,
      created_by: id,
    };
    createPost(body)
      .then((r) => router.push(`/dashboard/posts/${r.id}`))
      .catch((e) => console.log(e));
  };

  return (
    <form>
      <div
        className="rounded-md bg-gray-50 p-4 md:p-6"
        aria-describedby="creation-error"
      >
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

        {/* Title */}
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
                <p className="mt-2 text-sm text-green-500">{content.message}</p>
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
          Create Post
        </Button>
      </div>
    </form>
  );
}
