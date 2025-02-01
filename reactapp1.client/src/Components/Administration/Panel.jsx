import { useState, useRef } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ProductCreate from './ProductCreate';
import ProductEdit from './ProductEdit';
import ProductDelete from './ProductDelete';

const Panel = () => {

    const [action, setAction] = useState('1');

    const onChangeAction = (event) => {
        setAction(event.target.value);
    }

    return (
        <Container className="bg-light p-0 pb-4" >
            <Navbar className="mb-4" bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand>MyShop Administration</Navbar.Brand>
                    <Nav className="me-auto">
                        <Form.Select onChange={onChangeAction}>
                            <option value='1'>Добавление</option>
                            <option value='2'>Изменение</option>
                            <option value='3'>Удаление</option>
                        </Form.Select>
                    </Nav>
                </Container>
            </Navbar>
            {(action === '1') && <ProductCreate />}
            {(action === '2') && <ProductEdit />}
            {(action === '3') && <ProductDelete />}
        </Container>
    )
}

export default Panel;