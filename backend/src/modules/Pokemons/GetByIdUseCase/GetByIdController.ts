import { Request, Response } from 'express';
import { GetByIdUseCase } from './GetByIdUseCase';
import { container } from 'tsyringe';

export class GetByIdController {

    async handle(req: Request, res: Response) {
        
        const { idPokemon } = req.params;

        const getByIdUseCase = container.resolve(GetByIdUseCase);

        const data = await getByIdUseCase.execute(Number(idPokemon));

        return res.returnApi({
            data: data,
            message: 'Lista com os pokémons',
            status: 200
        });
    }
}