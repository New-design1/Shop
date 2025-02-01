import { useState, useRef, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ItemImage from '../Content/ItemImage';

const DeletionForm = (props) => {

    const [uniqueKey, setUniqueKey] = useState();
    const [path, setPath] = useState("images/");
    const [previewImages, setPreviewImages] = useState(props.values.images);

    useEffect(() => {
        setPreviewImages(props.values.images);
        setPath("images/");
        setUniqueKey(Date.now());
        name.current.value = props.values.name;
        price.current.value = props.values.price;
        manufacturer.current.value = props.values.manufacturer;
    }, [props.values]);

    const name = useRef();
    const price = useRef();
    const manufacturer = useRef();

    const handleClick = () => {
        props.fetchRequest();
    }

    return (
        <Form className="text-start ps-3 pb-3">
            <Form.Group className="mb-3 w-50">
                <Form.Label className="fs-5">Название</Form.Label>
                <Form.Control ref={name} value={props.values.name} type="text" />
            </Form.Group>
            <Form.Group className="mb-3 w-50">
                <Form.Label className="fs-5">Цена</Form.Label>
                <Form.Control ref={price} value={props.values.price} type="text" />
            </Form.Group>
            <Form.Group className="mb-3 w-50">
                <Form.Label className="fs-5">Производитель</Form.Label>
                <Form.Control ref={manufacturer} value={props.values.manufacturer} type="text" />
            </Form.Group>
            <Form.Group className="mb-3 w-50">
                <Form.Label className="fs-5">Изображения</Form.Label>
                <Form.Group className="mt-3 w-50">
                    <ItemImage key={uniqueKey} images={previewImages} path={path} />
                </Form.Group>
            </Form.Group>
            <Button variant="primary" type="button" onClick={handleClick}>
                Удалить
            </Button>
        </Form>
    )
}

export default DeletionForm;