import { ICreateUserDTO } from "./ICreateUserDTO";

export interface IUpdateUsers extends ICreateUserDTO {
    id: string;
}

export interface IUpdateUsersPassword {
    id: string;
    password: string;
    confirm_password: string;
}

export interface IUpdateUsersNewPassword {
    id: string;
    password: string;
}