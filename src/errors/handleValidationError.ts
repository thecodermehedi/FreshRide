import type mongoose from 'mongoose';
import type {TErrorObject, TReturnError} from './error.types';
import httpStatus from 'http-status';

type TMongooseError = mongoose.Error.ValidatorError | mongoose.Error.CastError;

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TReturnError => {
  return {
    code: httpStatus.BAD_REQUEST,
    message: 'Mongoose Error',
    details: Object.values(err.errors).map(
      (issue: TMongooseError): TErrorObject => {
        return {
          path: issue?.path,
          message: issue?.message,
        };
      },
    ),
  };
};

export default handleValidationError;
