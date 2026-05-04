import { z } from 'zod';

export const ROLES = ['Frontend', 'Backend', 'QA', 'DevOps'] as const;
export const SKILS = ['React', 'TypeScript', 'Node.js', 'SQL'] as const;
export const SENIORITY_LEVELS = [
  'Trainee',
  'Junior',
  'Middle',
  'Senior',
] as const;

export interface UserFormValues {
  firstName: string;
  lastName: string;
  email: string;
  role: (typeof ROLES)[number] | '';
  seniorityLevel: (typeof SENIORITY_LEVELS)[number] | '';
  skills: string[];
  bio: string;
  agreement: boolean;
}

export const defaultUserFormValues: UserFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  role: '',
  seniorityLevel: '',
  skills: [],
  bio: '',
  agreement: false,
};

export const userSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'Required field')
    .min(2, 'Name is too short (min. 2 characters)'),
  lastName: z
    .string()
    .trim()
    .min(1, 'Required field')
    .min(2, 'Name is too short (min. 2 characters)'),
  email: z
    .string()
    .trim()
    .min(1, 'Required field')
    .email('Invalid email format'),
  role: z.enum(ROLES, {
    errorMap: () => ({ message: 'Select a role' }),
  }),
  seniorityLevel: z.enum(SENIORITY_LEVELS, {
    errorMap: () => ({ message: 'Select a seniority level' }),
  }),
  skills: z.array(z.string()).min(1, 'Select at least one skill'),
  bio: z.string().max(200, 'Maximum 200 characters').optional(),
  agreement: z.literal(true, {
    errorMap: () => ({ message: 'Agreement is required' }),
  }),
});

export type RegistrationData = z.infer<typeof userSchema>;
