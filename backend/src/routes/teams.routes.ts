import { Router } from 'express';

const teamsRouter = Router();

teamsRouter.get('/', async (req, res) => {
    return await res.send("Usuário");
});

export { teamsRouter };