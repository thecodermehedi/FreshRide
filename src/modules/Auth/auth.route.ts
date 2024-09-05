import { createRouter, validateRequest } from '../../utils';
import { AuthControllers } from './auth.controller';
import { AuthValidations } from './auth.validator';

const authRouter = createRouter();

authRouter.post('/login', validateRequest(AuthValidations.loginValidationSchema), AuthControllers.login);

authRouter.post('/signup', validateRequest(AuthValidations.signupValidationSchema), AuthControllers.signup);

export const authRoutes = authRouter;
