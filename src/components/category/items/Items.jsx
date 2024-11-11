import _ from "lodash";
import React from "react";
import { Link, useParams } from "react-router-dom";

function Items({ getCount, category, item }) {
  const setOrder = () => {
    const newItem = item;
    const orders = JSON.parse(localStorage.getItem(`orders`)) || [];
    // orders.push(item)
    // getCount(orders.length)

    newItem.edited = false;
    // newItem.price = price + totalSelectedPrice;
    // newItem.addOns = ingredients;
    // newItem.selectedSize = selectedSize;

    const index = orders.findIndex(
      (element) =>
        _.isEqual(newItem.name, element.name) &&
        _.isEqual(newItem.ingredients, element.ingredients) &&
        _.isEqual(newItem.selectedSize, element.selectedSize)
    );

    if (index !== -1) {
      console.log("Object found!");
      orders[index].quantity += 1;
      // Update existing object
    } else {
      console.log("Object not found.");
      newItem.quantity = 1;
      orders.push(newItem); // Only push if not found
    }
    const totalQuantity = orders.reduce(
      (acc, order) => acc + order.quantity,
      0
    );
    console.log(totalQuantity);

    getCount(totalQuantity);
    localStorage.setItem("orders", JSON.stringify(orders));

    // localStorage.setItem(`orders`, JSON.stringify(orders));
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
