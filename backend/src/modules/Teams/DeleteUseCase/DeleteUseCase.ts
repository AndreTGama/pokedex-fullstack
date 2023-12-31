
import { inject, injectable } from 'tsyringe';
import { ITeamsRepository } from '../../../repositories/ITeamsRepository';
import { ITeamsHasPokemonsRepository } from '../../../repositories/ITeamsHasPokemonsRepository';
import { IPokemonsRepository } from '../../../repositories/IPokemonsRepository';
import { ApiError } from '../../../errors/ApiError';
import { Pokemon } from '../../../services/Pokemon/Pokemon';

@injectable()
export class DeleteUseCase {
  constructor(
    @inject("TeamsRepository") private teamsRepository: ITeamsRepository,
  ) {}
  async execute(id: string) {

    const exist = await this.teamsRepository.findById(id);
    if(!exist)
      throw new ApiError('Time não encontrado', 404);

    await this.teamsRepository.delete(id);

    return;
  }
}
