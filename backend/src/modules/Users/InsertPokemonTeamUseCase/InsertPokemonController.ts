import { container } from 'tsyringe';

import { Request, Response } from 'express';
import { InsertPokemonUseCase } from './InsertPokemonUseCase';
import { InsertPokemonValidation } from './InsertPokemonValidation';

export class InsertPokemonController {

    async handle(req: Request, res: Response) {

        const id = req.auth_user!.id;
        const { pokemon } = InsertPokemonValidation.validate(req.body);
        
        const createUseCase = container.resolve(InsertPokemonUseCase);
        const data = await createUseCase.execute({id, pokemon});

        return res.returnApi({
            data: data,
            message: 'Pokémon cadastrado no time com sucesso',
            status: 201
        });
    }
}