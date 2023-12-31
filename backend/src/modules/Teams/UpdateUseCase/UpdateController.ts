import { container } from 'tsyringe';

import { Request, Response } from 'express';
import { UpdateUseCase } from './UpdateUseCase';
import { UpdateValidation } from './UpdateValidation';

export class UpdateController {

    async handle(req: Request, res: Response) {
        const { id } = req.params;
        const { name, pokemons } = UpdateValidation.validate(req.body);
        
        const updateUseCase = container.resolve(UpdateUseCase);
        const data = await updateUseCase.execute({id, name, pokemons});

        return res.returnApi({
            data: data,
            message: 'Time atualizado com sucesso',
            status: 200
        });
    }
}