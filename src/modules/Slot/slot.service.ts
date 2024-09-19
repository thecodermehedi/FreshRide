import httpStatus from 'http-status';
import SlotModel from './slot.model';
import type {TSlot} from './slot.types';
import AppError from '../../errors/AppError';
import ServiceModel from '../Service/service.model';
import {convertMinutesToTime, convertTimeToMinutes} from './slot.utils';

const createSlots = async (slotData: TSlot) => {
  const serviceDetails = await ServiceModel.findById(slotData.service);
  const isServiceExist = !!serviceDetails;
  if (!isServiceExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found');
  }
  const serviceDurationInMinutes = serviceDetails.duration;
  const {startTime, endTime, service, date} = slotData;

  const startMinutes = convertTimeToMinutes(startTime);
  const endMinutes = convertTimeToMinutes(endTime);
  const totalDurationInMinutes = endMinutes - startMinutes;

  const numberOfSlots = Math.floor(
    totalDurationInMinutes / serviceDurationInMinutes,
  );

  const createdSlots: TSlot[] = [];
  for (let i = 0; i < numberOfSlots; i++) {
    const slotStartMinutes = startMinutes + i * serviceDurationInMinutes;
    const slotEndMinutes = slotStartMinutes + serviceDurationInMinutes;
    const slot = {
      service,
      date,
      startTime: convertMinutesToTime(slotStartMinutes),
      endTime: convertMinutesToTime(slotEndMinutes),
    };
    const createdSlot = await SlotModel.create(slot);
    createdSlots.push(createdSlot);
  }
  return createdSlots;
};

const getSlots = async ({date, service}: Record<string, unknown>) => {
  if (date && service) {
    return await SlotModel.find({date, service}, {__v: 0}).populate({
      path: 'service',
      model: 'Service',
      select: '-createdAt -updatedAt -__v',
    });
  }
  if (date && !service) {
    return await SlotModel.find({date}, {__v: 0}).populate({
      path: 'service',
      model: 'Service',
      select: '-createdAt -updatedAt -__v',
    });
  }
  if (!date && service) {
    return await SlotModel.find({service}, {__v: 0}).populate({
      path: 'service',
      model: 'Service',
      select: '-createdAt -updatedAt -__v',
    });
  }
  return await SlotModel.find().select('-__v').populate({
    path: 'service',
    model: 'Service',
    select: '-createdAt -updatedAt -__v',
  });
};

export const slotService = {
  createSlots,
  getSlots,
};
