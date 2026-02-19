import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ChevronLeft, ShieldCheck, Truck } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useAdmin } from '../AdminContext';

export const CartPage: React.FC = () => {
  const { products } = useAdmin();
  // Mock cart state
  const [cartItems, setCartItems] = useState([
    { ...products[0], quantity: 1 },
    { ...products[1], quantity: 2 },
  ]);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50000 ? 0 : 2500;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFB]">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-12">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="p-2 bg-gray-100 rounded-xl text-gray-400 hover:text-gold transition-all">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight uppercase">Your Cart</h1>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={item.id} 
                  className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center gap-6"
                >
                  <div className="w-32 h-32 rounded-2xl overflow-hidden bg-gray-50 shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1 text-center sm:text-left">
                    <p className="text-[10px] font-black text-gold uppercase tracking-widest mb-1">{item.category}</p>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.name}</h3>
                    <p className="text-xl font-black text-black">₦ {item.price.toLocaleString()}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-gray-100 rounded-xl p-1 border border-gray-100">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gold transition-all"
                      >
                        <Minus size={14} strokeWidth={3} />
                      </button>
                      <span className="w-10 text-center font-black">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gold transition-all"
                      >
                        <Plus size={14} strokeWidth={3} />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}

              <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                <Link to="/" className="text-sm font-black text-gold uppercase tracking-widest hover:underline flex items-center gap-2">
                  <ArrowRight size={16} className="rotate-180" /> Continue Shopping
                </Link>
                <button 
                  onClick={() => setCartItems([])}
                  className="text-sm font-bold text-gray-400 hover:text-red-500 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl sticky top-32">
                <h2 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tight">Order Summary</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-500 font-medium">
                    <span>Subtotal</span>
                    <span className="text-black font-bold">₦ {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 font-medium">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-green-500 font-bold" : "text-black font-bold"}>
                      {shipping === 0 ? "FREE" : `₦ ${shipping.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="h-px bg-gray-100 my-4"></div>
                  <div className="flex justify-between text-xl font-black text-gray-900">
                    <span>Total</span>
                    <span>₦ {total.toLocaleString()}</span>
                  </div>
                </div>

                <button className="w-full bg-black text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-gold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-black/10 mb-6">
                  PROCEED TO CHECKOUT
                  <ArrowRight size={20} />
                </button>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs font-bold text-gray-400">
                    <ShieldCheck size={16} className="text-gold" />
                    Secure SSL Encrypted Payment
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-gray-400">
                    <Truck size={16} className="text-gold" />
                    Fast Delivery to your Doorstep
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
            <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center text-gold mx-auto mb-8">
              <ShoppingBag size={48} />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tight">Your cart is empty</h2>
            <p className="text-gray-500 font-medium mb-12 max-w-md mx-auto">Looks like you haven't added any treasures to your cart yet. Start exploring our collection!</p>
            <Link to="/" className="inline-block bg-black text-white px-12 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-gold transition-all shadow-xl shadow-black/10">
              Start Shopping
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
