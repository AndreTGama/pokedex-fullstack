import React, { createContext, useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import {
    ContextProps,
    ContextsProviderProps,
} from '../interfaces/Contexts/IContexts';
import { api } from '../services/api';
import { ICreateUser } from '../interfaces/Users/IUsers';

const Contexts = createContext<ContextProps | undefined>(undefined);

export function ContextsProvider({ children }: ContextsProviderProps) {
    const navigate = useNavigate();

    const [showLoginForm, setShowLoginForm] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleRegisterUser(values: ICreateUser) {
        await await api
            .post('/users', values)
            .then(function (response) {
                const data = response.data;
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
                }
            })
            .catch(function (error) {
                if (error.response.data) {
                    const response = error.response.data;
                    Swal.fire({
                        title: 'Error!',
                        text: response.message,
                        icon: 'error',
                        confirmButtonText: 'Fechar',
                    });
                }
                Swal.fire({
                    title: 'Error!',
                    text: 'Erro ao cadastrar usuário',
                    icon: 'error',
                    confirmButtonText: 'Fechar',
                });
            });
    }

    async function handleLogin(values: ICreateUser) {
        await await api
            .post('/auth', values)
            .then(function (response) {
                const data = response.data;
                if (data.status == 200) {
                    setUsername('');
                    setPassword('');
                    localStorage.setItem('token', data.data.token);

                    Swal.fire({
                        title: 'Success!',
                        text: data.message,
                        icon: 'success',
                        confirmButtonText: 'Fechar',
                    }).then(result => {
                        if (result.isConfirmed) {
                            navigate('/pokemons');
                        }
                    });
                }
            })
            .catch(function (error) {
                if (error.response.data) {
                    const response = error.response.data;
                    Swal.fire({
                        title: 'Error!',
                        text: response.message,
                        icon: 'error',
                        confirmButtonText: 'Fechar',
                    });
                }
                Swal.fire({
                    title: 'Error!',
                    text: 'Erro ao fazer login',
                    icon: 'error',
                    confirmButtonText: 'Fechar',
                });
            });
    }

    const contextValues: ContextProps = {
        showLoginForm,
        setShowLoginForm,
        username,
        setUsername,
        password,
        setPassword,
        handleRegisterUser,
        handleLogin,
    };

    return (
        <Contexts.Provider value={contextValues}>{children}</Contexts.Provider>
    );
}

export function UseContextUsers() {
    const context = useContext(Contexts);

    if (!context)
        throw new Error(
            'useContextUsers must be used within a ContextsProvider'
        );

    return context;
}
