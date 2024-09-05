import { Router as createRouter, type NextFunction, type RequestHandler, type Request, type Response } from 'express';
import type { AnyZodObject } from 'zod';

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => next(error));
  };
};

const validateRequest = (schema: AnyZodObject): RequestHandler => {
  return catchAsync(async (req, res, next) => {
    await schema.parseAsync({ body: req.body, cookies: req.cookies });
    next()
  })
}

export { createRouter, catchAsync, validateRequest };
