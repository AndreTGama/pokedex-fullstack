
import { Pokemon } from '../../../services/Pokemon/Pokemon';

export class GetByIdUseCase {

  async execute(id: number) {

    const response = await Pokemon.getPokemonById(id);

    return response
  }
}
