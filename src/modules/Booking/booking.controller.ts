import type {RequestHandler} from 'express';
import {catchAsync, sendResponse} from '../../utils';
import httpStatus from 'http-status';
import {bookingService} from './booking.service';
import type {TPayloadUser} from './booking.type';

const bookService: RequestHandler = catchAsync(async (req, res) => {
  const booking = await bookingService.bookService(
    req.body,
    req.user as TPayloadUser,
  );
  sendResponse(res, httpStatus.OK, 'Booking successfully', booking);
});

const getBookings: RequestHandler = catchAsync(async (req, res) => {
  const bookings = await bookingService.getBookings(req.user as TPayloadUser);
  if (bookings.length === 0) {
    return sendResponse(res, httpStatus.NOT_FOUND, 'No Data found', bookings, false);
  }
  const message = req.user.role === 'admin' ? 'All bookings retrieved successfully' : 'User bookings retrieved successfully';
  return sendResponse(res, httpStatus.OK, message, bookings);
});

export const bookingController = {
  bookService,
  getBookings,
};
