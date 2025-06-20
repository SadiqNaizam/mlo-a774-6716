import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingCart, Bell } from 'lucide-react'; // Bell as default motif
import { motion } from 'framer-motion';

export interface ThemedFoodItemCardProps {
  id: string | number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  /** Icon component for the Doraemon-themed motif. Defaults to Bell icon from lucide-react. */
  MotifIcon?: React.ElementType;
  onAddToCart: (item: { id: string | number; name: string; price: number }) => void;
}

const ThemedFoodItemCard: React.FC<ThemedFoodItemCardProps> = ({
  id,
  name,
  price,
  description,
  imageUrl,
  MotifIcon = Bell, // Default to Bell icon
  onAddToCart,
}) => {
  const { toast } = useToast();
  console.log(`ThemedFoodItemCard loaded for: ${name}`);

  const handleAddToCart = () => {
    onAddToCart({ id, name, price });
    toast({
      title: "🔔 Added to Cart!",
      description: `${name} is on its way to your 4D Pocket!`,
      className: "bg-blue-100 border-blue-300 text-blue-700", // Thematic toast
    });
  };

  return (
    <Card className="w-full max-w-xs sm:max-w-sm rounded-xl overflow-hidden shadow-lg border-2 border-sky-300 bg-white transition-all duration-300 hover:shadow-2xl hover:border-sky-500 group flex flex-col">
      <CardHeader className="p-0 relative">
        <AspectRatio ratio={4 / 3}>
          <img
            src={imageUrl || 'https://via.placeholder.com/400x300.png?text=Delicious+Food'}
            alt={name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </AspectRatio>
        <div className="absolute top-3 right-3 bg-yellow-400 p-1.5 rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[15deg]">
          <MotifIcon className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-2 flex-grow flex flex-col items-center text-center">
        <h3 className="text-xl font-bold text-sky-700 group-hover:text-sky-600 transition-colors">{name}</h3>
        <p className="text-2xl font-semibold text-red-600">¥{price.toLocaleString()}</p>
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 h-[2.5em] sm:h-[3em] overflow-hidden">
          {description}
        </p>
      </CardContent>

      <CardFooter className="p-4 mt-auto bg-sky-50 border-t border-sky-200">
        <motion.div
          className="w-full"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <Button
            onClick={handleAddToCart}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 text-base rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-all duration-200 flex items-center justify-center"
            aria-label={`Add ${name} to cart`}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
        </motion.div>
      </CardFooter>
    </Card>
  );
};

export default ThemedFoodItemCard;