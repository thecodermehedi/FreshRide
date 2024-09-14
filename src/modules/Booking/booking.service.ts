/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import ServiceModel from '../Service/service.model';
import UserModel from '../User/user.model';
import type {TBooking} from './booking.type';
import mongoose from 'mongoose';
import BookingModel from './booking.model';
import SlotModel from '../Slot/slot.model';

const bookService = async (
  bookingData: Partial<TBooking>,
  bookingUser: {email: string; role: string},
) => {
  const customer = await UserModel.findOne({
    email: bookingUser.email,
    role: bookingUser.role,
  });
  const isCustomerExist = !!customer;

  if (!isCustomerExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Customer not found');
  }

  const service = await ServiceModel.findById(bookingData.serviceId);
  const isServiceExist = !!service;

  if (!isServiceExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found');
  }

  const slot = await SlotModel.findById(bookingData.slotId);
  const isSlotExist = !!slot;
  if (!isSlotExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Slot not found');
  }
  const isSlotAvailable = slot.isBooked === 'available';

  if (!isSlotAvailable) {
    throw new AppError(httpStatus.NOT_FOUND, 'Slot not available');
  }

  const bookingSession = await mongoose.startSession();

  try {
    const newBookingData = {
      ...bookingData,
      customer: customer._id,
    };
    bookingSession.startTransaction();
    const [booking] = await BookingModel.create([newBookingData], {
      new: true,
      session: bookingSession,
    });
    await slot.updateOne({isBooked: 'booked'}).session(bookingSession);
    await bookingSession.commitTransaction();
    await BookingModel.findById(booking._id)
      .populate('customer')
      .populate('service')
      .populate('slot');
  } catch (error: any) {
    await bookingSession.abortTransaction();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message,
      'An error occurred while booking a slot',
    );
  } finally {
    bookingSession.endSession();
  }
};

const getBookings = async (bookingUser: {email: string; role: string}) => {
  try {
    const customer = await UserModel.findOne({
      email: bookingUser.email,
      role: bookingUser.role,
    });
    if (!customer) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    if (bookingUser.role === 'admin') {
      return await BookingModel.find()
        .populate('customer')
        .populate('service')
        .populate('slot');
    } else {
      return await BookingModel.find({customer: customer._id})
        .populate('customer')
        .populate('service')
        .populate('slot');
    }
  } catch (error: any) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message,
      'An error occurred while retrieving bookings',
    );
  }
};

export const bookingService = {
  bookService,
  getBookings,
};
