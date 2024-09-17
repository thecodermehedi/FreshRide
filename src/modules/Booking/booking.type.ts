import type {ObjectId} from 'mongoose';

export type TVehicle =
  | 'car'
  | 'truck'
  | 'SUV'
  | 'van'
  | 'motorcycle'
  | 'bus'
  | 'electricVehicle'
  | 'hybridVehicle'
  | 'bicycle'
  | 'tractor';

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
