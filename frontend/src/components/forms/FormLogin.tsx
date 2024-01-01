import { UseRegisterUsers } from '../../hooks/useRegisterUsers';

import LogoPokemon from '../../assets/img/logo.webp';

export default function FormLogin() {
    const { showLoginForm, setShowLoginForm } = UseRegisterUsers();

    const handleCreateAccountClick = () => {
        setShowLoginForm(false);
    };

    return (
        showLoginForm && 
        <div className='w-full max-w-xs'>
            <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <div className='flex items-center justify-center mb-4'>
                    <img className='h-20 block mx-auto' alt='Logo do Pokémon' src={LogoPokemon} />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>
                        Username
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='username'
                        type='text'
                        placeholder='Username'
                    />
                </div>
                <div className='mb-6'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>
                        Password
                    </label>
                    <input
                        className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                        id='password'
                        type='password'
                        placeholder='******************'
                    />
                    <p className='text-red-500 text-xs italic'>
                        Please choose a password.
                    </p>
                </div>
                <div className='flex items-center justify-between'>
                    <button
                        className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        type='button'
                    >
                        Acessar
                    </button>
                    <a onClick={() => handleCreateAccountClick()} className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800' href='#'>
                        Criar conta
                    </a>
                </div>
            </form>
        </div>
    );
}
