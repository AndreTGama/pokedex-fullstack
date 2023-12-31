export interface IType {
    type: { 
        name: string; 
    };
}

export interface IPokemonType {
    pokemon: {
        name: string,
        url: string
    }
}

export interface IEvolution {
    id: number;
    name: string;
    img: string;
}

export interface IChains {
    species: { 
        name: string;
    };
    evolves_to: string | any[];
}

export interface IListPokemon {
    id: number,
    name: string,
    img: string,
    evolutions?: IEvolution[],
    types: IType[],
    weight: number,
    height: number,
    description?: string,
}