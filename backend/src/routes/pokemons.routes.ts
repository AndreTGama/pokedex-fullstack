import { Router } from 'express';
import { ListController } from '../modules/Pokemons/ListUseCase/ListController';
import { GetByIdController } from '../modules/Pokemons/GetByIdUseCase/GetByIdController';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';


const porkemonsRouter = Router();

const authMiddleware = new AuthMiddleware();

const listController = new ListController();
const getByIdController = new GetByIdController();

porkemonsRouter.get('/', authMiddleware.auth, async (req, res) => {
    return await listController.handle(req, res);
});

porkemonsRouter.get('/:idPokemon', authMiddleware.auth, async (req, res) => {
    return await getByIdController.handle(req, res);
});


export { porkemonsRouter };