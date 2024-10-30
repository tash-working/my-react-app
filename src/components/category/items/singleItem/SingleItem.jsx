import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './singleItem.css'
import Navbar from '../../../navbar/Navbar';


function SingleItem() {
   const {category, singleItem}= useParams()
   const [item, setItem] = useState([]);

   console.log(category, singleItem);


    
    const getItems = async () => {
        try {
          // const response = await fetch(`http://localhost:5000/getMenu/${category}`);
          // const jsonData = await response.json();
          // setMenu(jsonData[0].menu); // Assuming setItems is used for a different purpose
          // console.log(jsonData[0].menu);
    
          const menu = JSON.parse(localStorage.getItem(`menu`)) 
          const filteredItems = menu.filter(item => item.category === category);
          const filteredItem = filteredItems[0].items.filter(item => item.urlName === singleItem);
    
          console.log(filteredItem);
          setItem(filteredItem[0])
    
    
    
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
    
    
        getItems()
    
        // fetchData2()
      }, [])
    

   
  return (
    <div className="pizza-item">
        <Navbar></Navbar>
      <img src={item.imageUrl} alt={item.name} className="pizza-image" />
      <h2 className="pizza-name">{item.name}</h2>
    </div>
  )
}

export default SingleItem