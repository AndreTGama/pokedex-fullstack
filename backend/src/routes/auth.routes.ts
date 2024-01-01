import { Router } from 'express';
import { LoginController } from '../modules/Auth/LoginUseCase/LoginController';

const authRouter = Router();

const loginController = new LoginController()

authRouter.post('/', async (req, res) => {
    return await loginController.handle(req, res);
});


export { authRouter };