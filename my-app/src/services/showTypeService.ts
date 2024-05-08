// services/PokemonService.ts
import prismaClient from "../prisma";

export class showTypeService {
  async listAlltype() {
    try {
      console.log(prismaClient); // Deve mostrar o objeto PrismaClient
      console.log(prismaClient.type); // Deve mostrar o modelo Type, não deve ser undefined
      const types = await prismaClient.type.findMany();
      return types;
    } catch (error) {
      console.error("Error listing types:", error);
      throw error;
    }
  }
}