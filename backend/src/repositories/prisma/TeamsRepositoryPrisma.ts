import { prisma } from '.';
import { ICreateTeamsDTO } from '../../DTO/Teams/ICreateTeamsDTO';
import { IUpdateTeamsDTO } from '../../DTO/Teams/IUpdateTeamsDTO';
import { ApiError } from '../../errors/ApiError';
import { ICount } from '../../interfaces/ICount';
import { IPaginate } from '../../interfaces/IPaginates';
import { ITeams } from '../../models/Teams';
import { ITeamsRepository } from '../ITeamsRepository';

export class TeamsRepositoryPrisma implements ITeamsRepository {
  private repository;

  constructor() {
    this.repository = prisma.teams;
  }

  async paginate({ skip, take }: IPaginate): Promise<ITeams[]> {
    const teams = await this.repository.findMany({
        skip,
        take,
        where: { deleted_at: null },
        include: {
            teamsHasPokemons: {
                include: {
                    Pokemon: {
                        select: {
                            id: true,
                            name: true,
                            img: true,
                            id_pokedex: true,
                            created_at: true,
                            updated_at: true,
                            deleted_at: true,
                        },
                    },
                },
            },
        },
    });

    if (!teams || teams.length === 0)
      throw new ApiError('Não foi encontrado nenhum time', 404);
  

    const formattedTeams: ITeams[] = teams.map((team) => ({
        id: team.id,
        name: team.name,
        created_at: team.created_at,
        updated_at: team.updated_at,
        Pokemon: team.teamsHasPokemons.map((teamPokemon) => teamPokemon.Pokemon),
    }));

    return formattedTeams;
}

  async countAll(): Promise<ICount> {
    return await this.repository.aggregate({
      where: {
        deleted_at: null,
      },
      _count: true,
    });
  }

  async update({id, name}: IUpdateTeamsDTO): Promise<ITeams> {
    const teams = await this.repository.update({
      where: {
        id: id,
      },
      data: {
        name,
        updated_at: new Date(),
      },
    });
    return teams as ITeams;
  }

  async create(data: ICreateTeamsDTO): Promise<ITeams> {
    const teams = await this.repository.create({
      data: {
        name: data.name,
        created_at: new Date()
      },
    });

    return teams as ITeams;
  }
  
  async findByName(name: string): Promise<ITeams> {
    const teams = await this.repository.findFirst({
      where: {
        name,
        deleted_at: null
      },
    });

    return teams as ITeams;
  }

  async findById(id: string): Promise<ITeams> {
    const teams = await this.repository.findFirst({
      where: {
        id,
        deleted_at: null
      },
      include: {
        teamsHasPokemons: {
          include: {
            Pokemon: {
              select: {
                id: true,
                name: true,
                img: true,
                id_pokedex: true,
                created_at: true,
                updated_at: true,
                deleted_at: true,
              },
            },
          },
        },
      },
    });

    if (!teams)
      throw new ApiError('Time não encontrado', 404);
    

    const formattedTeam: ITeams = {
      id: teams.id,
      name: teams.name,
      created_at: teams.created_at,
      updated_at: teams.updated_at,
      Pokemon: teams.teamsHasPokemons.map((teamPokemon) => teamPokemon.Pokemon),
    };

    return formattedTeam;
  }

  async delete(id: string): Promise<void> {
    await this.repository.update({
      where: {
        id: id,
      },
      data: {
        deleted_at: new Date(),
      },
    });
    return;
  }

}
