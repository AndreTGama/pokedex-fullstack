
import { inject, injectable } from 'tsyringe';
import { IPaginateBase } from '../../../interfaces/IPaginates';
import { IUsersRepository } from '../../../repositories/IUsersRepository';

@injectable()
export class ListUseCase {
  constructor(
    @inject("UsersRepository") private teamsRepository: IUsersRepository,
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
