import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AddDishModal from './AddDishModal'

const Navbar = ({setChange, change, totalSales}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const openModal = () => {
        setModalIsOpen(true)
    }

    const closeModal = () => {
        setModalIsOpen(false)
        setChange(change+1)
    }

    return (
        <nav className="bg-gray-800 p-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-white font-extrabold text-4xl">
                    Zesty Zomato
                </Link>
                <ul className="flex space-x-6 items-center">
                    <li>
                        <h3 className="text-white hover:text-gray-300">
                            Total Sales: Rs. {totalSales}
                        </h3>
                    </li>
                    <li>
                        <Link to="/" className="text-white hover:text-gray-300">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/orders" className="text-white hover:text-gray-300">
                            Orders
                        </Link>
                    </li>
                    <li>
                        <button onClick={openModal} className="bg-blue-700 hover:bg-blue-500 text-white py-2 px-6 rounded-md">
                            Add Dish
                        </button>
                    </li>
                </ul>
            </div>
            <AddDishModal isOpen={modalIsOpen} closeModal={closeModal} change={change} setChange={setChange} />
        </nav>
    )
}

export default Navbar
