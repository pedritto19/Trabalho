import prismaClient from "../prisma";

export class PokemonService {


    async updatePokemon(id: string, data: any) {
        const updatedPokemon = await prismaClient.pokemon.update({
            where: { id },
            data: {
                name: data.name,
                type: data.type,
                type1: data.type1,
                imag: data.imag,
            },
        });
        return updatedPokemon;
    }
}