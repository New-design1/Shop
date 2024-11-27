import React, { useState } from 'react';
import classes from '../../CustomHeader.module.css';
import CartItem from './CartItem';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Badge from 'react-bootstrap/Badge';

const Cart = (props) => {
    const [cartOpen, setCartOpen] = useState(false)
    const [cartActive, setCartActive] = useState(false)

    const openCart = () => setCartActive(true)
    const closeCart = () => setCartActive(false)

    let count = 19

    return (
        <div>
            <Button variant="primary" onClick={openCart} className="bi bi-cart3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16" style={{marginRight: 4, bottom: 2, position: 'relative'}}>
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"></path>
                </svg>
                Корзина
                {props.cartItems.length != 0 &&
                    <Badge bg="secondary" className="ms-1">{props.cartItems.length}</Badge>}
            </Button>

            <Offcanvas show={cartActive} onHide={closeCart} placement={'end'}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Ваши товары</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="d-flex flex-column justify-content-start">
                    {
                        (props.cartItems.map((item) =>
                            <CartItem item={item} key={item.id} removeFromCart={props.removeFromCart} />
                        ))
                    }
                    {props.cartItems.length != 0 &&
                        <Button variant="primary" onClick={openCart} className="bi bi-cart3"> Перейти к оформлению </Button>
                    }
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

export default Cart;