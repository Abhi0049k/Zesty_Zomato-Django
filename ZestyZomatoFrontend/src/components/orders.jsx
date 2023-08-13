import React, { useState, useEffect } from 'react'
import Navbar from './navbar'
import axios from 'axios'
import OrderCard from './orderCard'

const baseServerUrl = 'http://127.0.0.1:8998/'

const Order = () => {
    const [order, setOrder] = useState([])
    const [change, setChange] = useState(0)
    const [totalSales, setTotalSales] = useState(0)
    useEffect(() => {
        (async () => {
            let items = await axios.get(`${baseServerUrl}allOrders/`);
            setOrder(items.data);
            let ts = await axios.get(`${baseServerUrl}totalSales/`)
            setTotalSales(ts.data[0]['total_sales'])
        })();
    }, [change])
    return (
        <>
            <Navbar setChange={setChange} change={change} totalSales={totalSales} />
            <div className="bg-gray-100 py-4">
                <h1 className="text-2xl font-semibold text-center mb-3">Zesty Zomato Menu</h1>
                <div className="container mx-auto flex flex-wrap justify-center gap-4">
                    {
                        order.map((el, i)=> <OrderCard key={i} id={el.id} customer={el.customer} price={el.price} item={el.item} change={change} setChange={setChange}/>)
                    }
                </div>
            </div>
        </>
    )
}

export default Order
