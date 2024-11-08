import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/Navbar';
import './cart.css';
import bin from './bin.png';
import io from "socket.io-client";
// const socket = io("http://localhost:5000");
// const socket = io("https://server-08ld.onrender.com");
const socket = io(`http://localhost:5000`);

function Cart() {
  const [orders, setOrders] = useState([]);
  const [sentOrders, setSentOrders] = useState([]);
  const [count, setCount] = useState(0);

  const [formData, setFormData] = useState({
    phoneNumber: '',
    sector: '',
    road: '',
    house: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission   here, e.g., send data to a server
    if (formData.phoneNumber.length === 11) {
      const orderData = {
        orders,
        phoneNumber: formData.phoneNumber,
        sector: formData.sector,
        road: formData.road,
        house: formData.house,
        status: "process"
      }
      console.log(orderData);
      socket.emit("send_order", orderData);
      const updatedOrders = [];

      setOrders(updatedOrders);

      const totalQuantity = updatedOrders.reduce(
        (acc, order) => acc + order.quantity,
        0
      );
      setCount(totalQuantity);
      localStorage.setItem('orders', JSON.stringify(updatedOrders));


    } else {
      alert("elter valid number")
    }

  };

  const add = (index) => {
    const updatedOrders = [...orders];
    updatedOrders[index] = {
      ...updatedOrders[index],
      quantity: updatedOrders[index].quantity + 1,
    };
    setOrders(updatedOrders);

    const totalQuantity = updatedOrders.reduce(
      (acc, order) => acc + order.quantity,
      0
    );
    setCount(totalQuantity);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  const minus = (index) => {
    const updatedOrders = [...orders];
    if (updatedOrders[index].quantity > 1) {
      updatedOrders[index] = {
        ...updatedOrders[index],
        quantity: updatedOrders[index].quantity - 1,
      };
    }
    setOrders(updatedOrders);

    const totalQuantity = updatedOrders.reduce(
      (acc, order) => acc + order.quantity,
      0
    );
    setCount(totalQuantity);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  const getItems = async () => {
    try {
      const orders = JSON.parse(localStorage.getItem(`orders`)) || [];
      const totalQuantity = orders.reduce((acc, order) => acc + order.quantity, 0);
      console.log(totalQuantity);


      // setCount(totalQuantity);
      setOrders(orders)
      setCount(totalQuantity);


      const sentOrders = JSON.parse(localStorage.getItem(`sentOrders`)) || [];
      setSentOrders(sentOrders)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleOrderSent = (data) => {
      console.log(data);
      try {
        const sentOrders = JSON.parse(localStorage.getItem('sentOrders')) || [];
        sentOrders.push(data);
        setSentOrders(sentOrders);
        localStorage.setItem('sentOrders', JSON.stringify(sentOrders));
      } catch (error) {
        console.error('Error parsing sentOrders from localStorage:', error);
        // Set a default value for sentOrders if needed
      }
    };
  
    const handleStatusGranted = (data) => {
      console.log('Status granted:', data.id, data.status);
  
      // Update state to trigger re-render
      setSentOrders((prevSentOrders) => {
        const updatedSentOrders = [...prevSentOrders];
        for (let i = 0; i < updatedSentOrders.length; i++) {
          const order = updatedSentOrders[i];
          if (order._id === data.id ) {
            order.status = data.status; // Update to the new status
            localStorage.setItem('sentOrders', JSON.stringify(updatedSentOrders)); // Update localStorage here
            
          }
        }
        return updatedSentOrders;
      });
      

      console.log(sentOrders); // This might not reflect the latest state update
    };

    getItems()
  
    socket.on('order_sent', handleOrderSent);
    socket.on('statusGranted', handleStatusGranted);
  
    // ... (rest of your code)
  
    return () => {
      socket.off('order_sent', handleOrderSent);
      socket.off('statusGranted', handleStatusGranted);
    };
  }, [socket]); // Optional: Remove getItems if it doesn't rely on socket or sentOrders

  const deleteItem = (index) => {
    const updatedOrders = [...orders];
    updatedOrders.splice(index, 1);
    setOrders(updatedOrders);

    const totalQuantity = updatedOrders.reduce(
      (acc, order) => acc + order.quantity,
      0
    );
    setCount(totalQuantity);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  return (
    <div>
      <Navbar count={count} />
      <div className="container">
        {orders.map((order, index) => (
          <div key={index} className="product-card">
            <div className="delete-div">
              <button onClick={() => deleteItem(index)} style={{ display: 'flex', justifyContent: 'center' }}>
                <img
                  className="removeImage"
                  src={bin}
                  alt="Remove"
                  style={{ width: '25px', height: '25px' }}
                />
                <span style={{ marginLeft: '5px' }}>Remove</span>
              </button>
              <img src={order.imageUrl} alt={order.name} className="product-image" />
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
              <button onClick={() => add(index)} className="add-btn">
                Plus
              </button>
              <h4 className="quantityDiv">{order.quantity}</h4>
              <button onClick={() => minus(index)} className="minus-btn">
                Minus
              </button>
            </div>
          </div>
        ))}
      </div>



      {count !== 0 ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}

              required
            />
          </div>
          <div>
            <label htmlFor="sector">Sector:</label>

            <input
              type="text"
              id="sector"
              name="sector"
              value={formData.sector}
              onChange={handleChange}

              required
            />
          </div>
          <div>
            <label htmlFor="road">Road:</label>
            <input
              type="text"
              id="road"
              name="road"
              value={formData.road}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="house">House:</label>
            <input
              type="text"
              id="house"
              name="house"
              value={formData.house}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <h3>Please place any order.....</h3>
      )
      }

      {
        sentOrders.map((order, index) => (
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
            ) : order.status === "complete" ?(
              <h4>Your Order is completed</h4>
            )
             : (
              <h4>Regular</h4>
            )
            }
          </div>
        ))
      }

    </div>
  );
}

export default Cart;