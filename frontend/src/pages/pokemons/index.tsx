import ListCards from '../../components/card/listCards';
import FormSearchPokemon from '../../components/forms/FormSearchPokemon';
import FormTypePokemon from '../../components/forms/FormTypePokemon';
import Navbar from '../../components/navbar/Navbar';
import { ContextPokemonsProvider } from '../../hooks/useContextPokemons';
import styles from '../../styles/pages/pokemons.module.scss';

export default function Index() {
    return (
        <ContextPokemonsProvider>
            <div className="w-screen h-screen dark:bg-slate-900">
                <Navbar />
                <div className={styles.formSearch}>
                    <FormSearchPokemon />
                    <FormTypePokemon />
                </div>
                <div className="cards">
                  <ListCards />
                </div>
            </div>
        </ContextPokemonsProvider>
    );
}
