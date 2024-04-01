// services/PokemonService.ts

import prismaClient from "../prisma";

export class showpokemonservice {
    async listAll() {
        const showpokemon = await prismaClient.pokemon.findMany({

        })
        return showpokemon;
    }
}