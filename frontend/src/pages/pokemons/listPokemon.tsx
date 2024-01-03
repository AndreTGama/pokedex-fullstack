/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import ListCards from '../../components/card/listCards';
import FormSearchPokemon from '../../components/forms/FormSearchPokemon';
import FormTypePokemon from '../../components/forms/FormTypePokemon';
import styles from '../../styles/pages/pokemons.module.scss';
import Paginate from '../../components/paginate';
import Loading from '../../components/loading/index';
import { UseContextPokemons } from '../../hooks/useContextPokemons';
import Modal from '../../components/modal/ModalTeam';
import { UseContextTeams } from '../../hooks/useContextTeams';

export default function ListPokemons() {
    const { loading, handleGetPokemons, name, type, page, limit } =
        UseContextPokemons();

    const { showModalTeam, setShowModalTeam } = UseContextTeams();
    useEffect(() => {
        const params = {
            page: page,
            take: limit,
            name: name ?? null,
            type: type ?? null,
        };
        handleGetPokemons(params);
    }, [type, page, limit]);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <section className={styles.section}>
                    <div className={styles.formSearch}>
                        <FormSearchPokemon />
                        <FormTypePokemon />
                    </div>
                    <div className="mt-5">
                        <span
                            className="dark:text-white cursor-pointer hover:text-teal-600 hover:underline"
                            onClick={() => setShowModalTeam(true)}
                        >
                            {' '}
                            Ver Time
                        </span>
                    </div>
                    <div className="mt-5 cards">
                        <ListCards />
                        <Paginate />
                    </div>
                    {showModalTeam ? <Modal /> : null}
                </section>
            )}
        </>
    );
}
