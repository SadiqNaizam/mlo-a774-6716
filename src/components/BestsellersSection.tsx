import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"; // Card used within ThemedFoodItemCard, but might be good for CarouselItem structure if needed.
import ThemedFoodItemCard from '@/components/ThemedFoodItemCard'; // Assuming this path is correct
import { ArrowRight } from 'lucide-react';

// Define a basic structure for the food items.
// The actual props for ThemedFoodItemCard might be more complex.
interface BestsellerItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  // Potentially a slug or link if ThemedFoodItemCard handles direct navigation
  // slug?: string; 
}

const bestsellerItemsData: BestsellerItem[] = [
  {
    id: '1',
    name: "Dorayaki Delight",
    price: 3.50,
    imageUrl: "https://via.placeholder.com/300x200/FFD700/000000?Text=Dorayaki",
    description: "Doraemon's favorite pancake, filled with sweet red bean paste!",
  },
  {
    id: '2',
    name: "Memory Bread Toast",
    price: 4.00,
    imageUrl: "https://via.placeholder.com/300x200/ADD8E6/000000?Text=Memory+Bread",
    description: "Delicious toast that helps you remember everything. Study smarter!",
  },
  {
    id: '3',
    name: "Anywhere Door Jelly",
    price: 5.25,
    imageUrl: "https://via.placeholder.com/300x200/FFC0CB/000000?Text=Anywhere+Door+Jelly",
    description: "A jiggly treat that tastes like adventure. Where will you go?",
  },
  {
    id: '4',
    name: "Small Light Gummy",
    price: 2.75,
    imageUrl: "https://via.placeholder.com/300x200/90EE90/000000?Text=Small+Light+Gummy",
    description: "A fun gummy that shrinks you down for a new perspective!",
  },
  {
    id: '5',
    name: "Time Kerchief Tempura",
    price: 6.00,
    imageUrl: "https://via.placeholder.com/300x200/E6E6FA/000000?Text=Time+Kerchief+Tempura",
    description: "Crispy tempura that can turn back time (for the food, not you!).",
  },
];

const BestsellersSection: React.FC = () => {
  console.log('BestsellersSection loaded');

  return (
    <section className="py-12 md:py-16 bg-blue-50/50 relative overflow-hidden">
      {/* Decorative elements - subtle Doraemon theme */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-300 rounded-full opacity-30 -translate-x-1/2 -translate-y-1/2 filter blur-xl"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-pink-300 rounded-full opacity-30 translate-x-1/3 translate-y-1/3 filter blur-2xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-4">
          Doraemon's Favorites!
        </h2>
        <p className="text-center text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto">
          Discover the most popular and beloved treats from our menu, handpicked by Doraemon himself!
        </p>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {bestsellerItemsData.map((item, index) => (
              <CarouselItem key={item.id || index} className="pl-4 basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <div className="p-1 h-full">
                  {/* 
                    Assuming ThemedFoodItemCard takes these props.
                    Adjust if the actual component has different prop requirements.
                    The 'id' is passed in case ThemedFoodItemCard needs it for 'Add to Cart' or other actions.
                  */}
                  <ThemedFoodItemCard
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    imageUrl={item.imageUrl}
                    description={item.description}
                    // Pass any other props ThemedFoodItemCard might expect
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-[-12px] sm:left-[-16px] md:left-[-20px] top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white" />
          <CarouselNext className="absolute right-[-12px] sm:right-[-16px] md:right-[-20px] top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white" />
        </Carousel>

        <div className="mt-10 md:mt-12 text-center">
          <Button asChild size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-blue-700 font-semibold shadow-lg transition-transform hover:scale-105">
            <Link to="/menu">
              View Full Menu <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BestsellersSection;