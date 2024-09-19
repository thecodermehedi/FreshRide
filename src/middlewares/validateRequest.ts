import type {RequestHandler} from 'express';
import type {AnyZodObject} from 'zod';
import {catchAsync} from '../utils';

const validateRequest = (schema: AnyZodObject): RequestHandler => {
  return catchAsync(async (req, _res, next) => {
    await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
      params: req.params,
      query: req.query,
      user: req.user,
    });
    next();
  });
};

export default validateRequest;
