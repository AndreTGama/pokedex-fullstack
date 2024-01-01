import { container } from 'tsyringe';

import { Request, Response } from 'express';
import { LoginUseCase } from './LoginUseCase';
import { LoginValidation } from './LoginValidation';

export class LoginController {

    async handle(req: Request, res: Response) {
        const { name, password } = LoginValidation.validate(req.body);
        
        const loginUseCase = container.resolve(LoginUseCase);
        const data = await loginUseCase.execute({name, password});

        return res.returnApi({
            data: data,
            message: 'Login feito com sucesso',
            status: 200
        });
    }
}