import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { 
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import Login from './pages/login';
import Pokemons from './pages/pokemons';
import Teams from './pages/teams';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/pokemons',
    element: <Pokemons />
  },
  {
    path: '/times',
    element: <Teams />
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
