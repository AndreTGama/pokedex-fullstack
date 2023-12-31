import { Router } from 'express';
import { ListController } from '../modules/Pokemons/ListUseCase/ListController';
import { GetByIdController } from '../modules/Pokemons/GetByIdUseCase/GetByIdController';


const porkemonsRouter = Router();

const listController = new ListController();
const getByIdController = new GetByIdController();

porkemonsRouter.get('/', async (req, res) => {
    return await listController.handle(req, res);
});

porkemonsRouter.get('/:idPokemon', async (req, res) => {
    return await getByIdController.handle(req, res);
});


export { porkemonsRouter };