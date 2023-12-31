export interface IPaginateBase {
    page: number;
    take: number;
    name?: string | null | undefined;
    type?: string | null | undefined;
}

export interface IPaginate {
    skip: number;
    take: number;
}

export interface IPagePokemon {
    limit: number;
    offset: number;
    name: string | null | undefined;
    type: string | null | undefined;
}

export interface IIdPokemon {
    idPokemon: number;
}