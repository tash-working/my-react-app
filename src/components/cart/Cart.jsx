import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import bin from "./bin.png";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import Items from "../category/items/Items";
import ExtraItems from "../category/items/ExtraItems";
const socket = io(`https://server-08ld.onrender.com/`);

function Cart() {
  const [orders, setOrders] = useState([]);
  const [extras, setExtras] = useState({});
  const [sentOrders, setSentOrders] = useState([]);
  const [count, setCount] = useState(0);
  const [netTotal, setNetTotal] = useState(0);
  const [grossTotal, setGrossTotal] = useState(0);

  const [showConfetti, setShowConfetti] = useState(false);

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

  const [dateTime, setDateTime] = useState(null);

  const handleClick = () => {
    const now = new Date();

    // Get the date components
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Pad with leading zero if needed
    const day = now.getDate().toString().padStart(2, "0");

    // Get the time components in 24-hour format
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    // Format the date and time string
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDateTime;
  };

  const cancelReq = (data) => {
    console.log(data.index);
    const index = data.index

    socket.emit("cancel_order", data.order);



    console.log(index);
    const sentOrders = JSON.parse(localStorage.getItem(`sentOrders`)) || [];
    const newOrders = [...sentOrders];
    console.log(newOrders[index]._id);
    const id = newOrders[index]._id;
    const selectedOrder = newOrders[index];
    selectedOrder.req = "cancel";
    newOrders[index] = selectedOrder;
    console.log(newOrders);
    setSentOrders(newOrders);

    localStorage.setItem("sentOrders", JSON.stringify(newOrders));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const date_time = handleClick();
    if (formData.phoneNumber.length === 11) {
      const orderData = {
        orders,
        phoneNumber: formData.phoneNumber,
        sector: formData.sector,
        road: formData.road,
        house: formData.house,
        price: netTotal,
        status: "process",
        date_time,
        orderCompleteTime: "0",
      };
      
      localStorage.setItem(
        "user",
        JSON.stringify({
          phoneNumber: formData.phoneNumber,
          sector: formData.sector,
          road: formData.road,
          house: formData.house,
        })
      );

      socket.emit("send_order", orderData);
      const updatedOrders = [];
      setOrders(updatedOrders);

      const totalQuantity = updatedOrders.reduce(
        (acc, order) => acc + order.quantity,
        0
      );
      setCount(totalQuantity);
      localStorage.setItem("orders", JSON.stringify(updatedOrders));

      // Show success toast
      toast.success("Order placed successfully!", {
        duration: 3000,
        position: "top-center",
      });

      // Show confetti
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);

      // Reset form
      setFormData({
        phoneNumber: "",
        sector: "",
        road: "",
        house: "",
      });
    } else {
      toast.error("Please enter a valid phone number", {
        duration: 3000,
        position: "top-center",
      });
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
      console.log(orders);
      const menu = JSON.parse(localStorage.getItem(`menu`)) || [];

      for (let index = 0; index < menu.length; index++) {
        const element = menu[index];
        if (element.category === "Extra") {
          console.log(element);
          setExtras(element.items);
        }
      }
      const totalQuantity = orders.reduce(
        (acc, order) => acc + order.quantity,
        0
      );
      function calculateSubtotal(items) {
        let subtotal = 0;

        // Loop through each item
        for (const item of items) {
          // Multiply price by quantity and add to subtotal
          subtotal += item.price * item.quantity;
        }

        return subtotal;
      }

      const subtotal = calculateSubtotal(orders);

      console.log("Subtotal:", subtotal);
      setNetTotal(subtotal);
      setOrders(orders);
      setCount(totalQuantity);

      let sentOrders = JSON.parse(localStorage.getItem(`sentOrders`)) || [];
      // sentOrders = sentOrders.slice().reverse()
      setSentOrders(sentOrders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem(`user`)) || {
      phoneNumber: "",
      sector: "",
      road: "",
      house: "",
    };
    setFormData(user);

    const handleOrderSent = (data) => {
      try {
        let sentOrders = JSON.parse(localStorage.getItem("sentOrders")) || [];

        sentOrders.push(data);
        // sentOrders = sentOrders.slice().reverse()

        setSentOrders(sentOrders);
        localStorage.setItem("sentOrders", JSON.stringify(sentOrders));
      } catch (error) {
        console.error("Error parsing sentOrders from localStorage:", error);
      }
    };

    const handleStatusGranted = (data) => {
      setSentOrders((prevSentOrders) => {
        const updatedSentOrders = [...prevSentOrders];
        for (let i = 0; i < updatedSentOrders.length; i++) {
          const order = updatedSentOrders[i];
          if (order._id === data.id) {
            order.status = data.status;
            order.orderCompleteTime = data.orderCompleteTime;
            localStorage.setItem(
              "sentOrders",
              JSON.stringify(updatedSentOrders)
            );
          }
        }
        return updatedSentOrders;
      });
    };

    getItems();

    socket.on("order_sent", handleOrderSent);
    socket.on("statusGranted", handleStatusGranted);

    return () => {
      socket.off("order_sent", handleOrderSent);
      socket.off("statusGranted", handleStatusGranted);
    };
  }, [count]);

  const getCount = (data) => {
    console.log(data);
    setCount(data);
  };

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
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
        />
      )}
      <Navbar count={count} />

      <nav className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <Link to="/cart" className="border-b-2 border-indigo-500 py-4 px-1">
              <span className="text-sm font-medium text-indigo-600">Cart</span>
            </Link>
            <Link to="/History" className="py-4 px-1">
              <span className="text-sm font-medium text-gray-500 hover:text-gray-700">
                History
              </span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
          {/* Order Items Section */}
          <div className="flex-grow space-y-4">
            {orders.map((order, index) => (
              <div
                key={index}
                className="rounded-lg bg-white p-4 sm:p-6 shadow-sm border m-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
                  {/* Item Info Section */}
                  <div className="flex gap-4 sm:gap-6">
                    <img
                      src={order.imageUrl}
                      alt={order.name}
                      className="h-20 w-20 sm:h-24 sm:w-24 rounded-md object-cover flex-shrink-0"
                    />
                    <div className="space-y-2">
                      <h3 className="text-base sm:text-lg font-medium text-gray-900 line-clamp-2">
                        {order.name}
                      </h3>
                      <span className="inline-flex rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                        {order.edited ? "Customized" : "Regular"}
                      </span>
                      <p className="text-base sm:text-lg font-medium text-gray-900">
                        ৳{order.price * order.quantity}
                      </p>
                    </div>
                  </div>

                  {/* Actions Section */}
                  <div className="flex items-center justify-end sm:justify-center gap-4 mt-4 sm:mt-0">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => minus(index)}
                        className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 transition-colors"
                      >
                        <span className="sr-only">Decrease quantity</span>
                        <svg
                          className="h-4 w-4 sm:h-5 sm:w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 12H4"
                          />
                        </svg>
                      </button>
                      <span className="text-gray-900 w-8 text-center">
                        {order.quantity}
                      </span>
                      <button
                        onClick={() => add(index)}
                        className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 transition-colors"
                      >
                        <span className="sr-only">Increase quantity</span>
                        <svg
                          className="h-4 w-4 sm:h-5 sm:w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v12m6-6H6"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => deleteItem(index)}
                      className="rounded-full bg-red-50 p-2 text-red-600 hover:bg-red-100 transition-colors ml-2"
                    >
                      <span className="sr-only">Remove item</span>
                      <svg
                        className="h-4 w-4 sm:h-5 sm:w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4  7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Section */}

          {/* 
          
          
          
          
          
          
          
          */}
          {count !== 0 ? (
            <>
              <div className="flex-none max-w-md bg-white rounded-lg shadow-lg p-6 space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 text-center">
                  Order Summary
                </h2>
                <div className="flex justify-between items-center">
                  <p className="text-gray-700">Net Total:</p>
                  <p className="font-bold text-lg text-indigo-600">
                    {netTotal}৳
                  </p>
                </div>
                <hr className="border-gray-300" />
                <div className="flex justify-between items-center">
                  <p className="text-gray-700">VAT - 5.00%:</p>
                  <p className="text-gray-600">
                    {(netTotal * 0.05).toFixed(2)}৳
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-700">Auto Round:</p>
                  <p className="text-gray-600">
                    {Math.round(netTotal * 0.05)}৳
                  </p>
                </div>
                <hr className="border-gray-300" />
                <div className="flex justify-between items-center font-bold">
                  <p className="text-gray-700">Gross Total:</p>
                  <p className="text-lg text-green-600">
                    {(netTotal + Math.round(netTotal * 0.05)).toFixed(2)}৳
                  </p>
                </div>
              </div>
            </>
          ) : null}
        </div>

        {/* Extra Items Section */}
        <div className="mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {count !== 0
              ? extras.map((item) => (
                  <ExtraItems
                    getCount={getCount}
                    key={item.urlName}
                    item={item}
                    category={item.category}
                  />
                ))
              : null}
          </div>
        </div>

        {count === 0 ? (
          <div className="mt-8 text-center">
            <h3 className="text-lg font-medium text-gray-900">
              Your cart is empty
            </h3>
            <p className="mt-2 text-gray-500">Add items to get started</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 max-w-3xl rounded-xl bg-white p-8 shadow-lg mb-8"
          >
            <div className="mb-8 border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Delivery Information
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Please enter your delivery details
              </p>
              <p className="mt-2 text-sm text-gray-700">
                *AUTO FILLED BY PAST ORDER HISTORY
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {["phoneNumber", "sector", "road", "house"].map((field) => (
                <div key={field} className="relative">
                  <label
                    htmlFor={field}
                    className="absolute -top-2 left-2 bg-white px-1 text-xs font-medium text-gray-600"
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field === "phoneNumber" ? "tel" : "text"}
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
              className="mt-8 w-full rounded-lg bg-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-md transition-all duration- 200 hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Place Order
            </button>
          </form>
        )}
      </div>
      {sentOrders.map((order, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="mb-6"
        >
          {order.status !== "complete" && order.status !== "cancel" && (
            <div className="mx-auto max-w-4xl">
              <div className="overflow-hidden rounded-xl bg-white shadow-lg border border-gray-100">
                {/* Order Header */}
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-6 py-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                          <svg
                            className="h-6 w-6 text-indigo-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            Order #{order._id.slice(-6)}
                          </h3>
                          <div className={`
                            px-3 py-1 rounded-full text-sm font-medium
                            ${order.status === 'process' ? 'bg-yellow-100 text-yellow-800' : ''}
                            ${order.status === 'preparing' ? 'bg-blue-100 text-blue-800' : ''}
                            ${order.status === 'ready' ? 'bg-green-100 text-green-800' : ''}
                          `}>
                            <div className="flex items-center space-x-1">
                              <span className={`
                                h-2 w-2 rounded-full
                                ${order.status === 'process' ? 'bg-yellow-400' : ''}
                                ${order.status === 'preparing' ? 'bg-blue-400' : ''}
                                ${order.status === 'ready' ? 'bg-green-400' : ''}
                              `}></span>
                              <span className="capitalize">{order.status}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          <svg
                            className="h-4 w-4 inline mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {order.date_time}
                        </p>
                      </div>
                    </div>
      
                    {order.status === "process" && (
                      <div className="flex items-center">
                        {order.req === "cancel" ? (
                          <div className="flex items-center space-x-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg">
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                            <span>Cancel Request Sent</span>
                          </div>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => cancelReq({ order, index })}
                            className="flex items-center space-x-2 bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-lg transition-colors duration-200"
                          >
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                            <span>Cancel Order</span>
                          </motion.button>
                        )}
                      </div>
                    )}
                  </div>
      
                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <svg
                        className="h-4 w-4 mr-2 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      House {order.house}, Road {order.road}, Sector {order.sector}, Uttara
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="h-4 w-4 mr-2 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      {order.phoneNumber}
                    </div>
                  </div>
                </div>
      
                {/* Order Items */}
                <div className="divide-y divide-gray-100">
                  {order.orders.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: itemIndex * 0.1 }}
                      className="flex items-center p-6 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex-1 flex items-center space-x-4">
                        <div className="h-16 w-16 flex-shrink-0 rounded-lg bg-gray-100 flex items-center justify-center">
                          <svg
                            className="h-8 w-8 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-medium text-gray-900">
                            {item.name}
                          </h4>
                          <div className="mt-1 flex items-center space-x-2">
                            <span className={`
                              inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                              ${item.edited ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-800'}
                            `}>
                              {item.edited ? 'Customized' : 'Regular'}
                            </span>
                            <span className="text-sm text-gray-500">
                              Qty: {item.quantity}
                            </span>
                          </div>
                          {item.edited && (
                            <div className="mt-2 space-y-1">
                              <p className="text-sm text-gray-600">
                                Size: {item.selectedSize || item.size[0].size}
                              </p>
                              {item.ingredients?.map(
                                (ingredient) =>
                                  ingredient.selected && (
                                    <p
                                      key={ingredient.id || ingredient.name}
                                      className="text-sm text-gray-600 flex items-center"
                                    >
                                      <svg
                                        className="h-3 w-3 mr-1 text-green-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                      </svg>
                                      {ingredient.name}
                                    </p>
                                  )
                              )}
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-medium text-gray-900">
                            ৳{item.price}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            Total: ৳{item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
      
                {/* Order Summary */}
                <div className="bg-gray-50 px-6 py-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Net Total</span>
                      <span>৳{order.price}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>VAT (5%)</span>
                      <span>৳{(order.price * 0.05).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Rounded Amount</span>
                      <span>৳{Math.round(order.price * 0.05)}</span>
                    </div>
                    <div className="pt-3 border-t border-gray-200">
                      <div className="flex justify-between text-lg font-semibold text-gray-900">
                        <span>Total Amount</span>
                        <span>৳{order.price + Math.round(order.price * 0.05)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

export default Cart;
