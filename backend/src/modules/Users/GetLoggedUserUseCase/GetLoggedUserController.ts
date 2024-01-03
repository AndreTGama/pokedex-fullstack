import { Request, Response } from 'express';
import { GetLoggedUserUseCase } from './GetLoggedUserUseCase';
import { container } from 'tsyringe';

export class GetLoggedUserController {
    async handle(req: Request, res: Response) {

        const { id } = req.auth_user;
        const getLogedUseCase = container.resolve(GetLoggedUserUseCase);

        const data = await getLogedUseCase.execute(id);

        return res.returnApi({
            data: data,
            message: 'Informação do usuário',
            status: 200,
        });
    }
}
