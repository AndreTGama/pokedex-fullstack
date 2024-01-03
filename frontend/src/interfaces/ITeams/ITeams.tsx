export type ITeam = {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
    Pokemon: Array<{
        id: string;
        name: string;
        img: string;
        id_pokedex: number;
        created_at: string;
        updated_at: string;
        deleted_at: string | null;
        userHasPokemonId: string;
    }>;
};
