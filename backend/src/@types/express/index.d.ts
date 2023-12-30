import { IReturnApi } from "../../interfaces/IReturn";

declare global {
    namespace Express {
        interface Response {
            returnApi(data?: IReturnApi): Response;
        }
    }
}

