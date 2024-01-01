import { container } from 'tsyringe';

import { Request, Response } from 'express';
import { DeleteUseCase } from './DeleteUseCase';

export class DeleteController {

    async handle(req: Request, res: Response) {
        const { id } = req.params;
        
        const deleteUseCase = container.resolve(DeleteUseCase);
        await deleteUseCase.execute(id);

        return res.returnApi({
            data: null,
            message: 'Usuário deletado com sucesso',
            status: 200
        });
    }
}