import {Schema, model} from 'mongoose';
import type {TSlot} from './slot.types';

const SlotSchema: Schema = new Schema<TSlot>(
  {
    service: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    isBooked: {
      type: String,
      enum: ['available', 'cancelled', 'booked'],
      default: 'available',
    },
  },
  {
    timestamps: true,
  },
);

const SlotModel = model<TSlot>('Slot', SlotSchema);

export default SlotModel;
