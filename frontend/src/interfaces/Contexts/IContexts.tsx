import { ReactNode } from 'react';
import { ICreateUser } from '../Users/IUsers';

export interface ContextProps {
    showLoginForm: boolean;
    setShowLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    handleLogin: (values: ICreateUser) => void;
}

export interface ContextsProviderProps {
    children: ReactNode;
}