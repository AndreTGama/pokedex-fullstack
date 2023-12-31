import { ICreatePokemonsDTO } from '../DTO/Pokemons/ICreatePokemonsDTO';
import { IPokemons } from '../models/Pokemons';

export interface IPokemonsRepository {
    create(data: ICreatePokemonsDTO): Promise<IPokemons>;
    findById(id: string): Promise<IPokemons>;
    findByIdPokedex(id_pokedex: number): Promise<IPokemons>;
}