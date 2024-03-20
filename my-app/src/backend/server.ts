import Fastify from 'fastify';
import cors from '@fastify/cors';
import { routes} from './routes'
import React from 'react';
import ReactDOM  from 'react-dom';
import App from '../App';



const app= Fastify({ logger: true})


const start= async() =>{
    
    


    await app.register(cors);
    await app.register(routes);
    
    

    try {
        await app.listen({ port: 3333, host: '0.0.0.0' });    
        // Adicionando host: '0.0.0.0' faz com que o servidor aceite conexões em todos os endereços IPv4.
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}


start();