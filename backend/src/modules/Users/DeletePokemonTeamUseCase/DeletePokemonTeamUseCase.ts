
import { inject, injectable } from 'tsyringe';
import { ApiError } from '../../../errors/ApiError';
import { IUsersHasPokemonsRepository } from '../../../repositories/IUsersHasPokemonsRepository';

@injectable()
export class DeletePokemonTeamUseCase {
  constructor(
    @inject("UsersHasPokemonsRepository") private usersHasPokemonsRepository: IUsersHasPokemonsRepository,
  ) {}
  async execute(id: string) {

    const exist = await this.usersHasPokemonsRepository.findById(id);
    if(!exist)
      throw new ApiError('Vínculo não encontrado', 404);

    await this.usersHasPokemonsRepository.delete(id);

    return;
  }
}
