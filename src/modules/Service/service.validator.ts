import {z} from 'zod';

// Common validator schema for service properties
const servicePropertiesSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Name must be a string',
      required_error: 'Name is required',
    })
    .min(3, {message: 'Name must be at least 3 characters long'})
    .max(50, {message: 'Name must not exceed 50 characters'}),
  description: z
    .string({
      invalid_type_error: 'Description must be a string',
      required_error: 'Description is required',
    })
    .min(10, {message: 'Description must be at least 10 characters long'})
    .max(200, {message: 'Description must not exceed 200 characters'}),
  price: z
    .number({
      invalid_type_error: 'Price must be a number',
      required_error: 'Price is required',
    })
    .positive({message: 'Price must be a positive number'}),
  duration: z
    .number({
      invalid_type_error: 'Duration must be a number',
      required_error: 'Duration is required',
    })
    .positive({message: 'Duration must be a positive number'}),
  isDeleted: z
    .boolean({
      invalid_type_error: 'IsDeleted must be a boolean',
    })
    .optional(),
});

// Validator schema for creating a service
export const createServiceValidationSchema = z.object({
  body: servicePropertiesSchema,
});

// Validator schema for updating a service
export const updateServiceValidationSchema = z.object({
  body: servicePropertiesSchema.partial(),
});

export const serviceValidator = {
  createServiceValidationSchema,
  updateServiceValidationSchema,
};
