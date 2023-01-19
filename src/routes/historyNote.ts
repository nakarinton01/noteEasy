import { Server } from "@hapi/hapi";
import { getHistory, recovery } from "../controllers/historyNote";
// import jwt from "../middleware/jwtDecode";

export const historyNote = (server: Server) => {
  server.route({
    method: 'get', path: '/historyNote/', options: { auth: 'jwt' }, handler: getHistory
  });
  server.route({
    method: 'get', path: '/historyNote/{_id}', options: { auth: 'jwt' }, handler: recovery
  });
}