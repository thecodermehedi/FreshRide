import auth from '../../middlewares/auth';
import {createRouter} from '../../utils';
import {USER_ROLE} from '../User/user.constant';
import {bookingController} from './booking.controller';

const router = createRouter();

router.post('/', auth(USER_ROLE.USER), bookingController.bookService);

router.get('/', auth(USER_ROLE.ADMIN), bookingController.getBookings);

router.get('/my-bookings', auth(USER_ROLE.USER), bookingController.getBookings);

export const bookingRoutes = router;
