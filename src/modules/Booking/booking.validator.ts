import {z} from 'zod';
import {VehicleTypes} from './booking.constant';

const createBookingValidationSchema = z.object({
  body: z.object({
    serviceId: z.string({
      required_error: 'Service ID is required',
      invalid_type_error: 'Service ID must be a string',
    }),
    slotId: z.string({
      required_error: 'Slot ID is required',
      invalid_type_error: 'Slot ID must be a string',
    }),
    vehicleType: z.enum(VehicleTypes as [string, ...string[]]),
    vehicleBrand: z.string({
      required_error: 'Vehicle brand is required',
      invalid_type_error: 'Vehicle brand must be a string',
    }),
    vehicleModel: z.string({
      required_error: 'Vehicle model is required',
      invalid_type_error: 'Vehicle model must be a string',
    }),
    manufacturingYear: z
      .number({
        required_error: 'Manufacturing year is required',
        invalid_type_error: 'Manufacturing year must be a number',
      })
      .int('Manufacturing year must be an integer')
      .min(1900, 'Manufacturing year must be 1900 or later')
      .max(
        new Date().getFullYear() + 1,
        `Manufacturing year cannot be later than ${new Date().getFullYear() + 1}`,
      ),
    registrationPlate: z.string({
      required_error: 'Registration plate is required',
      invalid_type_error: 'Registration plate must be a string',
    }),
  }),
});

/*
export type TBooking = {
  customer?: ObjectId;
  serviceId: ObjectId;
  slotId: ObjectId;
  vehicleType: TVehicle;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
};
*/

export const bookingValidations = {
  createBookingValidationSchema,
};
