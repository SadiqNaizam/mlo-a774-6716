import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, নিয়েBell } from 'lucide-react'; // নিয়েBell for thematic element

const ThemedFooter: React.FC = () => {
  console.log('ThemedFooter loaded');
  const currentYear = new Date().getFullYear();
  const siteName = "Doraemon's Delightful Diner";

  // Placeholder for small Doraemon illustrations or motifs
  // You could add <img> tags here or use CSS background images on certain elements

  return (
    <footer className="bg-blue-50 dark:bg-gray-900 border-t border-blue-100 dark:border-gray-800 text-gray-700 dark:text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Logo and Site Name */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <নিয়েBell className="h-7 w-7 text-blue-500" />
              <span className="font-bold text-lg text-blue-700 dark:text-blue-400">{siteName}</span>
            </Link>
            <p className="text-sm text-center md:text-left">Bringing joy and deliciousness, one gadget at a time!</p>
            {/* Placeholder for small Doraemon motif */}
            {/* <img src="/path-to-doraemon-motif.png" alt="Doraemon Motif" className="h-10 w-10 mt-2" /> */}
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 text-sm">
            <Link to="/legal/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Terms of Service
            </Link>
            <Link to="/legal/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/menu" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Our Menu
            </Link>
            {/* Add more links if needed, e.g., About Us, Contact */}
          </nav>

          {/* Social Media Icons and Copyright */}
          <div className="flex flex-col items-center md:items-end">
            <div className="flex gap-4 mb-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-500 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-500 dark:text-gray-400 hover:text-sky-500 dark:hover:text-sky-400">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
            <p className="text-xs text-center md:text-right">
              &copy; {currentYear} {siteName}. All rights reserved.
            </p>
            <p className="text-xs text-center md:text-right mt-1">
              Inspired by the world of Doraemon.
            </p>
          </div>
        </div>
         {/* Optional: A subtle thematic border or element at the very bottom */}
        <div className="mt-8 pt-4 border-t border-blue-100 dark:border-gray-800/50 text-center text-xs text-gray-500 dark:text-gray-400">
            <p>Thank you for visiting our delightful diner!</p>
        </div>
      </div>
    </footer>
  );
};

export default ThemedFooter;