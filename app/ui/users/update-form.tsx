'use client';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateUser, UpdateUserParams } from '@/app/lib/api/users/update';

interface Fields {
  value: string;
  message: string;
  error: string | undefined;
}

const defaultFieldsValues: Fields = {
  value: '',
  message: '',
  error: '',
};
export default function UpdateUserForm({ user }: { user: UpdateUserParams }) {
  const [name, setName] = useState<Fields>({
    ...defaultFieldsValues,
    value: user.name,
  });
  const [email, setEmail] = useState<Fields>({
    ...defaultFieldsValues,
    value: user.email,
  });
  const [isValid, setIsValid] = useState<boolean>(true);
  const router = useRouter();

  const resetValues = () => {
    setName(defaultFieldsValues);
    setEmail(defaultFieldsValues);
    setIsValid(false);
  };
  useEffect(() => {
    setIsValid(!(name.error || email.error));
  }, [name, email]);

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
        value: event.target.value,
        message: '',
        error: `${context} must be at least ${minLength} characters long`,
      });
      return;
    }
    if (event.target.value.length > maxLength) {
      handler({
        value: event.target.value,
        message: '',
        error: `${context} must be at most ${maxLength} characters long`,
      });
      return;
    }

    handler({
      value: event.target.value,
      message: `Valid ${context}`,
      error: undefined,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(' on click');
    const body: UpdateUserParams = {
      id: user.id,
      name: name.value,
      email: email.value,
    };
    updateUser(body)
      .then((r) => {
        resetValues();
        router.push(`/dashboard/users/${user.id}?toList=true`);
      })
      .catch((e) => console.log(e));
  };

  return (
    <form>
      <div
        className="rounded-md bg-gray-50 p-4 md:p-6"
        aria-describedby="creation-error"
      >
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                step="0.01"
                placeholder="Enter name"
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-error"
                value={name.value}
                onChange={(e) =>
                  handleStringChange({
                    event: e,
                    minLength: 5,
                    maxLength: 25,
                    context: 'Name',
                    handler: setName,
                  })
                }
              />
            </div>
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {name.error ? (
                <p className="mt-2 text-sm text-red-500">{name.error}</p>
              ) : (
                <p className="mt-2 text-sm text-green-500">{name.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                placeholder="Enter email"
                type="text"
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="email-error"
                value={email.value}
                onChange={(e) =>
                  handleStringChange({
                    event: e,
                    minLength: 5,
                    maxLength: 25,
                    context: 'Email',
                    handler: setEmail,
                  })
                }
              />
            </div>
            <div id="email-error" aria-live="polite" aria-atomic="true">
              {email.error ? (
                <p className="mt-2 text-sm text-red-500">{email.error}</p>
              ) : (
                <p className="mt-2 text-sm text-green-500">{email.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={'/dashboard/users'}
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
          Update User
        </Button>
      </div>
    </form>
  );
}
