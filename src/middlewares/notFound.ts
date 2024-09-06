import config from '../config';
import httpStatus from 'http-status';
import type {RequestHandler} from 'express';
import {getCurrentDateTime} from '../utils';
const notFound: RequestHandler = (req, res) => {
  return res.status(httpStatus.NOT_FOUND).json({
    status: 'error',
    message: 'Resource not found',
    timestamp: getCurrentDateTime(),
    ...(config.nodeEnv !== 'production'
      ? {
          debugInfo: {
            method: req.method ?? 'no method provided',
            url: req.url ?? 'no url provided',
          },
        }
      : {}),
  });
};

export default notFound;
