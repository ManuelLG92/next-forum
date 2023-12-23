'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    // invalid_type_error: 'Please select a customer.',
    description: 'Please select a customer.',
    errorMap: () => ({ message: 'Please select a customer.' }),
  }),
  amount: z.coerce.number().gt(0, {
    message: 'Please enter an amount greater than 0.',
  }),
  status: z.enum(['pending', 'paid'], {
    description: 'Please select an invoice status (<pending>, <paid>).',
    errorMap: () => ({
      message: 'Please select an invoice status (<pending>, <paid>).',
    }),
  }),
  date: z.string(),
});

const UpdateInvoice = FormSchema.omit({ id: true, date: true });

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
export async function updateInvoice(
  id: string,
  previousState: State,
  formData: FormData,
) {
  try {
    const data = await UpdateInvoice.safeParseAsync(
      Object.fromEntries(formData.entries()),
    );

    if (!data.success) {
      return {
        errors: data.error.flatten().fieldErrors,
        message: 'Missing fields. Failed to update an invoice',
      };
    }
    const { customerId, amount, status } = data.data;

    const amountInCents = amount * 100;

    await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
  } catch (error) {
    return {
      message: `DatabaseError: Failed to update invoice ${id} due ${JSON.stringify(
        error,
      )}`,
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

const CreateInvoice = FormSchema.omit({ id: true, date: true });

// This is temporary until @types/react-dom is updated
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createInvoice(previousState: State, formData: FormData) {
  try {
    const validatedFields = await CreateInvoice.safeParseAsync(
      Object.fromEntries(formData.entries()),
    );
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing fields. Failed to create an invoice',
      };
    }

    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      message: `DatabaseError: Failed to created invoice due ${JSON.stringify(
        error,
      )}`,
    };
  }
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
