import {Schema, model} from "mongoose";
import bcrypt from 'bcrypt'

export interface ICustomers {
  fullName: String,
  username: String,
  password: String,
  createdAt: Date
}

const CustomerModel = new Schema({
  fullName: { type: String },
  username: { type: String, unique: true },
  password: { type: String },
  createdAt: { type: Date, default: Date.now },
})

CustomerModel.pre<ICustomers>('save', async function(next) {
  const user : any = this
  const password : any = user.password
  if(!user.isModified('password')) { return next() }
  const hashPassword  = await bcrypt.hash(password, 10)
  user.password = hashPassword
  next()
})

export default model<ICustomers>('Customers', CustomerModel )