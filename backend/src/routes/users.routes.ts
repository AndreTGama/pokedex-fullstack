import { Router } from 'express';

const usersRouter = Router();

usersRouter.get('/', async (req, res) => {
    return await res.send("Usuário");
});

export { usersRouter };