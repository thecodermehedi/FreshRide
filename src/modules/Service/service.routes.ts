import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import {createRouter} from '../../utils';
import {slotController} from '../Slot/slot.controller';
import {slotValidations} from '../Slot/slot.validator';
import {USER_ROLE} from '../User/user.constant';
import {serviceController} from './service.controller';
import {serviceValidations} from './service.validator';

const router = createRouter();

router.get('/', serviceController.getServices);
router.get('/:id', serviceController.getService);
router.post(
  '/',
  auth(USER_ROLE.ADMIN),
  validateRequest(serviceValidations.createServiceValidationSchema),
  serviceController.createService,
);
router.post(
  '/slots',
  auth(USER_ROLE.ADMIN),
  validateRequest(slotValidations.createSlotValidationSchema),
  slotController.createSlots,
);
router.put(
  '/:id',
  auth(USER_ROLE.ADMIN),
  validateRequest(serviceValidations.updateServiceValidationSchema),
  serviceController.updateService,
);
router.delete('/:id', auth(USER_ROLE.ADMIN), serviceController.deleteService);

export const serviceRoutes = router;
