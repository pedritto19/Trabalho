import { FastifyRequest, FastifyReply } from "fastify";
import { Createpkmserver } from "../services/Createpkmserver";

class Createpkmcontroler{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const{name,type,type1,imag} = request.body as {name: string, type: string,type1: string, imag: string};
        console.log(name);
        console.log(type);
        console.log(type1);
        console.log(imag);


        const pkmService = new Createpkmserver()
        const pkm = await pkmService.execute({name,type,type1,imag});

        reply.send(pkm)
    }
}

export {Createpkmcontroler}