import { useState } from 'react';
import LogoPokemon from '../../assets/img/logo.webp';

export default function Navbar() {
    const [darkMode, setDarkMode] = useState(true);

    function toggleTheme() {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    }
    return (
        <>
            <div className="flex items-center justify-center bg-red-500 dark:bg-violet-900">
                <img
                    className="bg-red-500 dark:bg-violet-900 mb-4 mt-4 h-20 block mx-auto"
                    alt="Logo do Pokémon"
                    src={LogoPokemon}
                />
                <div className="theme-container shadow-dark mr-8">
                    {darkMode && (
                        <img
                            className="cursor-pointer"
                            id="theme-icon"
                            src="https://www.uplooder.net/img/image/2/addf703a24a12d030968858e0879b11e/moon.svg"
                            alt="lua"
                            onClick={() => toggleTheme()}
                        />
                    )}
                    {!darkMode && (
                        <img
                            className="cursor-pointer"
                            id="theme-icon"
                            src="https://www.uplooder.net/img/image/55/7aa9993fc291bc170abea048589896cf/sun.svg"
                            alt="sol"
                            onClick={() => toggleTheme()}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
