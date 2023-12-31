import axios from 'axios';
import { ApiError } from '../../errors/ApiError';
import { IPagePokemon } from '../../interfaces/IPaginates';
import { IChains, IEvolution, IListPokemon, IPokemonType, IType } from '../../interfaces/IPokemon';
import { apiPoke } from './apiPoke';
import { IList, IListPokemonAPI, IListPokemonType } from '../../interfaces/IReturn';

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

  static async pokemonList({ limit = 25, offset = 0, name, type }: IPagePokemon): Promise<IListPokemonAPI> {
    const getPokemonListDetails = async (results: any[]) => {
      const list = await Pokemon.moreInfo(results);
      return {
        count: results.length,
        pokemons: list,
      };
    };
  
    if (type) {
      const { pokemons } = await Pokemon.pokemonByType({ type, limit, offset, name });
      return getPokemonListDetails(pokemons);
    }
  
    if (name) {
      const pokemon = await Pokemon.pokemonByName(name);
      return {
        count: 1,
        pokemons: [pokemon],
      };
    }
  
    const { data } = await apiPoke.get(`/pokemon?limit=${limit}&offset=${offset}`);
  
    if (!data.results) throw new ApiError('Erro ao encontrar lista dos pokémons');
  
    const results = data.results;
    return getPokemonListDetails(results);
  }

  static async getPokemon(id: number) /*: Promise<IListPokemon>*/  {
    const { data } = await apiPoke.get(`/pokemon/${id}`);
    console.log(data);
    // if (!data.results) throw new ApiError('Erro ao encontrar lista dos pokémons');

    // const results = data.results;

    // const list = await Pokemon.moreInfo(results);

    // return list;
  }

  static async pokemonByName(name: string): Promise<IListPokemon> {
    try {
      const { data } = await apiPoke.get(`/pokemon/${name}`);
  
      if (!data)
        throw new ApiError('Pokémon não encontrado');
    
      return {
        id: data.id,
        name: data.name,
        img: data.sprites.front_default,
        types: data.types.map((type: IType) => type.type.name),
        weight: data.weight,
        height: data.height,
      }
      
    } catch (error) {
      throw error; 
    }
  }

  static async pokemonByType({ type, limit, offset, name }: IPagePokemon): Promise<IListPokemonType> {
    try {
      const list = [];
      const { data } = await apiPoke.get(`/type/${type}`);
  
      if (!data.pokemon)
        throw new ApiError('Tipo não encontrado');
  
      for (const item of data.pokemon) {
        if (!name || (name && name === item.pokemon.name)) {
          list.push({
            name: item.pokemon.name,
            url: item.pokemon.url
          });
        }
      }
  
      if (list.length === 0)
        throw new ApiError('Pokémon não encontrado');
  
      const count = list.length;
      const startIndex = offset;
      const endIndex = offset + limit;
      const pokemons = list.slice(startIndex, endIndex);
  
      return {count, pokemons};
    } catch (error) {
      throw error;
    }
  }
}