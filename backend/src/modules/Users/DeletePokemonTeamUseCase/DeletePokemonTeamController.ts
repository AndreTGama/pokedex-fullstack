import { container } from 'tsyringe';

import { Request, Response } from 'express';
import { DeletePokemonTeamUseCase } from './DeletePokemonTeamUseCase';

export class DeletePokemonTeamController {

    async handle(req: Request, res: Response) {
        const { id } = req.params;
    
        const deleteUseCase = container.resolve(DeletePokemonTeamUseCase);
        const data = await deleteUseCase.execute(id);

        return res.returnApi({
            data: data,
            message: 'Pokémon deletado com sucesso',
            status: 200
        });
    }
}