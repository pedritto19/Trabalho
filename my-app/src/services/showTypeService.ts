// services/PokemonService.ts

import prismaClient from "../prisma";

export class showTypeService {
    async listypes() {
        const showtype = await prismaClient.type.findMany({

        })
        return showtype;
    }
    
}