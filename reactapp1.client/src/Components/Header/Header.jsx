import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Cart from './Cart';

const Header = (props) => {

    return (
        <Navbar className="mb-4" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand>MyShop</Navbar.Brand>
                {/*<Nav className="me-auto">*/}
                {/*    <NavDropdown title="Каталог" id="basic-nav-dropdown" className="ms-5">*/}
                {/*        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*/}
                {/*        <NavDropdown.Item href="#action/3.2">*/}
                {/*            Another action*/}
                {/*        </NavDropdown.Item>*/}
                {/*        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
                {/*        <NavDropdown.Item href="#action/3.4">*/}
                {/*            Separated link*/}
                {/*        </NavDropdown.Item>*/}
                {/*    </NavDropdown>*/}
                {/*</Nav>*/}
                <Cart cartItems={props.cartItems} removeFromCart={props.removeFromCart} ></Cart>
        </Container>
        </Navbar>
    )
}

export default Header;