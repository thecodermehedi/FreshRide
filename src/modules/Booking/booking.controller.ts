import type { RequestHandler } from 'express';
import { catchAsync } from '../../utils';
import httpStatus from 'http-status';
import { bookingService } from './booking.service';
import type { TPayloadUser } from './booking.type';

const bookService: RequestHandler = catchAsync(async (req, res) => {
  const booking = await bookingService.bookService(req.body, req.user as TPayloadUser);
  res.json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking successfully',
    data: booking,
  });
});

const getBookings: RequestHandler = catchAsync(async (req, res) => {
  const bookings = await bookingService.getBookings(req.user as TPayloadUser);
  res.json({
    success: true,
    statusCode: httpStatus.OK,
    message:
      req.user.role === 'admin'
        ? 'All bookings retrieved successfully'
        : 'User bookings retrieved successfully',
    data: bookings,
  });
});

export const bookingController = {
  bookService,
  getBookings,
};
