import type {RequestHandler} from 'express';
import {catchAsync, sendResponse} from '../../utils';
import {AuthServices} from './auth.service';
import config from '../../config';
import httpStatus from 'http-status';

const login: RequestHandler = catchAsync(async (req, res) => {
  const result = await AuthServices.login(req.body);
  res
    .cookie('refreshToken', result.refreshToken, {
      secure: config.nodeEnv === 'production',
      httpOnly: true,
    })
    .json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'User logged in successfully',
      token: result.accessToken,
      data: result.data,
    });
});

const signup: RequestHandler = catchAsync(async (req, res) => {
  const result = await AuthServices.signup(req.body);
  sendResponse(res, httpStatus.OK, 'User created successfully', result);
});

export const AuthControllers = {
  login,
  signup,
};
