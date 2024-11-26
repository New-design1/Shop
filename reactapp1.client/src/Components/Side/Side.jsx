import classes from './Side.module.css';
import Form from 'react-bootstrap/Form';

const Side = (props) => {

    return (
        <div className={classes.side}>
            <Form className="mb-3">
                <h3 style={{ textAlign: 'center', paddingBottom: '20px' }}>Категории</h3>
                <Form.Label className="ms-3 h6">Производитель</Form.Label>
                {props.manufacturers.map((item, index) => <Form.Check
                    className="ms-3"
                    onClick={() => props.changePickedManufactures(item)}
                    type={'checkbox'}
                    key={`${index}`}
                    label={`${item}`}
                />)
                }
            </Form>
        </div>
    )
}

export default Side;