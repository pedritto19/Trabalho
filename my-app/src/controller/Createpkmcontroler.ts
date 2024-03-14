import { FastifyRequest, FastifyReply } from "fastify";
import { Createpkmserver } from "../services/Createpkmserver";

class Createpkmcontroler{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const{name,type,imag} = request.body as {name: string, type: string, imag: string};
        console.log(name);
        console.log(type);
        console.log(imag);


        const pkmService = new Createpkmserver()
        const pkm = await pkmService.execute({name,type,imag});

        reply.send(pkm)
    }
}

export {Createpkmcontroler}