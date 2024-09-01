import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import type { TUSER } from "./user.types";
import config from "../../config";

const userSchema = new Schema<TUSER>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
},
  {
    timestamps: true
  }
)

userSchema.pre('save', async function (next) {
  const user = this as TUSER;
  user.password = await bcrypt.hash(user.password, config.bcryptSaltRounds);
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});


const UserModel = model<TUSER>('User', userSchema)

export default UserModel;
