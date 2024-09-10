import { Router } from 'express';
import { authRoutes } from '../modules/Auth/auth.route';
import { serviceRoutes } from '../modules/Service/service.routes';
import { slotRoutes } from '../modules/Slot/slot.routes';

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
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.entry));

export default router;
