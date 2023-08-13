import React from 'react';
import axios from 'axios';

const baseServerUrl = 'http://127.0.0.1:8998/placeOrder/'

const FoodCard = ({ id, name, price, quantity, setChange, change }) => {
    const isAvailable = quantity > 0;
    let bg = isAvailable ? 'bg-purple-800' : 'bg-gray-700'
    let btnbg = isAvailable ? 'bg-blue-800' : 'bg-gray-500'
    let hBtn = isAvailable ? 'hover:bg-blue-700' : 'hover:bg-gray-400'

    const handleClick = async (evnt)=>{
        try{
            let price = evnt.target.getAttribute('data-price')
            let item = evnt.target.getAttribute('data-item')
            let name = prompt('Enter Customers name: ');
            let res = await axios.post(baseServerUrl, {price, 'customer': name, item})
            if(res.data.msg==='Order Placed')
            setChange(change+1);
            else
            alert('Something went wrong while placing an order')
        }catch(err){
            console.log(err)
        }
    }

    const handleDelete = async (evnt) =>{
        try{
            let dishId = evnt.target.getAttribute('data-id')
            let res = await axios.delete(`http://127.0.0.1:8998/deleteDish/${dishId}/`)
            setChange(change+1);
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div className="bg-gray-700 shadow-lg rounded-lg overflow-hidden w-3/12">
            <div className={`${bg} text-white text-center flex justify-between p-5 `}>
                <sup>#dish id: {id}</sup>
                <h3 className="text-lg font-semibold">{name}</h3>
            </div>
            <div className="p-4">
                <p className="text-gray-400">{isAvailable ? 'Available' : 'Out of stock'}</p>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-white font-semibold">Rs. {price.toFixed(2)}</span>
                    <button
                        className={`${btnbg} ${hBtn} text-white px-3 py-1 rounded-full transition duration-300 ease-in-out`}
                        disabled={!isAvailable} data-price={price} data-item={name} onClick={handleClick}
                    >
                        {isAvailable ? 'Order Now' : 'Sold Out'}
                    </button>
                    <button className='rounded-full bg-red-700 hover:bg-red-600 px-3 py-2 text-white' data-id={id} onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;
