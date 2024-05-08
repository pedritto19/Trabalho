import prismaClient from "../prisma";

export class showTypeService {
    async listAlltype() {
        const showtype = await prismaClient.types.findMany({

        })
        return showtype;
    }
}