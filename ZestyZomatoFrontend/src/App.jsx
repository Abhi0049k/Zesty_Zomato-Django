import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/home'
import { useState } from 'react'
import Order from './components/orders'

function App() {
  const [change, setChange] = useState(0)
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route element={<Home/>} path='/'/>
      <Route element={<Order/>} path='/orders'/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
