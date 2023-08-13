import React, { useEffect, useState } from 'react'
import axios from 'axios'
import FoodCard from './card'
import Navbar from './navbar'

const baseServerUrl = 'http://127.0.0.1:8998/'

const Home = () => {
    const [Dish, setDish] = useState([])
    const [change, setChange] = useState(0)
    const [totalSales, setTotalSales] = useState(0)
    useEffect(() => {
        (async () => {
            let items = await axios.get(`${baseServerUrl}allDishes/`);
            setDish(items.data);
            let ts = await axios.get(`${baseServerUrl}totalSales/`)
            setTotalSales(ts.data[0]['total_sales'])
        })();
    }, [change])
    return (
        <>
            <Navbar setChange={setChange} change={change} totalSales={totalSales}/>
            <div className="bg-gray-100 py-4">
                <h1 className="text-2xl font-semibold text-center mb-3">Zesty Zomato Menu</h1>
                <div className="container mx-auto flex flex-wrap justify-center gap-4">
                    {
                        Dish.map((el, i) => <FoodCard key={i} id={el.id} name={el.name} price={el.price} quantity={el.quantity} setChange={setChange} change={change} />)
                    }
                </div>
            </div>
        </>
    )
}

export default Home
