import httpStatus from 'http-status';
import SlotModel from './slot.model';
import type {TSlot} from './slot.types';
import AppError from '../../errors/AppError';
import ServiceModel from '../Service/service.model';
import {addMinutes, differenceInMinutes, format, parse} from 'date-fns';

const createSlots = async (slotData: TSlot) => {
  const serviceDetails = await ServiceModel.findById(slotData.service);
  const isServiceExist = !!serviceDetails;
  if (!isServiceExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found');
  }

  // Service duration in minutes -> 30 - start time: 9:15, end time: 18:30
  const serviceDurationInMinutes = serviceDetails.duration;
  const slotStartTime = slotData.startTime;
  const slotEndTime = slotData.endTime;
  const slotDate = slotData.date;

  // Parse time strings to Date objects
  const slotStartDate = parse(slotStartTime, 'HH:mm', new Date());
  const slotEndDate = parse(slotEndTime, 'HH:mm', new Date());

  // Total duration of the slot in minutes
  const slotDuration = differenceInMinutes(slotEndDate, slotStartDate);

  // Number of slots
  const numberOfSlots = Math.floor(slotDuration / serviceDurationInMinutes);

  // Generate slots with startTime and endTime starting from slotStartTime
  const slots = [];
  for (let i = 0; i < numberOfSlots; i++) {
    const start = addMinutes(slotStartDate, i * serviceDurationInMinutes);
    const end = addMinutes(start, serviceDurationInMinutes);
    const slot = {
      service: serviceDetails._id,
      date: slotDate,
      startTime: format(start, 'HH:mm'),
      endTime: format(end, 'HH:mm'),
    };
    slots.push(slot);
  }
  await SlotModel.insertMany(slots);
  return slots;
};

export const slotService = {
  createSlots,
};
