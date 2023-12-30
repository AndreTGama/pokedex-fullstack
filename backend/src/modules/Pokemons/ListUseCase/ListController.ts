import { Request, Response } from "express";
import { ListUseCase } from "./ListUseCase";
import { ListValidation } from "./ListValidation";
import { container } from "tsyringe";

export class ListController {

    async handle(req: Request, res: Response) {
        
        const { page, take, type, name } = ListValidation.validate(req.query);

        const listUseCase = container.resolve(ListUseCase);

        const data = await listUseCase.execute({page, take, type, name});

        return res.returnApi({
            data: data,
            message: "Lista com os pokémons",
            status: 200
        });
    }
}