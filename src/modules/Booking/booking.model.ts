import {model, Schema} from 'mongoose';
import type {TBooking} from './booking.type';

const bookingSchema = new Schema<TBooking>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    slotId: {
      type: Schema.Types.ObjectId,
      ref: 'Slot',
      required: true,
    },
    vehicleType: {
      type: String,
      enum: [
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
      required: true,
    },
    vehicleBrand: {type: String, required: true},
    vehicleModel: {type: String, required: true},
    manufacturingYear: {type: Number, required: true},
    registrationPlate: {type: String, required: true},
  },
  {
    timestamps: true,
  },
);

const BookingModel = model<TBooking>('Booking', bookingSchema);

export default BookingModel;
