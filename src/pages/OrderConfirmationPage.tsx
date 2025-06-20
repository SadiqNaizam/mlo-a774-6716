import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemedHeader from '@/components/layout/ThemedHeader';
import ThemedFooter from '@/components/layout/ThemedFooter';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { CheckCircle2, Home, Gift } from 'lucide-react'; // Gift for "Browse More Gadgets"

// Simulate fetching/receiving order details from state or API
interface OrderDetails {
  orderId: string;
  itemsSummary: string;
  estimatedTime: string;
  customerName?: string; // Optional
}

const OrderConfirmationPage: React.FC = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const location = useLocation();

  useEffect(() => {
    console.log('OrderConfirmationPage loaded');
    // In a real app, order details might come from route state, context, or an API call
    // For this example, we'll use placeholder data or try to get it from location.state
    const stateOrderDetails = location.state as OrderDetails;

    if (stateOrderDetails && stateOrderDetails.orderId) {
      setOrderDetails(stateOrderDetails);
    } else {
      // Fallback placeholder data
      setOrderDetails({
        orderId: `DORA-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        itemsSummary: "Your Dorayaki Delight, Memory Bread Toast, and Anywhere Door Jelly are being prepared by our Time Kitchen chefs!",
        estimatedTime: "Approx. 30-45 minutes (or as fast as the Take-Kopter can fly!)",
        customerName: "Valued Friend"
      });
    }
  }, [location.state]);

  if (!orderDetails) {
    return (
      <div className="flex flex-col min-h-screen">
        <ThemedHeader />
        <main className="flex-grow flex items-center justify-center bg-sky-50 p-4">
          <p>Loading order details...</p>
        </main>
        <ThemedFooter />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-sky-50 dark:bg-gray-800">
      <ThemedHeader />
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <Card className="w-full max-w-2xl shadow-xl border-2 border-yellow-400 bg-white dark:bg-gray-900 rounded-xl overflow-hidden">
          <CardHeader className="bg-blue-500 text-white p-6 text-center">
            <div className="flex flex-col items-center">
              <CheckCircle2 className="w-16 h-16 mb-3 text-yellow-300" />
              <CardTitle className="text-3xl font-bold">
                Order Confirmed, {orderDetails.customerName || "Friend"}!
              </CardTitle>
              <CardDescription className="text-blue-100 mt-1 text-sm">
                Doraemon is delighted with your choices!
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6 text-center sm:text-left">
            <div className="space-y-1">
              <Label htmlFor="orderId" className="text-sm font-medium text-gray-500 dark:text-gray-400">Order ID:</Label>
              <p id="orderId" className="text-lg font-semibold text-sky-700 dark:text-sky-300">{orderDetails.orderId}</p>
            </div>

            <div className="space-y-1">
              <Label htmlFor="orderSummary" className="text-sm font-medium text-gray-500 dark:text-gray-400">Your Gadget Feast:</Label>
              <p id="orderSummary" className="text-md text-gray-700 dark:text-gray-300">
                {orderDetails.itemsSummary}
              </p>
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="estimatedTime" className="text-sm font-medium text-gray-500 dark:text-gray-400">Estimated Arrival:</Label>
              <p id="estimatedTime" className="text-md text-gray-700 dark:text-gray-300">
                {orderDetails.estimatedTime}
              </p>
            </div>

            <p className="text-md text-center text-blue-600 dark:text-blue-400 pt-4">
              Thank you for visiting Doraemon's Delightful Diner! We hope to see you again soon for more adventures!
            </p>
          </CardContent>
          <CardFooter className="p-6 bg-gray-50 dark:bg-gray-800/50 border-t dark:border-gray-700 flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild variant="default" size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-blue-700 font-semibold w-full sm:w-auto">
              <Link to="/">
                <Home className="mr-2 h-5 w-5" />
                Return to Homepage
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 dark:text-blue-300 dark:border-blue-400 w-full sm:w-auto">
              <Link to="/menu">
                <Gift className="mr-2 h-5 w-5" />
                Browse More Gadgets (Menu)
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
      <ThemedFooter />
    </div>
  );
};

export default OrderConfirmationPage;