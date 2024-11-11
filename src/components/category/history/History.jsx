import React, { useEffect, useState } from 'react'
import Navbar from '../../navbar/Navbar';
import { Link } from 'react-router-dom';

function History() {
    const [sentOrders, setSentOrders] = useState([]);





    useEffect(() => {
        const sentOrders = JSON.parse(localStorage.getItem(`sentOrders`)) || [];
        setSentOrders(sentOrders)
    });
    return (
        <div>
            <Navbar />
      <nav className="navbar">
            <ul className="navbar-list">
                <Link to={"/cart"}>
                    <li className="navbar-item">
                        <div className='countDiv'>
                          <button>Cart</button>
                         

                        </div>

                    </li>

                </Link>

                <Link to={"/History"}>
                    <li className="navbar-item">
                        <div className='countDiv'>
                          <button>History</button>
                         

                        </div>

                    </li>

                </Link>

            </ul>
        </nav>
        {
                sentOrders.map((order, index) => (
                    <div>
                        {order.status === "complete" ? (
                            <div key={index} className='order-details'>
                                <h2>Order No: {order._id}</h2>
                                <h3>Order From House{order.house}, Road{order.road}, Sector{order.sector}, Uttara</h3>
                                <h3>Phone: {order.phoneNumber}</h3>
                                {order.orders.map((order, index) => (
                                    <div key={index} className="product-card">
                                        <div className="delete-div">


                                            {order.edited ? (
                                                <h4>Customized</h4>
                                            ) : (
                                                <h4>Regular</h4>
                                            )}
                                        </div>
                                        <div className="product-details">
                                            <h3>{order.name}</h3>
                                            {order.edited ? (
                                                <div>
                                                    {order.selectedSize ? (
                                                        <h4>{order.selectedSize}</h4>
                                                    ) : (
                                                        <h4>{order.size[0].size}</h4>
                                                    )}
                                                    {order.ingredients?.length > 0 ? (
                                                        order.ingredients.map((ingredient) => (
                                                            <div key={ingredient.id || ingredient.name}>
                                                                {ingredient.selected ? (
                                                                    <h6>Added: {ingredient.name}</h6>
                                                                ) : null}
                                                            </div>
                                                        ))
                                                    ) : null}
                                                </div>
                                            ) : (
                                                <h4>{order.size[0].size}</h4>
                                            )}
                                            <p>
                                                <span className="tk">৳</span>
                                                {order.price}
                                            </p>
                                        </div>
                                        <div className="add-minus-div">

                                            <h4 className="quantityDiv">{order.quantity}</h4>

                                        </div>
                                    </div>
                                ))}
                                {order.status === "process" ? (
                                    <h4>Your Order is on Process</h4>
                                ) : order.status === "granted" ? (
                                    <h4>Your Order is on the way</h4>
                                ) : order.status === "complete" ? (
                                    <h4>Your Order is completed</h4>
                                )
                                    : (
                                        <h4>Regular</h4>
                                    )
                                }
                            </div>

                        )
                            : (
                                null
                            )
                        }
                    </div>

                ))
            }
        </div>
    )
}

export default History