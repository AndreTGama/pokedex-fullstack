import { ICreateTeamsDTO } from "./ICreateTeamsDTO";

export interface IUpdateTeamsDTO extends ICreateTeamsDTO {
    id: string;
}

export interface IUpdateTeams extends ICreateTeamsDTO {
    id: string;
    pokemons: number[];
}