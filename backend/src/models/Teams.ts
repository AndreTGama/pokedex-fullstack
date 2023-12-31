import { IPokemons } from './Pokemons';
import { ITeamsHasPokemons } from './TeamsHasPokemons';

export interface ITeams {
  id: string;
  name:string;
  teamsHasPokemons?: ITeamsHasPokemons[];
  Pokemon?: IPokemons[];
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}