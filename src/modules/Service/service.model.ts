import {model, Schema} from 'mongoose';
import type {TService} from './service.types';

const serviceSchema = new Schema<TService>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Pre-hook for the 'find' operation
serviceSchema.pre('find', function (next) {
  // Exclude deleted documents from the query
  this.where({isDeleted: {$ne: true}});
  next();
});

// Pre-hook for the 'findOne' operation
serviceSchema.pre('findOne', function (next) {
  // Exclude deleted documents from the query
  this.where({isDeleted: {$ne: true}});
  next();
});

const ServiceModel = model<TService>('Service', serviceSchema);

export default ServiceModel;
