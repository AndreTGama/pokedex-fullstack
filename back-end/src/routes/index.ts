import express, {Request, Response } from 'express';
import { usersRouter } from './users.routes';
import { porkemonsRouter } from './pokemons.routes';

export const routes = express.Router();

routes.get('/', (req, res) => {
    return res.send("Running");
});

routes.use('/users', usersRouter);

routes.use('/pokemons', porkemonsRouter);