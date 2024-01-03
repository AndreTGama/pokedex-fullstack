/* eslint-disable react-hooks/exhaustive-deps */
import { UseContextPokemons } from '../../hooks/useContextPokemons';
import PokemonCard from './pokemonCard';
import styles from '../../styles/components/Cards/pokemons.module.scss';

export default function ListCards() {
    const { pokemons } = UseContextPokemons();

    return (
        <div className={`${styles.list} grid md:grid-cols-2 lg:grid-cols-3 gap-4 w-screen`}>
            {pokemons.map((pokemon, index) => (
                <PokemonCard key={index} pokemon={pokemon} />
            ))}
        </div>
    );
}
