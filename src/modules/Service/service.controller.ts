import type {RequestHandler} from 'express';
import {catchAsync} from '../../utils';
import {serviceService} from './service.service';
import httpStatus from 'http-status';

const createService: RequestHandler = catchAsync(async (req, res) => {
  const service = await serviceService.createService(req.body);
  res.json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service created successfully',
    data: service,
  });
});

const getServices: RequestHandler = catchAsync(async (req, res) => {
  const services = await serviceService.getServices();
  res.json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Services retrieved successfully',
    data: services,
  });
});

const getService: RequestHandler = catchAsync(async (req, res) => {
  const service = await serviceService.getService(req.params.id);
  res.json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service retrieved successfully',
    data: service,
  });
});

const updateService: RequestHandler = catchAsync(async (req, res) => {
  const service = await serviceService.updateService(req.params.id, req.body);
  res.json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service updated successfully',
    data: service,
  });
});

const deleteService: RequestHandler = catchAsync(async (req, res) => {
  const service = await serviceService.deleteService(req.params.id);
  res.json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service deleted successfully',
    data: service,
  });
});

export const serviceController = {
  createService,
  getServices,
  getService,
  updateService,
  deleteService,
};
