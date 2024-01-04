import classNames from 'classnames';

import { IPokemon } from '../../interfaces/Pokemons/IGetPokemons';
import { UseContextPokemons } from '../../hooks/useContextPokemons';
import styles from '../../styles/components/Cards/pokemons.module.scss';
import pokeball from '../../assets/img/pokeball.webp';
import Modal from '../modal/ModalPokemon';

export default function PokemonCard({ pokemon }: { pokemon: IPokemon }) {
    const { showModal, handleOnlyPokemon } = UseContextPokemons();

    function capitalizeFirstLetter(word: string) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    const cardClasses = classNames(
        styles[`type-bg-${pokemon.types[0]}`],
        'border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-around leading-normal'
    );

    function handleModal(pokemon: IPokemon){
        handleOnlyPokemon(pokemon.id)
    }

    return (
        <>
            <div
                key={pokemon.id}
                className={classNames(styles.hover, "w-full lg:max-w-full lg:flex cursor-pointer")}
                onClick={() => handleModal(pokemon)}
            >
                <div className={classNames(cardClasses)}>
                    <div className="flex justify-around">
                        <div className="info">
                            <div className="mb-5 font-bold text-slate-50">
                                {capitalizeFirstLetter(pokemon.name)}
                            </div>
                            <div className="type font-bold">
                                {pokemon.types.map((type, index) => (
                                    <span
                                        key={index}
                                        className={classNames(
                                            styles.typeBadge,
                                            styles[`type-${type}`]
                                        )}
                                    >
                                        {type}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className={styles.imagePokemon}>
                            <img
                                src={pokeball}
                                alt="Pokebola"
                                className={styles.pokeball}
                            />
                            <img
                                src={pokemon.img}
                                alt={`Imagem do Pokémon ${pokemon.name}`}
                                className={styles.pokemon}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {showModal ? <Modal /> : null}
        </>
    );
}
