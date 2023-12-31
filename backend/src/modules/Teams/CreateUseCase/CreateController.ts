import { container } from 'tsyringe';

import { Request, Response } from 'express';
import { CreateUseCase } from './CreateUseCase';
import { CreateValidation } from './CreateValidation';

export class CreateController {

    async handle(req: Request, res: Response) {
        const { name, pokemons } = CreateValidation.validate(req.body);
        
        const createUseCase = container.resolve(CreateUseCase);
        const data = await createUseCase.execute({name, pokemons});

        return res.returnApi({
            data: data,
            message: 'Time cadastrado com sucesso',
            status: 201
        });
    }
}