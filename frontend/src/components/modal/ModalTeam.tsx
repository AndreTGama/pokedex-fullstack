import { useEffect } from 'react';
import classNames from 'classnames';

import styles from '../../styles/components/Modal/modalTeams.module.scss';
import Red from '../../assets/img/red.webp';
import Pokeball from '../../assets/img/pokeball.webp';
import Square from '../../assets/img/square.webp';
import { UseContextTeams } from '../../hooks/useContextTeams';

export default function PokemonCard() {
    const { handleGetLoggedTeam, setShowModalTeam, team, handleConfirmDeletePokemonTeam } = UseContextTeams();

    function handleRemove(id: string) {
        handleConfirmDeletePokemonTeam(id);
    }

    useEffect(() => {
        handleGetLoggedTeam();
    }, []);

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div
                        className={classNames(
                            styles.card,
                            'bg-red-500 border-0 rounded-lg relative flex flex-col w-full outline-none focus:outline-none'
                        )}
                    >
                        <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => setShowModalTeam(false)}
                        >
                            <span className="text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                                ×
                            </span>
                        </button>
                        <div className=" relative p-6 flex-auto">
                            <div className="flex justify-around">
                                <div className={styles.trainer}>
                                    <img
                                        src={Red}
                                        alt="treinador Red"
                                        className={styles.imgTreiner}
                                    />
                                    <img
                                        className={styles.pokebalfirst}
                                        src={Pokeball}
                                        alt="pokebola"
                                    />
                                    <img
                                        className={styles.pokebalseconds}
                                        src={Pokeball}
                                        alt="pokebola"
                                    />
                                    <img
                                        className={styles.square}
                                        src={Square}
                                        alt="quadrados"
                                    />
                                </div>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 justify-between">
                                    {team.Pokemon.map((p, k) => (
                                        <div 
                                            key={k}
                                            className={classNames(styles.circle, "cursor-pointer")}
                                            onClick={() => handleRemove(p.userHasPokemonId)}
                                        >
                                            <img
                                                src={p.img}
                                                alt={`Icone do Pokémon ${p.name}`}
                                                className="_pokemon_5erqb_440"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}
