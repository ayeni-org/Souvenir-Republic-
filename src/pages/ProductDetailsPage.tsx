import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, Heart, Share2, Plus, Minus, CreditCard, 
  ChevronLeft, Star, ShieldCheck, Truck, RotateCcw,
  Info
} from 'lucide-react';
import { Product } from '../types';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import { useAuth } from '../AuthContext';
import { useAdmin } from '../AdminContext';

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated, addToWishlist, removeFromWishlist, addRecentlyViewed } = useAuth();
  const { products } = useAdmin();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');

  useEffect(() => {
    const foundProduct = products.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      addRecentlyViewed(foundProduct);
    }
    window.scrollTo(0, 0);
  }, [id, addRecentlyViewed, products]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFDFB]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <Link to="/" className="text-gold font-bold hover:underline">Back to Shopping</Link>
        </div>
      </div>
    );
  }

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFB]">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-8">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <span className="text-gray-300">/</span>
          <Link to="/" className="hover:text-gold transition-colors">Shopping</Link>
          <span className="text-gray-300">/</span>
          <span className="text-black">{product.name}</span>
        </nav>

        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gold mb-8 transition-colors group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Results
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="aspect-square rounded-[2.5rem] overflow-hidden bg-gray-50 border border-gray-100 shadow-sm">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 cursor-pointer hover:border-gold transition-all">
                  <img 
                    src={`${product.image}?sig=${i}`} 
                    alt={`${product.name} view ${i}`}
                    className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-auto">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-black text-gold uppercase tracking-[0.25em]">{product.category}</p>
                <div className="flex items-center gap-1.5 bg-green-50 px-3 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-[10px] font-bold text-green-700 uppercase">In Stock</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-1 text-gold">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={18} fill={s <= 4 ? "currentColor" : "none"} />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-400">(4.0 Rating • {product.reviews?.length || 0} Reviews)</span>
              </div>

              <div className="flex items-baseline gap-4 mb-10">
                <span className="text-5xl font-black text-black tracking-tighter">₦ {product.price.toLocaleString()}</span>
                <span className="text-lg text-gray-400 line-through font-medium">₦ {(product.price * 1.2).toLocaleString()}</span>
                <span className="bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-md uppercase">Save 20%</span>
              </div>

              <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 mb-10 space-y-4">
                <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                  <Truck size={20} className="text-gold" />
                  Free delivery on orders over ₦50,000
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                  <ShieldCheck size={20} className="text-gold" />
                  1 Year Official Warranty
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                  <RotateCcw size={20} className="text-gold" />
                  7 Days Easy Return Policy
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-wrap gap-4">
                {/* Quantity Selector */}
                <div className="flex items-center bg-black rounded-2xl p-1 border border-black shadow-lg">
                  <button 
                    onClick={handleDecrement}
                    className="w-12 h-12 flex items-center justify-center text-white hover:text-gold transition-all"
                  >
                    <Minus size={18} strokeWidth={3} />
                  </button>
                  <span className="w-14 text-center font-black text-xl text-white">{quantity}</span>
                  <button 
                    onClick={handleIncrement}
                    className="w-12 h-12 flex items-center justify-center text-white hover:text-gold transition-all"
                  >
                    <Plus size={18} strokeWidth={3} />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button className="flex-1 bg-black text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-black/10">
                  <ShoppingBag size={24} />
                  ADD TO CART
                </button>
              </div>

              {/* Buy Now Button */}
              <button className="w-full bg-gold text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-gold-dark hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-gold/20">
                <CreditCard size={24} />
                PROCEED TO CHECKOUT
              </button>

              <div className="flex items-center justify-center gap-8 pt-4">
                <button 
                  onClick={() => {
                    if (!isAuthenticated) {
                      navigate('/account');
                      return;
                    }
                    if (user?.wishlist.includes(product.id)) {
                      removeFromWishlist(product.id);
                    } else {
                      addToWishlist(product.id);
                    }
                  }}
                  className={`flex items-center gap-2 text-xs font-black transition-colors ${user?.wishlist.includes(product.id) ? 'text-gold' : 'text-gray-400 hover:text-red-500'}`}
                >
                  <Heart size={18} fill={user?.wishlist.includes(product.id) ? "currentColor" : "none"} />
                  {user?.wishlist.includes(product.id) ? 'IN WISHLIST' : 'ADD TO WISHLIST'}
                </button>
                <div className="w-px h-6 bg-gray-200"></div>
                <button className="flex items-center gap-2 text-xs font-black text-gray-400 hover:text-gold transition-colors">
                  <Share2 size={18} />
                  SHARE PRODUCT
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Frequently Bought Together */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl md:text-2xl font-black text-gray-900 uppercase tracking-tight">Frequently Bought Together</h3>
            <div className="h-px flex-1 bg-gray-100 mx-8 hidden md:block"></div>
            <Link to="/" className="text-xs font-black text-gold uppercase tracking-widest hover:underline whitespace-nowrap">View All</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.filter(p => p.active && p.id !== product.id).slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-16">
          <div className="flex border-b border-gray-100 mb-8">
            <button 
              onClick={() => setActiveTab('description')}
              className={`pb-4 px-8 text-sm font-black uppercase tracking-widest transition-all relative ${activeTab === 'description' ? 'text-gold' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Description
              {activeTab === 'description' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-gold rounded-full" />}
            </button>
            <button 
              onClick={() => setActiveTab('specifications')}
              className={`pb-4 px-8 text-sm font-black uppercase tracking-widest transition-all relative ${activeTab === 'specifications' ? 'text-gold' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Specifications
              {activeTab === 'specifications' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-gold rounded-full" />}
            </button>
            <button 
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 px-8 text-sm font-black uppercase tracking-widest transition-all relative ${activeTab === 'reviews' ? 'text-gold' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Reviews ({product.reviews?.length || 0})
              {activeTab === 'reviews' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-gold rounded-full" />}
            </button>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm min-h-[300px]">
            {activeTab === 'description' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="prose prose-gold max-w-none">
                <p className="text-gray-600 leading-relaxed text-lg font-medium">
                  {product.description || "No detailed description available."}
                </p>
                <p className="mt-6 text-gray-500 leading-relaxed">
                  Our {product.name} is crafted with the highest standards of quality and durability. Whether you're looking for a gift or upgrading your home essentials, this product offers the perfect blend of functionality and style. Souvenir Republic ensures that every item meets our rigorous quality checks before reaching your doorstep.
                </p>
              </motion.div>
            )}

            {activeTab === 'specifications' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  {product.specifications ? Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-4 border-b border-gray-50">
                      <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">{key}</span>
                      <span className="text-sm font-black text-gray-900">{value}</span>
                    </div>
                  )) : (
                    <p className="text-gray-500">No specifications available.</p>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                {product.reviews && product.reviews.length > 0 ? product.reviews.map((review) => (
                  <div key={review.id} className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center text-gold font-black">
                          {review.user.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-black text-gray-900">{review.user}</h4>
                          <p className="text-xs text-gray-400 font-bold">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-gold">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={14} fill={s <= review.rating ? "currentColor" : "none"} />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 font-medium leading-relaxed">{review.comment}</p>
                  </div>
                )) : (
                  <div className="text-center py-12">
                    <p className="text-gray-400 font-bold mb-4">No reviews yet. Be the first to review this product!</p>
                    <button className="bg-gold text-white px-8 py-3 rounded-xl font-bold hover:bg-gold-dark transition-all">
                      Write a Review
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
