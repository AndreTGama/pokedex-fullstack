/* eslint-disable react-hooks/exhaustive-deps */
import ListCards from '../../components/card/listCards';
import FormSearchPokemon from '../../components/forms/FormSearchPokemon';
import FormTypePokemon from '../../components/forms/FormTypePokemon';
import styles from '../../styles/pages/pokemons.module.scss';
import Paginate from '../../components/paginate';
import Loading from '../../components/loading/index';
import { UseContextPokemons } from '../../hooks/useContextPokemons';
import { useEffect } from 'react';

export default function ListPokemons() {
    const { loading, handleGetPokemons, name, type, page, limit} = UseContextPokemons();

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
                <>
                    <div className={styles.formSearch}>
                        <FormSearchPokemon />
                        <FormTypePokemon />
                    </div>
                    <div className="cards">
                        <ListCards />
                        <Paginate />
                    </div>
                </>
            )}
        </>
    );
}
