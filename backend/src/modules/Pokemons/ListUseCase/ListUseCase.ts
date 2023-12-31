
import { IPaginateBase } from '../../../interfaces/IPaginates';
import { Pokemon } from '../../../services/Pokemon/Pokemon';

export class ListUseCase {

  async execute({page = 1, take = 10, type, name} : IPaginateBase) {

    const offset = (page! - 1) * take;

    const response = await Pokemon.pokemonList({limit: take, offset, type, name});

    return response
  }
}
