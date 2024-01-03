
import { inject, injectable } from 'tsyringe';
import { ApiError } from '../../../errors/ApiError';
import { IUsersHasPokemonsRepository } from '../../../repositories/IUsersHasPokemonsRepository';
import { IUsersRepository } from '../../../repositories/IUsersRepository';

@injectable()
export class DeletePokemonTeamUseCase {
  constructor(
    @inject("UsersHasPokemonsRepository") private usersHasPokemonsRepository: IUsersHasPokemonsRepository,
    @inject("UsersRepository") private usersRepository: IUsersRepository,

  ) {}
  async execute(id: string) {

    const exist = await this.usersHasPokemonsRepository.findById(id);
    if(!exist)
      throw new ApiError('Vínculo não encontrado', 404);

    await this.usersHasPokemonsRepository.delete(id);
    const response = await this.usersRepository.findById(exist.usersId);

    return response
  }
}
