import prismaClient from "../prisma";

export class showTypeService {
  async listypes() {
    try {
      const types = await prismaClient.type.findMany();
      return types;
    } catch (error) {
      console.error("Error listing types:", error);
      throw error; // Relançar o erro para ser tratado pelo Fastify
    }
  }
}