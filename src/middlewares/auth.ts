import config from '../config';
import AppError from '../errors/AppError';
import UserModel from '../modules/User/user.model';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import type { TUserRole } from '../modules/User/user.types';
import { catchAsync } from '../utils';
import httpStatus from 'http-status';

const auth = (...requiredRoles: Array<TUserRole>) =>
  catchAsync(async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }
    const decoded = jwt.verify(token, config.jwtAccessSecret) as JwtPayload;
    const user = await UserModel.findOne({ email: decoded.email });
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    if (requiredRoles.length && !requiredRoles.includes(decoded?.role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }
    req.user = decoded;
    next();
  });

export default auth;
