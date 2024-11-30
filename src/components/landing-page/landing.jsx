import React from 'react';
import { motion } from 'framer-motion';

const FoodLandingPage = () => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-fuchsia-700 to-purple-900 
      px-4 py-12 overflow-hidden"
    >
      <div className="container mx-auto grid md:grid-cols-2 gap-10 
        items-center max-w-6xl relative">
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white space-y-6 z-10 relative"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl 
            font-bold leading-tight">
            Delicious Meals
            <br />
            <span className="text-fuchsia-200">Delivered to Your Doorstep</span>
          </h1>
          
          <p className="text-lg md:text-xl text-fuchsia-100 
            max-w-xl leading-relaxed">
            Explore a world of culinary delights. Fresh, 
            handcrafted meals from local chefs, 
            delivered hot and fresh right to your home.
          </p>
          
          <div className="flex space-x-4">
            <button 
              className="bg-white text-purple-800 
              px-6 py-3 rounded-full font-semibold 
              hover:bg-fuchsia-100 transition duration-300
              shadow-lg hover:shadow-xl"
            >
              Order Now
            </button>
            
            <button 
              className="border-2 border-white text-white 
              px-6 py-3 rounded-full font-semibold 
              hover:bg-white hover:text-purple-800 
              transition duration-300"
            >
              Browse Menu
            </button>
          </div>
        </motion.div>
        
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center relative z-10"
        >
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Delicious Food Platter"
              className="rounded-2xl shadow-2xl 
              w-full max-w-md object-cover aspect-square 
              transform hover:scale-105 transition-transform duration-300"
            />
            <div 
              className="absolute -bottom-10 -right-10 
              bg-white/20 backdrop-blur-lg 
              rounded-full p-4 shadow-xl"
            >
              <span className="text-white font-bold text-lg">
                30+ Cuisines
              </span>
            </div>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div 
          className="absolute -top-20 -left-20 
          bg-white/10 rounded-full 
          w-96 h-96 blur-2xl"
        ></div>
        <div 
          className="absolute -bottom-20 -right-20 
          bg-white/10 rounded-full 
          w-96 h-96 blur-2xl"
        ></div>
      </div>
    </div>
  );
};

export default FoodLandingPage;