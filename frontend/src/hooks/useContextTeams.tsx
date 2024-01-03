import { createContext, useContext, useState } from 'react';
import Swal from 'sweetalert2';

import {
    ContextPropsTeams,
    ContextsProviderProps,
} from '../interfaces/Contexts/IContexts';
import { api } from '../services/api';
import { ITeam } from '../interfaces/ITeams/ITeams';

const ContextsTeams = createContext<ContextPropsTeams | undefined>(undefined);

export function ContextTeamsProvider({ children }: ContextsProviderProps) {
    const teamInfo = {
        id: '',
        name: '',
        created_at: '',
        updated_at: '',
        Pokemon: [],
    };
    const [disableButton, setDisableButton] = useState(false);
    const [showModalTeam, setShowModalTeam] = useState(false);
    const [team, setTeam] = useState<ITeam>(teamInfo);

    async function handleAddPokemoTeam(id: number) {
        setDisableButton(true);
        await api
            .post('/users/pokemon', {
                pokemon: id,
            })
            .then(function (response) {
                const data = response.data;
                if (data.status == 201) {
                    Swal.fire({
                        title: 'Sucesso!',
                        text: data.message,
                        icon: 'success',
                        confirmButtonText: 'Fechar',
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
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Erro ao listar os Pokémons',
                        icon: 'error',
                        confirmButtonText: 'Fechar',
                    });
                }
            });
        setDisableButton(false);
    }

    async function handleGetLoggedTeam() {
        setDisableButton(true);
        await api
            .get('/users/my/team')
            .then(function (response) {
                const data = response.data;
                if (data.status == 200) {
                    setTeam(data.data);
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
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Erro ao listar os Pokémons',
                        icon: 'error',
                        confirmButtonText: 'Fechar',
                    });
                }
            });
        setDisableButton(false);
    }

    async function handleDeletePokemonTeam(id: string) {
        await api
            .delete(`/users/pokemon/${id}`)
            .then(function (response) {
                const data = response.data;
                if (data.status == 200) {
                    setTeam(data.data);
                    Swal.fire({
                        title: 'Sucesso!',
                        text: data.message,
                        icon: 'success',
                        confirmButtonText: 'Fechar',
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
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Erro ao listar os Pokémons',
                        icon: 'error',
                        confirmButtonText: 'Fechar',
                    });
                }
            });
    }

    async function handleConfirmDeletePokemonTeam(id: string) {
        Swal.fire({
            title: 'Cuidado!',
            text: 'Você desejá remover esse pokémon do seu time?',
            icon: 'warning',
            showDenyButton: true,
            denyButtonText: 'Cancelar',
            confirmButtonText: 'Sim',
        }).then(result => {
            if (result.isConfirmed) {
                handleDeletePokemonTeam(id);
            }
        });
        return;
    }

    const contextValues: ContextPropsTeams = {
        handleAddPokemoTeam,
        disableButton,
        setDisableButton,
        showModalTeam,
        setShowModalTeam,
        team,
        setTeam,
        handleGetLoggedTeam,
        handleConfirmDeletePokemonTeam,
    };

    return (
        <ContextsTeams.Provider value={contextValues}>
            {children}
        </ContextsTeams.Provider>
    );
}

export function UseContextTeams() {
    const context = useContext(ContextsTeams);

    if (!context)
        throw new Error(
            'UseContextTeams must be used within a ContextsProvider'
        );

    return context;
}
