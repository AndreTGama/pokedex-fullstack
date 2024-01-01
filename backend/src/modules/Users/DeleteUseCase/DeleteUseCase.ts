
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { ApiError } from '../../../errors/ApiError';

@injectable()
export class DeleteUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository,
  ) {}
  async execute(id: string) {

    const exist = await this.usersRepository.findById(id);
    if(!exist)
      throw new ApiError('Usuário não encontrado', 404);

    await this.usersRepository.delete(id);

    return;
  }
}
