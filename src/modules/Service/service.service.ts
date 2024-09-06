import httpStatus from 'http-status';
import ServiceModel from './service.model';
import type {TService} from './service.types';

const createService = async (serviceData: TService) => {
  const serviceDetails = await ServiceModel.findOne({name: serviceData.name});
  const isServiceExist = !!serviceDetails;
  if (isServiceExist) {
    throw {
      status: httpStatus.CONFLICT,
      message: 'Service already exists',
    };
  }
  return await ServiceModel.create(serviceData);
};

const getServices = async () => {
  const services = await ServiceModel.find();
  if (!services) {
    throw {status: httpStatus.NOT_FOUND, message: 'Services not found'};
  }
  return services;
};

const getService = async (serviceId: string) => {
  const service = await ServiceModel.findById(serviceId);
  if (!service) {
    throw {status: httpStatus.NOT_FOUND, message: 'Service not found'};
  }
  return service;
};

const updateService = async (
  serviceId: string,
  serviceData: Partial<TService>,
) => {
  const service = await ServiceModel.findByIdAndUpdate(serviceId, serviceData, {
    new: true,
  });
  if (!service) {
    throw {status: httpStatus.NOT_FOUND, message: 'Service not found'};
  }
  return service;
};

const deleteService = async (serviceId: string) => {
  const service = await ServiceModel.findByIdAndUpdate(
    serviceId,
    {isDeleted: true},
    {new: true},
  );
  if (!service) {
    throw {status: httpStatus.NOT_FOUND, message: 'Service not found'};
  }
  return service;
};

export const serviceService = {
  createService,
  getServices,
  getService,
  updateService,
  deleteService,
};
