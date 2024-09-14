import type {ZodError, ZodIssue} from 'zod';
import type {TErrorObject, TReturnError} from './error.types';
import httpStatus from 'http-status';

const handleZodError = (err: ZodError): TReturnError => {
  return {
    code: httpStatus.BAD_REQUEST,
    message: err.name,
    details: err.issues.map((issue: ZodIssue): TErrorObject => {
      return {
        path: issue.path.join(' --> '),
        message: issue.message,
      };
    }),
  };
};

export default handleZodError;
