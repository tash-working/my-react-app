import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import viteLogo from '/vite.svg'
import './App.css'
import Category from './components/category/Category'
import Home from './components/home/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Category" element={<Category/>} />
      
      
        

    </Routes>
</BrowserRouter>
  )
}

export default App
