
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../../repositories/IUsersRepository';

@injectable()
export class GetLoggedUserUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository,
  ) {}
  async execute(id: string) {

    const response = await this.usersRepository.findById(id);

    return response;
  }
}
