import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';




function Home() {
    const [menu, setMenu] = useState([]);

    const getMenu  =async () => {
        try {
          const response = await fetch(`http://localhost:5000/getMenu`);
          const jsonData = await response.json();
          setMenu(jsonData[0].menu); // Assuming setItems is used for a different purpose
          localStorage.setItem(`menu`, JSON.stringify(jsonData[0].menu));

        } catch (error) {
          console.log(error);
        }
      };

    useEffect(() => {

        
        getMenu()
    
    ;
        // fetchData2()
      }, []) // Ensure useEffect runs only when table_num changes
  return (
    <div>
      <Navbar></Navbar>
        {
            menu.map((category)=>(
                <div key={category.category}>
                    
                    <Link to={`/${category.category}`}><button>{category.category}</button></Link>
                </div>
            ))
        }
    </div>
  )
}

export default Home