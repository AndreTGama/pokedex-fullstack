
import { inject, injectable } from 'tsyringe';
import { ICreateTeam } from '../../../interfaces/ICreate';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { IUsersHasPokemonsRepository } from '../../../repositories/IUsersHasPokemonsRepository';
import { IPokemonsRepository } from '../../../repositories/IPokemonsRepository';
import { ApiError } from '../../../errors/ApiError';
import { Pokemon } from '../../../services/Pokemon/Pokemon';

@injectable()
export class InsertPokemonUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository,
    @inject("UsersHasPokemonsRepository") private usersHasPokemonsRepository: IUsersHasPokemonsRepository,
    @inject("PokemonsRepository") private pokemonsRepository: IPokemonsRepository,
  ) {}
  async execute({id, pokemon} : ICreateTeam) {

    const user = await this.usersRepository.findById(id);
    if(!user)
      throw new ApiError('Usuário não encontrado', 404);
    
    if(user.deleted_at)
      throw new ApiError('Usuário desativado', 400);
    
    if(user.Pokemon!.length >= 5) 
      throw new ApiError('Usuário já tem 5 Pokémons em seu time', 401);

    let pokemonInfo = await this.pokemonsRepository.findByIdPokedex(pokemon);

    if(!pokemonInfo) {
      console.log('teste if');
      const infoPokemon = await Pokemon.getPokemonById(pokemon);
      const data = {
        name: infoPokemon.name,
        id_pokedex: infoPokemon.id,
        img: infoPokemon.img
      }
      pokemonInfo = await this.pokemonsRepository.create(data);
    }
    await this.usersHasPokemonsRepository.create({pokemonId: pokemonInfo.id, usersId: user.id});

    const response = await this.usersRepository.findById(user.id);
    return response
  }
}
