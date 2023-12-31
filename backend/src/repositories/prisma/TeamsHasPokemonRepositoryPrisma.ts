import { prisma } from '.';
import { ICreateTeamsHasPokemonsDTO } from '../../DTO/TeamsHasPokemons/ICreateTeamsHasPokemonsDTO';
import { IUpdateTeamsHasPokemonsDTO } from '../../DTO/TeamsHasPokemons/IUpdateTeamsHasPokemonsDTO';
import { ITeamsHasPokemons } from '../../models/TeamsHasPokemons';
import { ITeamsHasPokemonsRepository } from '../ITeamsHasPokemonsRepository';

export class TeamsHasPokemonRepositoryPrisma implements ITeamsHasPokemonsRepository {
  private repository;

  constructor() {
    this.repository = prisma.teamsHasPokemons;
  }

  async update({id, pokemonId, teamsId}: IUpdateTeamsHasPokemonsDTO): Promise<ITeamsHasPokemons> {
    const teams = await this.repository.update({
      where: {
        id: id,
      },
      data: {
        pokemonId,
        teamsId,
        updated_at: new Date(),
      },
    });
    return teams as ITeamsHasPokemons;
  }
  
  async deleteAll(id_team: string): Promise<void> {
    await this.repository.deleteMany({
        where: { teamsId: id_team },
    });

    return;
  }

  async create(data: ICreateTeamsHasPokemonsDTO): Promise<ITeamsHasPokemons> {
    const teams = await this.repository.create({
      data: {
        pokemonId: data.pokemonId,
        teamsId: data.teamsId,
        created_at: new Date()
      },
    });

    return teams as ITeamsHasPokemons;
  }

  async findById(id: string): Promise<ITeamsHasPokemons> {
    const teams = await this.repository.findFirst({
      where: {
        id: id,
      },
    });

    return teams as ITeamsHasPokemons;
  }
}
