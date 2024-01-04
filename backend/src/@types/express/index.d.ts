import { IReturnApi } from "../../interfaces/IReturn";
import { IUsers } from "../../models/Users";

declare global {
    namespace Express {

        export interface Request {
            auth_user?: IUsers;
        }

        interface Response {
            returnApi(data?: IReturnApi): Response;
        }
    }
}

