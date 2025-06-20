import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Custom Components
import ThemedHeader from '@/components/layout/ThemedHeader';
import CartItemRow from '@/components/CartItemRow';
import ThemedFooter from '@/components/layout/ThemedFooter';

// Shadcn/ui Components
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
// import { Separator } from '@/components/ui/separator'; // Not strictly needed here

// Lucide Icons
import { ShoppingCart, ArrowRight, ShoppingBag, Pocket } from 'lucide-react';

// Define CartItem interface (matches props for CartItemRow)
interface CartItem {
  id: string | number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

// Sample data for cart items
const sampleCartItemsData: CartItem[] = [
  {
    id: 'dorayaki-01',
    name: "Dorayaki Classic Pack (3pcs)",
    price: 3.50, // Price per pack
    imageUrl: "https://images.unsplash.com/photo-1582050119401-63990373e4a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9yYXlha2l8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=100&q=60",
    quantity: 2,
  },
  {
    id: 'memorybread-02',
    name: "Memory Bread Loaf (Mini)",
    price: 4.75,
    imageUrl: "https://images.unsplash.com/photo-1549923149-0004b4a55081?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dG9hc3QlMjBicmVhZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=100&q=60",
    quantity: 1,
  },
  {
    id: 'anywheredoor-jelly-03',
    name: "Anywhere Door Jelly Cup",
    price: 2.25,
    imageUrl: "https://images.unsplash.com/photo-1541595327810-615672501013?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZnJ1aXQlMjBqZWxseXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=100&q=60",
    quantity: 3,
  },
];

const CartPage: React.FC = () => {
  console.log('CartPage loaded');
  const [cartItems, setCartItems] = useState<CartItem[]>(sampleCartItemsData);
  const navigate = useNavigate();

  useEffect(() => {
    // This is just for local state example. In a real app, cart state might come from context/global store.
    // Potentially load cart from localStorage or an API here.
  }, []);

  const handleQuantityChange = (itemId: string | number, newQuantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: Math.max(1, newQuantity) } : item
      ).filter(item => item.quantity > 0) // Remove if quantity becomes 0, though CartItemRow handles > 1
    );
  };

  const handleRemoveItem = (itemId: string | number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    // In a real app, a toast notification might be shown (CartItemRow already does this)
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  // For simplicity, total is same as subtotal. Could add tax/shipping.
  const total = subtotal;

  return (
    <div className="flex flex-col min-h-screen bg-sky-50 dark:bg-slate-900 selection:bg-yellow-300 selection:text-yellow-900">
      <ThemedHeader />

      <main className="flex-grow container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-xl border-2 border-blue-400 bg-white dark:bg-slate-800 rounded-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl">
            <CardHeader className="bg-blue-500 dark:bg-blue-700 p-6">
              <CardTitle className="text-2xl sm:text-3xl font-bold text-white flex items-center justify-center gap-3">
                <Pocket className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0" />
                Your 4D Pocket Cart
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              {cartItems.length === 0 ? (
                <div className="p-8 text-center">
                  <ShoppingBag className="w-20 h-20 sm:w-24 sm:h-24 mx-auto text-gray-400 dark:text-gray-500 mb-6 animate-pulse" />
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Your 4D Pocket is Empty!
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 mb-8">
                    Looks like Doraemon's pocket is waiting for some amazing gadgets (treats)!
                  </p>
                  <Button asChild size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-blue-700 font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-transform hover:scale-105">
                    <Link to="/menu">
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Discover Doraemon's Menu
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {cartItems.map(item => (
                    <CartItemRow
                      key={item.id}
                      item={item}
                      onQuantityChange={handleQuantityChange}
                      onRemoveItem={handleRemoveItem}
                    />
                  ))}
                </div>
              )}
            </CardContent>

            {cartItems.length > 0 && (
              <CardFooter className="bg-gray-50 dark:bg-slate-700/50 p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center sm:text-left w-full sm:w-auto">
                  <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Subtotal: <span className="font-bold">${subtotal.toFixed(2)}</span>
                  </p>
                  {/* Optional: Add tax, shipping, etc. here */}
                  <p className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                    Grand Total: <span className="font-extrabold">${total.toFixed(2)}</span>
                  </p>
                </div>
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-semibold text-base sm:text-lg py-3 px-6 sm:px-8 rounded-lg shadow-md hover:shadow-lg transition-transform hover:scale-105 focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                  onClick={() => navigate('/checkout')} // Navigate to /checkout as per App.tsx
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </main>

      <ThemedFooter />
    </div>
  );
};

export default CartPage;