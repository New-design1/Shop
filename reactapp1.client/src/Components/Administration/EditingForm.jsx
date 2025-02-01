import { useState, useRef, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ItemImage from '../Content/ItemImage';

const EditForm = (props) => {

    const [formDataErrors, setFormDataErrors] = useState({
        name: '',
        price: '',
        manufacturer: '',
        images: ''
    });

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
    const images = useRef();

    const handleClick = () => {
        const errors = validateForm();
        setFormDataErrors(errors);

        if (Object.keys(errors).length === 0) {
            props.fetchRequest(name, price, manufacturer, images)
        }
    }

    const validateForm = () => {
        const errors = {};

        if (!name.current.value.trim())
            errors.name = 'Заполните название';
        if (!price.current.value.trim())
            errors.price = 'Заполните стоимость';
        if (!manufacturer.current.value.trim())
            errors.manufacturer = 'Заполните производителя';
        if (images.current.files.length > 5)
            errors.images = 'Количество прикрепленных изображений товара больше 5';

        return errors;
    }

    function onChangeImgages() {
        if (images.current !== undefined) {
            let files = Array.from(images.current.files)
            const imageURLs = files.map(file => URL.createObjectURL(file));
            setPreviewImages(imageURLs);
        }
        setPath("");
        setUniqueKey(Date.now());
    }

    return (
        <Form className="text-start ps-3 pb-3">
            <Form.Group className="mb-3 w-50">
                <Form.Label className="fs-5">Название</Form.Label>
                <Form.Control ref={name} isInvalid={formDataErrors.name} defaultValue={props.values.name} type="text" />
                <div className="invalid-feedback">
                    {formDataErrors.name}
                </div>
            </Form.Group>
            <Form.Group className="mb-3 w-50">
                <Form.Label className="fs-5">Цена</Form.Label>
                <Form.Control ref={price} isInvalid={formDataErrors.price} defaultValue={props.values.price} type="text" />
                <div className="invalid-feedback">
                    {formDataErrors.price}
                </div>
            </Form.Group>
            <Form.Group className="mb-3 w-50">
                <Form.Label className="fs-5">Производитель</Form.Label>
                <Form.Control ref={manufacturer} isInvalid={formDataErrors.manufacturer} defaultValue={props.values.manufacturer} type="text" />
                <div className="invalid-feedback">
                    {formDataErrors.manufacturer}
                </div>
            </Form.Group>
            <Form.Group className="mb-3 w-50">
                <Form.Label className="fs-5">Изображения</Form.Label>
                <Form.Control ref={images} onChange={onChangeImgages} type="file" accept="image/*" multiple isInvalid={formDataErrors.images} />
                <div className="invalid-feedback">
                    {formDataErrors.images}
                </div>
                <Form.Group className="mt-3 w-50">
                    <ItemImage key={uniqueKey} images={previewImages} path={path} />
                </Form.Group>
            </Form.Group>
            <Button variant="primary" type="button" onClick={handleClick}>
                Изменить
            </Button>
        </Form>
    )
}

export default EditForm;