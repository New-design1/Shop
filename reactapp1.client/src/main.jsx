import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import CustomHeader from './CustomHeader.jsx';
import { createRoot } from 'react-dom/client';
import Login from './Components/Administration/Login.jsx'
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '*',
        element: (
            <div>
                <CustomHeader />
                <App />
            </div>
        ),
    },
    {
        path: 'admin',
        element: (
            <div>
                <Login />
            </div>
        ),
    },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>,
)
