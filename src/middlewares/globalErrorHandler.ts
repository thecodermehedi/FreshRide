import config from '../config';
import {ZodError} from 'zod';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
// import type {TErrorObject} from '../errors/error.types';
import type {ErrorRequestHandler} from 'express';
// import {getCurrentDateTime} from '../utils';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let errorCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  let errorMessage: string = 'Something went wrong';
  // let errorDetails: Array<TErrorObject> = [
    // {path: '', message: 'Something went wrong'},
  // ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    errorCode = simplifiedError.code;
    errorMessage =
      config.nodeEnv !== 'production'
        ? simplifiedError.message
        : 'Validation Error';
    // errorDetails = simplifiedError.details;
  }

  if (err.name === 'ValidationError') {
    const shortError = handleValidationError(err);
    errorCode = shortError.code;
    errorMessage =
      config.nodeEnv === 'production' ? shortError.message : err.message;
    // errorDetails = shortError.details;
  }

  if (err.name === 'CastError') {
    const shortError = handleCastError(err);
    errorCode = shortError.code;
    errorMessage =
      config.nodeEnv !== 'production'
        ? shortError.message
        : `Invalid ${err.kind} Error`;
    // errorDetails = shortError.details;
  }

  if (err.code === 11000) {
    const shortError = handleDuplicateError(err);
    errorCode = shortError.code;
    errorMessage =
      config.nodeEnv !== 'production'
        ? shortError.message
        : 'Duplicate Key Error';
    // errorDetails = shortError.details;
  }

  if (err instanceof AppError) {
    errorCode = err.code;
    errorMessage = err.message;
    // errorDetails = [{path: err.path, message: err.message}];
  }

  if (err instanceof Error) {
    errorMessage = err.message;
    // errorDetails = [{path: '', message: err.message}];
  }

  res.status(errorCode).json({
    success: false,
    statusCode: errorCode,
    message: errorMessage,
    // ...(config.nodeEnv !== 'production' ? {details: errorDetails} : {}),
    // timestamp: getCurrentDateTime(),
    // ...(config.nodeEnv !== 'production'
    //   ? {
    //       debugInfo: {
    //         method: req.method ?? 'no method provided',
    //         url: req.url ?? 'no url provided',
    //         stack: err.stack ?? 'no stack provided',
    //       },
    //     }
    //   : {}),
  });

  next(err);
};

export default globalErrorHandler;
