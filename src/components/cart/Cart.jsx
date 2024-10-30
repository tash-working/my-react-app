import React, { useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar';

function Cart() {
    const [orders, setOrders] = useState([]);

    const getItems = async () => {

        try {
            // const response = await fetch(`http://localhost:5000/getMenu/${category}`);
            // const jsonData = await response.json();
            // setMenu(jsonData[0].menu); // Assuming setItems is used for a different purpose
            // console.log(jsonData[0].menu);

            const orders = JSON.parse(localStorage.getItem(`orders`))
            setOrders(orders)




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
            {
                orders.map((order)=>(
                    <div>
                       {order.name}
                    </div>
                ))
            }
        </div>
    )
}

export default Cart