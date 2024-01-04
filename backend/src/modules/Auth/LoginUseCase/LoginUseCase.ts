
import { inject, injectable } from 'tsyringe';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { ApiError } from '../../../errors/ApiError';
import { IResponse } from '../../../interfaces/IReturn';
import { IAuth } from '../../../interfaces/IAuth';

@injectable()
export class LoginUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository,
  ) {}
  async execute({email, password} : IAuth) {

    const user = await this.usersRepository.findByEmail(email);

    if(!user)
      throw new ApiError('Treinador com esse nome não existe', 404);

    if(user.deleted_at)
      throw new ApiError('Treinador está desativado', 400);
    
    const passwordMatch = await compare(password, user.password as string);

    if (!passwordMatch)
      throw new ApiError('Nome ou Senha estão incorretos');

    const token = sign({}, process.env.JWT_SECRET as string, {
      subject: user.id,
      expiresIn: "1d",
    });


    delete user.password;

    const tokenReturn: IResponse = {
      token,
      account: user
    };

    return tokenReturn;
  }
}
