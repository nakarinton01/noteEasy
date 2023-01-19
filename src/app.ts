'use strict';

const Hapi = require('@hapi/hapi');
import './database'
import { customers } from "./routes/customers";
const HapiAuth = require('hapi-auth-jwt2');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
                headers: ['Authorization'],
            }
        }
    });

    await server.register([ { plugin: HapiAuth } ])
    server.auth.strategy('jwt', 'jwt', {
        key: process.env.JWT_KEY,
        validate: async function (decoded: any, request: any) {
            if(decoded) {
                request.auth.credentials = {
                    decoded
                }
                return { isValid: true }
            } else {
                return { isValid: false }
            }
        }
    })
    server.auth.default('jwt')

    customers(server)
    await server.start();
    console.log('Server running on %s', server.info.uri);

    // function validate(decoded: any, request: Request) {
    //     // console.log(decoded);
    //     if(decoded) {
    //         request.auth.credentials
    //         return { isValid: true }
    //     } else {
    //         return { isValid: false }
    //     }
    // }
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();