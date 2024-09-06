import type {RequestHandler} from 'express';
import type {AnyZodObject} from 'zod';
import {catchAsync} from '../utils';

const validateRequest = (schema: AnyZodObject): RequestHandler => {
  return catchAsync(async (req, res, next) => {
    await schema.parseAsync({body: req.body, cookies: req.cookies});
    next();
  });
};

export default validateRequest;
