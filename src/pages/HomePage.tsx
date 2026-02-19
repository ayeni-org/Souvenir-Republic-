import React, { useState, useEffect, useRef } from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { ProductCard } from '../components/ProductCard';
import { Footer } from '../components/Footer';
import { BannerSlider } from '../components/BannerSlider';
import { LayoutGrid, List, ChevronLeft, ChevronRight, Filter, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useAdmin } from '../AdminContext';

export const HomePage: React.FC = () => {
  const { products, settings } = useAdmin();
  const activeProducts = products.filter(p => p.active);
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [displayedProducts, setDisplayedProducts] = useState(activeProducts.slice(0, 8));
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(activeProducts.length > 8);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDisplayedProducts(activeProducts.slice(0, displayedProducts.length || 8));
    setHasMore(activeProducts.length > displayedProducts.length);
  }, [products]);

  useEffect(() => {
    if (!settings.infiniteScroll) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && hasMore) {
          loadMoreProducts();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [isLoading, hasMore, settings.infiniteScroll]);

  const loadMoreProducts = () => {
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const currentLength = displayedProducts.length;
      const nextBatch = activeProducts.slice(currentLength, currentLength + 4);
      
      if (nextBatch.length > 0) {
        setDisplayedProducts(prev => [...prev, ...nextBatch]);
      } else {
        setHasMore(false);
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFB]">
      <Header />
      
      <BannerSlider />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-8">
          <a href="#" className="hover:text-gold transition-colors">Home</a>
          <span className="text-gray-300">/</span>
          <a href="#" className="hover:text-gold transition-colors">Shopping</a>
          <span className="text-gray-300">/</span>
          <span className="text-black">All Products</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          <Sidebar />

          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white p-4 md:p-6 rounded-3xl border border-gray-100 shadow-sm mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <h2 className="text-lg md:text-xl font-bold text-gray-900">
                  <span className="text-gold">{activeProducts.length}</span> Items Found
                </h2>
              </div>

              <div className="flex items-center gap-3 md:gap-6">
                <div className="flex items-center bg-gray-100 p-1.5 rounded-xl border border-gray-100">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-md text-gold' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <LayoutGrid size={18} />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-md text-gold' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <List size={18} />
                  </button>
                </div>
                
                <div className="relative">
                  <select className="appearance-none bg-gray-50 border border-gray-100 rounded-xl py-2.5 pl-4 pr-10 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-gold/20 cursor-pointer hover:bg-white transition-all">
                    <option>Sort by: Default</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest Arrivals</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>

                <button className="lg:hidden p-2.5 bg-gray-50 rounded-xl border border-gray-100 text-gray-600">
                  <Filter size={18} />
                </button>
              </div>
            </div>

            {/* Product Grid */}
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
              {displayedProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                />
              ))}
            </div>

            {/* Infinite Scroll Loader */}
            <div 
              ref={loaderRef}
              className="mt-16 py-8 flex flex-col items-center justify-center gap-4"
            >
              {isLoading ? (
                <>
                  <Loader2 className="text-gold animate-spin" size={32} />
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Loading more treasures...</p>
                </>
              ) : hasMore ? (
                <button 
                  onClick={loadMoreProducts}
                  className="bg-white border-2 border-gray-100 text-gray-400 px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:border-gold hover:text-gold transition-all"
                >
                  Load More
                </button>
              ) : (
                <div className="text-center">
                  <div className="w-12 h-1 bg-gray-100 mx-auto mb-4 rounded-full" />
                  <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">You've reached the end of the collection</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Helper component for select arrow
const ChevronDown = ({ className, size }: { className?: string, size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m6 9 6 6 6-6"/>
  </svg>
);
