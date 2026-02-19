import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, ShoppingBag, Trash2, ChevronLeft, ArrowRight, Star } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useAuth } from '../AuthContext';
import { useAdmin } from '../AdminContext';

export const WishlistPage: React.FC = () => {
  const { user, removeFromWishlist, addToCart } = useAuth();
  const { products } = useAdmin();
  
  const wishlistItems = products.filter(p => user?.wishlist.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFB]">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-12">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/account" className="p-2 bg-gray-100 rounded-xl text-gray-400 hover:text-gold transition-all">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight uppercase">My Wishlist</h1>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlistItems.map((item, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={item.id} 
                className="group bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-gold/10 transition-all duration-500 relative"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4">
                    <button 
                      onClick={() => removeFromWishlist(item.id)}
                      className="bg-white p-3 rounded-xl shadow-lg text-red-500 hover:bg-red-50 transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-black text-gold uppercase tracking-widest">{item.category}</p>
                    <div className="flex items-center gap-1 text-gold">
                      <Star size={12} fill="currentColor" />
                      <span className="text-[10px] font-bold text-gray-900">4.8</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-black text-gray-900 mb-4 line-clamp-1">{item.name}</h3>
                  <p className="text-2xl font-black text-black mb-8">₦ {item.price.toLocaleString()}</p>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={() => addToCart(item, 1)}
                      className="flex-1 bg-black text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gold transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-2"
                    >
                      <ShoppingBag size={16} />
                      Add to Cart
                    </button>
                    <Link to={`/product/${item.id}`} className="p-4 border-2 border-gray-50 rounded-2xl text-gray-400 hover:text-gold hover:border-gold transition-all">
                      <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
            <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center text-gold mx-auto mb-8">
              <Heart size={48} />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tight">Wishlist is empty</h2>
            <p className="text-gray-500 font-medium mb-12 max-w-md mx-auto">Save your favorite premium treasures here to shop them later.</p>
            <Link to="/" className="inline-block bg-black text-white px-12 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-gold transition-all shadow-xl shadow-black/10">
              Explore Products
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
