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
        <div>
          {order.status !== "complete" && order.status !== "cancel" ? (
            <div>
              <div
                key={index}
                className="overflow-hidden rounded-lg bg-white shadow-sm"
              >
                {/* Order Header */}
                <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Order No:</p>
                      <p className="text-lg font-medium text-gray-900">
                        {order._id}
                      </p>
                      <p className="text-lg font-medium text-gray-500">
                        {order.date_time}
                      </p>
                    </div>
                    <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                      {order.status}
                    </span>

                    {order.status === "process" ? (
                      <div>
                        {
                          order.req === "cancel" ? (
                            <div
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Cancel Request Sent
                      </div>
                          )
                          :(
                            <button
                        type="button"
                        onClick={() => cancelReq({order, index})}
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red-400 text-base font-medium text-white hover:bg-red-600 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Cancel Request
                      </button>
                          )
                        }
                      </div>
                    ) : null}
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    <p>
                      House {order.house}, Road {order.road}, Sector{" "}
                      {order.sector}, Uttara
                    </p>
                    <p>Phone: {order.phoneNumber}</p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="divide-y divide-gray-200">
                  {order.orders.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-center justify-between p-6"
                    >
                      <div className="flex items-center space-x-4">
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">
                            {item.name}
                          </h4>
                          <span className="mt-1 inline-flex rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                            {item.edited ? "Customized" : "Regular"}
                          </span>
                          {item.edited && (
                            <div className="mt-2 space-y-1 text-sm text-gray-500">
                              <p>
                                Size: {item.selectedSize || item.size[0].size}
                              </p>
                              {item.ingredients?.map(
                                (ingredient) =>
                                  ingredient.selected && (
                                    <p key={ingredient.id || ingredient.name}>
                                      Added: {ingredient.name}
                                    </p>
                                  )
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-medium text-gray-900">
                          ৳{item.price}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-6 py-4 space-y-3">
                  <p>Net Total: {order.price}৳</p>
                  <hr></hr>
                  <p>Vat - 5.00%: {order.price * 0.05}৳</p>
                  <p>Auto Round: {Math.round(order.price * 0.05)}৳</p>
                  <hr></hr>
                  <p>
                    Gross Total: {order.price + Math.round(order.price * 0.05)}৳
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default Cart;
