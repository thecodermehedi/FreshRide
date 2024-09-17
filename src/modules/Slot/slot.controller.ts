import httpStatus from 'http-status';
import {catchAsync, sendResponse} from '../../utils';
import {slotService} from './slot.service';

const createSlots = catchAsync(async (req, res) => {
  const result = await slotService.createSlots(req.body);
  sendResponse(res, httpStatus.OK, 'Slot created successfully', result);
});

const getSlots = catchAsync(async (req, res) => {
  const query: Record<string, unknown> = {};
  const {date, serviceId} = req.query;
  if (date) {
    query.date = req.query.date;
  }
  if (serviceId) {
    query.service = req.query.serviceId;
  }
  const slots = await slotService.getSlots(query);
  sendResponse(res, httpStatus.OK, 'Slots retrieved successfully', slots);
});

export const slotController = {
  createSlots,
  getSlots,
};
