import { Navigate } from 'react-router-dom';
import { privateRoutesProps } from '../interfaces/Routes/IRoutes';

function PrivateRoute({ children }: privateRoutesProps) {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/" />;
    }

    return children;
}

export default PrivateRoute;
