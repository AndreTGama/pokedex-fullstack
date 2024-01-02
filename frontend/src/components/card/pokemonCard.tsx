import classNames from 'classnames';
import Swal from 'sweetalert2';

import { IPokemon } from '../../interfaces/Pokemons/IGetPokemons';
import styles from '../../styles/components/Cards/pokemons.module.scss';
import pokeball from '../../assets/img/pokeball.webp';

export default function PokemonCard({ pokemon }: { pokemon: IPokemon }) {
    function capitalizeFirstLetter(word: string) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    const cardClasses = classNames(
        styles[`type-bg-${pokemon.types[0]}`],
        'border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-around leading-normal'
    );
    

    function openModal(pokemon: IPokemon) {
        Swal.fire({
            html: `
                <div className={${styles.modal}}>
                    <div className={${styles.infoModal}}></div>
                    <div className={${styles.imagePokemon}}>
                        <img
                            src={${pokeball}}
                            alt="Pokebola"
                            className={${styles.pokeball}}
                        />
                        <img
                            src={${pokemon.img}}
                            alt={'Imagem do Pokémon' ${pokemon.name}'}
                            className={${styles.pokemon}}
                        />
                    </div>
                </div>
                <div className={${styles.footerModal}}></div>
            `,
            confirmButtonText: 'Fechar',
            customClass: {
                popup: classNames(styles[`type-bg-modal-${pokemon.types[0]}`]),
            },
        });
    }

    return (
        <>
            <div
                className="max-w-sm w-full lg:max-w-full lg:flex"
                onClick={() => openModal(pokemon)}
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
        </>
    );
}
