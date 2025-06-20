import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface AnimatedCartIconProps {
  itemCount?: number;
  /** 
   * A changing value (e.g., timestamp or a random number) to trigger the 'item added' animation.
   * Update this prop from the parent component whenever an item is added to the cart.
   */
  animateTrigger?: string | number;
}

const AnimatedCartIcon: React.FC<AnimatedCartIconProps> = ({ itemCount = 0, animateTrigger }) => {
  console.log('AnimatedCartIcon loaded');

  const pocketHoverAnimation = {
    scale: 1.15,
    y: -3,
    rotate: [0, -4, 4, -4, 0],
    transition: { duration: 0.4, type: "spring", stiffness: 400, damping: 12 }
  };

  const itemAddedAnimation = {
    scale: [1, 1.25, 1],
    rotate: [0, 7, -7, 7, 0],
    transition: { duration: 0.6, type: "spring", stiffness: 350, damping: 10 }
  };

  return (
    <Link to="/cart" aria-label={`View shopping cart with ${itemCount} items`} className="relative inline-block no-underline">
      <motion.div
        key={animateTrigger} // Change this key to re-trigger 'itemAdded' animation
        initial={{ scale: 1, rotate: 0 }} // Base state
        animate={animateTrigger ? itemAddedAnimation : {}} // Apply itemAddedAnimation if trigger is present
        whileHover={pocketHoverAnimation}
        className="p-2 cursor-pointer"
        title={`Shopping Cart: ${itemCount} items`}
      >
        {/* Custom Doraemon Pocket Visual */}
        <div className="relative w-9 h-9"> {/* Overall container for the pocket */}
          {/* Main pocket body - Doraemon blue */}
          <div className="w-full h-full bg-blue-500 rounded-md shadow-sm"></div>
          {/* Pocket opening - white */}
          <div 
            className="absolute top-[25%] left-1/2 transform -translate-x-1/2 w-[65%] h-[30%] bg-white rounded-t-md"
            style={{ borderBottomLeftRadius: '2px', borderBottomRightRadius: '2px' }} // Makes bottom edge of opening slightly flatter
          ></div>
          {/* Optional: A tiny detail like Doraemon's bell color */}
           <div className="absolute bottom-[15%] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full border border-yellow-600"></div>
        </div>

        {itemCount > 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 25, delay: animateTrigger ? 0.1 : 0 }} // Delay badge pop if main icon animates
            className="absolute -top-1 -right-1"
          >
            <Badge
              variant="destructive" // Red badge for attention
              className="h-5 w-5 min-w-[1.25rem] text-xs flex items-center justify-center p-0.5 rounded-full shadow-lg border-2 border-white dark:border-gray-800"
            >
              {itemCount > 99 ? '99+' : itemCount}
            </Badge>
          </motion.div>
        )}
      </motion.div>
      {/* Developer Note:
          To trigger the 'itemAdded' animation, update the 'animateTrigger' prop in the parent component
          (e.g., ThemedHeader) with a new unique value (e.g., Date.now() or a counter) each time an 
          item is added to the cart. This change in the 'key' prop on the motion.div will cause it to 
          re-evaluate its animation state, playing the 'itemAddedAnimation'.
      */}
    </Link>
  );
};

export default AnimatedCartIcon;