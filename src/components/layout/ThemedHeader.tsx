import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { HomeIcon, BookOpen, Menu as MenuIcon, নিয়েBell } from 'lucide-react'; // নিয়েBell is Doraemon's bell
import AnimatedCartIcon from '@/components/AnimatedCartIcon'; // Assuming this component exists and handles its own link to /cart

// Assuming GadgetIcon might be used like this, if available and preferred over lucide-react icons for Home/Menu
// import GadgetIcon from '@/components/GadgetIcon';

const ThemedHeader: React.FC = () => {
  console.log('ThemedHeader loaded');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const siteName = "Doraemon's Delightful Diner";

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center text-sm font-medium transition-colors hover:text-blue-500 ${
      isActive ? 'text-blue-600 font-bold' : 'text-gray-700 dark:text-gray-300'
    }`;

  const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center py-2 text-lg font-medium transition-colors hover:text-blue-500 ${
      isActive ? 'text-blue-600 font-bold' : 'text-gray-700 dark:text-gray-200'
    }`;

  const navItems = (
    <>
      <NavLink to="/" className={navLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>
        <HomeIcon className="h-5 w-5 mr-1" />
        {/* Example with GadgetIcon if available: <GadgetIcon name="home" className="h-5 w-5 mr-1" /> */}
        Home
      </NavLink>
      <NavLink to="/menu" className={navLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>
        <BookOpen className="h-5 w-5 mr-1" />
        {/* Example with GadgetIcon if available: <GadgetIcon name="menu" className="h-5 w-5 mr-1" /> */}
        Menu
      </NavLink>
    </>
  );

  const mobileNavItems = (
    <>
      <SheetClose asChild>
        <NavLink to="/" className={mobileNavLinkClasses}>
          <HomeIcon className="h-6 w-6 mr-2" />
          Home
        </NavLink>
      </SheetClose>
      <SheetClose asChild>
        <NavLink to="/menu" className={mobileNavLinkClasses}>
          <BookOpen className="h-6 w-6 mr-2" />
          Menu
        </NavLink>
      </SheetClose>
    </>
  );


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/90 dark:bg-gray-900/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 shadow-sm">
      <div className="container flex h-20 items-center justify-between mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
          <নিয়েBell className="h-8 w-8 text-blue-500" /> {/* Doraemon's Bell icon */}
          <span className="font-bold text-xl text-blue-700 dark:text-blue-400">{siteName}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems}
        </nav>

        <div className="flex items-center gap-3">
          {/* AnimatedCartIcon is expected to handle its own link to /cart */}
          <AnimatedCartIcon />

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MenuIcon className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px] bg-white dark:bg-gray-950 p-6">
                <div className="flex flex-col space-y-5 mt-8">
                  {mobileNavItems}
                </div>
                <div className="absolute bottom-6 left-6 right-6 flex justify-center">
                    <Link to="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                        <নিয়েBell className="h-7 w-7 text-blue-500" />
                        <span className="font-semibold text-lg text-blue-700 dark:text-blue-400">{siteName}</span>
                    </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ThemedHeader;