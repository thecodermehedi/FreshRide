import {
  Router as createRouter,
  type NextFunction,
  type RequestHandler,
  type Request,
  type Response,
} from 'express';

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => next(error));
  };
};

const getCurrentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};

const sendResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data?: unknown,
  success: boolean = true,
) => {
  res.json({
    success,
    statusCode,
    message,
    data,
  });
};

export {createRouter, catchAsync, getCurrentDateTime, sendResponse};
