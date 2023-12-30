import axios from 'axios';
import { ApiError } from '../../errors/ApiError';
import { IPagePokemon } from '../../interfaces/IPagenates';
import { IChains, IEvolution, IListPokemon, IType } from '../../interfaces/IPokemon';
import { apiPoke } from './apiPoke';
import { IList, IListPokemonAPI } from '../../interfaces/IReturn';

export class Pokemon {
  
  private static async getEvolution(url: string): Promise<IEvolution[]>{
    const evolutions: IEvolution[] = [];
    const speciesResponse = await axios.get(url);
    const speciesData = speciesResponse.data;
  
    const evolutionChainUrl = speciesData.evolution_chain.url;
    const evolutionChainResponse = await axios.get(evolutionChainUrl);
    const evolutionChainData = evolutionChainResponse.data;
  
    const fetchEvolutions = async (chainData: IChains) => {
      if (chainData.species) {
        const { data } = await apiPoke.get(`/pokemon/${chainData.species.name}`);
        const pokemonEvolution = {
          id: data.id,
          name: data.name,
          img: data.sprites.front_default,
        };
        evolutions.push(pokemonEvolution);
      }
  
      if (chainData.evolves_to && chainData.evolves_to.length > 0) {
        for (const evolvesTo of chainData.evolves_to) {
          await fetchEvolutions(evolvesTo);
        }
      }
    };
  
    await fetchEvolutions(evolutionChainData.chain);
    return evolutions;
  }

  private static async moreInfo(list: IList[]): Promise<IListPokemon[]> {
    const newList: IListPokemon[] = [];

    for (const item of list) {
      const { data } = await axios.get(item.url);
      newList.push(
        { 
          id: data.id,
          name: data.name,
          img: data.sprites.front_default,
          types: data.types.map((type: IType) => type.type.name),
          weight: data.weight,
          height: data.height,
        }
      );
    }

    return newList;
  }

  static async pokemonList({limit = 25, offset = 0}: IPagePokemon): Promise<IListPokemonAPI> {
    const { data } = await apiPoke.get(`/pokemon?limit=10000&offset=0`);

    if (!data.results) throw new ApiError('Erro ao encontrar lista dos pokémons');

    const results = data.results;

    const list = await Pokemon.moreInfo(results);

    return {
      count: data.count,
      pokemons: list
    };
  }

  static async getPokemon(id: number) /*: Promise<IListPokemon>*/  {
    const { data } = await apiPoke.get(`/pokemon/${id}`);
    console.log(data);
    // if (!data.results) throw new ApiError('Erro ao encontrar lista dos pokémons');

    // const results = data.results;

    // const list = await Pokemon.moreInfo(results);

    // return list;
  }
}