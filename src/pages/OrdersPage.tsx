import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Package, ChevronLeft, ChevronRight, CheckCircle, Truck } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useAuth } from '../AuthContext';

export const OrdersPage: React.FC = () => {
  const { user } = useAuth();
  const orders = user?.orders || [];

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFB]">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-12">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/account" className="p-2 bg-gray-100 rounded-xl text-gray-400 hover:text-gold transition-all">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight uppercase">My Orders</h1>
        </div>

        {orders.length > 0 ? (
          <div className="space-y-8">
            {orders.map((order, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={order.id} 
                className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-gray-50 p-6 md:p-8 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex flex-wrap items-center gap-8 text-center md:text-left">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                      <p className="font-black text-gray-900">{order.id}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Date Placed</p>
                      <p className="font-black text-gray-900">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Amount</p>
                      <p className="font-black text-gold">₦ {order.total.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${
                    order.status === 'Delivered' ? 'bg-green-50 text-green-600' : 'bg-gold/10 text-gold'
                  }`}>
                    {order.status === 'Delivered' ? <CheckCircle size={14} /> : <Truck size={14} />}
                    {order.status}
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6 md:p-8 space-y-6">
                  {order.items.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-black text-gray-900 text-sm md:text-base">{item.product.name}</h4>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.product.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-gray-900">₦ {item.product.price.toLocaleString()}</p>
                        <p className="text-xs font-bold text-gray-400">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="p-6 md:p-8 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center">
                  <Link 
                    to={`/track?id=${order.id}`}
                    className="text-xs font-black text-gold uppercase tracking-widest hover:underline flex items-center gap-2"
                  >
                    Track Shipment <ChevronRight size={14} />
                  </Link>
                  <button className="bg-black text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gold transition-all shadow-lg shadow-black/10">
                    Buy Again
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
            <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center text-gold mx-auto mb-8">
              <Package size={48} />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tight">No orders found</h2>
            <p className="text-gray-500 font-medium mb-12 max-w-md mx-auto">You haven't placed any orders yet. Start shopping to see your history here!</p>
            <Link to="/" className="inline-block bg-black text-white px-12 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-gold transition-all shadow-xl shadow-black/10">
              Go to Shop
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
