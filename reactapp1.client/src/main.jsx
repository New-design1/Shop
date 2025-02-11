import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from './Components/Administration/Login.jsx'
import {
    createBrowserRouter,
    RouterProvider,
    Navigate
} from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/admin',
        element: <Login />
    },
    {
        path: '/*',
        element: <Navigate to='/' replace />   
    }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>,
)
