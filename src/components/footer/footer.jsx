import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="mb-6 md:mb-0">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHevWCw9OwglL5vNOf4UovVnsyRf4pC2dmWg&s" 
              alt="Vetvet Bite Logo" 
              className="h-16 mb-2" 
            />
            <h2 className="text-2xl font-bold">Vetvet Bite</h2>
            <p className="mt-2 text-sm">Your favorite place for delicious meals!</p>
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-10">
            <div>
              <h3 className="text-lg font-semibold">Links</h3>
              <ul className="mt-2 space-y-2">
                <li><a href="/" className="hover:text-indigo-400 transition-colors">Home</a></li>
                <li><a href="/about" className="hover:text-indigo-400 transition-colors">About</a></li>
                <li><a href="/menu" className="hover:text-indigo-400 transition-colors">Menu</a></li>
                <li><a href="/contact" className="hover:text-indigo-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Contact</h3>
              <ul className="mt-2 space-y-2">
                <li>Email: info@vetvetbite.com</li>
                <li>Phone: +1 (234) 567-890</li>
                <li>Address: 123 Food Street, Food City</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Follow Us</h3>
              <ul className="mt-2 flex space-x-4">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Twitter</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Vetvet Bite. All rights reserved.</p>
          <p className="text-xs mt-1">
            Developed by <a href="https://yourwebsite.com" className="text-indigo-400 hover:underline">Your Name</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;