import {Router} from 'express';
import {authRoutes} from '../modules/Auth/auth.route';
import {serviceRoutes} from '../modules/Service/service.routes';
import {slotRoutes} from '../modules/Slot/slot.routes';
import {bookingRoutes} from '../modules/Booking/booking.routes';
import auth from '../middlewares/auth';
import {USER_ROLE} from '../modules/User/user.constant';
import {bookingController} from '../modules/Booking/booking.controller';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    entry: authRoutes,
  },
  {
    path: '/services',
    entry: serviceRoutes,
  },
  {
    path: '/slots',
    entry: slotRoutes,
  },
  {
    path: '/bookings',
    entry: bookingRoutes,
  },
  {
    path: '/my-bookings',
    entry: router.get('/', auth(USER_ROLE.USER), bookingController.getBookings),
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.entry));

export default router;
