import httpStatus from 'http-status';
import {catchAsync} from '../../utils';
import {slotService} from './slot.service';

const createSlot = catchAsync(async (req, res) => {
  const result = await slotService.createSlot(req.body);
  res.json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slot created successfully',
    data: result,
  });
});

export const slotController = {
  createSlot,
};
