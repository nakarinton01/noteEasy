import { Server } from "@hapi/hapi";

export const users = (server: Server) => {
  server.route({
    method: 'GET', path: '/', handler: () => {
      return 'hello world'
    }
  })
}