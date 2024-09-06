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

serviceSchema.pre('find', function (next) {
  this.find({isDeleted: {$ne: true}});
  next();
});

serviceSchema.pre('findOne', function (next) {
  this.find({isDeleted: {$ne: true}});
  next();
});

const ServiceModel = model<TService>('Service', serviceSchema);

export default ServiceModel;
