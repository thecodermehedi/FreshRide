import type {ObjectId} from 'mongoose';

export type TBooking = {
  customer: ObjectId; // Assuming this is an ID reference
  service: ObjectId; // Assuming this is an ID reference
  slot: ObjectId; // Assuming this is an ID reference
  vehicleType:
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
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
};
