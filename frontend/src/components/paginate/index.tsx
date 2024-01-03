import { UseContextPokemons } from '../../hooks/useContextPokemons';
import { useEffect, useState } from 'react';
import styles from '../../styles/pages/pokemons.module.scss'

export default function Index() {
    const { page, setPage, limit, total } = UseContextPokemons();

    const [countPages, setCountPages] = useState(1);
    const pagesToShow = 10;

    useEffect(() => {
        setCountPages(Math.ceil(total / limit));
    }, [total, limit]);

    const goToPage = (pageNumber: number) => {
        setPage(pageNumber);
    };

    const startPage = Math.max(1, page - Math.floor(pagesToShow / 2));
    const endPage = Math.min(countPages, startPage + pagesToShow - 1);

    return (
        <div className={styles.paginate}>
            <nav aria-label="Page navigation dark:bg-slate-900 h-8">
                <ul className="flex my-8 justify-center items-center -space-x-px h-10 text-base">
                    <li>
                        <button
                            className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            onClick={() => goToPage(page - 1)}
                            disabled={page === 1}
                        >
                            <span className="sr-only">Anterior</span>
                            <svg
                                className="w-3 h-3 rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 1 1 5l4 4"
                                />
                            </svg>
                        </button>
                    </li>
                    {Array.from(
                        { length: endPage - startPage + 1 },
                        (_, index) => (
                            <li key={startPage + index}>
                                <a
                                    href="#"
                                    className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 ${
                                        page === startPage + index
                                            ? 'bg-gray-100 text-gray-700'
                                            : 'hover:bg-gray-100 hover:text-gray-700'
                                    } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                                    onClick={() => goToPage(startPage + index)}
                                    style={{
                                        pointerEvents:
                                            page === startPage + index
                                                ? 'none'
                                                : 'auto',
                                    }}
                                >
                                    {startPage + index}
                                </a>
                            </li>
                        )
                    )}
                    <li>
                        <a
                            href="#"
                            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            onClick={() => goToPage(page + 1)}
                            style={{
                                pointerEvents:
                                    page === countPages ? 'none' : 'auto',
                            }}
                        >
                            <span className="sr-only">Próxima</span>
                            <svg
                                className="w-3 h-3 rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 9 4-4-4-4"
                                />
                            </svg>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
