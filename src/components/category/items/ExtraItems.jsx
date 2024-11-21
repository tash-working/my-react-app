import _ from "lodash";
import React from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function ExtraItems({ getCount, category, item }) {
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
    <div className="group relative aspect-square w-full overflow-hidden rounded-2xl shadow-lg">
      {/* Image Container with Fixed Aspect Ratio */}
      <Link to={`/Extra/${item.urlName}`} className="block h-full">
        <div className="relative h-full w-full">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105n overflow-hidden"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
            <div>
              <h3 className="text-xl font-bold line-clamp-2">{item.name}</h3>
              <h4 className="text-sm opacity-80 line-clamp-1">
                {item.size[0]?.size}
              </h4>
            </div>

            <h4 className="mb-2 line-clamp-1 text-lg font-semibold tracking-tight text-gray-900">
              {item.size[0].size}
            </h4> {/* Bottom Section */}
            <div>
              {/* Price */}
              <div className="mb-4 flex items-baseline">
                <span className="text-sm font-medium opacity-80 mr-1">৳</span>
                <span className="text-3xl font-bold">
                  {item.price}
                </span>
              </div>
              
              {/* Add to Cart Button */}
              <button
                onClick={(e) => {
                  e.preventDefault(); // Prevent link navigation
                  setOrder();
                }}
                className="w-full rounded-xl bg-white/20 backdrop-blur-sm py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-white/30 active:scale-95"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </Link>

      {/* Content Container */}
      <div className="p-[140px]">
        {/* Add to Cart Button */}
      </div>
    </div>
  );
}

export default ExtraItems;
