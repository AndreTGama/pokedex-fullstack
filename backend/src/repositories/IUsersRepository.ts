import { ICreateUserDTO } from '../DTO/Users/ICreateUserDTO';
import { IUpdateUsersNewPassword } from '../DTO/Users/IUpdateTeamsDTO';
import { ICount } from '../interfaces/ICount';
import { IPaginate } from '../interfaces/IPaginates';
import { IUsers } from '../models/Users';

export interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<IUsers>;
    findByName(name: string): Promise<IUsers>;
    getByName(name: string): Promise<IUsers>;
    findByEmail(email: string): Promise<IUsers>;
    findById(id: string): Promise<IUsers>;
    countAll(): Promise<ICount>;
    paginate({skip, take}: IPaginate): Promise<IUsers[]>;
    delete(id: string): Promise<void>;
    update(data: IUpdateUsersNewPassword): Promise<IUsers>;
}