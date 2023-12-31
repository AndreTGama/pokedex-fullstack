import { prisma } from '.';
import { ICreatePokemonsDTO } from '../../DTO/Pokemons/ICreatePokemonsDTO';
import { IPokemons } from '../../models/Pokemons';
import { IPokemonsRepository } from '../IPokemonsRepository';

export class PokemonsRepositoryPrisma implements IPokemonsRepository {
  private repository;

  constructor() {
    this.repository = prisma.pokemons;
  }

  async create(data: ICreatePokemonsDTO): Promise<IPokemons> {
    const pokemons = await this.repository.create({
      data: {
        name: data.name,
        img: data.img,
        id_pokedex: data.id_pokedex,
        created_at: new Date()
      },
    });

    return pokemons as IPokemons;
  }
  
  async findByIdPokedex(id_pokedex: number): Promise<IPokemons> {
    const pokemons = await this.repository.findFirst({
      where: {
        id_pokedex,
      },
    });

    return pokemons as IPokemons;
  }

  async findById(id: string): Promise<IPokemons> {
    const pokemons = await this.repository.findFirst({
      where: {
        id,
      },
    });

    return pokemons as IPokemons;
  }
}
