import { IPokemons } from './Pokemons';
import { ITeams } from './Teams';

export interface ITeamsHasPokemons {
    id: string;
    teamsId: string;
    pokemonId: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
    Teams?: ITeams[];
    Pokemon?: IPokemons[];
}