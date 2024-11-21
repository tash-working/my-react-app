import React, { useState, useEffect } from "react";
import Items from "../category/items/Items";

function MenuSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  function extractAllItems(menuData) {
    const allItems = [];

    menuData.forEach((category) => {
      category.items.forEach((item) => {
        item.category = category.category;
        allItems.push(item);
      });
    });

    return allItems;
  }

  useEffect(() => {
    const menuData = JSON.parse(localStorage.getItem("menu")) || [];

    const allExtractedItems = extractAllItems(menuData);

    setData(allExtractedItems);
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    console.log(query);
    if (query === "") {
      setFilteredData([]);
    } else {
      const filtered = data.filter((item) =>
        item.bio.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };
  const getCount = (data) => {
    console.log(data);
    setCount(data);
  };

  return (
    <div className="search-container flex flex-col items-center w-full px-4 sm:px-6 lg:px-8">
      <input
        type="text"
        placeholder="Start typing to search..."
        value={searchQuery}
        onChange={handleSearch}
        className="w-full max-w-3xl mt-8 mb-6 px-6 py-4 text-lg
          rounded-2xl
          border border-gray-200
          bg-white/70 
          backdrop-blur-lg
          shadow-sm
          transition-all duration-300
          placeholder:text-gray-400
          focus:outline-none 
          focus:ring-2
          focus:ring-violet-100
          focus:border-violet-400
          hover:shadow-md
          transform hover:-translate-y-0.5"
      />
  
      <ul className="search-results w-full max-w-7xl">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredData.length > 0
              ? filteredData.map((item) => (
                  <Items
                    getCount={getCount}
                    key={item.urlName}
                    item={item}
                    category={item.category}
                  />
                ))
              : null}
          </div>
        </div>
      </ul>
    </div>
  );
}

export default MenuSearch;
