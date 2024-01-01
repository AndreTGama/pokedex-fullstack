import { prisma } from '.';
import { ICreateUsersHasPokemonsDTO } from '../../DTO/UsersHasPokemons/ICreateUsersHasPokemonsDTO';
import { IUpdateUsersHasPokemonsDTO } from '../../DTO/UsersHasPokemons/IUpdateUsersHasPokemonsDTO';
import { IUsersHasPokemons } from '../../models/UsersHasPokemons';
import { IUsersHasPokemonsRepository } from '../IUsersHasPokemonsRepository';

export class TeamsHasPokemonRepositoryPrisma implements IUsersHasPokemonsRepository {
  private repository;

  constructor() {
    this.repository = prisma.usersHasPokemons;
  }

  async update({id, pokemonId, usersId}: IUpdateUsersHasPokemonsDTO): Promise<IUsersHasPokemons> {
    const teams = await this.repository.update({
      where: {
        id: id,
      },
      data: {
        pokemonId,
        usersId,
        updated_at: new Date(),
      },
    });
    return teams as IUsersHasPokemons;
  }
  
  async delete(id: string): Promise<void> {
    const teams = await this.repository.update({
      where: {
        id: id,
      },
      data: {
        updated_at: new Date(),
        deleted_at: new Date(),
      },
    });
    return;
  }

  async deleteAll(id_team: string): Promise<void> {
    await this.repository.deleteMany({
        where: { usersId: id_team },
    });

    return;
  }

  async create(data: ICreateUsersHasPokemonsDTO): Promise<IUsersHasPokemons> {
    const teams = await this.repository.create({
      data: {
        pokemonId: data.pokemonId,
        usersId: data.usersId,
        created_at: new Date()
      },
    });

    return teams as IUsersHasPokemons;
  }

  async findById(id: string): Promise<IUsersHasPokemons> {
    const teams = await this.repository.findFirst({
      where: {
        id: id,
        deleted_at: null
      },
    });

    return teams as IUsersHasPokemons;
  }
}
