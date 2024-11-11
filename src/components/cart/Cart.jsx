import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import bin from "./bin.png";
import io from "socket.io-client";
import { Link } from "react-router-dom";
// const socket = io("https://server-08ld.onrender.com");
// const socket = io("https://server-08ld.onrender.com");
const socket = io(`https://server-08ld.onrender.com`);

function Cart() {
  const [orders, setOrders] = useState([]);
  const [sentOrders, setSentOrders] = useState([]);
  const [count, setCount] = useState(0);

  const [formData, setFormData] = useState({
    phoneNumber: "",
    sector: "",
    road: "",
    house: "",
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
        status: "process",
      };
      console.log(orderData);
      socket.emit("send_order", orderData);
      const updatedOrders = [];

      setOrders(updatedOrders);

      const totalQuantity = updatedOrders.reduce(
        (acc, order) => acc + order.quantity,
        0
      );
      setCount(totalQuantity);
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
    } else {
      alert("elter valid number");
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
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
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
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  const getItems = async () => {
    try {
      const orders = JSON.parse(localStorage.getItem(`orders`)) || [];
      const totalQuantity = orders.reduce(
        (acc, order) => acc + order.quantity,
        0
      );
      console.log(totalQuantity);

      // setCount(totalQuantity);
      setOrders(orders);
      setCount(totalQuantity);

      const sentOrders = JSON.parse(localStorage.getItem(`sentOrders`)) || [];
      setSentOrders(sentOrders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleOrderSent = (data) => {
      console.log(data);
      try {
        const sentOrders = JSON.parse(localStorage.getItem("sentOrders")) || [];
        sentOrders.push(data);
        setSentOrders(sentOrders);
        localStorage.setItem("sentOrders", JSON.stringify(sentOrders));
      } catch (error) {
        console.error("Error parsing sentOrders from localStorage:", error);
        // Set a default value for sentOrders if needed
      }
    };

    const handleStatusGranted = (data) => {
      console.log("Status granted:", data.id, data.status);

      // Update state to trigger re-render
      setSentOrders((prevSentOrders) => {
        const updatedSentOrders = [...prevSentOrders];
        for (let i = 0; i < updatedSentOrders.length; i++) {
          const order = updatedSentOrders[i];
          if (order._id === data.id) {
            order.status = data.status; // Update to the new status
            localStorage.setItem(
              "sentOrders",
              JSON.stringify(updatedSentOrders)
            ); // Update localStorage here
          }
        }
        return updatedSentOrders;
      });

      console.log(sentOrders); // This might not reflect the latest state update
    };

    getItems();

    socket.on("order_sent", handleOrderSent);
    socket.on("statusGranted", handleStatusGranted);

    // ... (rest of your code)

    return () => {
      socket.off("order_sent", handleOrderSent);
      socket.off("statusGranted", handleStatusGranted);
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
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar count={count} />
      
      {/* Navigation Tabs */}
      <nav className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <Link to="/cart" className="border-b-2 border-indigo-500 py-4 px-1">
              <span className="text-sm font-medium text-indigo-600">Cart</span>
            </Link>
            <Link to="/History" className="py-4 px-1">
              <span className="text-sm font-medium text-gray-500 hover:text-gray-700">History</span>
            </Link>
          </div>
        </div>
      </nav>
  
      {/* Cart Items */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div key={index} className="rounded-lg bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex space-x-6">
                  {/* Product Image */}
                  <img src={order.imageUrl} alt={order.name} className="h-24 w-24 rounded-md object-cover" />
                  
                  {/* Product Details */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-gray-900">{order.name}</h3>
                    <span className="inline-flex rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                      {order.edited ? 'Customized' : 'Regular'}
                    </span>
                    <p className="text-lg font-medium text-gray-900">৳{order.price}</p>
                  </div>
                </div>
  
                {/* Quantity Controls */}
                <div className="flex items-center space-x-4">
                  <button onClick={() => minus(index)} className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200">
                    <span className="sr-only">Decrease quantity</span>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="text-gray-900">{order.quantity}</span>
                  <button onClick={() => add(index)} className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200">
                    <span className="sr-only">Increase quantity</span>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
                    </svg>
                  </button>
                  
                  <button onClick={() => deleteItem(index)} className="rounded-full bg-red-50 p-2 text-red-600 hover:bg-red-100">
                    <span className="sr-only">Remove item</span>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
  
        {/* Checkout Form */}
        {count !== 0 ? (
                    <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-3xl rounded-xl bg-white p-8 shadow-lg">
            <div className="mb-8 border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-bold text-gray-900">Delivery Information</h2>
              <p className="mt-2 text-sm text-gray-600">Please enter your delivery details</p>
            </div>
          
            <div className="grid gap-8 md:grid-cols-2">
              {['phoneNumber', 'sector', 'road', 'house'].map((field) => (
                <div key={field} className="relative">
                  <label
                    htmlFor={field}
                    className="absolute -top-2 left-2 bg-white px-1 text-xs font-medium text-gray-600"
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field === 'phoneNumber' ? 'tel' : 'text'}
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-lg border border-gray-300 bg-white p-4 text-gray-900 shadow-sm transition-all duration-200 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    placeholder={`Enter your ${field.toLowerCase()}`}
                  />
                </div>
              ))}
            </div>
          
            <button
              type="submit"
              className="mt-8 w-full rounded-lg bg-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Place Order
            </button>
          </form>
        ) : (
          <div className="mt-8 text-center">
            <h3 className="text-lg font-medium text-gray-900">Your cart is empty</h3>
            <p className="mt-2 text-gray-500">Add items to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
