import { useRef } from 'react';
import Panel from './Panel.jsx';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


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
            //<div>
            //    Login
            //    <form>
            //        <input ref={inputUserName} type="text" name="UserName"  />
            //        <input ref={inputUserPassword} type="text" name="Password" />
            //        <input type="button" onClick={fetchLogin} value="Login" />
            //    </form>
            //</div> 

    return (
        sessionStorage.getItem('token') === null ?
            <Form className="position-absolute top-50 start-50 translate-middle border p-3">
                <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control ref={inputUserName} type="email" placeholder="Enter email" />
                    </Form.Group>

                <Form.Group className="mb-3 text-start" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                    <Form.Control ref={inputUserPassword} type="password" placeholder="Password" />
                    </Form.Group>
                <Form.Group className="mb-3 text-start" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                <Button variant="primary" type="button" onClick={fetchLogin}>
                        Submit
                    </Button>
                </Form>
            :
            <Panel />
    )

}


export default Login;