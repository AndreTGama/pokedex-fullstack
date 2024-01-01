
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { ApiError } from '../../../errors/ApiError';
import { IUpdateUsersPassword } from '../../../DTO/Users/IUpdateTeamsDTO';
import { hash } from 'bcrypt';

@injectable()
export class UpdatePasswordUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository,
  ) {}
  async execute({id, password, confirm_password} : IUpdateUsersPassword) {

    const exist = await this.usersRepository.findById(id);
    if(!exist)
      throw new ApiError('Usuário não encontrado', 404);

    if(password != confirm_password)
      throw new ApiError('Usuário não encontrado', 404);
    
    const passwordHash = await hash(password, 8);
    await this.usersRepository.update({id, password: passwordHash});

    const response = await this.usersRepository.findById(id);
    return response
  }
}
