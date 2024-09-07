import type {ObjectId} from 'mongoose';

export type TIsBooked = 'available' | 'cacelled' | 'booked';

export type TSlot = {
  service: ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  isBooked: TIsBooked;
};
