import { container } from 'tsyringe';

import { Request, Response } from 'express';
import { CreateUseCase } from './CreateUseCase';
import { CreateValidation } from './CreateValidation';

export class CreateController {

    async handle(req: Request, res: Response) {
        const { email, name, password } = CreateValidation.validate(req.body);
        
        const createUseCase = container.resolve(CreateUseCase);
        const data = await createUseCase.execute({email, name, password});

        return res.returnApi({
            data: data,
            message: 'Treinador cadastrado com sucesso',
            status: 201
        });
    }
}