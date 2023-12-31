
import { inject, injectable } from 'tsyringe';
import { IPaginateBase } from '../../../interfaces/IPaginates';
import { ITeamsRepository } from '../../../repositories/ITeamsRepository';

@injectable()
export class GetByIdUseCase {
  constructor(
    @inject("TeamsRepository") private teamsRepository: ITeamsRepository,
  ) {}
  async execute(id: string) {

    const response = await this.teamsRepository.findById(id);

    return response;
  }
}
