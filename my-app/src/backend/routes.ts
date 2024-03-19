import { showpkm } from './../controller/showpkm';

import {FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply} from "fastify"
import cors from '@fastify/cors'
import { Createpkmcontroler } from "../controller/Createpkmcontroler";
import { DeletePokemonService } from '../services/DeletePokemonService';
import { PokemonController } from '../controller/PokemonController';
import { PokemonService } from '../services/PokemonService';




export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions){
    interface Params {
        id: string; 
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
            const { id } = request.params;
    
            const deletePokemonService = new DeletePokemonService();
            
            await deletePokemonService.deleteById(id);
    
            reply.code(200).send({ message: "Pokémon deletado com sucesso!" });
        } catch (error) {
            reply.code(500).send({ error: "Erro ao deletar o Pokémon" });
        }
    });


    fastify.put('/pokemonsup/:id', async (request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) => {
        
        const {id} = request.params; 
        const data = request.body; 
    
        const pokemonService = new PokemonService();
    
        try {
            const updatedPokemon = await pokemonService.updatePokemon(id, data);
    
            reply.send(updatedPokemon);
        } catch (error: any) {
            reply.status(400).send({ error: error.message });
        }
    });
}