import './App.css';
import Side from './Components/Side/Side';
import Content from './Components/Content/Content';
import Header from './Components/Header/Header.jsx';
import { useState, useEffect } from 'react';


function App() {

    const [cartItems, setCartItems] = useState([]);
    const [items, setItems] = useState([]);
    const [manufacturers, setManufacturers] = useState([]);
    const [filteredItems, setFilteredItems] = useState(items);
    const [pickedManufactures, setPickedManufactures] = useState([]);

    //useEffect(() => { fetchItems() }, []);
    useEffect(() => { fetchManufactures() }, []);
    useEffect(() => {
        console.log('fetch worked 2');
        async function fetchingByFilter() {
            console.log('fetch worked 2');
            const result = await fetch('https://localhost:7204/Phone/FilterPhones', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(pickedManufactures)
                });
            const data = await result.json();
            setItems(data);
        }
        fetchingByFilter();
    }, [pickedManufactures]);
    //async function fetchItems() {
    //    const response = await fetch('https://localhost:7204/Phone/GetAllPhones');
    //    console.log('fetch worked');
    //    const data = await response.json();
    //    setItems(data);
    //}

    async function fetchManufactures() {
        const response = await fetch('https://localhost:7204/Phone/GetManufacturers');
        const data = await response.json();
        setManufacturers(data);
    }

    const changePickedManufactures = (manufact) => {
        let existItem = pickedManufactures.find(m => m == manufact);
        if (existItem === undefined)
            setPickedManufactures([...pickedManufactures, manufact]);
        else
            setPickedManufactures(pickedManufactures.filter(m => m != manufact));
    }

    const addItemsToCart = (item) => {
        let existItem = cartItems.find(i => i.id == item.id);
        if (existItem === undefined)
            setCartItems([...cartItems, item]);
    }

    const removeItemFromCart = (item) => {
        let filtredItems = cartItems.filter(i => i.id != item.id)
        setCartItems([...filtredItems])
    }

    return (
        <div>
            <Header cartItems={cartItems} removeFromCart={removeItemFromCart} />
            <div className="App">
                <Side manufacturers={manufacturers} changePickedManufactures={changePickedManufactures} />
                <Content addToCart={addItemsToCart} items={items} />
            </div>
        </div>
    );
}

export default App;