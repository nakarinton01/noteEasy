import { Request, ResponseToolkit } from "@hapi/hapi";
import Customers from '../models/customers'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async ( request: Request, h: ResponseToolkit ) => {
  try {
    let customer = new Customers(request.payload)
    let customers = await Customers.findOne({ username: customer.username })
    if (customers) throw new Error('username is already')
    await customer.save()
    return {
      success: true,
      result: 'registy success'
    }
  } catch (error: any) {
    console.log(error)
    return {
      success: false,
      message: error.message
    }
  }
};

export const login = async ( request: Request, h: ResponseToolkit ) => {
  try {
    let customer = new Customers(request.payload)
    // let username = customer.username
    let password : any = customer.password
    let customers = await Customers.findOne({ username: customer.username })
    if (!customers) throw new Error('login fail')
    let hashPassword : any = customers!.password
    let checkPassword = await bcrypt.compare(password, hashPassword)
    if (!checkPassword) throw new Error('login fail')
    let JWT_KEY : any = process.env.JWT_KEY
    const token = jwt.sign({ _id: customers._id, fullName: customers.fullName, username: customer.username }, JWT_KEY)
    // console.log(request.auth.credentials);
    
    return {
      success: true,
      result: 'login success',
      token
    }
    
  } catch (error: any) {
    console.log(error)
    return {
      success: false,
      message: error.message
    }
  }
}