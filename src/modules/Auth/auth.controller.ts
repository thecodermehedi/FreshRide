import type {RequestHandler} from 'express';
import {catchAsync} from '../../utils';
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
  res.json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'User created successfully',
    data: result,
  });
});

export const AuthControllers = {
  login,
  signup,
};
