import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Package, Truck, CheckCircle, Clock, MapPin, ChevronRight, AlertCircle } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const TrackOrderPage: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [showStatus, setShowStatus] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) setShowStatus(true);
  };

  const steps = [
    { label: 'Order Placed', time: 'Feb 18, 2026 - 10:30 AM', status: 'completed', icon: Clock },
    { label: 'Processing', time: 'Feb 18, 2026 - 02:15 PM', status: 'completed', icon: Package },
    { label: 'Shipped', time: 'Feb 19, 2026 - 09:00 AM', status: 'current', icon: Truck },
    { label: 'Delivered', time: 'Estimated: Feb 20, 2026', status: 'pending', icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFB]">
      <Header />
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 md:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight uppercase">Track Your Order</h1>
          <p className="text-gray-500 font-medium max-w-xl mx-auto text-lg">Enter your order ID and email address to see the real-time status of your premium treasures.</p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-gray-100 shadow-2xl mb-12">
          <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Package className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
              <input 
                type="text" 
                required
                placeholder="Order ID (e.g. SR-12345)"
                className="w-full bg-gray-50 border-2 border-transparent focus:border-gold rounded-2xl py-4 px-6 pl-14 font-bold focus:outline-none transition-all"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
            </div>
            <button type="submit" className="bg-black text-white px-10 py-4 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-gold transition-all shadow-xl shadow-black/10">
              <Search size={20} />
              TRACK ORDER
            </button>
          </form>
        </div>

        <AnimatePresence>
          {showStatus && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Order Info Header */}
              <div className="bg-gold text-white p-8 rounded-[2.5rem] shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-1">Order Status</p>
                  <h3 className="text-2xl font-black uppercase tracking-tight">In Transit</h3>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-1">Estimated Delivery</p>
                  <h3 className="text-2xl font-black uppercase tracking-tight">Feb 20, 2026</h3>
                </div>
              </div>

              {/* Tracking Steps */}
              <div className="bg-white p-10 md:p-16 rounded-[3rem] border border-gray-100 shadow-sm">
                <div className="space-y-12 relative">
                  {/* Vertical Line */}
                  <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-gray-100" />
                  
                  {steps.map((step, idx) => (
                    <div key={idx} className="flex gap-8 relative z-10">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all ${
                        step.status === 'completed' ? 'bg-gold text-white' : 
                        step.status === 'current' ? 'bg-black text-white scale-110' : 
                        'bg-white text-gray-200 border-2 border-gray-50'
                      }`}>
                        <step.icon size={24} />
                      </div>
                      <div>
                        <h4 className={`text-lg font-black uppercase tracking-tight ${
                          step.status === 'pending' ? 'text-gray-300' : 'text-gray-900'
                        }`}>{step.label}</h4>
                        <p className="text-sm font-bold text-gray-400">{step.time}</p>
                      </div>
                      {step.status === 'current' && (
                        <div className="ml-auto hidden md:flex items-center gap-2 bg-gold/10 text-gold px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                          <div className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
                          Live Update
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gold">
                      <MapPin size={20} />
                    </div>
                    <h4 className="font-black text-gray-900 uppercase tracking-tight">Shipping Address</h4>
                  </div>
                  <p className="text-gray-500 font-medium leading-relaxed">
                    Salam Abass<br />
                    Heritage Mall, Dugbe<br />
                    Ibadan, Oyo State<br />
                    Nigeria
                  </p>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-center items-center text-center">
                  <AlertCircle size={32} className="text-gold mb-4" />
                  <h4 className="font-black text-gray-900 uppercase tracking-tight mb-2">Need Assistance?</h4>
                  <p className="text-sm text-gray-500 font-medium mb-6">If you have any questions about your delivery, please contact us.</p>
                  <Link to="/contact" className="text-xs font-black text-gold uppercase tracking-widest hover:underline">Contact Support</Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};
