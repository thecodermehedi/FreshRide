import config from '../config';
import httpStatus from 'http-status';
import type {RequestHandler} from 'express';
import {getCurrentDateTime} from '../utils';

const notFound: RequestHandler = (req, res, next) => {
  const error = new Error('Not Found');
  res.status(httpStatus.NOT_FOUND);
  res.locals.error = error;
  res.locals.timestamp = getCurrentDateTime();

  if (config.nodeEnv !== 'production') {
    res.locals.debugInfo = {
      method: req.method ?? 'no method provided',
      url: req.url ?? 'no url provided',
    };
  }

  next(error);
};

export default notFound;
