import prismaClient from "../prisma";


interface CreatepkmProps{
    name: string;
    type:string;
    imag: string;
}

class Createpkmserver{
    async execute({name,type,imag}: CreatepkmProps){
        if (!name || !type || !imag){
            throw new Error("Preencha tudo")
        }
        const pkm = await prismaClient.pokemon.create({
            data:{
            name,
            type,
            imag,
            
            }
        })
        return{pkm}
    }
    
}

export { Createpkmserver}