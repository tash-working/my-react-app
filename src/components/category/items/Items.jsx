import _ from "lodash";
import React from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Items({ getCount, category, item }) {
  const setOrder = () => {
    const newItem = item;
    const orders = JSON.parse(localStorage.getItem(`orders`)) || [];

    newItem.edited = false;

    const index = orders.findIndex(
      (element) =>
        _.isEqual(newItem.name, element.name) &&
        _.isEqual(newItem.ingredients, element.ingredients) &&
        _.isEqual(newItem.selectedSize, element.selectedSize)
    );

    if (index !== -1) {
      orders[index].quantity += 1;
    } else {
      newItem.quantity = 1;
      orders.push(newItem);
    }

    const totalQuantity = orders.reduce(
      (acc, order) => acc + order.quantity,
      0
    );
    getCount(totalQuantity);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Show success toast
    toast.success(`${item.name} added to cart!`, {
      duration: 2000,
      position: "bottom-right",
      style: {
        background: "#4F46E5",
        color: "#ffffff",
        padding: "16px",
      },
      icon: "🛒",
    });
  };

  return (
    <div className="group h-full">
      <div className="relative h-full overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10">
        {/* Image Container with Fixed Aspect Ratio */}
        <Link to={`/${category}/${item.urlName}`} className="block">
          <div className="relative pb-[75%]">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        </Link>

        {/* Content Container */}
        <div className="p-6">
          {/* Title */}
          <h3 className="mb-2 line-clamp-1 text-lg font-semibold tracking-tight text-gray-900">
            {item.name}
          </h3>
          <p className="">{item.bio}</p>

          <h4 className="mb-2 line-clamp-1 text-lg font-semibold tracking-tight text-gray-900">
            {item.size[0].size}
          </h4>

          {/* Price Tag */}
          <div className="mb-4 flex items-baseline">
            <span className="text-sm font-medium text-gray-500">৳</span>
            <span className="ml-1 text-2xl font-bold text-indigo-600">
              {item.price}
            </span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={setOrder}
            className="relative w-full overflow-hidden rounded-xl bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:bg-indigo-700 hover:shadow-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:scale-95"
          >
            <span className="relative z-10">Add to Cart</span>
            <div className="absolute inset-0 -translate-x-full skew-x-12 transform bg-white opacity-20 transition-transform duration-300 group-hover:translate-x-full" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Items;
