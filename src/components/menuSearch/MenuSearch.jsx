import React, { useState, useEffect } from 'react';
import Items from '../category/items/Items';

function MenuSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);




  function extractAllItems(menuData) {
    const allItems = [];
  
    menuData.forEach(category => {
      category.items.forEach(item => {
        item.category = category.category
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
    if (query === "" ) {
      setFilteredData([]);
    }else{
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
    }
    


  };
  const getCount = (data) => {
    console.log(data);
    setCount(data);
  };


  
  return (
    <div class="search-container flex flex-col items-center w-full">
  <input
    type="text"
    placeholder="Search..."
    value={searchQuery}
    onChange={handleSearch}
    className="search-input mt-5 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full"
  />

  <ul class="search-results list-none mt-2">
     <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredData.length > 0 ? (
      filteredData.map((item) => (
        <Items
        getCount={getCount}
        key={item.urlName}
        item={item}
        category={item.category}
      />
      ))
    ) : (
      // <li class="no-results px-4 py-2 text-gray-500 text-center">No results found</li>
      null
    )}
      </div>
    </div>
  </ul>
</div>
  );
}

export default MenuSearch;