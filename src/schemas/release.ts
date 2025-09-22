import { z } from 'zod';

export const releaseFormSchema = z.object({
  year: z
    .number()
    .min(1900, 'Year must be at least 1900')
    .max(new Date().getFullYear() + 1, 'Year cannot be in the future'),
  artist: z
    .string()
    .min(1, 'Artist is required')
    .max(200, 'Artist name is too long'),
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title is too long'),
  styles: z
    .string()
    .min(1, 'At least one style is required'),
  misc: z
    .string()
    .max(500, 'Misc notes are too long')
    .optional()
    .or(z.literal('')),
});

export type ReleaseFormData = z.infer<typeof releaseFormSchema>;
