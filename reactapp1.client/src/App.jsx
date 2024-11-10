import './App.css';
import Side from './Components/Side/Side';
import Content from './Components/Content/Content';
import CustomHeader from './CustomHeader';
import Header from './Components/Header/Header.jsx';
import { useState } from 'react';


function App() {

    const [cartItems, setCartItems] = useState([])

    const addItemsToCart = (item) => {
        let existItem = cartItems.find(i => i.id == item.id)
        if (existItem === undefined)
            setCartItems([...cartItems, item])
    }

    const removeItemFromCart = (item) => {
        let filtredItems = cartItems.filter(i => i.id != item.id)
        setCartItems([...filtredItems])
    }

    return (
        <div>
            {/*<CustomHeader cartItems={cartItems} />*/}
            <Header cartItems={cartItems} removeFromCart={removeItemFromCart} />
            <div className="App">
                <Side />
                <Content addToCart={addItemsToCart} />
            </div>
        </div>
    );
}

export default App;