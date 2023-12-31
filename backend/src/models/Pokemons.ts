import { ITeams } from './Teams';

export interface IPokemons {
    id: string;
    name: string;
    img: string;
    created_at?: Date;
    updated_at?: Date;
    Teams?: ITeams[];
}