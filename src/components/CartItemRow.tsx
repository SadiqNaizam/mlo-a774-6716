import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartItem {
  id: string | number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface CartItemRowProps {
  item: CartItem;
  onQuantityChange: (itemId: string | number, newQuantity: number) => void;
  onRemoveItem: (itemId: string | number) => void;
}

const CartItemRow: React.FC<CartItemRowProps> = ({ item, onQuantityChange, onRemoveItem }) => {
  const { toast } = useToast();

  useEffect(() => {
    console.log(`CartItemRow loaded for: ${item.name}`);
  }, [item.name]);

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.id, item.quantity - 1);
    }
  };

  const handleIncrement = () => {
    // Assuming no upper stock limit for simplicity in this component
    onQuantityChange(item.id, item.quantity + 1);
  };

  const handleRemove = () => {
    onRemoveItem(item.id);
    toast({
      title: "Item Removed",
      description: `${item.name} has been removed from your cart.`,
      variant: "destructive",
    });
  };

  return (
    <div className="flex flex-col sm:flex-row items-center p-4 border-b border-gray-200 hover:bg-blue-50/50 transition-colors duration-150 gap-4">
      <img
        src={item.imageUrl || 'https://placehold.co/100x100?text=DoraemonItem'}
        alt={item.name}
        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border border-gray-200"
      />

      <div className="flex-grow text-center sm:text-left">
        <h3 className="text-lg font-semibold text-sky-700 group-hover:text-sky-800">
          {item.name}
        </h3>
        <p className="text-sm text-gray-600">
          Price per item: ${item.price.toFixed(2)}
        </p>
        <p className="text-md font-medium text-gray-800">
          Subtotal: ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>

      <div className="flex items-center space-x-2 my-2 sm:my-0">
        <Button
          variant="outline"
          size="icon"
          onClick={handleDecrement}
          disabled={item.quantity <= 1}
          aria-label="Decrease quantity"
          className="border-sky-500 text-sky-600 hover:bg-sky-100 disabled:opacity-50 w-8 h-8 sm:w-10 sm:h-10"
        >
          <Minus className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
        <Input
          type="text" // Using text for readOnly to prevent number input quirks
          readOnly
          value={item.quantity}
          className="w-12 sm:w-14 h-8 sm:h-10 text-center border-gray-300 rounded-md focus-visible:ring-0 focus-visible:ring-offset-0 bg-white"
          aria-label="Current quantity"
        />
        <Button
          variant="outline"
          size="icon"
          onClick={handleIncrement}
          aria-label="Increase quantity"
          className="border-sky-500 text-sky-600 hover:bg-sky-100 w-8 h-8 sm:w-10 sm:h-10"
        >
          <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleRemove}
        aria-label="Remove item from cart"
        className="text-red-500 hover:text-red-700 hover:bg-red-100 w-8 h-8 sm:w-10 sm:h-10"
      >
        <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
    </div>
  );
};

export default CartItemRow;