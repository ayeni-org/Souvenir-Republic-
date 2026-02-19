import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { ShoppingBag, Heart, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../AuthContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { user, isAuthenticated, addToWishlist, removeFromWishlist, addToCart } = useAuth();
  const navigate = useNavigate();
  const isWishlisted = user?.wishlist.includes(product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/account');
      return;
    }
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-gold/10 hover:-translate-y-2 transition-all duration-500 relative"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          {/* Image with Zoom Effect */}
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            referrerPolicy="no-referrer"
          />
          
          {/* Overlay Actions */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-16 group-hover:translate-x-0 transition-transform duration-500 ease-out">
            <button 
              className={`p-2.5 rounded-xl shadow-lg transition-all ${isWishlisted ? 'bg-gold text-white' : 'bg-white text-gray-400 hover:text-red-500 hover:bg-red-50'}`} 
              onClick={handleWishlist}
            >
              <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
            </button>
            <button 
              className="bg-white p-2.5 rounded-xl shadow-lg text-gray-400 hover:text-gold hover:bg-gold/5 transition-all"
              onClick={handleAddToCart}
            >
              <ShoppingBag size={20} />
            </button>
          </div>

          {/* Add to Cart Button - Revealed on Hover */}
          <div className="absolute inset-x-4 bottom-4 translate-y-20 group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <button 
              className="w-full bg-gold text-white py-3.5 rounded-2xl flex items-center justify-center gap-2 text-sm font-black shadow-xl shadow-gold/20 hover:bg-gold-dark transition-all" 
              onClick={handleAddToCart}
            >
              <ShoppingBag size={18} />
              ADD TO CART
            </button>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] text-gold font-black uppercase tracking-[0.15em]">{product.category}</p>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              <span className="text-[9px] font-bold text-gray-400 uppercase">In Stock</span>
            </div>
          </div>
          
          <h3 
            className="text-sm font-bold text-gray-900 line-clamp-2 min-h-[2.5rem] group-hover:text-gold transition-colors cursor-pointer leading-snug"
          >
            {product.name}
          </h3>
          
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xl font-black text-black">
              ₦ {product.price.toLocaleString()}
            </span>
            <div className="flex items-center gap-1 text-[10px] font-black text-gold uppercase tracking-widest group-hover:translate-x-1 transition-transform">
              Details <ArrowRight size={12} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
