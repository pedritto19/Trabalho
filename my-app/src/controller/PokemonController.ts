

import { FastifyRequest, FastifyReply } from 'fastify';
import { PokemonService } from '../services/PokemonService';

export class PokemonController {
    pokemonService: PokemonService;

    constructor() {
        this.pokemonService = new PokemonService();
    }

    async update(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as any;
        const result = await this.pokemonService.updatePokemon(id, request.body);
        return reply.send(result);
    }
}