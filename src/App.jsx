import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import viteLogo from '/vite.svg'
import './App.css'
import Category from './components/category/Category'
import Home from './components/home/Home'
import Items from './components/category/items/Items'
import SingleItem from './components/category/items/singleItem/SingleItem'
import Cart from './components/cart/Cart'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/:category" element={<Category/>} />
        <Route path="/:category/:singleItem" element={<SingleItem/>} />
      
      
        

    </Routes>
</BrowserRouter>
  )
}

export default App
