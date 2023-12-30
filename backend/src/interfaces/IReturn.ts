import { IListPokemon } from './IPokemon';

export interface IReturnApi {
    message?: string | null;
    data?: object | null;
    status?: number;
}

export interface IList {
    name: string,
    url: string
}

export interface IListPokemonAPI {
    count: number,
    pokemons: IListPokemon[]
}