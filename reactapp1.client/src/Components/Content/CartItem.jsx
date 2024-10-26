import classes from './CartItem.module.css';
import { FaTrash } from 'react-icons/fa';
import { IconContext } from 'react-icons'


const CartItem = (props) => {
    const pathToImagesFolder = "../../../src/Images/";

    return (
        <div className={classes.CartItem}>
        
            <img src={pathToImagesFolder + props.item.images[0]}></img>
            
            <div>
            {props.item.name} <br /> <br />
                {props.item.price}
            </div>

            
            <IconContext.Provider value={{size: 25} }>
                <FaTrash className={classes.Trash} />
                </IconContext.Provider>
            
        </div>
    )
}

export default CartItem;