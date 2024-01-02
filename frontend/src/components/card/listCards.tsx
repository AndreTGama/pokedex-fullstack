// Arquivo ListCards.tsx
import { useEffect } from 'react';
import { UseContextPokemons } from '../../hooks/useContextPokemons';
import PokemonCard from './pokemonCard';

export default function ListCards() {
    const { handleGetPokemons, pokemons, name, type, page, limit } =
        UseContextPokemons();

    useEffect(() => {
        const params = {
            page: 1,
            take: limit,
            name: name ?? null,
            type: type ?? null,
        };
        handleGetPokemons(params);
    }, [name, type, page, limit]);

    return (
        <div className="list">
            {pokemons.map((pokemon, index) => (
                <PokemonCard key={index} pokemon={pokemon} />
            ))}
        </div>
    );
}
