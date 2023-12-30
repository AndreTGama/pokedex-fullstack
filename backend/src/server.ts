import express from 'express';
import cors from 'cors'
import { routes } from './routes';

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const host = process.env.HOST || '0.0.0.0';

const app = express();

app.use(cors());

app.use(routes);

app.listen(port, host, () => {
    console.log('Servidor está ouvindo na porta 3000');
})