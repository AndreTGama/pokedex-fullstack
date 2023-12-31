import { ICreateTeamsDTO } from '../DTO/Teams/ICreateTeamsDTO';
import { IUpdateTeamsDTO } from '../DTO/Teams/IUpdateTeamsDTO';
import { ICount } from '../interfaces/ICount';
import { IPaginate } from '../interfaces/IPaginates';
import { ITeams } from '../models/Teams';

export interface ITeamsRepository {
    create(data: ICreateTeamsDTO): Promise<ITeams>;
    findByName(name: string): Promise<ITeams>;
    findById(id: string): Promise<ITeams>;
    countAll(): Promise<ICount>;
    paginate({skip, take}: IPaginate): Promise<ITeams[]>;
    delete(id: string): Promise<void>;
    update(data: IUpdateTeamsDTO): Promise<ITeams>;
}