import prisma from "../prisma";

export class showTypeService {
    async listAlltype() {
        const showtype = await prisma.types.findMany({

        })
        return showtype;
    }
}