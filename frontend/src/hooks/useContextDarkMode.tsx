import React, { createContext, useContext } from 'react';
import {
    ContextDarkMode,
    ContextsProviderProps,
} from '../interfaces/Contexts/IContexts';


const ContextsTheme = createContext<ContextDarkMode | undefined>(undefined);

export function ContextsProvider({ children }: ContextsProviderProps) {
    
    function toggleTheme() {
        document.documentElement.classList.toggle('dark')
    }

    const contextThema: ContextDarkMode = {
        toggleTheme
    };

    return (
        <ContextsTheme.Provider value={contextThema}>{children}</ContextsTheme.Provider>
    );
}

export function UseContextDarkMode() {
    const context = useContext(ContextsTheme);

    if (!context)
        throw new Error(
            'UseContextDarkMode must be used within a ContextsProvider'
        );

    return context;
}
