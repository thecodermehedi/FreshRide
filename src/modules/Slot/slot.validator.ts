import {z} from 'zod';

const createSlotValidationSchema = z.object({
  body: z
    .object({
      service: z.string(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
      isBooked: z
        .enum(['available', 'cancelled', 'booked'])
        .default('available')
        .optional(),
    })
    .refine((data) => data.startDate < data.endDate, {
      message: 'End date must be after start date',
      path: ['endDate'],
    }),
});

export const slotValidations = {
  createSlotValidationSchema,
};
