import { z } from 'zod';
import { fetcher, HTTP_METHODS } from '@/app/lib/api';
import { redirect } from 'next/navigation';
import { BASE_SECTION, SectionState } from '@/app/lib/api/section';

export const SectionSchema = z.object({
  name: z.string(),
  courseId: z.string(),
  studentIds: z.array(z.string()).optional(),
});

export async function createSection(
  previousState: SectionState,
  formData: FormData,
) {
  const validatedFields = await SectionSchema.safeParseAsync(
    Object.fromEntries(formData.entries()),
  );
  try {
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing fields. Failed to create a section',
      };
    }

    await fetcher(BASE_SECTION, HTTP_METHODS.POST, {
      name: validatedFields.data.name,
      courseIds: [validatedFields.data.courseId],
    });
  } catch (error) {
    return {
      message: `DatabaseError: Failed to created invoice due ${
        (error as Error).message
      }`,
    };
  }
  // revalidatePath('/dashboard/sections');
  redirect('/dashboard/sections');
}
