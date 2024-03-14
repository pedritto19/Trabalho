// services/PokemonService.ts

import { PrismaClient } from "@prisma/client";
import prisma from "../prisma";
import prismaClient from "../prisma";

export class showpokemonservice {
    async listAll() {
        const showpokemon = await prismaClient.pokemon.findMany({

        })
        return showpokemon;
    }
}