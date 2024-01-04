
import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';

import { ICreateUser } from '../../../interfaces/ICreate';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { ApiError } from '../../../errors/ApiError';

@injectable()
export class CreateUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository,
  ) {}
  async execute({email, name, password} : ICreateUser) {

    const exist = await this.usersRepository.findByEmail(email);
    if(exist)
      throw new ApiError('E-mail já está em uso', 409);

    const passwordHash = await hash(password, 8);
    const user = await this.usersRepository.create({email, name, password: passwordHash});
    
    return user
  }
}
