// services/PokemonService.ts
import prismaClient from "../prisma";

export class showTypeService {
    async listAlltype() {
        const showtype = await prismaClient.types.findFirst({

        })
        return showtype;
    }
}