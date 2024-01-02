export interface IGetPokemons {
    page: number;
    take: number;
    type?: string | null;
    name?: string | null;
}

export type IPokemon = {
    id: number;
    name: string;
    img: string;
    types: Array<string>;
    weight: number;
    height: number;
};
