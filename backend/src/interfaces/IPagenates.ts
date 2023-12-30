export interface IPaginateBase {
    page: number;
    take: number;
    name: string | null | undefined;
    type: string | null | undefined;
}

export interface IPagePokemon {
    limit: number;
    offset: number;
}