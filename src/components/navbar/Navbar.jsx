import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  FaHome, 
  FaShoppingCart, 
  FaBars, 
  FaTimes 
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar({ count }) {
  const [orders, setOrders] = useState([]);
  const [orderCount, setOrderCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const prevOrderCount = useRef(orderCount);

  const getData = () => {
    const orders = JSON.parse(localStorage.getItem(`orders`)) || [];
    const totalQuantity = orders.reduce(
      (acc, order) => acc + order.quantity,
      0
    );
    setOrders(orders);
    setOrderCount(totalQuantity);
  };

  useEffect(() => {
    getData();
  }, [count]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = isMobileMenuOpen ? 'unset' : 'hidden';
  };

  const handleMenuItemClick = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen && 
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target)
      ) {
        toggleMobileMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Sophisticated Cart Number Animation
  const CartBadge = ({ count }) => {
    const isIncrease = count > prevOrderCount.current;
    prevOrderCount.current = count;

    return (
      <motion.div 
        key={count}
        initial={{ 
          scale: 0.5, 
          opacity: 0,
          y: isIncrease ? 20 : -20
        }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          y: 0
        }}
        exit={{ 
          scale: 0.5, 
          opacity: 0,
          y: isIncrease ? -20 : 20
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15
        }}
        className="absolute -top-3 -right-2
        bg-gradient-to-br bg-gradient-to-br from- pink-500 to-red-500
        text-white rounded-full 
        w-5 h-5 flex items-center justify-center 
        text-xs font-bold shadow-md
        animate-pulse"
      >
        {count}
      </motion.div>
    );
  };

  return (
    <nav className="bg-gradient-to-r from-fuchsia-700 to-purple-900 
    text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 
            transform hover:scale-105 transition-transform"
          >
            <motion.img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHevWCw9OwglL5vNOf4UovVnsyRf4pC2dmWg&s"
              alt="Restaurant Logo"
              className="h-10 w-10 rounded-full object-cover"
              initial={{ rotate: 0 }}
              whileHover={{ 
                rotate: 360,
                transition: { duration: 0.5 }
              }}
            />
            <span className="text-xl font-bold text-white">
              Vetvet Bite
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Home Link */}
            <Link
              to="/"
              className="flex items-center space-x-2 
              text-sm font-medium text-white 
              hover:text-fuchsia-200 transition-colors group"
            >
              <FaHome className="group-hover:scale-110 transition" />
              <span>Home</span>
            </Link>

            {/* Cart Link with Enhanced Counter */}
            <Link 
              to="/cart" 
              className="flex items-center space-x-2 
              text-sm font-medium text-white 
              hover:text-fuchsia-200 transition-colors group relative"
            >
              <div className="relative flex items-center">
                <FaShoppingCart 
                  className="mr-2 group-hover:scale-110 transition" 
                  size={20}
                />
                <AnimatePresence>
                  {orderCount > 0 && (
                    <CartBadge count={orderCount} />
                  )}
                </AnimatePresence>
                <span className="ml-1">Cart</span>
              </div>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <motion.button 
              onClick={toggleMobileMenu}
              whileTap={{ scale: 0.9 }}
              className="text-white focus:outline-none"
              aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              ref={mobileMenuRef}
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ 
                type: "tween",
                duration: 0.3
              }}
              className="fixed inset-0 bg-purple-900 bg-opacity-95 
              md:hidden z-50 flex flex-col items-center 
              justify-center space-y-6 text-center"
            >
              {/* Close Button */}
              <motion.button 
                onClick={toggleMobileMenu}
                whileTap={{ scale: 0.9 }}
                className="absolute top-6 right-6 
                text-white hover:text-fuchsia-200 
                focus:outline-none"
                aria-label="Close Menu"
              >
                <FaTimes size={30} />
              </motion.button>

              {/* Mobile Menu Items */}
              <div className="space-y-6 w-full px-6">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link
                    to="/"
                    onClick={handleMenuItemClick}
                    className="block text-2xl flex items-center justify-center space-x-3 
                    hover:text-fuchsia-200 transition py-3 
                    border-b border-white/20"
                  >
                    <FaHome />
                    <span>Home</span> </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link
                    to="/cart"
                    onClick={handleMenuItemClick}
                    className="block text-2xl flex items-center justify-center space-x-3 
                    hover:text-fuchsia-200 transition relative py-3"
                  >
                    <div className="relative flex items-center">
                      <FaShoppingCart className="mr-3" size={24} />
                      <AnimatePresence>
                        {orderCount > 0 && (
                          <CartBadge count={orderCount} />
                        )}
                      </AnimatePresence>
                      <span>Cart</span>
                    </div>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default Navbar;