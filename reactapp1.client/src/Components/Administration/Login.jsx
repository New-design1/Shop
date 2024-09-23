import { useRef }  from 'react'
import Panel from './Panel.jsx'

function Login()
{
    const inputUserName = useRef();
    const inputUserPassword = useRef();

    async function fetchLogin() {
        
        let user = {
            UserName: inputUserName.current.value,
            Password: inputUserPassword.current.value
        };

        const response = await fetch('https://localhost:7204/Account/Login', {
            credentials: "include",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            let token = await response.text();
            sessionStorage.setItem('token', token);
            location.reload();
        }
    }

    return (
        sessionStorage.getItem('token') === null ?
            <div>
                Login
                <form>
                    <input ref={inputUserName} type="text" name="UserName"  />
                    <input ref={inputUserPassword} type="text" name="Password" />
                    <input type="button" onClick={fetchLogin} value="Login" />
                </form>
            </div> 
            :
            <Panel />
    )

}


export default Login;