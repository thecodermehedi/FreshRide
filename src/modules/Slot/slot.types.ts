import type {ObjectId} from 'mongoose';

export type TIsBooked = 'available' | 'cancelled' | 'booked';

export type TSlot = {
  service: ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  isBooked?: TIsBooked;
};
