import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, Package, Heart, MapPin, Settings, LogOut, 
  ChevronRight, CreditCard, Bell, Shield, Eye, Mail, 
  Lock, ArrowRight, Plus, Trash2, Edit2, CheckCircle,
  Award, History, Smartphone, Globe
} from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useAuth } from '../AuthContext';
import { Address, PaymentMethod } from '../types';

export const AccountPage: React.FC = () => {
  const { user, isAuthenticated, signOut, updateProfile, recentlyViewed } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'wishlist' | 'addresses' | 'payments' | 'settings'>('dashboard');
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', icon: Globe, label: 'Dashboard' },
    { id: 'orders', icon: Package, label: 'My Orders' },
    { id: 'wishlist', icon: Heart, label: 'Wishlist' },
    { id: 'addresses', icon: MapPin, label: 'Addresses' },
    { id: 'payments', icon: CreditCard, label: 'Payments' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFB]">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-80 shrink-0">
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm text-center mb-8">
              <div className="w-24 h-24 bg-gold/20 rounded-full flex items-center justify-center text-gold font-black text-3xl mx-auto mb-4 border-4 border-white shadow-lg">
                {user?.name.charAt(0)}
              </div>
              <h2 className="text-xl font-black text-gray-900 mb-1 tracking-tight">{user?.name}</h2>
              <div className="flex items-center justify-center gap-2 bg-gold/10 px-4 py-1.5 rounded-full w-fit mx-auto mb-6">
                <Award size={14} className="text-gold" />
                <span className="text-[10px] font-black text-gold uppercase tracking-widest">{user?.points} Points</span>
              </div>
              <button 
                onClick={signOut}
                className="w-full bg-gray-50 text-gray-600 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-50 hover:text-red-500 transition-all flex items-center justify-center gap-2"
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </div>

            <nav className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden p-2">
              {menuItems.map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl group transition-all ${activeTab === item.id ? 'bg-gold text-white shadow-lg shadow-gold/20' : 'hover:bg-gold/5'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-xl transition-all shadow-sm ${activeTab === item.id ? 'bg-white/20 text-white' : 'bg-gray-50 text-gray-400 group-hover:bg-white group-hover:text-gold'}`}>
                      <item.icon size={20} />
                    </div>
                    <span className={`text-sm font-bold ${activeTab === item.id ? 'text-white' : 'text-gray-700 group-hover:text-gold'}`}>{item.label}</span>
                  </div>
                  <ChevronRight size={16} className={`${activeTab === item.id ? 'text-white' : 'text-gray-300 group-hover:text-gold'} transition-all group-hover:translate-x-1`} />
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {activeTab === 'dashboard' && <DashboardView key="dashboard" />}
              {activeTab === 'orders' && <OrdersView key="orders" />}
              {activeTab === 'wishlist' && <WishlistView key="wishlist" />}
              {activeTab === 'addresses' && <AddressesView key="addresses" />}
              {activeTab === 'payments' && <PaymentsView key="payments" />}
              {activeTab === 'settings' && <SettingsView key="settings" />}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const DashboardView = () => {
  const { user, recentlyViewed } = useAuth();
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
      <h1 className="text-3xl font-black text-gray-900 mb-8 tracking-tight uppercase">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Total Orders</p>
          <h3 className="text-4xl font-black text-gray-900">{user?.orders.length}</h3>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Wishlist Items</p>
          <h3 className="text-4xl font-black text-gray-900">{user?.wishlist.length}</h3>
        </div>
        <div className="bg-gold text-white p-8 rounded-[2.5rem] shadow-xl shadow-gold/20">
          <p className="text-[10px] font-black text-white/80 uppercase tracking-widest mb-2">Loyalty Points</p>
          <h3 className="text-4xl font-black">{user?.points}</h3>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-black text-gray-900 mb-6 uppercase tracking-tight">Recently Viewed</h2>
        {recentlyViewed.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recentlyViewed.map(product => (
              <Link key={product.id} to={`/product/${product.id}`} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 mb-3">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="text-xs font-bold text-gray-900 line-clamp-1">{product.name}</h4>
                <p className="text-sm font-black text-gold">₦{product.price.toLocaleString()}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 p-12 rounded-[2.5rem] text-center border border-dashed border-gray-200">
            <p className="text-gray-400 font-medium">No recently viewed products yet.</p>
          </div>
        )}
      </div>

      <div className="bg-black text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Exclusive Rewards</h3>
          <p className="text-gray-400 font-medium mb-8 max-w-md">You have {user?.points} points available. Redeem them for discounts on your next purchase!</p>
          <button className="bg-gold text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-xl shadow-gold/20">
            Redeem Points
          </button>
        </div>
        <Award className="absolute -right-10 -bottom-10 w-64 h-64 text-white/5 rotate-12" />
      </div>
    </motion.div>
  );
};

const OrdersView = () => {
  const { user } = useAuth();
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
      <h1 className="text-3xl font-black text-gray-900 mb-8 tracking-tight uppercase">My Orders</h1>
      <div className="space-y-6">
        {user?.orders.map(order => (
          <div key={order.id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gray-50 p-6 flex justify-between items-center border-b border-gray-100">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Order ID</p>
                <p className="font-black text-gray-900">{order.id}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</p>
                <span className="text-gold font-black uppercase text-xs">{order.status}</span>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <img src={item.product.image} className="w-16 h-16 rounded-xl object-cover" />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{item.product.name}</h4>
                    <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-black text-gray-900">₦{(item.product.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
            <div className="p-6 bg-gray-50/50 flex justify-between items-center">
              <p className="text-lg font-black">Total: ₦{order.total.toLocaleString()}</p>
              <Link to={`/track?id=${order.id}`} className="text-xs font-black text-gold uppercase tracking-widest hover:underline">Track Order</Link>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const WishlistView = () => {
  const { user, removeFromWishlist, addToCart } = useAuth();
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
      <h1 className="text-3xl font-black text-gray-900 mb-8 tracking-tight uppercase">Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {user?.wishlist.map(id => {
          // In a real app we'd fetch the product details
          return (
            <div key={id} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6">
              <div className="w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden shrink-0">
                <img src={`https://picsum.photos/seed/${id}/200/200`} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-1">Product {id}</h4>
                <p className="text-gold font-black mb-4">₦5,000</p>
                <div className="flex gap-2">
                  <button onClick={() => alert('Moved to cart')} className="bg-black text-white p-2 rounded-lg hover:bg-gold transition-all"><Plus size={16} /></button>
                  <button onClick={() => removeFromWishlist(id)} className="bg-gray-50 text-gray-400 p-2 rounded-lg hover:text-red-500 transition-all"><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

const AddressesView = () => {
  const { user, updateProfile } = useAuth();
  const [isAdding, setIsAdding] = useState(false);

  const deleteAddress = (id: string) => {
    if (confirm('Are you sure you want to delete this address?')) {
      updateProfile({ addresses: user?.addresses.filter(a => a.id !== id) });
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Addresses</h1>
        <button onClick={() => setIsAdding(true)} className="bg-black text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gold transition-all flex items-center gap-2">
          <Plus size={16} /> Add New
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {user?.addresses.map(address => (
          <div key={address.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative group">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="font-black text-gray-900 uppercase tracking-tight">{address.name}</h3>
              {address.isDefault && <span className="bg-gold/10 text-gold text-[8px] font-black px-2 py-0.5 rounded-full uppercase">Default</span>}
            </div>
            <p className="text-gray-500 font-medium text-sm leading-relaxed mb-6">
              {address.street}<br />
              {address.city}, {address.state} {address.zip}
            </p>
            <div className="flex gap-4">
              <button className="text-xs font-black text-gray-400 hover:text-gold transition-colors flex items-center gap-1.5"><Edit2 size={12} /> Edit</button>
              <button onClick={() => deleteAddress(address.id)} className="text-xs font-black text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1.5"><Trash2 size={12} /> Delete</button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const PaymentsView = () => {
  const { user, updateProfile } = useAuth();

  const deletePayment = (id: string) => {
    if (confirm('Are you sure you want to remove this payment method?')) {
      updateProfile({ payments: user?.payments.filter(p => p.id !== id) });
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Payments</h1>
        <button className="bg-black text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gold transition-all flex items-center gap-2">
          <Plus size={16} /> Add Card
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {user?.payments.map(payment => (
          <div key={payment.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-8 bg-gray-100 rounded-md flex items-center justify-center text-[10px] font-black text-gray-400 uppercase">{payment.provider}</div>
                {payment.isDefault && <CheckCircle size={20} className="text-gold" />}
              </div>
              <p className="text-xl font-black text-gray-900 mb-2 tracking-widest">•••• •••• •••• {payment.last4}</p>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Expires</p>
                  <p className="text-sm font-bold text-gray-900">{payment.expiry}</p>
                </div>
                <button onClick={() => deletePayment(payment.id)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const SettingsView = () => {
  const { user, updateProfile } = useAuth();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
      <h1 className="text-3xl font-black text-gray-900 mb-8 tracking-tight uppercase">Settings</h1>
      
      <div className="space-y-8">
        {/* Profile Section */}
        <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <h3 className="text-xl font-black text-gray-900 mb-6 uppercase tracking-tight flex items-center gap-3">
            <User size={20} className="text-gold" /> Personal Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Full Name</label>
              <input type="text" defaultValue={user?.name} className="w-full bg-gray-50 border-2 border-transparent focus:border-gold rounded-2xl py-4 px-6 font-bold focus:outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Email Address</label>
              <input type="email" defaultValue={user?.email} className="w-full bg-gray-50 border-2 border-transparent focus:border-gold rounded-2xl py-4 px-6 font-bold focus:outline-none transition-all" />
            </div>
          </div>
          <button className="mt-8 bg-black text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gold transition-all">Save Changes</button>
        </section>

        {/* Security Section */}
        <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <h3 className="text-xl font-black text-gray-900 mb-6 uppercase tracking-tight flex items-center gap-3">
            <Shield size={20} className="text-gold" /> Security & Privacy
          </h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center gap-4">
                <Smartphone size={20} className="text-gray-400" />
                <div>
                  <h4 className="font-bold text-gray-900">Two-Factor Authentication</h4>
                  <p className="text-xs text-gray-400">Add an extra layer of security to your account</p>
                </div>
              </div>
              <button 
                onClick={() => updateProfile({ twoFactorEnabled: !user?.twoFactorEnabled })}
                className={`w-12 h-6 rounded-full transition-all relative ${user?.twoFactorEnabled ? 'bg-gold' : 'bg-gray-200'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${user?.twoFactorEnabled ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center gap-4">
                <History size={20} className="text-gray-400" />
                <div>
                  <h4 className="font-bold text-gray-900">Login Activity</h4>
                  <p className="text-xs text-gray-400">Review your recent account access</p>
                </div>
              </div>
              <button className="text-xs font-black text-gold uppercase tracking-widest hover:underline">View Activity</button>
            </div>
          </div>
        </section>

        {/* Preferences Section */}
        <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <h3 className="text-xl font-black text-gray-900 mb-6 uppercase tracking-tight flex items-center gap-3">
            <Bell size={20} className="text-gold" /> Communication Preferences
          </h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-gray-900">Email Newsletter</h4>
                <p className="text-xs text-gray-400">Receive updates on new arrivals and exclusive offers</p>
              </div>
              <button 
                onClick={() => updateProfile({ newsletter: !user?.newsletter })}
                className={`w-12 h-6 rounded-full transition-all relative ${user?.newsletter ? 'bg-gold' : 'bg-gray-200'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${user?.newsletter ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};
