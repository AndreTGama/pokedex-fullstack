import { IReturnApi } from "../../interfaces/IReturn";

declare global {
    namespace Express {

        export interface Request {
            auth_user?: IAccount;
        }

        interface Response {
            returnApi(data?: IReturnApi): Response;
        }
    }
}

