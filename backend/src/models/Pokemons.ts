import { IUsers } from './Users';

export interface IPokemons {
    id: string;
    name: string;
    img: string;
    created_at?: Date;
    updated_at?: Date;
    Users?: IUsers[];
    userHasPokemonId?: string;
}