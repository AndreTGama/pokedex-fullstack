import classNames from 'classnames';
import { IPokemon } from '../../interfaces/Pokemons/IGetPokemons';
import styles from '../../styles/components/Cards/pokemons.module.scss';

export default function PokemonCard({ pokemon }: { pokemon: IPokemon }) {
    
    function capitalizeFirstLetter(word: string) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    const cardClasses = classNames(
        styles[`type-bg-${pokemon.types[0]}`],
        "border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal",
      );

    return (
        <>
            <div className="max-w-sm w-full lg:max-w-full lg:flex">
                <div className={classNames(cardClasses) }>
                    <div className="flex">
                        <div className="info">
                            <div className="name">
                                {capitalizeFirstLetter(pokemon.name)}
                            </div>
                            <div className="type">
                                {pokemon.types.map((type, index) => (
                                    <span
                                        key={index}
                                        className={classNames(styles.typeBadge, styles[`type-${type}`])}
                                    >
                                        {type}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="img">
                            <img
                                src={pokemon.img}
                                alt={`Imagem do Pokémon ${pokemon.name}`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
