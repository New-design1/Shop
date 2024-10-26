import './App.css';
import Side from './Components/Side/Side';
import Content from './Components/Content/Content'
import CustomHeader from './CustomHeader.jsx';
import { useState } from 'react'


function App() {

    const [cartItems, setCartItems] = useState([])

    const addItemsToCart = (item) => {
        let existItem = cartItems.find(i => i.id == item.id)
        if (existItem === undefined)
            setCartItems([...cartItems, item])
        console.log("Item added")
    }

    return (
        <div>
            <CustomHeader cartItems={cartItems} />
            <div className="App">
                <Side />
                <Content addToCart={addItemsToCart} />
            </div>
        </div>
    );
    /*const [forecasts, setForecasts] = useState();

    useEffect(() => {
        populateWeatherData();
    }, []);

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.date}>
                        <td>{forecast.date}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.summary}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tableLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );
    
    async function populateWeatherData() {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        setForecasts(data);
    }*/
}

export default App;