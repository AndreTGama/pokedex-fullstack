import { IPokemons } from './Pokemons';
import { IUsersHasPokemons } from './UsersHasPokemons';

export interface IUsers {
  id: string;
  name:string;
  password?: string;
  userHasPokemons?: IUsersHasPokemons[];
  Pokemon?: IPokemons[];
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}