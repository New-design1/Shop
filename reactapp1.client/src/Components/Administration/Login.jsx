import React from 'react'
import Panel from './Panel.jsx'


let isAuthorized = false;

const Login = () => {
    return (
        isAuthorized === false ?
            <div>
                Login
            </div> 
            :
            <Panel />
    )
}

export default Login;