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

  private static async getDescription(url: string): Promise<string>{
    const speciesResponse = await axios.get(url);
    const speciesData = speciesResponse.data;
    
    return speciesData.flavor_text_entries[0].flavor_text ?? 'Pokémon sem descrição';
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

  static async pokemonList({limit = 25, offset = 0, name, type}: IPagePokemon): Promise<IListPokemonAPI> {
    
    if(type){
      const {count, pokemons} = await Pokemon.pokemonByType({type, limit, offset, name});
      const list = await Pokemon.moreInfo(pokemons);
      return {
        count,
        pokemons: list
      }
    } else if(name) {
      const pokemon = await Pokemon.pokemonByName(name);

      return {
        count: 1,
        pokemons: [pokemon]
      };
    }

    const { data } = await apiPoke.get(`/pokemon?limit=${limit}&offset=${offset}`);

    if (!data.results) throw new ApiError('Erro ao encontrar lista dos pokémons');

    const results = data.results;

    const list = await Pokemon.moreInfo(results);

    return {
      count: data.count,
      pokemons: list
    };
  }

  static async getPokemonById(id: number) : Promise<IListPokemon>  {
    try {
      const { data } = await apiPoke.get(`/pokemon/${id}`);
      if (!data)
        throw new ApiError('Erro ao Pokémon');

      const evolutions = await Pokemon.getEvolution(data.species.url);
      const description = await Pokemon.getDescription(data.species.url);
      
      const pokemon = { 
        id: data.id,
        name: data.name,
        img: data.sprites.front_default,
        evolutions: evolutions,
        types: data.types.map((type: IType) => type.type.name),
        weight: data.weight,
        height: data.height,
        description: description
      };

      return pokemon;
      
    } catch (error) {
      throw new ApiError('Pokémon não encontrado', 404);
    }
    
  }

  static async pokemonByName(name: string): Promise<IListPokemon> {
    try {
      const { data } = await apiPoke.get(`/pokemon/${name}`);
  
      if (!data)
        throw new ApiError('Pokémon não encontrado', 404);
    
      return {
        id: data.id,
        name: data.name,
        img: data.sprites.front_default,
        types: data.types.map((type: IType) => type.type.name),
        weight: data.weight,
        height: data.height,
      }
      
    } catch (error) {
      throw new ApiError('Pokémon não encontrado', 404);
    }
  }

  static async pokemonByType({ type, limit, offset, name }: IPagePokemon): Promise<IListPokemonType> {
    try {
      const list = [];
      const { data } = await apiPoke.get(`/type/${type}`);
  
      if (!data.pokemon)
        throw new ApiError('Tipo não encontrado', 404);
  
      for (const item of data.pokemon) {
        if (!name || (name && name === item.pokemon.name)) {
          list.push({
            name: item.pokemon.name,
            url: item.pokemon.url
          });
        }
      }
  
      if (list.length === 0)
        throw new ApiError('Pokémon não encontrado', 404);
  
      const count = list.length;
      const startIndex = offset;
      const endIndex = offset + limit;
      const pokemons = list.slice(startIndex, endIndex);
  
      return {count, pokemons};
    } catch (error) {
      throw new ApiError('Erro ao encontrar Pokémon', 404);
    }
  }
}