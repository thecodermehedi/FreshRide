import bcrypt from 'bcrypt';
import UserModel from "../User/user.model";
import type { TLogin, TUser } from "./auth.types";
import { createToken } from './auth.utils';
import config from '../../config';

const login = async (params: TLogin) => {

  // Check if user exists by querying the user with recieved email
  const userDetails = await UserModel.findOne({ email: params.email }).select('+password')
  const isUserExists = !!userDetails;
  if (!isUserExists) {
    //TODO: Handle Error from here
    throw { status: 404, message: 'User not found' };
  }

  // Check if the provide password is correct or not
  let isPasswordMatched: boolean = false;
  if (isUserExists && userDetails.password) {
    isPasswordMatched = await bcrypt.compare(params.password, userDetails.password);
  }
  if (!isPasswordMatched) {
    //TODO: Handle Error from here
    throw { status: 401, message: 'Invalid password' };
  }

  // Generate AccessToken with userdetails
  const payload = { email: userDetails.email, role: userDetails.role };
  const accessToken = createToken(payload, config.jwtAccessSecret, config.jwtAccessExpiresIn);
  const refreshToken = createToken(payload, config.jwtRefreshSecret, config.jwtRefreshExpiresIn)

  // Return Access Token, Refresh Token
  return { accessToken, refreshToken, data: userDetails }
}

const signup = async (params: TUser) => {
  
}


export const AuthServices = {
  login,
  signup
}
