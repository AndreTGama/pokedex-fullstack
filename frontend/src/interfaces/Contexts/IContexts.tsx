import { ReactNode } from 'react';
import { ICreateUser } from '../Users/IUsers';
import { IGetPokemons, IPokemon } from '../Pokemons/IGetPokemons';

export interface ContextProps {
    showLoginForm: boolean;
    setShowLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    handleLogin: (values: ICreateUser) => void;
    handleRegisterUser: (values: ICreateUser) => void;
}

export interface ContextPropsPokemons {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    names: string[];
    setNames: React.Dispatch<React.SetStateAction<string[]>>;
    types: string[];
    setTypes: React.Dispatch<React.SetStateAction<string[]>>;
    type: string;
    setType: React.Dispatch<React.SetStateAction<string>>;
    limit: number;
    setLimit: React.Dispatch<React.SetStateAction<number>>;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    handleGetPokemons: (values: IGetPokemons) => Promise<void>;
    pokemons: IPokemon[];
    total: number;
    setTotal: React.Dispatch<React.SetStateAction<number>>;
    getAllPokemonNames: () => Promise<void>;
    loading: boolean; 
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ContextsProviderProps {
    children: ReactNode;
}

export interface ContextDarkMode {
    toggleTheme: () => void;
}
