import React, { useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar';
import './cart.css'


function Cart() {
    const [orders, setOrders] = useState([]);
    function consolidateItems(items) {
        const groupedItems = {};

        for (const item of items) {
          const { urlName } = item;
      
          // Check if an object already exists for this urlName
          if (groupedItems[urlName]) {
            // If it exists, increment the quantity and potentially merge other properties
            groupedItems[urlName].quantity = (groupedItems[urlName].quantity || 1) + 1;
            // You can optionally merge other properties here (e.g., total price)
          } else {
            // If it doesn't exist, create a new object with quantity 1 and copy the item's data
            groupedItems[urlName] = { ...item, quantity: 1 };
          }
        }
      
        // Convert the grouped object back to an array
        setOrders( Object.values(groupedItems));
        
        
      }

    const getItems = async () => {

        try {
            // const response = await fetch(`http://localhost:5000/getMenu/${category}`);
            // const jsonData = await response.json();
            // setMenu(jsonData[0].menu); // Assuming setItems is used for a different purpose
            // console.log(jsonData[0].menu);

            const orders = JSON.parse(localStorage.getItem(`orders`)) || []
            // setOrders(orders)
            consolidateItems(orders)




        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {


        getItems()

        // fetchData2()
    }, [])


    return (
        <div>
            <Navbar></Navbar>
            <div className='container'>
                {
                    orders.map((order, index) => (

                        <div key={index} className="product-card">
                            <img src={order.imageUrl} alt={order.name} className="product-image" />

                            <div className="product-details">

                                <h3>{order.name}</h3>


                                <p> <span className='tk'>৳</span>{order.price}</p>

                            </div>
                           <div className='add-minus-div'>
                           <button className="add-btn">Plus</button>

                            <h4 className='quantityDiv' >{order.quantity}</h4>
                            <button className="minus-btn">Minus</button>
                           </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Cart