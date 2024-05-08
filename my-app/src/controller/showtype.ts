import { FastifyRequest, FastifyReply } from "fastify";
import { showTypeService } from "../services/showTypeService";

export class showtype{
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const typeService = new showTypeService();
        const types = await typeService.listAlltype();
        return reply.send(types);
    }
}