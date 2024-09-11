import auth from '../../middlewares/auth';
import {createRouter} from '../../utils';
import {USER_ROLE} from '../User/user.constant';

const router = createRouter();

router.post('/', auth(USER_ROLE.USER));

router.get('/', auth(USER_ROLE.ADMIN));

router.get('/my-bookings', auth(USER_ROLE.USER));

export const bookingRoutes = router;
