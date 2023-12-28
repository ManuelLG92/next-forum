import clsx from 'clsx';
import { TrashIcon } from '@heroicons/react/24/outline';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  context?: string;
}

export function DeleteButton({
  children,
  className,
  context,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx('rounded-md border p-2 hover:bg-gray-100', className)}
    >
      <span className="sr-only">Delete</span>
      <TrashIcon className="w-5" />
      {children}
    </button>
  );
}
