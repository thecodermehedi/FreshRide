import type {ObjectId} from 'mongoose';

export type TBooking = {
  customer: ObjectId; // Assuming this is an ID reference
  serviceId: ObjectId; // Assuming this is an ID reference
  slotId: ObjectId; // Assuming this is an ID reference
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

export type TPayloadUser = {
  email: string;
  role: string;
};
