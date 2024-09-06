import {Router} from 'express';
import {authRoutes} from '../modules/Auth/auth.route';
import { serviceRoutes } from '../modules/Service/service.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    entry: authRoutes,
  },
  {
    path: '/services',
    entry: serviceRoutes,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.entry));

export default router;
