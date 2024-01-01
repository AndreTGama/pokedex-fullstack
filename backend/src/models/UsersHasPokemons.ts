import { IPokemons } from './Pokemons';
import { IUsers } from './Users';

export interface IUsersHasPokemons {
    id: string;
    usersId: string;
    pokemonId: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
    Users?: IUsers[];
    Pokemons?: IPokemons[];
}