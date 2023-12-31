
import { inject, injectable } from 'tsyringe';
import { ICreateTeams } from '../../../interfaces/ICreate';
import { ITeamsRepository } from '../../../repositories/ITeamsRepository';
import { ITeamsHasPokemonsRepository } from '../../../repositories/ITeamsHasPokemonsRepository';
import { IPokemonsRepository } from '../../../repositories/IPokemonsRepository';
import { ApiError } from '../../../errors/ApiError';
import { Pokemon } from '../../../services/Pokemon/Pokemon';

@injectable()
export class CreateUseCase {
  constructor(
    @inject("TeamsRepository") private teamsRepository: ITeamsRepository,
    @inject("TeamsHasPokemonsRepository") private teamsHasPokemonsRepository: ITeamsHasPokemonsRepository,
    @inject("PokemonsRepository") private pokemonsRepository: IPokemonsRepository,
  ) {}
  async execute({name, pokemons} : ICreateTeams) {

    const exist = await this.teamsRepository.findByName(name);
    if(exist)
      throw new ApiError('Time já cadastrado', 409);

    const team = await this.teamsRepository.create({name});
    
    for (const p of pokemons) {
      let pokemon = await this.pokemonsRepository.findByIdPokedex(p);
      if(!pokemon) {
        const infoPokemon = await Pokemon.getPokemonById(p);
        const data = {
          name: infoPokemon.name,
          id_pokedex: infoPokemon.id,
          img: infoPokemon.img
        }
        pokemon = await this.pokemonsRepository.create(data);
      }
      await this.teamsHasPokemonsRepository.create({pokemonId: pokemon.id, teamsId: team.id});
    }

    const response = await this.teamsRepository.findById(team.id);
    return response
  }
}
