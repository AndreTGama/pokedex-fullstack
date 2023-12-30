import { Router } from 'express';

const porkemonsRouter = Router();

porkemonsRouter.get('/', async (req, res) => {
    return await res.send("Pokemons");
});

export { porkemonsRouter };