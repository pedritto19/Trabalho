import prismaClient from "../prisma";

export class DeletePokemonService {
    async deleteById(pokemonId: string) {
        const deletedPokemon = await prismaClient.pokemon.delete({
            where: {
                id: pokemonId,
            },
        });
        return deletedPokemon;
    }
}