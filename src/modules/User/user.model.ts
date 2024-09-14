import bcrypt from 'bcrypt';
import config from '../../config';
import {model, Schema} from 'mongoose';
import type {TUser} from '../Auth/auth.types';

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      index: true,
      required: true,
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  const user = this as TUser;
  user.password = await bcrypt.hash(user.password, config.bcryptSaltRounds);
  next();
});

const UserModel = model<TUser>('User', userSchema);

export default UserModel;
