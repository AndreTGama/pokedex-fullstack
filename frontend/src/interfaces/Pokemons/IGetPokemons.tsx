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

export type IPokemonComplete = {
    id: number
    name: string
    img: string
    evolutions: Array<{
        id: number
        name: string
        img: string
    }>
    types: Array<string>
    weight: number
    height: number
    description: string
}