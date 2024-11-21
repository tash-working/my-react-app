import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../../navbar/Navbar";
import _ from "lodash";
import toast from "react-hot-toast";

function SingleItem() {
  const { category, singleItem } = useParams();
  const [item, setItem] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [count, setCount] = useState(0);
  const [size, setSize] = useState([]);
  const [price, setPrice] = useState([]);

  const [selectedSize, setSelectedSize] = useState(""); // Set initial size
  const totalSelectedPrice = ingredients.reduce(
    (acc, item) => (item.selected ? acc + item.price : acc),
    0
  );

  const handleSizeChange = (value) => {
    setSelectedSize(value);
    const filteredItems = size.filter((item) => item.size === value);
    setPrice(filteredItems[0].price);
  };

  const addAddOns = (increment, index) => {
    const filteredItems = ingredients.filter(
      (item) => item.name === increment.name
    );
    if (filteredItems[0].selected) {
      const newIngredients = [...ingredients];
      newIngredients[index].selected = false;
      newIngredients[index].edited = true;
      setIngredients(newIngredients);
    } else {
      const newIngredients = [...ingredients];
      newIngredients[index].selected = true;
      setIngredients(newIngredients);
    }
  };
  const sample0 = {
    name: "pasta",
    items: [
      { name: "pasta", selected: true },
      { name: "potato", selected: false },
    ],
  };

  const sample1 = [
    {
      name: "pasta",
      items: [
        { name: "pasta", selected: true },
        { name: "potato", selected: false },
      ],
      quantity: 1,
    },
    {
      name: "pasta",
      items: [
        { name: "pasta", selected: true },
        { name: "potato", selected: true },
      ],
      quantity: 1,
    },
  ];

  const getItems = async () => {
    try {
      const menu = JSON.parse(localStorage.getItem("menu"));
      const filteredItems = menu.filter((item) => item.category === category);
      const filteredItem = filteredItems[0].items.filter(
        (item) => item.urlName === singleItem
      );

      setItem(filteredItem[0]);
      setIngredients(filteredItem[0].ingredients);
      setSize(filteredItem[0].size);
      setPrice(filteredItem[0].price);
      setSelectedSize(filteredItem[0].selectedSize);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItems();
  }, [count]);

  const setOrder = () => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const newItem = item;
    console.log(selectedSize);

    if (newItem.price !== price + totalSelectedPrice) {
      newItem.edited = true;
      newItem.price = price + totalSelectedPrice;
      newItem.ingredients = ingredients;
      newItem.selectedSize = selectedSize;

      // for (let i = 0; i < orders.length; i++) {
      //   const element = orders[i];

      //   if (_.isEqual(newItem.name, element.name) && _.isEqual(newItem.ingredients, element.ingredients) && _.isEqual(newItem.selectedSize, element.selectedSize)) {
      //     console.log("match");
      //     newItem.quantity++
      //   } else {
      //     newItem.quantity = 1        }
      // }

      // orders.push(newItem);
      // setCount(orders.length);
      // localStorage.setItem('orders', JSON.stringify(orders));
    } else {
      newItem.edited = false;
      newItem.price = price + totalSelectedPrice;
      newItem.addOns = ingredients;
      newItem.selectedSize = selectedSize;

      // for (let i = 0; i < orders.length; i++) {
      //   const element = orders[i];

      //   if (_.isEqual(newItem.name, element.name) && _.isEqual(newItem.ingredients, element.ingredients) && _.isEqual(newItem.selectedSize, element.selectedSize)) {
      //     console.log("match");
      //     newItem.quantity++
      //   } else {
      //     newItem.quantity = 1        }
      // }

      // orders.push(newItem);
      // setCount(orders.length);
      // localStorage.setItem('orders', JSON.stringify(orders));
    }

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

    // Add toast notification
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

    setCount(totalQuantity);
    localStorage.setItem("orders", JSON.stringify(orders));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar count={count} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Hero Image */}
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-100 lg:aspect-auto lg:h-[600px]">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          {/* Product Info */}
          <div className="mt-8 lg:mt-0">
            <div className="lg:sticky lg:top-24">
              <div className="space-y-8">
                {/* Title and Price */}
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    {item.name}
                  </h1>
                  <p className="">{item.bio}</p>
                  <p className="flex items-baseline text-3xl font-bold text-indigo-600">
                    <span className="text-lg">৳</span>
                    <span>{price + totalSelectedPrice}</span>
                  </p>
                </div>

                {/* Size Selector */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Select Size
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                    {size.map((s, index) => (
                      <button
                        key={index}
                        value={s.size}
                        onClick={() => handleSizeChange(s.size)}
                        className={`w-full rounded-xl px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap overflow-hidden text-ellipsis
                          ${
                            selectedSize === s.size
                              ? "bg-indigo-600 text-white ring-2 ring-indigo-600 ring-offset-2"
                              : "bg-white text-gray-700 hover:bg-gray-50 ring-1 ring-gray-200"
                          }`}
                      >
                        {s.size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add-ons Section */}
                {ingredients.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Customize Your Order
                    </h3>
                    <div className="space-y-3">
                      {ingredients.map((ingredient, index) => (
                        <div
                          key={ingredient.name}
                          className="group flex items-center justify-between rounded-xl border border-gray-200 p-4 transition-all duration-200 hover:border-indigo-600 hover:shadow-md"
                        >
                          <div className="flex items-center gap-4">
                            <h4 className="font-medium text-gray-900">
                              {ingredient.name}
                            </h4>
                            <button
                              onClick={() => addAddOns(ingredient, index)}
                              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200
                                ${
                                  ingredient.selected
                                    ? "bg-green-600 text-white shadow-lg shadow-green-600/25"
                                    : "bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-700"
                                }`}
                            >
                              {ingredient.selected ? "✓ Added" : "+ Add"}
                            </button>
                          </div>
                          <span className="font-medium text-gray-900">
                            ৳{ingredient.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add to Cart Button */}
                <button
                  onClick={setOrder}
                  className="w-full rounded-xl bg-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all duration-200 hover:bg-indigo-700 hover:shadow-indigo-600/25 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 active:scale-95"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleItem;
