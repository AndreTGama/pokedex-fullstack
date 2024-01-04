import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LogoPokemon from '../../assets/img/logo.webp';
import { UseContextTeams } from '../../hooks/useContextTeams';

export default function Navbar() {
    const navigate = useNavigate();
    const { setShowModalTeam } = UseContextTeams();
    const [darkMode, setDarkMode] = useState(true);

    function toggleTheme() {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    }
    
    function handleLogout() {
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <>
            <nav className="bg-red-500 dark:bg-violet-900">
                <div className="mx-auto max-w-7xl px-2 px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <img
                                    className="h-8 w-auto"
                                    src={LogoPokemon}
                                    alt="Your Company"
                                />
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <div className="relative rounded-full bg-red-500 dark:bg-violet-900 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                {darkMode ? (
                                    <img
                                        className="cursor-pointer"
                                        id="theme-icon"
                                        src="https://www.uplooder.net/img/image/2/addf703a24a12d030968858e0879b11e/moon.svg"
                                        alt="lua"
                                        onClick={() => toggleTheme()}
                                    />
                                ) : (
                                    <img
                                        className="cursor-pointer"
                                        id="theme-icon"
                                        src="https://www.uplooder.net/img/image/55/7aa9993fc291bc170abea048589896cf/sun.svg"
                                        alt="sol"
                                        onClick={() => toggleTheme()}
                                    />
                                )}
                            </div>
                            <div className="relative rounded-full bg-red-500 dark:bg-violet-900 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <div className="flex space-x-4">
                                    <a
                                        href="#"
                                        className="text-sm dark:text-white text-black cursor-pointer dark:hover:text-teal-600 hover:underline"
                                        onClick={() => setShowModalTeam(true)}
                                        aria-current="page"
                                    >
                                        Meu Time
                                    </a>
                                </div>
                            </div>
                            <div className="relative rounded-full bg-red-500 dark:bg-violet-900 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <div className="flex space-x-4">
                                    <a
                                        href="#"
                                        className="text-sm dark:text-white text-black cursor-pointer  dark:hover:text-teal-600 hover:underline"
                                        onClick={() => handleLogout()}
                                        aria-current="page"
                                    >
                                        Sair
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
