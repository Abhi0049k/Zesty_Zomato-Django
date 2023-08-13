import axios from 'axios';
import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const AddDishModal = ({ isOpen, closeModal, change, setChange }) => {
    const [formData, setformData] = useState({
        name: '',
        price: '',
        quantity: ''
    })

    const handleChange = (evnt) => {
        const { name, value } = evnt.target;
        setformData({ ...formData, [name]: value });
    }

    const handleSubmit = async (evnt)=>{
        evnt.preventDefault();
        try{
            let res = await axios.post('http://127.0.0.1:8998/addDish/', formData);
            console.log(res.data);
            setChange(change+1);
            closeModal();
        }catch(err){
            console.log(err);
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Add Dish Modal"
            className="modal-content absolute h-full w-full top-0 z-10 flex justify-center items-center bg-slate-200 bg-opacity-80"
            overlayClassName="modal-overlay"
        >
            <form className='border p-6 rounded-lg w-80 flex flex-col gap-3 shadow-lg bg-white' onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-4">Add Dish</h2>
                <label className='block'>
                    <span className="block text-sm font-medium text-slate-700">Dish</span>
                    <input type="text" value={formData.name} name='name' onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "/>
                </label>
                <label>
                    <span className="block text-sm font-medium text-slate-700">Price</span>
                    <input type="number" value={formData.price} name='price' onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "/>
                </label>
                <label>
                    <span className="block text-sm font-medium text-slate-700">Quantity</span>
                    <input type="number" value={formData.quantity} name='quantity' onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "/>
                </label>
                <input type="submit" value="Add Dish" className='border rounded-md p-2 hover:bg-blue-500 hover:text-white cursor-pointer' />
                <button onClick={closeModal} className="bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded-md">Close</button>
            </form>
        </Modal>
    );
};

export default AddDishModal;
