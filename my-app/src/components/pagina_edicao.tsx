import React, { ChangeEvent, FormEvent, useState } from 'react';
import Input from './input';
import "./Header/styles.css";
import { useNavigate } from 'react-router-dom';
import confirm from './images/confirm.png'
import seta from './images/seta.png'
import styled from 'styled-components';
import edicao from './images/edicao.png';
import home from './images/home.png';
import prisma from '../prisma/index';
import { Createpkmserver } from '../services/Createpkmserver';
import { api } from '../services/api';
import { useEffect} from 'react';
import App from '../App';
import {FaTrash} from 'react-icons/fa';
import Modal from 'react-modal';
import PokemonList from './modaldelete';
import fechar from './images/fechar.png';
import editar from './images/editar.png';


const TextoElegante = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  color: #000000;
  line-height: 1.6;
  text-align: center;
  letter-spacing: 0.5px;
`;

const Edicao: React.FC = () => {
    interface pokemons {
        id: string;
        name: string;
        imag: string; 
        type: string; 
      }
    
    
      const [pokemons, setPokemons] = useState([]);
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [selectedPokemon, setSelectedPokemon] = useState(true);



    
      // Efeito para carregar os Pokémon quando o componente for montado
      useEffect(() => {
        const fetchPokemons = async () => {
          const response = await api.get('/pokemons');
          setPokemons(response.data); // Supondo que a resposta da API seja o array de Pokémon
        };
    
        fetchPokemons();
      }, []);





    let isEditingPage=true;

    const openModal = (pokemons: any) => {
        setSelectedPokemon(pokemons);
        setIsModalOpen(true);
      };




    function handleClickback() {
        navigate('/pagina_cadastro'); // Substitua isso pelo seu caminho desejado
      }
      function handleClickhome() {
        navigate('/'); // Substitua isso pelo seu caminho desejado
      }
    let navigate = useNavigate();


return (
    <div style={{ textAlign: 'center' }} className="container align-self-center d-flex justify-content-center" id="header">
    <h3><TextoElegante>Tela de Edicao</TextoElegante></h3>
    <p><TextoElegante></TextoElegante></p>
    <button id="meuBotao"  onClick={handleClickback}>
          <img src={seta} style={{ width: '40px', height: 'auto'}} />
        </button>
        <button id="meuBotao"  onClick={handleClickhome}>
          <img src={home} style={{ width: '30px', height: 'auto'}} />
        </button>
        <button id="meuBotao"  onClick={() => setIsModalOpen(true)} ><img src={editar} style={{ width: '30px', height: 'auto'}} /></button><h3> {pokemons.type}</h3>
    <Modal
        isOpen={isModalOpen} // Passa a propriedade isOpen
        onRequestClose={() => setIsModalOpen(false)} // Opcional: Função para fechar o modal
      >
        {/* Conteúdo do Modal aqui */}
        <button id="meuBotao" onClick={() => setIsModalOpen(false)}><img src={fechar} style={{ width: '30px', height: 'auto'}} /></button>
        <PokemonList></PokemonList>
        <button id="meuBotao" onClick={() => setIsModalOpen(false)}><img src={seta} style={{ width: '50px', height: 'auto'}} /></button>
      </Modal>


    
  </div>
)

}

export default Edicao


