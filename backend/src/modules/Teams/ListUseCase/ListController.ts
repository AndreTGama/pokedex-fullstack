import { Request, Response } from 'express';
import { ListUseCase } from './ListUseCase';
import { ListValidation } from './ListValidation';
import { container } from 'tsyringe';

export class ListController {
    async handle(req: Request, res: Response) {
        const { page, take} = ListValidation.validate(req.query);

        const listUseCase = container.resolve(ListUseCase);

        const data = await listUseCase.execute({ page, take });

        return res.returnApi({
            data: data,
            message: 'Lista de todos os times',
            status: 200,
        });
    }
}
