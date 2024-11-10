import React, {useState} from 'react';
import classes from './CustomHeader.module.css';
import CartItem from './Components/Header/CartItem';


const CustomHeader = (props) => {
    const [сartOpen, setСartOpen] = useState(false)

    return (
        <div className={classes.CustomHeader}>
            <h2>Phone Shop</h2>

            <button onClick={() => setСartOpen(!сartOpen)} className={сartOpen ? classes.CartOpen : classes.Cart}>Корзина</button>
            {сartOpen &&
                (
                    <div className={classes.CartOpenArea}>
                    {
                            props.cartItems.length == 0 ?
                                <h2>Нет товаров</h2>
                                :
                            (props.cartItems.map((item) =>
                                    <CartItem item={item} key={item.id} />
                            )) 
                    }
                    {
                        props.cartItems.length != 0 &&
                        <button style={{ marginBottom:20 }}>Оформить заказ</button>
                    }
                    </div>
                )
            }  
        </div>
    )
}

export default CustomHeader;