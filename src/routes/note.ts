import { Server } from "@hapi/hapi";
import { create, getNote, edit, del, category, cresteCategory } from "../controllers/note";
// import jwt from "../middleware/jwtDecode";

export const note = (server: Server) => {
  server.route({
    method: 'post', path: '/note/', options: { auth: 'jwt' }, handler: create
  });
  server.route({
    method: 'get', path: '/note/', options: { auth: 'jwt' }, handler: getNote
  });
  server.route({
    method: 'put', path: '/note/', options: { auth: 'jwt' }, handler: edit
  });
  
  server.route({
    method: 'delete', path: '/note/{_id}', options: { auth: 'jwt' }, handler: del
  });
  
  server.route({
    method: 'get', path: '/category/', options: { auth: 'jwt' }, handler: category
  });
  
  server.route({
    method: 'post', path: '/category/', options: { auth: 'jwt' }, handler: cresteCategory
  });
}