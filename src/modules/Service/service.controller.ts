import type {RequestHandler} from 'express';
import {catchAsync, sendResponse} from '../../utils';
import {serviceService} from './service.service';
import httpStatus from 'http-status';

const createService: RequestHandler = catchAsync(async (req, res) => {
  const service = await serviceService.createService(req.body);
  sendResponse(res, httpStatus.OK, 'Service created successfully', service);
});

const getServices: RequestHandler = catchAsync(async (_req, res) => {
  const services = await serviceService.getServices();
  if (services.length === 0) {
    return sendResponse(
      res,
      httpStatus.NOT_FOUND,
      'No Data found',
      services,
      false,
    );
  }
  return sendResponse(
    res,
    httpStatus.OK,
    'Services retrieved successfully',
    services,
  );
});

const getService: RequestHandler = catchAsync(async (req, res) => {
  const service = await serviceService.getService(req.params.id);
  sendResponse(res, httpStatus.OK, 'Service retrieved successfully', service);
});

const updateService: RequestHandler = catchAsync(async (req, res) => {
  const service = await serviceService.updateService(req.params.id, req.body);
  sendResponse(res, httpStatus.OK, 'Service updated successfully', service);
});

const deleteService: RequestHandler = catchAsync(async (req, res) => {
  const service = await serviceService.deleteService(req.params.id);
  sendResponse(res, httpStatus.OK, 'Service deleted successfully', service);
});

export const serviceController = {
  createService,
  getServices,
  getService,
  updateService,
  deleteService,
};
