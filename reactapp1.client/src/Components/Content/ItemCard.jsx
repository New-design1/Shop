import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ItemImage from './ItemImage';
import classes from './ItemCard.module.css'

const ItemCard = (props) => {

    return (

        <Card style={{ width: '19rem' }} className="me-5 mb-5">
            <ItemImage images={props.item.images} />
            <Card.Body>
                <Card.Title className="text-start">{props.item.name}</Card.Title>
                <Card.Text className="text-start h4 mb-3">
                    {props.item.price}
                    <span className={"material-symbols-rounded " + classes.Price}>
                        currency_ruble
                    </span>
                </Card.Text>
                <Button variant="primary" onClick={() => props.addToCart(props.item)}>Купить</Button>
            </Card.Body>
        </Card>
    )
}

export default ItemCard;