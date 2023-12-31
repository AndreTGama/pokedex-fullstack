import { ICreateTeamsHasPokemonsDTO } from '../DTO/TeamsHasPokemons/ICreateTeamsHasPokemonsDTO';
import { IUpdateTeamsHasPokemonsDTO } from '../DTO/TeamsHasPokemons/IUpdateTeamsHasPokemonsDTO';
import { ITeamsHasPokemons } from '../models/TeamsHasPokemons';

export interface ITeamsHasPokemonsRepository {
    create(data: ICreateTeamsHasPokemonsDTO): Promise<ITeamsHasPokemons>;
    deleteAll(id_team: string): Promise<void>;
    update(data: IUpdateTeamsHasPokemonsDTO): Promise<ITeamsHasPokemons>;
    findById(id: string): Promise<ITeamsHasPokemons>;
}