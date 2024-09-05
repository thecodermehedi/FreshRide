import { Router } from "express";
import authRouter from "../modules/Auth/auth.routes";

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    // route: UserRoutes,
  },
  {
    path: '/auth',
    route: authRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
