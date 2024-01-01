import { ICreateUsersHasPokemonsDTO } from '../DTO/UsersHasPokemons/ICreateUsersHasPokemonsDTO';
import { IUpdateUsersHasPokemonsDTO } from '../DTO/UsersHasPokemons/IUpdateUsersHasPokemonsDTO';
import { IUsersHasPokemons } from '../models/UsersHasPokemons';

export interface IUsersHasPokemonsRepository {
    create(data: ICreateUsersHasPokemonsDTO): Promise<IUsersHasPokemons>;
    deleteAll(id_team: string): Promise<void>;
    delete(id_team: string): Promise<void>;
    update(data: IUpdateUsersHasPokemonsDTO): Promise<IUsersHasPokemons>;
    findById(id: string): Promise<IUsersHasPokemons>;
}