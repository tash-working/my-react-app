import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './singleItem.css';
import Navbar from '../../../navbar/Navbar';
import _ from 'lodash';

function SingleItem() {
  const { category, singleItem } = useParams();
  const [item, setItem] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [count, setCount] = useState(0);
  const [size, setSize] = useState([]);
  const [price, setPrice] = useState([]);

  const [selectedSize, setSelectedSize] = useState(''); // Set initial size
  const totalSelectedPrice = ingredients.reduce((acc, item) => (item.selected ? acc + item.price : acc), 0);

  const handleSizeChange = (value) => {
    setSelectedSize(value);
    const filteredItems = size.filter((item) => item.size === value);
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
  const sample0 = {
    "name": "pasta",
    "items": [{ 'name': 'pasta', 'selected': true }, { 'name': 'potato', 'selected': false }]
  }


  const sample1 = [
    {
      "name": "pasta",
      "items": [{ 'name': 'pasta', 'selected': true }, { 'name': 'potato', 'selected': false }],
      "quantity": 1
    },
    {
      "name": "pasta",
      "items": [{ 'name': 'pasta', 'selected': true }, { 'name': 'potato', 'selected': true }],
      "quantity": 1
    }

  ]



  const getItems = async () => {
    try {






      const menu = JSON.parse(localStorage.getItem('menu'));
      const filteredItems = menu.filter((item) => item.category === category);
      const filteredItem = filteredItems[0].items.filter((item) => item.urlName === singleItem);

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
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
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

    const index = orders.findIndex(element => 
      _.isEqual(newItem.name, element.name) && 
      _.isEqual(newItem.ingredients, element.ingredients) && 
      _.isEqual(newItem.selectedSize, element.selectedSize));
    
    if (index !== -1) {
      console.log('Object found!');
      orders[index].quantity += 1
       // Update existing object
    } else {
      console.log('Object not found.');
      newItem.quantity = 1;
      orders.push(newItem); // Only push if not found
    }
    const totalQuantity = orders.reduce((acc, order) => acc + order.quantity, 0);
    console.log(totalQuantity);
    

    setCount(totalQuantity);
    localStorage.setItem('orders', JSON.stringify(orders));
  };

  return (
    <div className="pizza-item">
      <Navbar count={count} />
      <img src={item.imageUrl} alt={item.name} className="pizza-image" />
      <h2 className="pizza-name">{item.name}</h2>
      <h3>price: {price + totalSelectedPrice}</h3>

      <div className="size-selct" value={selectedSize} >
        {size.map((s, index) => (
          <button className="size-option" onClick={() => handleSizeChange(s.size)} key={index} value={s.size}>
            {s.size}
          </button>
        ))}
      </div>
      {ingredients.length ? (
              <h1>More Addons</h1>
            ) : (
              null
            )}

      
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