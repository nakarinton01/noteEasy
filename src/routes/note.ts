import { Server } from "@hapi/hapi";
import { create} from "../controllers/note";
// import jwt from "../middleware/jwtDecode";

export const note = (server: Server) => {
  server.route({
    method: 'post', path: '/note/', options: { auth: 'jwt' }, handler: create
  });
  // server.route({
  //   method: 'post', path: '/login', handler: { }
  // });
  // server.route({
  //   method: 'post', path: '/login', options: { auth: 'jwt' }, handler: login
  // });
}