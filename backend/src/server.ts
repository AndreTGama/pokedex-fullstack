import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'reflect-metadata';
import 'express-async-errors';

import './container';
import { routes } from './routes';
import { IReturnApi } from './interfaces/IReturn';
import { ApiError } from './errors/ApiError';

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const host = process.env.HOST || '0.0.0.0';

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
    res.returnApi = (data: IReturnApi): Response => {
        const returnData = {
            data: data.data ?? null,
            status: data.status ?? 200,
            message: data.message ?? '',
        };

        return res.status(returnData.status).json(returnData);
    };
    next();
});

app.use(cors());

app.use(express.json());

app.use(routes);

app.use(function (req, res, next) {
    res.returnApi({ status: 404, message: 'Rota não encontrada' });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            data: null,
            message: err.message,
            status: err.statusCode,
        });
    }

    return res.status(500).json({
        data: null,
        message: 'Internal Server Error',
        status: 500,
    });
});

app.listen(port, host, () => {
    console.log('Servidor está ouvindo na porta 3000');
});
