import React, { useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar';
import './cart.css'


function Cart() {
    const [orders, setOrders] = useState([]);
    const [count, setCount] = useState(0);
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
        setOrders(Object.values(groupedItems));


    }

    const getItems = async () => {

        try {
            // const response = await fetch(`http://localhost:5000/getMenu/${category}`);
            // const jsonData = await response.json();
            // setMenu(jsonData[0].menu); // Assuming setItems is used for a different purpose
            // console.log(jsonData[0].menu);

            const orders = JSON.parse(localStorage.getItem(`orders`)) || []
            // setOrders(orders)
            setOrders(orders)





        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {


        getItems()

        // fetchData2()
    }, [])
    const deleteItem = (index) => {
        const updatedOrders = [...orders]; // Create a copy of the orders array
        updatedOrders.splice(index, 1); // Remove the item at the specified index
        setOrders(updatedOrders); // Update the state with the modified orders
        setCount(updatedOrders.length)
        localStorage.setItem(`orders`, JSON.stringify(updatedOrders)); // Update localStorage
    };


    return (
        <div>
            <Navbar count={count}></Navbar>
            <div className='container'>
                {
                    orders.map((order, index) => (

                        <div key={index} className="product-card">
                            <div onClick={() => { deleteItem(index) }} className='delete-div'>
                                <button>delete</button>
                                <img src={order.imageUrl} alt={order.name} className="product-image" />
                                {order.edited ? (

                                    <h4>Customised</h4>
                                ) : (
                                    <h4>Regular</h4>
                                )}

                            </div>
                            <div className="product-details">

                                <h3>{order.name}</h3>
                                {order.edited ? (
                                    <div>
                                        {
                                            order.selectedSize ?(
                                                <h4>{order.selectedSize}</h4>
                                            ):(
                                                <h4>{order.size[0]}</h4>
                                            )
                                        }
                                        
                                        {order.ingredients?.map((ingredient) => (
                                            <div key={ingredient.id || ingredient.name}>
                                                {ingredient.selected ? (
                                                    <h6>Added:{ingredient.name}</h6>
                                                ) : null}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <h4>{order.size[0].size}</h4>
                                )}


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