import Fastify from 'fastify';
import cors from '@fastify/cors';
import { routes} from './routes'
import React from 'react';
import ReactDOM  from 'react-dom';
import App from '../App';



const app= Fastify({ logger: true})


const start= async() =>{
    const cors = require('cors');

    
    
    


    await app.register(cors,{
        origin: 'https://trabalho-2-p875.onrender.com/'
    });
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