
import { inject, injectable } from 'tsyringe';
import { IPaginateBase } from '../../../interfaces/IPaginates';
import { ITeamsRepository } from '../../../repositories/ITeamsRepository';

@injectable()
export class ListUseCase {
  constructor(
    @inject("TeamsRepository") private teamsRepository: ITeamsRepository,
  ) {}
  async execute({page = 1, take = 10} : IPaginateBase) {

    const skip = (page! - 1) * take;  

    const response = await this.teamsRepository.paginate({skip, take});
    const {_count} = await this.teamsRepository.countAll();

    return {
      total: _count,
      list: response
    }
  }
}
