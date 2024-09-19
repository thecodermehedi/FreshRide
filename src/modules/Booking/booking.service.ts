/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import ServiceModel from '../Service/service.model';
import UserModel from '../User/user.model';
import type {TBooking} from './booking.type';
import mongoose from 'mongoose';
import BookingModel from './booking.model';
import SlotModel from '../Slot/slot.model';
import type {JwtPayload} from 'jsonwebtoken';

const bookService = async (bookingData: TBooking, bookingUser: JwtPayload) => {
  const customer = await UserModel.findOne({
    email: bookingUser?.email,
    role: bookingUser?.role,
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
  bookingSession.startTransaction();

  try {
    const newBookingData = {...bookingData, customer: customer._id};
    const [booking] = await BookingModel.create([newBookingData], {
      session: bookingSession,
    });
    await slot.updateOne({isBooked: 'booked'}, {session: bookingSession});
    const result = await BookingModel.findById(booking._id, '-__v')
      .populate({
        path: 'customer',
        model: 'User',
        select: '-role -createdAt -updatedAt -__v',
      })
      .populate({
        path: 'serviceId',
        select: '-createdAt -updatedAt -__v',
      })
      .populate({
        path: 'slotId',
        select: '-createdAt -updatedAt -__v',
      })
      .session(bookingSession);

    await bookingSession.commitTransaction();
    return result;
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

const getBookings = async (bookingUser: JwtPayload) => {
  try {
    const customer = await UserModel.findOne({
      email: bookingUser?.email,
      role: bookingUser?.role,
    });
    if (!customer) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    if (bookingUser.role === 'admin') {
      return await BookingModel.find()
        .select('-__v')
        .populate({
          path: 'customer',
          model: 'User',
          select: '-role -createdAt -updatedAt -__v',
        })
        .populate({
          path: 'serviceId',
          select: '-createdAt -updatedAt -__v',
        })
        .populate({
          path: 'slotId',
          select: '-createdAt -updatedAt -__v',
        });
    } else {
      return await BookingModel.find(
        {customer: customer._id},
        {
          customer: 0,
          __v: 0,
        },
      )
        .populate({
          path: 'serviceId',
          select: '-createdAt -updatedAt -__v',
        })
        .populate({
          path: 'slotId',
          select: '-createdAt -updatedAt -__v',
        });
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
