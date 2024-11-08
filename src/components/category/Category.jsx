import React, { useEffect, useState } from 'react'
import './category.css'

import { useParams } from 'react-router-dom'
import Items from './items/Items';
import Navbar from '../navbar/Navbar';

function Category() {
  const { category } = useParams();
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  // const [ingredients, setIngredients] = useState([]);

  const getItems = async () => {
    try {
      // const response = await fetch(`server-eight-sepia-51.vercel.app/getMenu/${category}`);
      // const jsonData = await response.json();
      // setMenu(jsonData[0].menu); // Assuming setItems is used for a different purpose
      // console.log(jsonData[0].menu);

      const menu = JSON.parse(localStorage.getItem(`menu`)) 
      const filteredItems = menu.filter(item => item.category === category);

      console.log(filteredItems[0].items);
      setItems(filteredItems[0].items)



    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {


    getItems()

    // fetchData2()
  }, [])
  const getCount =(data)=>{
      console.log(data);
      setCount(data)
      
  }


  return (
    <div>
      <Navbar count={count}></Navbar>
      <h1>{category}</h1>
      <div className='container'>
     
     {
       items.map((item) => (
         <Items getCount={getCount} key={item.urlName} item={item} category={category}></Items>

       ))
     }

   </div>

    </div>
    
  )
}

export default Category