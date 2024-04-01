import { FastifyRequest, FastifyReply } from "fastify";
import { showpokemonservice } from "../services/showpokemonservice";


export class showpkm{
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const pokemonService = new showpokemonservice();
        const pokemons = await pokemonService.listAll();
        return reply.send(pokemons);
    }
}