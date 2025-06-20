import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

import ThemedHeader from '../components/layout/ThemedHeader';
import ThemedFooter from '../components/layout/ThemedFooter';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { User, Mail, Phone, Truck, Home, CreditCard, CalendarDays, Lock, Package as PackageIcon } from 'lucide-react';

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  deliveryOption: z.enum(["delivery", "pickup"], { required_error: "Please select a delivery or pickup option." }),
  address: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  cardNumber: z.string().regex(/^(?:[0-9]{4}[\s-]?){3}[0-9]{4}$/, { message: "Enter a valid 16-digit card number." }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Enter expiry as MM/YY." }),
  cvv: z.string().regex(/^\d{3,4}$/, { message: "Enter a valid 3 or 4 digit CVV." }),
  terms: z.boolean().refine(val => val === true, { message: "You must accept the terms and conditions." }),
}).superRefine((data, ctx) => {
  if (data.deliveryOption === "delivery") {
    if (!data.address || data.address.trim() === "") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Address is required for delivery.", path: ["address"] });
    }
    if (!data.city || data.city.trim() === "") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "City is required for delivery.", path: ["city"] });
    }
    if (!data.postalCode || data.postalCode.trim() === "") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Postal code is required for delivery.", path: ["postalCode"] });
    }
     if (!data.country || data.country.trim() === "") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Country is required for delivery.", path: ["country"] });
    }
  }
});

type CheckoutFormValues = z.infer<typeof formSchema>;

