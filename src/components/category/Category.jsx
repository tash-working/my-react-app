import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Items from "./items/Items";
import Navbar from "../navbar/Navbar";
import MenuSearch from "../menuSearch/MenuSearch";

function Category() {
  const { category } = useParams();
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  // const [ingredients, setIngredients] = useState([]);

  const getItems = async () => {
    try {
      // const response = await fetch(`http://localhost:5000/getMenu/${category}`);
      // const jsonData = await response.json();
      // setMenu(jsonData[0].menu); // Assuming setItems is used for a different purpose
      // console.log(jsonData[0].menu);

      const menu = JSON.parse(localStorage.getItem(`menu`));
      const filteredItems = menu.filter((item) => item.category === category);

      console.log(filteredItems[0].items);
      setItems(filteredItems[0].items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItems();

    // fetchData2()
  }, []);
  const getCount = (data) => {
    console.log(data);
    setCount(data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar count={count} />

      {/* Hero Section */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block capitalize">{category}</span>
            <span className="block text-indigo-600 text-2xl sm:text-3xl mt-3">
              Discover our delicious selection
            </span>
          </h1>
        </div>
      </div>

      {/* Items Grid */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <Items
              getCount={getCount}
              key={item.urlName}
              item={item}
              category={category}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Category;
