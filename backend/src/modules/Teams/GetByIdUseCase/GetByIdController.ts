import { Request, Response } from 'express';
import { GetByIdUseCase } from './GetByIdUseCase';
import { container } from 'tsyringe';

export class GetByIdController {
    async handle(req: Request, res: Response) {

        const { id } = req.params;
        const getByIdUseCase = container.resolve(GetByIdUseCase);

        const data = await getByIdUseCase.execute(id);

        return res.returnApi({
            data: data,
            message: 'Informação do time',
            status: 200,
        });
    }
}
