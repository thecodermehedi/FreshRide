import {z} from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string()
      .trim()
      .email('Invalid email format. Please provide a valid email address.')
      .min(1, 'Email is required.'),
    password: z
      .string()
      .trim()
      .min(6, 'Password must be at least 6 characters long.')
      .min(1, 'Password is required.'),
  }),
});

const signupValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, 'Name is required.'),
    email: z
      .string()
      .trim()
      .email('Invalid email format. Please provide a valid email address.')
      .min(1, 'Email is required.'),
    password: z
      .string()
      .trim()
      .min(6, 'Password must be at least 6 characters long.')
      .min(1, 'Password is required.'),
    phone: z
      .string()
      .trim()
      .min(1, 'Phone number is required.')
      .regex(/^\+?[\d\s-()]+$/, 'Phone number format is invalid.'),
    role: z
      .enum(['user', 'admin'], {
        errorMap: () => ({message: "Role must be either 'user' or 'admin'."}),
      })
      .default('user'),
    address: z.string().trim().min(1, 'Address is required.'),
  }),
});

export const AuthValidations = {loginValidationSchema, signupValidationSchema};
