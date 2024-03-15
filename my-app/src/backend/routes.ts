import { showpkm } from './../controller/showpkm';

import {FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply} from "fastify"
import cors from '@fastify/cors'
import { Createpkmcontroler } from "../controller/Createpkmcontroler";
import { DeletePokemonService } from '../services/DeletePokemonService';




export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions){
    interface Params {
        id: string; // Assumindo que o id é uma string, ajuste conforme necessário
      }
    

    fastify.get("/teste", async (request: FastifyRequest, reply:FastifyReply) =>{
        return{ok: true};
    })
    fastify.post("/pkm", async (request: FastifyRequest, reply: FastifyReply ) => {
        return new Createpkmcontroler().handle(request,reply)
    })
    fastify.get("/pokemons", async (request: FastifyRequest, reply: FastifyReply) => {
        const listPokemonsController = new showpkm();
        return listPokemonsController.handle(request, reply);
    });
    fastify.delete("/pokemons/:id", async (request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) => {
        try {
            // Extrai o ID do Pokémon da URL
            const { id } = request.params;
    
            // Instancia o serviço responsável por deletar o Pokémon
            const deletePokemonService = new DeletePokemonService();
            
            // Chama o método de deletar, passando o ID
            await deletePokemonService.deleteById(id);
    
            // Retorna uma resposta indicando sucesso
            reply.code(200).send({ message: "Pokémon deletado com sucesso!" });
        } catch (error) {
            // Em caso de erro, retorna uma resposta de erro
            reply.code(500).send({ error: "Erro ao deletar o Pokémon" });
        }
    });
}