import { useState, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import EditingForm from './EditingForm';
import Alert from 'react-bootstrap/Alert';

const ProductEdit = () => {

    const name = useRef();
    const [isFound, setIsFound] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [productsList, setProductsList] = useState([]);
    const [product, setProduct] = useState();
    const [success, setSuccess] = useState(false);
    const [faild, setFaild] = useState(false);

    const closeAlerts = () => {

        setSuccess(false);
        setFaild(false);
    }
    function controlChange() {
        if (name.current.value === '') {
            setIsFound(false);
            return;
        }

        searchProduct(name.current.value)
    }

    async function searchProduct(word) {
        const response = await fetch('http://176.57.214.216/Phone/SearchPhone', {
            credentials: "include",
            method: 'POST',
            headers: {
                'Authorization': 'Bearer '.concat(sessionStorage.getItem('token')),
            },
            body: word
        });

        if (response.ok) {
            const data = await response.json();
            setProductsList(data);
            setIsFound(true);
        }
    }

    async function updateProduct(name, price, manufacturer, images) {
        const formData = new FormData();
        formData.append('id', product.id)
        formData.append('name', name.current.value);
        formData.append('price', price.current.value);
        formData.append('manufacturer', manufacturer.current.value);
        for (let i = 0; i < images.current.files.length; i++) {
            formData.append(`image ${i}`, images.current.files[i]);
        }

        try {
            const response = await fetch('http://176.57.214.216/Phone/Update', {
                credentials: "include",
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer '.concat(sessionStorage.getItem('token'))
                },
                body: formData
            });
            if (response.ok) {
                setSuccess(true);
                setTimeout(closeAlerts, 8000);
            }
            else {
                setFaild(true);
                setTimeout(closeAlerts, 8000);
            }
        }
        catch
        {
            setFaild(true);
            setTimeout(closeAlerts, 8000);
        }
    }

    async function pickProduct(productName) {
        const response = await fetch('http://176.57.214.216/Phone/GetPhoneByName', {
            credentials: "include",
            method: 'POST',
            headers: {
                'Authorization': 'Bearer '.concat(sessionStorage.getItem('token')),
            },
            body: productName
        });

        if (response.ok) {
            let data = await response.json();
            name.current.value = '';
            setIsFound(false);
            setProduct(data);
            setShowForm(true);
        }
    }

    return (
        <Container>
            <Form.Control ref={name} onChange={controlChange} type="text" placeholder="Название товара" />
            {isFound && <ListGroup className="mt-1" variant="primary">
                {productsList.map((item) => <ListGroup.Item action onClick={() => { pickProduct(item) }} key={item.id}>{item}</ListGroup.Item>)}
            </ListGroup>}
            <Alert show={success} variant="success">
                <p>
                    Товар изменен.
                </p>
            </Alert>
            <Alert show={faild} variant="danger">
                <p>
                    Ошибка при изменении товара.
                </p>
            </Alert>
            <Container className="mt-4">
                {showForm && <EditingForm fetchRequest={updateProduct} values={product} />}
            </Container>
        </Container>
    )
}

export default ProductEdit;