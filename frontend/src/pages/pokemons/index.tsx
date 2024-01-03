import Navbar from '../../components/navbar/Navbar';
import { ContextPokemonsProvider } from '../../hooks/useContextPokemons';
import { ContextTeamsProvider } from '../../hooks/useContextTeams';
import ListPokemons from './listPokemon';

export default function Index() {
    return (
        <div className="h-full dark:bg-slate-900">
            <ContextPokemonsProvider>
                <ContextTeamsProvider>
                    <Navbar />
                    <ListPokemons />
                </ContextTeamsProvider>
            </ContextPokemonsProvider>
        </div>
    );
}
