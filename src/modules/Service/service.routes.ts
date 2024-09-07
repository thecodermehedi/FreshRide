import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import {createRouter} from '../../utils';
import {USER_ROLE} from '../User/user.constant';
import {serviceController} from './service.controller';
import {serviceValidator} from './service.validator';

const router = createRouter();

router.get('/', serviceController.getServices);
router.get('/:id', serviceController.getService);
router.post(
  '/',
  auth(USER_ROLE.ADMIN),
  validateRequest(serviceValidator.createServiceValidationSchema),
  serviceController.createService,
);
router.put(
  '/:id',
  auth(USER_ROLE.ADMIN),
  validateRequest(serviceValidator.updateServiceValidationSchema),
  serviceController.updateService,
);
router.delete('/:id', auth(USER_ROLE.ADMIN), serviceController.deleteService);

export const serviceRoutes = router;
