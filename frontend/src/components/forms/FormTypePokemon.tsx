import { UseContextPokemons } from '../../hooks/useContextPokemons';

export default function FormTypePokemon() {
    const { types, setType, type, setPage } = UseContextPokemons();

    function handleChangeType(value: string){
        setPage(1);
        setType(value);
    }
    
    return (
        <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={e => handleChangeType(e.target.value)}
            defaultValue={type}
        >
            <option value="" selected={type == ''}>
                Todos os Tipos
            </option>
            {types.map((t, y) => (
                <option value={t.toLowerCase()} key={y} selected={type == t}>
                    {t}
                </option>
            ))}
        </select>
    );
}
