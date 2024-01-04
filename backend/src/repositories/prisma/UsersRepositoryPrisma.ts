import { prisma } from '.';
import { ICreateUserDTO } from '../../DTO/Users/ICreateUserDTO';
import { IUpdateUsersNewPassword } from '../../DTO/Users/IUpdateTeamsDTO';
import { ApiError } from '../../errors/ApiError';
import { ICount } from '../../interfaces/ICount';
import { IPaginate } from '../../interfaces/IPaginates';
import { IUsers } from '../../models/Users';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepositoryPrisma implements IUsersRepository {
  private repository;

  constructor() {
    this.repository = prisma.users;
  }

  async paginate({ skip, take }: IPaginate): Promise<IUsers[]> {
    const teams = await this.repository.findMany({
        skip,
        take,
        where: { deleted_at: null },
        include: {
            userHasPokemons: {
                where:{
                  deleted_at: null
                },
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
  

    const users: IUsers[] = teams.map((team) => ({
        id: team.id,
        email: team.email,
        name: team.name,
        created_at: team.created_at,
        updated_at: team.updated_at,
        Pokemon: team.userHasPokemons.map((item) => item.Pokemon),
    }));

    return users;
}

  async countAll(): Promise<ICount> {
    return await this.repository.aggregate({
      where: {
        deleted_at: null,
      },
      _count: true,
    });
  }

  async update({id, password}: IUpdateUsersNewPassword): Promise<IUsers> {
    const user = await this.repository.update({
      where: {
        id: id,
      },
      data: {
        password,
        updated_at: new Date(),
      },
    });
    return user as IUsers;
  }

  async create(data: ICreateUserDTO): Promise<IUsers> {
    const user = await this.repository.create({
      data: {
        email: data.email,
        name: data.name,
        password: data.password,
        created_at: new Date()
      },
    });

    return user as IUsers;
  }
  
  async findByName(name: string): Promise<IUsers> {
    const user = await this.repository.findFirst({
      where: {
        name,
        deleted_at: null
      },
    });

    return user as IUsers;
  }

  async getByName(name: string): Promise<IUsers> {
    const user = await this.repository.findFirst({
      where: {
        name,
      },
    });

    return user as IUsers;
  }
  
  async findByEmail(email: string): Promise<IUsers> {
    const user = await this.repository.findFirst({
      where: {
        email,
      },
      include: {
        userHasPokemons: {
          where:{
            deleted_at: null
          },
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

    return user as IUsers;
  }

  async findById(id: string): Promise<IUsers> {
    const user = await this.repository.findFirst({
      where: {
        id,
        deleted_at: null
      },
      include: {
        userHasPokemons: {
          where:{
            deleted_at: null
          },
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

    if (!user)
      throw new ApiError('Usuário não encontrado', 404);

    const formattedTeam: IUsers = {
      id: user.id,
      email: user.email,
      name: user.name,
      created_at: user.created_at,
      updated_at: user.updated_at,
      Pokemon: user.userHasPokemons.map((item) => ({
        ...item.Pokemon,
        userHasPokemonId: item.id,
      })),
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
