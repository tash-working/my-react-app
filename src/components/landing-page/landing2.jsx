import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTruck, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const VelvelBitesLanding = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-fuchsia-900 
    text-white overflow-hidden relative">
      {/* Enhanced Animated Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(100)].map((_, i) => {
          const size = Math.random() * 10 + 2;
          const delay = Math.random() * 5;
          
          return (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: -50,
                opacity: 0 
              }}
              animate={{ 
                y: window.innerHeight + 50,
                x: [
                  Math.random() * window.innerWidth, 
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth
                ],
                opacity: [0, 0.7, 0],
                rotate: 360
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                delay,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeInOut'
              }}
              className="absolute rounded-full bg-white/40 
              hover:bg-fuchsia-200 transition-colors"
              style={{
                width: size,
                height: size,
              }}
            />
          );
        })}
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center 
        min-h-screen py-12 md:py-0">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 md:pr-12"
          >
            <div className="flex items-center space-x-2 
            bg-white/20 px-4 py-2 rounded-full w-max">
              <FaTruck />
              <span>Velvel Bites Delivery</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black 
            leading-tight">
              Velvel Bites
              <br />
              <span className="text-fuchsia-200">
                Taste the Difference
              </span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-white/80 max-w-xl">
              Authentic flavors crafted with passion. 
              Experience the unique taste of Velvel Bites, 
              delivering exceptional meals right to your doorstep.
            </p>

            {/* Phone Number Signup */}
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
              <div className="relative w-full md:max-w-md">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaPhone className="text-white/50" />
                </div>
                <input 
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="pl-10 px-4 py-3 rounded-full 
                  bg-white/20 backdrop-blur-lg 
                  w-full text-white 
                  placeholder-white/50 focus:outline-none 
                  focus:ring-2 focus:ring-fuchsia-300"
                />
              </div>
              <button 
                className="bg-white text-purple-800 
                px-6 py-3 rounded-full font-bold
                hover:bg-fuchsia-100 transition 
                w-full md:w-auto"
              >
                Order Now
              </button>
            </div>

            {/* Stats */}
            <div className="flex space-x-6 pt-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold">15+</h3>
                <p className="text-white/70 text-sm md:text-base">
                  Signature Dishes
                </p>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold">30 Min</h3>
                <p className="text-white/70 text-sm md:text-base">
                  Avg Delivery
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative hidden md:block"
          >
            <div className="relative group">
              <img 
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Velvel Bites Signature Dish"
                className="rounded-3xl shadow-2xl 
                transform group-hover:scale-105 transition-transform 
                object-cover aspect-square"
              />
              <div 
                className="absolute -bottom-6 -right-6 
                bg-white/30 backdrop-blur-lg 
                rounded-full p-4 shadow-xl flex items-center 
                group-hover:scale-110 transition"
              >
                <FaMapMarkerAlt className="mr-2" />
                <span className="text-white font-bold">
                  Uttara, Dhaka
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default VelvelBitesLanding;