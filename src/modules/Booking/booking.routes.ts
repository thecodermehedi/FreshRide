import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import {createRouter} from '../../utils';
import {USER_ROLE} from '../User/user.constant';
import {bookingController} from './booking.controller';
import { bookingValidations } from './booking.validator';

const router = createRouter();

router.post('/', auth(USER_ROLE.USER), validateRequest(bookingValidations.createBookingValidationSchema), bookingController.bookService);

router.get('/', auth(USER_ROLE.ADMIN), bookingController.getBookings);


export const bookingRoutes = router;
