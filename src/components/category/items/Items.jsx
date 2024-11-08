import _ from 'lodash';
import React from 'react'
import { Link, useParams } from 'react-router-dom';

function Items({ getCount, category, item }) {
  const setOrder =()=>{
    const newItem =item
    const orders = JSON.parse(localStorage.getItem(`orders`)) || [];
    // orders.push(item)
    // getCount(orders.length)


    newItem.edited = false;
      // newItem.price = price + totalSelectedPrice;
      // newItem.addOns = ingredients;
      // newItem.selectedSize = selectedSize;

      const index = orders.findIndex(element => 
        _.isEqual(newItem.name, element.name) && 
        _.isEqual(newItem.ingredients, element.ingredients) && 
        _.isEqual(newItem.selectedSize, element.selectedSize));
      
      if (index !== -1) {
        console.log('Object found!');
        orders[index].quantity += 1
         // Update existing object
      } else {
        console.log('Object not found.');
        newItem.quantity = 1;
        orders.push(newItem); // Only push if not found
      }
      const totalQuantity = orders.reduce((acc, order) => acc + order.quantity, 0);
      console.log(totalQuantity);
      
  
      getCount(totalQuantity);
      localStorage.setItem('orders', JSON.stringify(orders));
       
    // localStorage.setItem(`orders`, JSON.stringify(orders));

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