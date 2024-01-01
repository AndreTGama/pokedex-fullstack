import express from 'express';
import { porkemonsRouter } from './pokemons.routes';
import { usersRouter } from './users.routes';
import { authRouter } from './auth.routes';

export const routes = express.Router();

routes.get('/', (req, res) => {
    return res.send("Running");
});

routes.use('/users', usersRouter);

routes.use('/auth', authRouter);

routes.use('/pokemons', porkemonsRouter);