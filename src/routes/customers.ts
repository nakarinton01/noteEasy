import { Server } from "@hapi/hapi";
import { register, login } from "../controllers/customers";
// import jwt from "../middleware/jwtDecode";

export const customers = (server: Server) => {
  server.route({
    method: 'post', path: '/register', handler: register
  });
  server.route({
    method: 'post', path: '/login', handler: login
  });
  // server.route({
  //   method: 'post', path: '/login', options: { auth: 'jwt' }, handler: login
  // });
}