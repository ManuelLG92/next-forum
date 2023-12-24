'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

import { signIn } from '@/auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes('CredentialsSignin')) {
      return 'CredentialsSignin';
    }
    throw error;
  }
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
  } catch (error) {
    return {
      message: `DatabaseError: Failed to delete invoice ${id} due ${JSON.stringify(
        error,
      )}`,
    };
  }

  revalidatePath('/dashboard/invoices');
}
