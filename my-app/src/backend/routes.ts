import { showpkm } from './../controller/showpkm';

import {FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply} from "fastify"
import cors from '@fastify/cors'
import { Createpkmcontroler } from "../controller/Createpkmcontroler";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions){

    fastify.get("/teste", async (request: FastifyRequest, reply:FastifyReply) =>{
        return{ok: true};
    })
    fastify.post("/pkm", async (request: FastifyRequest, reply: FastifyReply ) => {
        return new Createpkmcontroler().handle(request,reply)
    })
    fastify.get("/pokemons", async (request: FastifyRequest, reply: FastifyReply) => {
        const listPokemonsController = new showpkm();
        return listPokemonsController.handle(request, reply);
    });
}