import {createRouter} from '../../utils';

const authRouter = createRouter();

authRouter.post('/login');

authRouter.post('/signup');

export default authRouter;
