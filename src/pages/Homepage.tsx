import React from 'react';
import { Link } from 'react-router-dom';
import ThemedHeader from '@/components/layout/ThemedHeader';
import BestsellersSection from '@/components/BestsellersSection';
import ThemedFooter from '@/components/layout/ThemedFooter';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const Homepage: React.FC = () => {
  console.log('Homepage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-sky-50 text-gray-800">
      <ThemedHeader />

      <main className="flex-grow">
        {/* Hero Section */}
        <section
          className="relative bg-cover bg-center py-24 md:py-32 lg:py-40 text-white"
          // Using a publicly available Doraemon-themed image
          style={{ backgroundImage: "url('https://i.pinimg.com/originals/2d/0c/0e/2d0c0e29c9f3a8a5a5ac9d703a3e09e7.jpg')" }}
          aria-labelledby="hero-title"
        >
          <div className="absolute inset-0 bg-black/50"></div> {/* Dark overlay for text contrast */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.h1
              id="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight"
              style={{ textShadow: '0 0 8px rgba(0,0,0,0.7), 0 0 15px rgba(0,0,0,0.5)' }} // Enhanced text shadow for readability
            >
              Welcome to <span className="text-yellow-300">Doraemon's</span> Delightful Diner!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
              className="text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto"
              style={{ textShadow: '0 0 5px rgba(0,0,0,0.6)' }}
            >
              Step into a world of wonder and taste! Experience the magic of Doraemon's favorite dishes and gadgets with every delightful bite. Adventure awaits on your plate!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6, type: 'spring', stiffness: 180, damping: 15 }}
            >
              <Button
                asChild
                size="lg"
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-10 rounded-full text-lg shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-red-300"
                aria-label="Explore Our Magical Menu"
              >
                <Link to="/menu"> {/* Path from App.tsx */}
                  Explore Our Magical Menu
                  <Sparkles className="ml-2.5 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
          {/* Decorative elements to enhance theme - e.g., subtle floating gadgets if complex animations were desired */}
           <div className="absolute bottom-5 left-5 opacity-30 animate-pulse">
             {/* Placeholder for a small gadget icon or sparkle */}
             {/* <GadgetIcon gadget="doraemon-bell" size={40} className="text-yellow-200" /> */}
           </div>
           <div className="absolute top-5 right-5 opacity-30 animate-bounce delay-500">
             {/* <GadgetIcon gadget="take-kopter" size={50} className="text-blue-200" /> */}
           </div>
        </section>

        {/* Bestsellers Section - as per layout_info */}
        <BestsellersSection />
        
        {/* Additional Call to Action Section - for the 'Button' in layout_info */}
        <section className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <ShoppingBag className="mx-auto h-16 w-16 text-blue-500 mb-6" />
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-5">
                        Ready for a Flavor Adventure?
                    </h2>
                    <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto">
                        Our kitchen is buzzing with Doraemon's favorite recipes and secret ingredients, all waiting to make your day extraordinary.
                    </p>
                    <Button
                        asChild
                        size="lg"
                        className="bg-yellow-400 hover:bg-yellow-500 text-blue-700 font-bold py-4 px-10 rounded-full text-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-yellow-300"
                        aria-label="View the full menu now"
                    >
                        <Link to="/menu"> {/* Path from App.tsx */}
                            View Full Menu <ArrowRight className="ml-2.5 h-5 w-5" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
      </main>

      <ThemedFooter />
    </div>
  );
};

export default Homepage;