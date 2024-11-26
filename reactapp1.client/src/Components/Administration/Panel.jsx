import { useState, useRef } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Panel = () => {

    const [inputName, setInputName] = useState("");
    const [inputPrice, setInputPrice] = useState("");
    const name = useRef();
    const price = useRef();
    const manufacturer = useRef();
    const images = useRef();

    const nameHandler = (event) => {
        setInputName(event.target.value)
    }

    const priceHandler = (event) => {
        setInputPrice(event.target.value)
    }

    async function fetchAdd() {

        const formData = new FormData();
        formData.append('name', name.current.value);
        formData.append('price', price.current.value);
        formData.append('manufacturer', manufacturer.current.value);
        for (let i = 0; i < images.current.files.length; i++) {
            formData.append(`image ${i}`, images.current.files[i]);
        }

        const response = await fetch('https://localhost:7204/Phone/Create', {
            credentials: "include",
            method: 'POST',
            headers: {
                'Authorization': 'Bearer '.concat(sessionStorage.getItem('token'))
            },
            body: formData
        });
    }

    return (
        <Container className="bg-light p-0 pb-4">
            <Navbar className="mb-4" bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand>MyShop Administration</Navbar.Brand>
                    <Nav className="me-auto">
                        <Form.Select>
                            <option value="1">Добавление</option>
                            <option value="2">Изменение</option>
                            <option value="3">Удаление</option>
                        </Form.Select>
                    </Nav>
                </Container>
            </Navbar>
            <Form className="text-start ps-3 pb-3">
                <Form.Group className="mb-3 w-50">
                    <Form.Label className="fs-5">Название</Form.Label>
                    <Form.Control ref={name} type="text" />
                </Form.Group>
                <Form.Group className="mb-3 w-50">
                    <Form.Label className="fs-5">Цена</Form.Label>
                    <Form.Control ref={price} type="text" />
                </Form.Group>
                <Form.Group className="mb-3 w-50">
                    <Form.Label className="fs-5">Производитель</Form.Label>
                    <Form.Control ref={manufacturer} type="text" />
                </Form.Group>
                <Form.Group className="mb-3 w-50">
                    <Form.Label className="fs-5">Изображения</Form.Label>
                    <Form.Control ref={images} type="file" multiple />
                </Form.Group> 
            </Form>
            <div style={{ textAlign: 'left', paddingLeft: '16px' }}>
                <Button variant="primary" type="button" onClick={fetchAdd}>
                    Добавить
                </Button>
            </div>
        </Container>
    )
}

export default Panel;