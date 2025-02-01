import { useState } from 'react'
import Container from 'react-bootstrap/Container';
import CreationForm from './CreationForm';
import Alert from 'react-bootstrap/Alert';

const ProductCreate = () => {

    const [success, setSuccess] = useState(false);
    const [faild, setFaild] = useState(false);

    const closeAlerts = () => {

        setSuccess(false);
        setFaild(false);
    }
    async function createProduct(name, price, manufacturer, images) {

        const formData = new FormData();
        formData.append('name', name.current.value);
        formData.append('price', price.current.value);
        formData.append('manufacturer', manufacturer.current.value);
        for (let i = 0; i < images.current.files.length; i++) {
            formData.append(`image ${i}`, images.current.files[i]);
        }

        try {
            const response = await fetch('http://176.57.214.216/Phone/Create', {
                credentials: "include",
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer '.concat(sessionStorage.getItem('token'))
                },
                body: formData
            });
            if (response.ok) {
                document.getElementById('CreationForm').reset()
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

    return (
        <Container>
           <Alert show={success} variant="success">
                <p>
                  Товар успешно добавлен!
                </p>
           </Alert>
           <Alert show={faild} variant="danger">
                <p>
                    Ошибка при добавлении товара.
                </p>
            </Alert>
            <CreationForm fetchRequest={createProduct} />
        </Container>
    )
}

export default ProductCreate;