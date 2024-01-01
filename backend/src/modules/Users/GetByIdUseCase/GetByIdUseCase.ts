
import { inject, injectable } from 'tsyringe';
import { IPaginateBase } from '../../../interfaces/IPaginates';
import { IUsersRepository } from '../../../repositories/IUsersRepository';

@injectable()
export class GetByIdUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository,
  ) {}
  async execute(id: string) {

    const response = await this.usersRepository.findById(id);

    return response;
  }
}
