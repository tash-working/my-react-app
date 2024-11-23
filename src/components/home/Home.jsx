import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../navbar/Navbar";
import MenuSearch from "../menuSearch/MenuSearch";
import HomeLanding from "../landing-page/home-landing";
import AboutSection from "../landing-page/about(after-landing)";
import Footer from "../footer/footer";

function Home() {
  const [menu, setMenu] = useState([]);

  const getMenu = async () => {
    try {
      const response = await fetch(`https://server-08ld.onrender.com/getMenu`);
      const jsonData = await response.json();
      setMenu(jsonData[0].menu); // Assuming setItems is used for a different purpose
      localStorage.setItem(`menu`, JSON.stringify(jsonData[0].menu));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMenu();
    // fetchData2()
  }, []); // Ensure useEffect runs only when table_num changes
  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {" "}
      <Navbar />
      <MenuSearch />
      {/* <HomeLanding/> */}
      {/* <AboutSection/> */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {menu.map((category) => (
            <div
              key={category.category}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <Link to={`/${category.category}`} className="block">
                <div className="h-48 w-full relative">
                  <img
                    src={category.imageUrl}
                    alt={`${category.category} category`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
                    <div className="absolute bottom-0 w-full p-4">
                      <h3 className="text-xl font-bold text-white tracking-wide">
                        {category.category}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t border-gray- bg-gradient-to-r from-fuchsia-700 to-purple-900 ">
                  <p className="text-sm text-white">
                    Click to view {category.category} menu items
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
