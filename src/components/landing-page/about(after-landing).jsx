import { motion } from 'framer-motion';
import { Parallax } from 'react-parallax';

const AboutSection = () => {
  return (
    <section className="w-full bg-neutral-50">
      {/* Header */}
      <div className="relative h-[60vh] overflow-hidden">
        <Parallax
          bgImage="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070"
          strength={200}
          className="absolute inset-0"
          renderLayer={percentage => (
            <div
              className="absolute inset-0"
              style={{
                transform: `translateY(${percentage * 50}px)`
              }}
            />
          )}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative h-full flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white px-4"
            >
              <h1 className="text-4xl md:text-6xl font-light tracking-[0.2em] mb-6">
                OUR STORY
              </h1>
              <p className="text-lg md:text-xl tracking-wider font-light">
                A CULINARY JOURNEY SINCE 2010
              </p>
            </motion.div>
          </div>
        </Parallax>
      </div>

      {/* Content Grid */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-light tracking-wide">
              Crafting Culinary Excellence
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our journey began with a simple passion for exceptional food and 
              memorable dining experiences. Today, we continue to push the boundaries
              of culinary artistry while honoring traditional techniques.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mt-12">
              <div className="p-6 rounded-xl bg-white shadow-lg">
                <span className="block text-4xl font-light mb-2">15+</span>
                <p className="text-sm text-gray-500 uppercase tracking-wider">
                  Years of Excellence
                </p>
              </div>
              <div className="p-6 rounded-xl bg-white shadow-lg">
                <span className="block text-4xl font-light mb-2">5K+</span>
                <p className="text-sm text-gray-500 uppercase tracking-wider">
                  Happy Customers
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Images */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="aspect-[4/5] rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0"
                  alt="Dish"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  src="https://images.unsplash.com/photo-1515669097368-22e68427d265"
                  alt="Kitchen"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </motion.div>
            </div>
            <div className="space-y-4 pt-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  src="https://images.unsplash.com/photo-1559339352-11d035aa65de"
                  alt="Interior"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="aspect-[4/5] rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  src="https://images.unsplash.com/photo-1551632436-cbf8dd35adfa"
                  alt="Cooking"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;