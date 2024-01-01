import { container } from 'tsyringe';

import { Request, Response } from 'express';
import { UpdatePasswordUseCase } from './UpdatePasswordUseCase';
import { UpdatePasswordValidation } from './UpdatePasswordValidation';

export class UpdatePasswordController {

    async handle(req: Request, res: Response) {
        const { id } = req.params;
        const { password, confirm_password } = UpdatePasswordValidation.validate(req.body);
        
        const updateUseCase = container.resolve(UpdatePasswordUseCase);
        const data = await updateUseCase.execute({id, password, confirm_password });

        return res.returnApi({
            data: data,
            message: 'Senha atualizada com sucesso',
            status: 200
        });
    }
}