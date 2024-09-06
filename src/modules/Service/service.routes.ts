import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import {createRouter} from '../../utils';
import {serviceController} from './service.controller';
import {serviceValidator} from './service.validator';

const router = createRouter();

router.get('/', serviceController.getServices);
router.get('/:id', serviceController.getService);
router.post(
  '/',
  auth('admin'),
  validateRequest(serviceValidator.createServiceValidationSchema),
  serviceController.createService,
);
router.put(
  '/:id',
  auth('admin'),
  validateRequest(serviceValidator.updateServiceValidationSchema),
  serviceController.updateService,
);
router.delete('/:id', auth('admin'), serviceController.deleteService);

export const serviceRoutes = router;
