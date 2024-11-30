import { FaHome, FaInfoCircle, FaUtensils, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        {/* Your main content goes here */}
        {/* This part of the page can contain all the content you want before the footer */}
      </div>

      {/* Footer Section */}
      <footer className="bg-gradient-to-r from-fuchsia-700 to-purple-900 text-white py-10 shadow-2xl mt-auto">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0">
            {/* Logo Section */}
            <div className="flex flex-col items-center md:items-start">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHevWCw9OwglL5vNOf4UovVnsyRf4pC2dmWg&s"
                alt="Vetvet Bite Logo"
                className="h-20 w-20 rounded-full object-cover border-4 border-white/20 mb-4 shadow-lg"
              />
              <h2 className="text-3xl font-bold text-white tracking-tight">Vetvet Bite</h2>
              <p className="text-sm text-gray-300 mt-2 text-center md:text-left">
                Delicious Moments, Crafted with Passion
              </p>
            </div>

            {/* Navigation Links */}
            <div className="grid grid-cols-3 gap-6 w-full md:w-auto">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white/80 border-b border-white/20 pb-2">
                  Navigate
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/" className="flex items-center text-white/80 hover:text-white transition-colors">
                      <FaHome className="mr-2" /> Home
                    </a>
                  </li>
                  <li>
                    <a href="/about" className="flex items-center text-white/80 hover:text-white transition-colors">
                      <FaInfoCircle className="mr-2" /> About
                    </a>
                  </li>
                  <li>
                    <a href="/menu" className="flex items-center text-white/80 hover:text-white transition-colors">
                      <FaUtensils className="mr-2" /> Menu
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white/80 border-b border-white/20 pb-2">
                  Contact
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-white/80">
                    <FaEnvelope className="mr-2" /> info@vetvetbite.com
                  </li>
                  <li className="flex items-center text-white/80">
                    <FaPhone className="mr-2" /> +1 (234) 567-890
                  </li>
                  <li className="flex items-center text-white/80">
                    <FaMapMarkerAlt className="mr-2" /> Food City, Street 123
                  </li>
                </ul>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white/80 border-b border-white/20 pb-2">
                  Connect
                </h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-white/80 hover:text-white transition-colors">
                    <FaFacebook size={24} />
                  </a>
                  <a href="#" className="text-white/80 hover:text-white transition-colors">
                    <FaInstagram size={24} />
                  </a>
                  <a href="#" className="text-white/80 hover:text-white transition-colors">
                    <FaTwitter size={24} />
                  </a>
                  <a href="#" className="text-white/80 hover:text-white transition-colors">
                    <FaLinkedin size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="mt-10 pt-6 border-t border-white/10 text-center">
            <p className="text-sm text-white/70">
              &copy; {new Date().getFullYear()} Vetvet Bite. All Rights Reserved.
            </p>
            <p className="text-xs text-white/50 mt-2">
              Crafted with ❤️ by <a href="https://midenus.vercel.app/" target="blank" className="text-indigo-300 hover:text-white">Midenus</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
