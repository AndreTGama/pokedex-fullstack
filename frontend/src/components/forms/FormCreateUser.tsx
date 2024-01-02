import { FormEvent } from 'react';
import { UseContextUsers } from '../../hooks/useContextUsers';

export default function formCreateUser() {
    const {
        showLoginForm,
        setShowLoginForm,
        username,
        setUsername,
        password,
        setPassword,
        handleRegisterUser
    } = UseContextUsers();

    const handleCreateAccountClick = () => {
        setShowLoginForm(true);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleRegisterUser({
            name: username,
            password: password
        });
    }

    return (
        !showLoginForm && 
        <div className="w-full max-w-xs">
            <form 
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={(e) => handleSubmit(e)}
            >
                <div className='flex items-center justify-center mb-4'>
                    <label className="text-4xl  block text-gray-700 text-sm font-bold mb-2">
                        Registrar
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="******************"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Registrar
                    </button>
                    <a onClick={() => handleCreateAccountClick()} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                        Fazer login
                    </a>
                </div>
            </form>
        </div>
    );
}
