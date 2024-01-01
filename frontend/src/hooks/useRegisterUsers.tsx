import React, { createContext, useContext, useState } from 'react';
import Swal from 'sweetalert2';

import {
    ContextProps,
    ContextsProviderProps,
} from '../interfaces/Contexts/IContexts';
import { api } from '../services/api';
import { ICreateUser } from '../interfaces/Users/IUsers';
import axios from 'axios';

const Contexts = createContext<ContextProps | undefined>(undefined);

export function ContextsProvider({ children }: ContextsProviderProps) {
    const [showLoginForm, setShowLoginForm] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin(values: ICreateUser) {
        try {
            const { data } = await api.post('/users', values);
            if (data.status == 201) {
                Swal.fire({
                    title: 'Success!',
                    text: data.message,
                    icon: 'success',
                    confirmButtonText: 'Fechar',
                });
                setUsername('');
                setPassword('');
                setShowLoginForm(true);
            } else {
                throw data.message
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const response = error.response;
                if (response && response.status === 409) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Usuário já existe',
                        icon: 'error',
                        confirmButtonText: 'Fechar',
                    });
                    return;
                }
            }
            Swal.fire({
                title: 'Error!',
                text: 'Erro ao cadastrar usuário',
                icon: 'error',
                confirmButtonText: 'Fechar',
            });
        }
    }

    const contextValues: ContextProps = {
        showLoginForm,
        setShowLoginForm,
        username,
        setUsername,
        password,
        setPassword,
        handleLogin,
    };

    return (
        <Contexts.Provider value={contextValues}>{children}</Contexts.Provider>
    );
}

export function UseRegisterUsers() {
    const context = useContext(Contexts);

    if (!context)
        throw new Error(
            'useRegisterUsers must be used within a ContextsProvider'
        );

    return context;
}
