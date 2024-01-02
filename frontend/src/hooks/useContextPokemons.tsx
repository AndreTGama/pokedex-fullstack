import { createContext, useContext, useState } from 'react';
import Swal from 'sweetalert2';

import {
    ContextPropsPokemons,
    ContextsProviderProps,
} from '../interfaces/Contexts/IContexts';
import { api } from '../services/api';
import { IGetPokemons, IPokemon } from '../interfaces/Pokemons/IGetPokemons';

const ContextsPokemons = createContext<ContextPropsPokemons | undefined>(
    undefined
);

export function ContextPokemonsProvider({ children }: ContextsProviderProps) {
    const [name, setName] = useState('');
    const [names, setNames] = useState<string[]>([]);
    const [types, setTypes] = useState<string[]>([
        'Normal',
        'Fire',
        'Water',
        'Electric',
        'Grass',
        'Ice',
        'Fighting',
        'Poison',
        'Ground',
        'Flying',
        'Psychic',
        'Bug',
        'Rock',
        'Ghost',
        'Dark',
        'Dragon',
        'Steel',
        'Fairy',
    ]);
    const [type, setType] = useState('');
    const [limit, setLimit] = useState(12);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [pokemons, setPokemons] = useState<IPokemon[]>([]);
    const [loading, setLoading] = useState(true);

    async function handleGetPokemons(values: IGetPokemons) {
        const token = localStorage.getItem('token');
        setLoading(true);

        await api
            .get('/pokemons', {
                params: values,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(function (response) {
                const data = response.data;
                if (data.status == 200) {
                    setTotal(data.data.count);
                    setPokemons(data.data.pokemons);
                    Swal.fire({
                        title: 'Success!',
                        text: data.message,
                        icon: 'success',
                        confirmButtonText: 'Fechar',
                    });
                }
            })
            .catch(function (error) {
                if (error.response.data) {
                    const response = error.response.data;
                    Swal.fire({
                        title: 'Error!',
                        text: response.message,
                        icon: 'error',
                        confirmButtonText: 'Fechar',
                    });
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Erro ao listar os Pokémons',
                        icon: 'error',
                        confirmButtonText: 'Fechar',
                    });
                }
                setPokemons([]);
            });
            setLoading(false);
    }

    async function getAllPokemonNames() {
        const response = await fetch(
            'https://pokeapi.co/api/v2/pokemon?limit=1302'
        );
        const data = await response.json();
        const pokemonNames = data.results.map(
            (pokemon: { name: string }) => pokemon.name
        );
        setNames(pokemonNames);
    }

    const contextValues: ContextPropsPokemons = {
        name,
        setName,
        type,
        setType,
        names,
        setNames,
        types,
        setTypes,
        limit,
        setLimit,
        page,
        setPage,
        pokemons,
        handleGetPokemons,
        total,
        setTotal,
        getAllPokemonNames,
        loading, 
        setLoading,
    };

    return (
        <ContextsPokemons.Provider value={contextValues}>
            {children}
        </ContextsPokemons.Provider>
    );
}

export function UseContextPokemons() {
    const context = useContext(ContextsPokemons);

    if (!context)
        throw new Error(
            'UseContextPokemons must be used within a ContextsProvider'
        );

    return context;
}
