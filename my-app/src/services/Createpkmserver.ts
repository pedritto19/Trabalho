import prismaClient from "../prisma";


interface CreatepkmProps{
    name: string;
    type:string;
    type1: string;
    imag: string;
}

class Createpkmserver{
    async execute({name,type,type1,imag}: CreatepkmProps){
        if (!name || !type || !imag){
            throw new Error("Preencha tudo")
        }
        const pkm = await prismaClient.pokemon.create({
            data:{
            name,
            type,
            type1,
            imag,
            
            }
        })
        return{pkm}
    }
    
}

export { Createpkmserver}