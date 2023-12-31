import express from 'express';
import { porkemonsRouter } from './pokemons.routes';
import { teamsRouter } from './teams.routes';

export const routes = express.Router();

routes.get('/', (req, res) => {
    return res.send("Running");
});

routes.use('/teams', teamsRouter);

routes.use('/pokemons', porkemonsRouter);