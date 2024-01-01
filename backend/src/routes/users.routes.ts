import { Router } from 'express';
import { CreateController } from '../modules/Users/CreateUseCase/CreateController';
import { ListController } from '../modules/Users/ListUseCase/ListController';
import { GetByIdController } from '../modules/Users/GetByIdUseCase/GetByIdController';
import { UpdatePasswordController } from '../modules/Users/UpdatePasswordUseCase/UpdatePasswordController';
import { DeleteController } from '../modules/Users/DeleteUseCase/DeleteController';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { InsertPokemonController } from '../modules/Users/InsertPokemonTeamUseCase/InsertPokemonController';
import { DeletePokemonTeamController } from '../modules/Users/DeletePokemonTeamUseCase/DeletePokemonTeamController';

const usersRouter = Router();

const authMiddleware = new AuthMiddleware();

const createController = new CreateController();
const listController = new ListController();
const getByIdController = new GetByIdController();
const updatePasswordController = new UpdatePasswordController();
const deleteController = new DeleteController();
const insertPokemonController = new InsertPokemonController();
const deletePokemonTeamController = new DeletePokemonTeamController();

usersRouter.post('/', async (req, res) => {
    return await createController.handle(req, res);
});

usersRouter.post('/pokemon', authMiddleware.auth, async (req, res) => {
    return await insertPokemonController.handle(req, res);
});

usersRouter.delete('/pokemon/:id', authMiddleware.auth, async (req, res) => {
    return await deletePokemonTeamController.handle(req, res);
});

usersRouter.get('/', authMiddleware.auth, async (req, res) => {
    return await listController.handle(req, res);
});

usersRouter.get('/:id', authMiddleware.auth, async (req, res) => {
    return await getByIdController.handle(req, res);
});

usersRouter.put('/:id', authMiddleware.auth, async (req, res) => {
    return await updatePasswordController.handle(req, res);
});

usersRouter.delete('/:id', authMiddleware.auth, async (req, res) => {
    return await deleteController.handle(req, res);
});


export { usersRouter };