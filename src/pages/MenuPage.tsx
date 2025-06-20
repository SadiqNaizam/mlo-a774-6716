import React, { useState, useMemo, useEffect } from 'react';

// Custom Components
import ThemedHeader from '@/components/layout/ThemedHeader';
import ThemedFooter from '@/components/layout/ThemedFooter';
import ThemedFoodItemCard from '@/components/ThemedFoodItemCard';

// Shadcn/ui Components
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Lucide Icons
import { Search, Zap, Gift, Star, UtensilsCrossed, ChefHat, IceCream, Coffee } from 'lucide-react';

// Define FoodItem interface, matching props for ThemedFoodItemCard
interface FoodItem {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  MotifIcon?: React.ElementType;
}

const ITEMS_PER_PAGE = 8;

const allFoodItems: FoodItem[] = [
  { id: 'm1', name: "Giant's Hearty Stew", price: 1200, description: "A fulfilling stew, just like Gian would make (if he could cook!).", imageUrl: 'https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3Rld3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60', category: "Main Dishes", MotifIcon: ChefHat },
  { id: 'm2', name: "Time Machine Pasta", price: 1500, description: "Pasta that takes your tastebuds on a journey through time!", imageUrl: 'https://images.unsplash.com/photo-1551183024-c89408900036?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGFzdGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60', category: "Main Dishes", MotifIcon: Zap },
  { id: 's1', name: "Classic Dorayaki", price: 350, description: "Doraemon's absolute favorite! Sweet red bean paste between fluffy pancakes.", imageUrl: 'https://images.unsplash.com/photo-1610192243920-e03d70a2e2a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZG9yYXlha2l8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60', category: "Snacks & Sides", MotifIcon: Star },
  { id: 's2', name: "Memory Bread Toasties", price: 450, description: "Crunchy toast that helps you ace your tests. Comes with jam!", imageUrl: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG9hc3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60', category: "Snacks & Sides", MotifIcon: Gift },
  { id: 's3', name: "Anywhere Door Fries", price: 400, description: "Crispy fries that can transport you to a world of flavor.", imageUrl: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJpZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60', category: "Snacks & Sides" },
  { id: 'd1', name: "Translation Jelly Delight", price: 550, description: "A wobbly jelly that lets you understand any animal... or just enjoy its fruity taste!", imageUrl: 'https://images.unsplash.com/photo-1549397225-8350003bcc08?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8amVsbHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60', category: "Desserts", MotifIcon: IceCream },
  { id: 'd2', name: "Small Light Sundae", price: 600, description: "A miniature sundae packed with giant flavor. Perfect for a tiny adventure.", imageUrl: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3VuZGFlfGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60', category: "Desserts" },
  { id: 'dr1', name: "Take-Kopter Refresher", price: 300, description: "A fizzy drink that will make you feel like you're flying!", imageUrl: 'https://images.unsplash.com/photo-1534353455494-5d96f0102c59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zml6enl8ZHJpbmt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60', category: "Drinks", MotifIcon: Coffee },
  { id: 'dr2', name: "Doraemon Blue Sky Soda", price: 320, description: "A vibrant blue soda, as cheerful as Doraemon himself.", imageUrl: 'https://images.unsplash.com/photo-1600788886048-1450a4085892?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZSUyMHNvZGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60', category: "Drinks" },
  { id: 's4', name: "Gulliver Tunnel Gummy", price: 250, description: "A long gummy that stretches your imagination (and your stomach).", imageUrl: 'https://images.unsplash.com/photo-1580827010767-01e6d0f081f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3VtbXklMjBjYW5keXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60', category: "Snacks & Sides", MotifIcon: Zap },
  { id: 'm3', name: "Nobita's Naptime Noodles", price: 900, description: "Comforting noodles, perfect for a pre-nap meal. Guaranteed good dreams!", imageUrl: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bm9vZGxlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60', category: "Main Dishes" },
  { id: 'd3', name: "Shizuka's Sweet Symphony Cake", price: 700, description: "An elegant slice of cake, as sweet and graceful as Shizuka.", imageUrl: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FrZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60', category: "Desserts", MotifIcon: Star },
  { id: 'dr3', name: "What-If Phone Fizzy Drink", price: 350, description: "A mysterious drink that might change its flavor! What if it does?", imageUrl: 'https://images.unsplash.com/photo-1581006852262-5904100b1301?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29sb3JmdWwlMjBkcmlua3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60', category: "Drinks" },
];

const MenuPage: React.FC = () => {
  console.log('MenuPage loaded');

  const initialCategory = useMemo(() => {
    const categories = ["All", ...new Set(allFoodItems.map(item => item.category))];
    return categories[0];
  }, []);

  const [activeTab, setActiveTab] = useState<string>(initialCategory);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<string>("name-asc");

  const categories = useMemo(() => ["All", ...new Set(allFoodItems.map(item => item.category))], []);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when tab, search term or sort order changes
  }, [activeTab, searchTerm, sortOrder]);

  const handleAddToCart = (item: { id: string | number; name: string; price: number }) => {
    console.log('MenuPage: Item added to cart from ThemedFoodItemCard:', item);
    // ThemedFoodItemCard shows its own toast.
    // For the AnimatedCartIcon in ThemedHeader to react, a shared state/context
    // updating an 'animateTrigger' prop would be necessary. This is beyond single-page scope.
  };

  const sortedAndFilteredItems = useMemo(() => {
    let items = [...allFoodItems];

    if (activeTab !== "All") {
      items = items.filter(item => item.category === activeTab);
    }

    if (searchTerm.trim() !== "") {
      items = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase().trim())
      );
    }

    items.sort((a, b) => {
      switch (sortOrder) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        default:
          return 0;
      }
    });

    return items;
  }, [activeTab, searchTerm, sortOrder]);

  const totalPages = Math.ceil(sortedAndFilteredItems.length / ITEMS_PER_PAGE);
  const currentItems = sortedAndFilteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Generate page numbers for pagination, simple version
  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="flex flex-col min-h-screen bg-sky-50/50 dark:bg-slate-900 selection:bg-yellow-400 selection:text-yellow-900">
      <ThemedHeader />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <section aria-labelledby="menu-heading" className="mb-10 text-center">
          <h1 id="menu-heading" className="text-4xl sm:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-3 tracking-tight">
            Our Whimsical Menu
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Discover Doraemon's favorite dishes, gadget-inspired snacks, and magical treats!
          </p>
        </section>

        <div className="mb-8 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg flex flex-col md:flex-row gap-4 items-center sticky top-[80px] z-40 backdrop-blur-sm bg-white/80 dark:bg-slate-800/80"> {/* Header height approx 80px */}
          <div className="relative flex-grow w-full md:flex-grow-[2]">
            <Input
              type="text"
              placeholder="Search for Dorayaki, Memory Bread..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full text-base h-12 rounded-lg border-sky-300 focus:border-sky-500 focus:ring-sky-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              aria-label="Search menu items"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
          </div>
          <div className="w-full md:w-auto md:flex-grow-[1]">
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-full h-12 rounded-lg border-sky-300 text-gray-700 dark:bg-slate-700 dark:border-slate-600 dark:text-gray-300">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent className="dark:bg-slate-700 dark:text-white">
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                <SelectItem value="price-desc">Price (High to Low)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 p-1 bg-sky-100 dark:bg-slate-700 rounded-lg">
            {categories.map(category => (
              <TabsTrigger
                key={category}
                value={category}
                className="py-2.5 px-3 text-sm font-semibold rounded-md data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:text-sky-700 data-[state=inactive]:hover:bg-sky-200 dark:data-[state=inactive]:text-sky-300 dark:data-[state=inactive]:hover:bg-slate-600 transition-all duration-150"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {currentItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8">
            {currentItems.map(item => (
              <ThemedFoodItemCard
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                description={item.description}
                imageUrl={item.imageUrl}
                MotifIcon={item.MotifIcon || UtensilsCrossed}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <UtensilsCrossed className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500 mb-4" />
            <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {searchTerm ? `No treats match "${searchTerm}"` + (activeTab !== "All" ? ` in ${activeTab.toLowerCase()}` : '') + "." : 
                            (activeTab !== "All" ? `No treats currently in ${activeTab.toLowerCase()}.` : "No treats to display.")}
            </p>
            <p className="text-gray-500 dark:text-gray-400">Try a different category or search term, or check back soon!</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "hover:bg-sky-100 dark:hover:bg-slate-700"}
                    aria-disabled={currentPage === 1}
                  />
                </PaginationItem>
                {getPageNumbers().map(page => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => { e.preventDefault(); handlePageChange(page); }}
                      isActive={currentPage === page}
                      className={currentPage === page ? "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700" : "hover:bg-sky-100 dark:hover:bg-slate-700"}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "hover:bg-sky-100 dark:hover:bg-slate-700"}
                    aria-disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </main>

      <ThemedFooter />
    </div>
  );
};

export default MenuPage;