import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuSearch from "../menuSearch/MenuSearch";

function Navbar({ count }) {
  const [orders, setOrders] = useState([]);
  const [orderCount, setOrderCount] = useState(0);



  const getData = () => {
    const orders = JSON.parse(localStorage.getItem(`orders`)) || [];
    const totalQuantity = orders.reduce(
      (acc, order) => acc + order.quantity,
      0
    );
    console.log(totalQuantity);

    // setCount(totalQuantity);
    setOrders(orders);
    setOrderCount(totalQuantity);
  };
  useEffect(() => {
    getData();
    // fetchData2()
  }, [count]);
  return (
    <nav className="bg-gradient-to-r from-fuchsia-700 to-purple-900 text-white sticky top-0 z-50 text-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHevWCw9OwglL5vNOf4UovVnsyRf4pC2dmWg&s"
              alt="Restaurant Logo"
              className="h-10 w-10 rounded-full object-cover transition-transform duration-200 hover:scale-110"
              loading="lazy"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1482049016688-2d3e1b311543";
              }}
            />
            <span className="text-xl font-bold text-white-900">Vetvet Bite</span>
          </Link>
    

         

          {/* Navigation */}
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-sm font-medium text-white-700 hover:text-indigo-600 transition-colors"
            >
              Home
            </Link>

            {/* Cart Link with Counter */}
            <Link to="/cart" className="group relative flex items-center">
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white-700 group-hover:text-indigo-600 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {orderCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white-600 text-xs font-medium text-white">
                    {orderCount}
                  </span>
                )}
              </div>
              <span className="ml-2 text-sm font-medium text-white-700 group-hover:text-indigo-600 transition-colors">
                Cart
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
