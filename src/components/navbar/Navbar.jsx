import React, { useEffect, useState } from 'react';
import './navbar.css'; // Import the CSS file
import { Link } from 'react-router-dom';

function Navbar({ count }) {
    const [orders, setOrders] = useState([]);
    const [orderCount, setOrderCount] = useState(0);



    const getData = () => {
        const orders = JSON.parse(localStorage.getItem(`orders`)) || [];
        const totalQuantity = orders.reduce((acc, order) => acc + order.quantity, 0);
        console.log(totalQuantity);


        // setCount(totalQuantity);
        setOrders(orders)
        setOrderCount(totalQuantity);


    }
    useEffect(() => {

        getData()

            ;
        // fetchData2()
    }, [count])
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <Link to={"/cart"}>
                    <li className="navbar-item">
                        <div className='countDiv'>
                            <h3>cart</h3>
                            <h3 className="count">{orderCount}</h3>

                        </div>

                    </li>

                </Link>

                <li className="navbar-item">
                    <Link to={"/"}><h3>Home</h3></Link>

                </li>

            </ul>
        </nav>
    );
}

export default Navbar;