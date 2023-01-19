import { Request, ResponseToolkit, Server } from "@hapi/hapi";
import jwt from 'jsonwebtoken'
const HapiAuth = require('hapi-auth-jwt2');

// export = async ( request: Request, h: ResponseToolkit, server: Server ) => {
//   try{
//     const token = request.headers.authorization
//     let spToken = token.split('Bearer ')[1]
//     // if(token) {
//     //   spToken = token.split('Bearer ')[1]
//     // } else {
//     //   throw new Error()
//     // }
//     let JWT_KEY : any = process.env.JWT_KEY
//     const decode = jwt.verify(spToken, JWT_KEY)
//     // server.decorate('toolkit', 'middleware', decode)
//     request.auth = decode

//   } catch (error: any) {
//     return {
//       success: false,
//       message: 'Auth fail'
//     }
//   }
// }
// exports.register = {

// }
// export const middleware = {
//   name: 'middleware',
//   register: async function (server: Server, request: Request) {
//     try{
//       const token = request.headers.authorization
//       let spToken = token.split('Bearer ')[1]
//       let JWT_KEY : any = process.env.JWT_KEY
//       const decode = jwt.verify(spToken, JWT_KEY)
//       // server.decorate('toolkit', 'middleware', decode)
//       server.expose('auth', decode)
//       console.log(server.plugins);
      
//     } catch (error: any) {
//       return {
//         success: false,
//         message: 'Auth fail'
//       }

//     }
//   }
// }

// export = async function (server: Server, request: Request) {
//   server.ext()
// }

exports.plugin = {
  name: 'myplugin',
  pkg: HapiAuth,
  register: (server: Server, options: any, err: any) => {
    if(err) {
      return err
    }
    server.auth.strategy('jwt', 'jwt', {
      key: process.env.JWT_KEY,
      validateFunc: validate
    })
    server.auth.default('jwt')
    function validate(decoded: any, request: any, callback: any) {
      console.log(decoded);
      if(decoded) {
        return true
      } else {
        return false
      }
      
    }
  }
}