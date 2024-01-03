import { createContext, useContext, useState } from 'react';
import Swal from 'sweetalert2';

import {
    ContextPropsPokemons,
    ContextsProviderProps,
} from '../interfaces/Contexts/IContexts';
import { api } from '../services/api';
import { IGetPokemons, IPokemon, IPokemonComplete } from '../interfaces/Pokemons/IGetPokemons';

const ContextsPokemons = createContext<ContextPropsPokemons | undefined>(
    undefined
);

export function ContextPokemonsProvider({ children }: ContextsProviderProps) {
    const info = {
        id: 0,
        name: '',
        img: '',
        evolutions: [{
            id: 0,
            name: '',
            img: ''
        }],
        types: [],
        weight: 0,
        height: 0,
        description: ''
    }
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
    const [pokemon, setPokemon] = useState<IPokemonComplete>(info);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

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
                setTotal(0);
                setPage(1);
            });
            setLoading(false);
    }

    async function handleOnlyPokemon(id: number) {
        const token = localStorage.getItem('token');
        setShowModal(false);
        await api
            .get(`/pokemons/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(function (response) {
                const data = response.data;
                if (data.status == 200) {
                    setPokemon(data.data);
                    setShowModal(true);
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
            });
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
        pokemon,
        setPokemon,
        handleGetPokemons,
        total,
        setTotal,
        getAllPokemonNames,
        loading, 
        setLoading,
        showModal,
        setShowModal,
        handleOnlyPokemon,
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
