import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom';
import Login from '../pages/login';
import Pokemons from '../pages/pokemons';
import PrivateRoute from './PrivateRoute';

export function AppRoutes() {
    const token = localStorage.getItem('token');
    const isAutenticated: boolean = !!token;

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        isAutenticated ? <Navigate to="/pokemons" /> : <Login />
                    }
                />
                <Route
                    path="/pokemons"
                    element={
                        <PrivateRoute>
                            <Pokemons />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
