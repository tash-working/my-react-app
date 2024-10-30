import React from 'react'
import { Link, useParams } from 'react-router-dom';

function Items({ getCount, category, item }) {
  const setOrder =()=>{
    const orders = JSON.parse(localStorage.getItem(`orders`)) || [];
    orders.push(item)
    getCount(orders.length)
       
    localStorage.setItem(`orders`, JSON.stringify(orders));

  }
  

  return (
    <div key={item.name} className="product-card">
      <Link to={`/${category}/${item.urlName}`}>
        <img src={item.imageUrl} alt={item.name} className="product-image" />

      </Link>

      <div className="product-details">

        <h3>{item.name}</h3>


        <p> <span className='tk'>৳</span>{item.price}</p>
        <button onClick={setOrder} className="add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
  )
}

export default Items