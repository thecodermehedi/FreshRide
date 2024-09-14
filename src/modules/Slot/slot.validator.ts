import {z} from 'zod';

const createSlotValidationSchema = z.object({
  body: z.object({
    service: z
      .string({
        invalid_type_error: 'Service must be a string',
      })
      .min(1, {message: 'Service is required'}),
    date: z.string({
      invalid_type_error: 'Date must be a string',
    }),
    startTime: z
      .string({
        invalid_type_error: 'Start Time must be a string',
      })
      .min(1, {message: 'Start time is required'}),
    endTime: z
      .string({
        invalid_type_error: 'End Time must be a string',
      })
      .min(1, {message: 'End time is required'}),
    isBooked: z
      .enum(['available', 'cancelled', 'booked'])
      .default('available')
      .optional(),
  }),
});

export const slotValidations = {
  createSlotValidationSchema,
};
