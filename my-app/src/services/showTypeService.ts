import prismaClient from "../prisma";

export class showTypeService {
    async listAlltype() {
        const showtype = await prismaClient.types.findMany({
            select: {
                name: true // Isso indica ao Prisma que apenas o campo 'name' deve ser retornado
            }
        });
        return showtype;
    }
}