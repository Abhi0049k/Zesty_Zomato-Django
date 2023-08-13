import React from 'react';
import axios from 'axios';

const OrderCard = ({ id, customer, price, item, change, setChange }) => {
    const handleDelete = async (evnt) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8998/deleteOrder/${id}/`);
            console.log(response.data);
            setChange(change+1);
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    return (
        <div className="border p-4 mb-4">
            <h3 className="text-lg font-semibold">Order ID: {id}</h3>
            <p>Customer: {customer}</p>
            <p>Price: {price.toFixed(2)}</p>
            <p>Item: {item}</p>
            <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                data-id={id} onClick={handleDelete}
            >
                Delete
            </button>
        </div>
    );
};

export default OrderCard;
