import { showpkm } from './../controller/showpkm';

import {FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply} from "fastify"
import cors from '@fastify/cors'
import { Createpkmcontroler } from "../controller/Createpkmcontroler";
import { DeletePokemonService } from '../services/DeletePokemonService';
import { PokemonController } from '../controller/PokemonController';
import { PokemonService } from '../services/PokemonService';




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


    fastify.put('/pokemonsup/:id', async (request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) => {
        
        const {id} = request.params; // Obtém o ID do Pokémon a ser atualizado.
        const data = request.body; // Dados enviados através do formulário.
    
        // Instancia o serviço responsável pela lógica de negócio.
        const pokemonService = new PokemonService();
    
        try {
            // Chama o método de atualização e passa o ID e os dados recebidos.
            const updatedPokemon = await pokemonService.updatePokemon(id, data);
    
            // Retorna o Pokémon atualizado.
            reply.send(updatedPokemon);
        } catch (error: any) {
            // Em caso de erro, retorna uma resposta com status 400 e a mensagem de erro.
            reply.status(400).send({ error: error.message });
        }
    });
}