const CheckoutPage = () => {
  console.log('CheckoutPage loaded');
  const navigate = useNavigate();
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState<string | undefined>(undefined);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      deliveryOption: undefined,
      address: "",
      city: "",
      postalCode: "",
      country: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      terms: false,
    },
  });

  const onSubmit = (data: CheckoutFormValues) => {
    console.log("Checkout form submitted:", data);
    // Simulate API call
    toast.success("Order Placed!", {
      description: "Your Doraemon-themed meal is being prepared. Redirecting...",
      duration: 3000,
      action: {
        label: "Track (Demo)",
        onClick: () => console.log("Track order clicked"),
      },
    });
    setTimeout(() => {
      navigate('/order-confirmation'); // Path from App.tsx
    }, 3000);
  };

  const cardAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: "easeOut" }
  };
  
  const countries = ["Japan", "USA", "Canada", "UK"]; // Placeholder countries

  return (
    <div className="flex flex-col min-h-screen bg-sky-50 dark:bg-slate-900">
      <ThemedHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 text-center mb-2">
            Checkout - Almost There!
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            Please fill in your details to complete your magical order.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <motion.div {...cardAnimation}>
                <Card className="shadow-xl border-2 border-blue-300 dark:border-blue-700 overflow-hidden rounded-lg">
                  <CardHeader className="bg-blue-100 dark:bg-blue-800/30 p-4 sm:p-6">
                    <CardTitle className="text-xl sm:text-2xl text-blue-700 dark:text-blue-300 flex items-center">
                      <User className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> Contact Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                    <FormField control={form.control} name="fullName" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-gray-700 dark:text-gray-300"><User className="mr-2 h-4 w-4"/>Full Name</FormLabel>
                        <FormControl><Input placeholder="Nobita Nobi" {...field} className="dark:bg-slate-800 dark:border-slate-700" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-gray-700 dark:text-gray-300"><Mail className="mr-2 h-4 w-4"/>Email Address</FormLabel>
                        <FormControl><Input type="email" placeholder="nobita@example.com" {...field} className="dark:bg-slate-800 dark:border-slate-700" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-gray-700 dark:text-gray-300"><Phone className="mr-2 h-4 w-4"/>Phone Number (Optional)</FormLabel>
                        <FormControl><Input type="tel" placeholder="+81 90-1234-5678" {...field} className="dark:bg-slate-800 dark:border-slate-700" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div {...cardAnimation} transition={{ ...cardAnimation.transition, delay: 0.1 }}>
                <Card className="shadow-xl border-2 border-yellow-400 dark:border-yellow-600 overflow-hidden rounded-lg">
                  <CardHeader className="bg-yellow-100 dark:bg-yellow-700/30 p-4 sm:p-6">
                    <CardTitle className="text-xl sm:text-2xl text-yellow-700 dark:text-yellow-300 flex items-center">
                      <Truck className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> Delivery or Pickup
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                    <FormField control={form.control} name="deliveryOption" render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-gray-700 dark:text-gray-300">Choose an option:</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => {
                              field.onChange(value);
                              setSelectedDeliveryOption(value);
                            }}
                            defaultValue={field.value}
                            className="flex flex-col sm:flex-row gap-4"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl><RadioGroupItem value="delivery" className="text-blue-600 border-blue-400" /></FormControl>
                              <FormLabel className="font-normal text-gray-700 dark:text-gray-300">Delivery (Via Anywhere Door!)</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl><RadioGroupItem value="pickup" className="text-yellow-600 border-yellow-400" /></FormControl>
                              <FormLabel className="font-normal text-gray-700 dark:text-gray-300">Pickup (At the Diner)</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    {selectedDeliveryOption === "delivery" && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.3 }} className="space-y-4 pt-4 border-t border-yellow-200 dark:border-yellow-700/50">
                        <FormField control={form.control} name="address" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center text-gray-700 dark:text-gray-300"><Home className="mr-2 h-4 w-4"/>Delivery Address</FormLabel>
                            <FormControl><Input placeholder="1-2-3 Gadget Town" {...field} className="dark:bg-slate-800 dark:border-slate-700" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField control={form.control} name="city" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-700 dark:text-gray-300">City</FormLabel>
                                <FormControl><Input placeholder="Tokyo" {...field} className="dark:bg-slate-800 dark:border-slate-700" /></FormControl>
                                <FormMessage />
                            </FormItem>
                            )} />
                            <FormField control={form.control} name="postalCode" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-700 dark:text-gray-300">Postal Code</FormLabel>
                                <FormControl><Input placeholder="123-4567" {...field} className="dark:bg-slate-800 dark:border-slate-700" /></FormControl>
                                <FormMessage />
                            </FormItem>
                            )} />
                        </div>
                        <FormField control={form.control} name="country" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 dark:text-gray-300">Country</FormLabel>
                             <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="dark:bg-slate-800 dark:border-slate-700">
                                    <SelectValue placeholder="Select a country" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="dark:bg-slate-800">
                                  {countries.map(country => (
                                    <SelectItem key={country} value={country}>{country}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div {...cardAnimation} transition={{ ...cardAnimation.transition, delay: 0.2 }}>
                <Card className="shadow-xl border-2 border-pink-300 dark:border-pink-600 overflow-hidden rounded-lg">
                  <CardHeader className="bg-pink-100 dark:bg-pink-800/30 p-4 sm:p-6">
                    <CardTitle className="text-xl sm:text-2xl text-pink-700 dark:text-pink-300 flex items-center">
                      <CreditCard className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                    <FormField control={form.control} name="cardNumber" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-gray-700 dark:text-gray-300"><CreditCard className="mr-2 h-4 w-4"/>Card Number</FormLabel>
                        <FormControl><Input placeholder="0000 0000 0000 0000" {...field} className="dark:bg-slate-800 dark:border-slate-700" /></FormControl>
                        <FormDescription className="text-xs">Demo only. Enter a 16-digit number.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField control={form.control} name="expiryDate" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center text-gray-700 dark:text-gray-300"><CalendarDays className="mr-2 h-4 w-4"/>Expiry Date</FormLabel>
                          <FormControl><Input placeholder="MM/YY" {...field} className="dark:bg-slate-800 dark:border-slate-700" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="cvv" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center text-gray-700 dark:text-gray-300"><Lock className="mr-2 h-4 w-4"/>CVV</FormLabel>
                          <FormControl><Input placeholder="123" {...field} className="dark:bg-slate-800 dark:border-slate-700" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                     <p className="text-xs text-gray-500 dark:text-gray-400 pt-2">
                        Rest assured, your payment information is processed securely (this is a demo site, no real payment will be taken).
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <FormField control={form.control} name="terms" render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-4 shadow-md bg-white dark:bg-slate-800 dark:border-slate-700">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} id="terms" className="border-gray-400 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"/>
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel htmlFor="terms" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      I agree to the <Link to="/legal/terms" className="text-blue-600 hover:underline dark:text-blue-400">Terms and Conditions</Link> and <Link to="/legal/privacy" className="text-blue-600 hover:underline dark:text-blue-400">Privacy Policy</Link>.
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )} />

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{type: "spring", stiffness: 300}}>
                <Button type="submit" size="lg" className="w-full bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white text-lg font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                  <PackageIcon className="mr-2 h-5 w-5" /> Place Your Magical Order!
                </Button>
              </motion.div>
            </form>
          </Form>
        </motion.div>
      </main>
      <ThemedFooter />
    </div>
  );
};

export default CheckoutPage;