import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './singleItem.css';
import Navbar from '../../../navbar/Navbar';

function SingleItem() {
  const { category, singleItem } = useParams();
  const [item, setItem] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [count, setCount] = useState(0);
  const [size, setSize] = useState([]);
  const [price, setPrice] = useState([]);

  const [selectedSize, setSelectedSize] = useState(''); // Set initial size
  const totalSelectedPrice = ingredients.reduce((acc, item) => (item.selected ? acc + item.price : acc), 0);

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
    const filteredItems = size.filter((item) => item.size === event.target.value);
    setPrice(filteredItems[0].price);
  };

  const addAddOns = (increment, index) => {
    const filteredItems = ingredients.filter((item) => item.name === increment.name);
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

  const getItems = async () => {
    try {
      const menu = JSON.parse(localStorage.getItem('menu'));
      const filteredItems = menu.filter((item) => item.category === category);
      const filteredItem = filteredItems[0].items.filter((item) => item.urlName === singleItem);

      setItem(filteredItem[0]);
      setIngredients(filteredItem[0].ingredients);
      setSize(filteredItem[0].size);
      setPrice(filteredItem[0].price);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItems();
  }, [count]);

  const setOrder = () => {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const newItem = item;

    if (newItem.price !== price + totalSelectedPrice) {
      newItem.edited = true;
      newItem.price = price + totalSelectedPrice;
      newItem.addOns = ingredients;
      newItem.selectedSize = selectedSize;

      orders.push(newItem);
      setCount(orders.length);
      localStorage.setItem('orders', JSON.stringify(orders));
    } else {
      newItem.edited = false;
      newItem.price = price + totalSelectedPrice;
      newItem.addOns = ingredients;
      newItem.selectedSize = selectedSize;

      orders.push(newItem);
      setCount(orders.length);
      localStorage.setItem('orders', JSON.stringify(orders));
    }
  };

  return (
    <div className="pizza-item">
      <Navbar count={count} />
      <img src={item.imageUrl} alt={item.name} className="pizza-image" />
      <h2 className="pizza-name">{item.name}</h2>
      <h3>price: {price + totalSelectedPrice}</h3>

      <select className="size-selct" value={selectedSize} onChange={handleSizeChange}>
        {size.map((s, index) => (
          <option className="size-option" key={index} value={s.size}>
            {s.size}
          </option>
        ))}
      </select>

      <h1>More Addons</h1>
      {ingredients.map((ingredient, index) => (
        <div className="addOnsDiv" key={ingredient.name}>
          <div className="addOnsDiv">
            <h3>{ingredient.name}</h3>
            {ingredient.selected ? (
              <button onClick={() => addAddOns(ingredient, index)} className="addOnsBtn">
                selected
              </button>
            ) : (
              <button onClick={() => addAddOns(ingredient, index)} className="addOnsBtn">
                +add
              </button>
            )}
          </div>
          <h3>{ingredient.price}tk</h3>
        </div>
      ))}
      <div>
        <button onClick={setOrder} className="add-to-cart-btn">ADD</button>
      </div>
    </div>
  );
}

export default SingleItem;