import {z} from 'zod';

const createBookingValidationSchema = z.object({
  serviceId: z.string({
    required_error: 'Service ID is required',
    invalid_type_error: 'Service ID must be a string',
  }),
  slotId: z.string({
    required_error: 'Slot ID is required',
    invalid_type_error: 'Slot ID must be a string',
  }),
  vehicleType: z.enum(
    [
      'car',
      'truck',
      'SUV',
      'van',
      'motorcycle',
      'bus',
      'electricVehicle',
      'hybridVehicle',
      'bicycle',
      'tractor',
    ],
    {
      required_error: 'Vehicle type is required',
      invalid_type_error: 'Invalid vehicle type',
    },
  ),
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
});

export const bookingValidator = {
  createBookingValidationSchema,
};
