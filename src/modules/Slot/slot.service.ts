import httpStatus from 'http-status';
import SlotModel from './slot.model';
import type { TSlot } from './slot.types';
import AppError from '../../errors/AppError';
import ServiceModel from '../Service/service.model';
import { addMinutes, differenceInMinutes, format, parse } from 'date-fns';

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
    const start = addMinutes(slotStartTime, i * serviceDurationInMinutes);
    const end = addMinutes(start, serviceDurationInMinutes);
    const slot = {
      service: slotData.service,
      date: slotData.date,
      startTime: format(start, 'HH:mm'),
      endTime: format(end, 'HH:mm'),
      // isBooked: 'available',
    };
    const createdSlot = await SlotModel.create(slot);
    slots.push(createdSlot);
  }
  return slots;
};


const getSlots = async ({ date, service }: Record<string, unknown>) => {
  if (date && service) {
    return await SlotModel.find({ date, service }).populate('service');
  }
  if (date && !service) {
    return await SlotModel.find({ date }).populate('service');
  }
  if (!date && service) {
    return await SlotModel.find({ service }).populate('service');
  }
  return await SlotModel.find().populate('service');
}

export const slotService = {
  createSlots,
  getSlots,
};
