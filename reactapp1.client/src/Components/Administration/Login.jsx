import React from 'react'
import Panel from './Panel.jsx'


let isAuthorized = false;

let user = {
    UserName: 'admin',
    Password: 'superpassword',
    RememberMe: false
};


const Login = () => {
    return (
        isAuthorized === false ?
            <div>
                Login
                <input value="ֽאזלט לוםÿ" onClick={fetchPosts} type="button" />
            </div> 
            :
            <Panel />
    )
}

async function fetchPosts() {
    const response = await fetch('https://localhost:7204/Account/Login', {
        credentials: "include",
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    });
    if (response.ok)
        isAuthorized = true;
}

export default Login;