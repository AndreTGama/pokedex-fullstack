import classNames from 'classnames';

import { UseContextPokemons } from '../../hooks/useContextPokemons';
import styles from '../../styles/components/Modal/modal.module.scss';
import pokeball from '../../assets/img/pokeball.webp';
import { UseContextTeams } from '../../hooks/useContextTeams';

export default function ModalPokemon() {
    const { setShowModal, pokemon } = UseContextPokemons();
    const { handleAddPokemoTeam, disableButton } = UseContextTeams();

    function capitalizeFirstLetter(word: string) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    function handleAdd() {
        handleAddPokemoTeam(pokemon.id);
    }
    return (
        <>
            <div className="justify-center sm:items-start md:items-center lg:items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div
                        className={classNames(
                            styles[`type-bg-${pokemon.types[0]}`],
                            'border-0 rounded-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'
                        )}
                    >
                        <div className="relative p-6 flex-auto">
                            <div className="flex flex-col lg:flex-row md:flex-row sm:flex-row-reverse sm:justify-center justify-around">
                                <div className={styles.info}>
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
                                    <div className={styles.titleEvolution}>
                                        <span>Evoluções: </span>
                                        <div className="flex justify-start">
                                            {pokemon.evolutions.length > 0 ? (
                                                <>
                                                    {pokemon.evolutions.map(
                                                        (p, k) => (
                                                            <div
                                                                className={
                                                                    styles.circle
                                                                }
                                                            >
                                                                <img
                                                                    key={k}
                                                                    src={p.img}
                                                                    alt={`Imagem do Pokémon ${p.name}`}
                                                                    className={
                                                                        styles.evolutionImg
                                                                    }
                                                                    title={
                                                                        p.name
                                                                    }
                                                                />
                                                            </div>
                                                        )
                                                    )}
                                                </>
                                            ) : (
                                                <span>
                                                    Pokémon não tem evolução
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.description}>
                                    <p className="mb-2">
                                        {pokemon.description}
                                    </p>
                                    <hr className="mb-2" />
                                    <p>Altura: {pokemon.height} dm</p>
                                    <p>Peso: {pokemon.weight} hg</p>
                                </div>
                                <div className={styles.containerPokemon}>
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

                            <hr />
                            <div className="flex justify-between mt-2">
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                >
                                    Fechar
                                </button>
                                <button
                                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={() => handleAdd()}
                                    disabled={disableButton}
                                >
                                    Capturar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-5 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}
