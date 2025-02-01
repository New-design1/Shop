import classes from './CartItem.module.css';
import { FaTrash } from 'react-icons/fa';
import { IconContext } from 'react-icons'
import Card from 'react-bootstrap/Card';

const CartItem = (props) => {
    const pathToImagesFolder = "images/";

    return (
        <Card className="d-flex flex-row d-flex justify-content-between mb-3 h5">

            <img src={pathToImagesFolder + props.item.images[0]} className={classes.CartImg}></img>

            <div className={classes.CartText}>
                <div className={classes.CartItemName }>{props.item.name}</div> <br />

                
                <h4> {props.item.price}

                    <span className={"material-symbols-rounded " + classes.Price}>
                    currency_ruble
                    </span>
                </h4>
            </div>


            <IconContext.Provider value={{ size: 25 }} >
                <FaTrash className={classes.Trash} onClick={() => props.removeFromCart(props.item) } />
                </IconContext.Provider>
        </Card>
    )
}

export default CartItem;