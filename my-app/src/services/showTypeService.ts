// services/PokemonService.ts
import prismaClient from "../prisma";

export class showTypeService {
  async listAlltype() {
    try {
      console.log(prismaClient); // Verifica se o PrismaClient está definido
      console.log(prismaClient.pokemon); // Verifica se o modelo 'pokemon' é reconhecido
      const types = await prismaClient.type.findMany();
      return types;
    } catch (error) {
      console.error("Error listing types:", error);
      throw error;
    }
  }
}