import React from 'react'
import { useState } from 'react'

const Panel = () => {

    const [inputName, setInputName] = useState("");
    const [inputPrice, setInputPrice] = useState("");

    const nameHandler = (event) => {
        setInputName(event.target.value)
    }

    const priceHandler = (event) => {
        setInputPrice(event.target.value)
    }

    async function fetchAdd() {

        let phone = {
            Name: inputName,
            Price: inputPrice
        };

        const response = await fetch('https://localhost:7204/Phone/Create', {
            credentials: "include",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'Bearer '.concat(sessionStorage.getItem('token'))
            },
            body: JSON.stringify(phone)
        });

        if (response.ok) {
            setInputName("");
            setInputPrice("");
        }
    }

    return (
        <div>
            Panel
            <form>
                <input onChange={nameHandler} type="text" value={inputName} />
                <input onChange={priceHandler} type="text" value={inputPrice} />
                <input type="button" value="Add" onClick={fetchAdd} />
            </form>
        </div>
    )
}

export default Panel;