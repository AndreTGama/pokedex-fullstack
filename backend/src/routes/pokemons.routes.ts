import { Router } from 'express';
import { ListController } from '../modules/Pokemons/ListUseCase/ListController';


const porkemonsRouter = Router();

const listController = new ListController();

porkemonsRouter.get('/', async (req, res) => {
    return await listController.handle(req, res);
});

export { porkemonsRouter };