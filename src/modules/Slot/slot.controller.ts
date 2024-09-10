import httpStatus from 'http-status';
import { catchAsync } from '../../utils';
import { slotService } from './slot.service';

const createSlots = catchAsync(async (req, res) => {
  const result = await slotService.createSlots(req.body);
  res.json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slot created successfully',
    data: result,
  });
});


const getSlots = catchAsync(async (req, res) => {
  const query: Record<string, unknown> = {};
  const { date, serviceId } = req.query;
  if (date) {
    query.date = req.query.date;
  }
  if (serviceId) {
    query.service = req.query.serviceId;
  }
  const slots = await slotService.getSlots(query);
  res.json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slots retrieved successfully',
    data: slots,
  });
});


export const slotController = {
  createSlots,
  getSlots,
};
