import { Router } from 'express';
import { CreateController } from '../modules/Teams/CreateUseCase/CreateController';
import { ListController } from '../modules/Teams/ListUseCase/ListController';
import { GetByIdController } from '../modules/Teams/GetByIdUseCase/GetByIdController';
import { UpdateController } from '../modules/Teams/UpdateUseCase/UpdateController';
import { DeleteController } from '../modules/Teams/DeleteUseCase/DeleteController';

const teamsRouter = Router();
const createController = new CreateController();
const listController = new ListController();
const getByIdController = new GetByIdController();
const updateController = new UpdateController();
const deleteController = new DeleteController();

teamsRouter.get('/', async (req, res) => {
    return await listController.handle(req, res);
});

teamsRouter.post('/', async (req, res) => {
    return await createController.handle(req, res);
});

teamsRouter.get('/:id', async (req, res) => {
    return await getByIdController.handle(req, res);
});

teamsRouter.put('/:id', async (req, res) => {
    return await updateController.handle(req, res);
});

teamsRouter.delete('/:id', async (req, res) => {
    return await deleteController.handle(req, res);
});


export { teamsRouter };