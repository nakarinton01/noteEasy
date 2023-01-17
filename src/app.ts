'use strict';

const Hapi = require('@hapi/hapi');
import { users } from "./routes/user";

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    users(server)

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();