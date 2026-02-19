import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User as UserIcon, Phone, Mail, Menu, X, ChevronDown, ArrowRight, Award, Heart, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CATEGORIES } from '../constants';
import { Product } from '../types';
import { useAuth } from '../AuthContext';
import { useAdmin } from '../AdminContext';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const { user, isAuthenticated, signOut } = useAuth();
  const { settings, products } = useAdmin();
  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filtered = products.filter(p => 
        p.active && (
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, products]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setShowSuggestions(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
    }
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      {/* Announcement Banner */}
      <AnimatePresence>
        {settings.announcementBanner.enabled && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-black text-white py-2 px-4 text-center overflow-hidden"
          >
            <Link to={settings.announcementBanner.link} className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-gold transition-colors block">
              {settings.announcementBanner.text}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Bar - Black with White Text */}
      <div className="bg-black text-white py-2 px-4 md:px-8 flex justify-between items-center text-[11px] font-medium tracking-wide">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 hover:text-gold transition-colors cursor-pointer">
            <Phone size={13} className="text-gold" /> 08113248705
          </span>
          <span className="hidden sm:flex items-center gap-1.5 hover:text-gold transition-colors cursor-pointer">
            <Mail size={13} className="text-gold" /> salamabass37@yahoo.com
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1 cursor-pointer hover:text-gold transition-colors">
            English <ChevronDown size={10} />
          </span>
          <span className="flex items-center gap-1 cursor-pointer hover:text-gold transition-colors">
            NGN <ChevronDown size={10} />
          </span>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4 md:gap-8">
        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="lg:hidden p-2.5 bg-gray-50 rounded-xl text-black hover:bg-gold/10 hover:text-gold transition-all border border-gray-100 shadow-sm"
        >
          <Menu size={24} strokeWidth={2.5} />
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gold rounded-full flex items-center justify-center text-white font-bold text-xl border-2 border-black shadow-lg shadow-gold/20">
            SR
          </div>
          <div className="hidden sm:block">
            <h1 className="font-bold text-lg md:text-xl leading-tight tracking-tight">SOUVENIR</h1>
            <p className="text-[9px] md:text-[10px] tracking-[0.25em] text-gold font-bold uppercase">Republic</p>
          </div>
        </Link>

        {/* Search Bar with Suggestions */}
        <div className="flex-1 max-w-2xl relative hidden md:block" ref={searchRef}>
          <form onSubmit={handleSearchSubmit} className="relative group">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.trim().length > 1 && setShowSuggestions(true)}
              placeholder="Search for kitchenware, souvenirs, and more..." 
              className="w-full bg-gray-50 border-2 border-transparent group-hover:bg-white group-focus-within:bg-white border-gray-100 group-focus-within:border-gold rounded-full py-2.5 px-6 pl-12 focus:outline-none shadow-sm transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gold transition-colors" size={20} />
            <button type="submit" className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-black text-white px-6 py-1.5 rounded-full font-bold text-sm hover:bg-gold transition-all shadow-md">
              Search
            </button>
          </form>

          {/* Suggestions Dropdown */}
          <AnimatePresence>
            {showSuggestions && suggestions.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-[60]"
              >
                <div className="p-2">
                  {suggestions.map((product) => (
                    <Link 
                      key={product.id}
                      to={`/product/${product.id}`}
                      onClick={() => setShowSuggestions(false)}
                      className="flex items-center gap-4 p-3 hover:bg-gold/5 rounded-2xl transition-all group"
                    >
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900 group-hover:text-gold transition-colors">{product.name}</h4>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{product.category}</p>
                      </div>
                      <span className="text-sm font-black text-black">₦{product.price.toLocaleString()}</span>
                    </Link>
                  ))}
                </div>
                <button 
                  onClick={handleSearchSubmit}
                  className="w-full bg-gray-50 p-4 text-xs font-black text-gold uppercase tracking-widest hover:bg-gold/10 transition-all flex items-center justify-center gap-2"
                >
                  View all results <ArrowRight size={14} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 md:gap-7">
          <div className="relative" ref={userMenuRef}>
            {isAuthenticated ? (
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-3 p-1 pr-4 bg-gray-50 rounded-full border border-gray-100 hover:border-gold transition-all group"
              >
                <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-white font-black text-xs border-2 border-white shadow-sm">
                  {user?.name.charAt(0)}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-[10px] font-black text-gray-900 uppercase tracking-tight leading-none mb-1">{user?.name.split(' ')[0]}</p>
                  <div className="flex items-center gap-1">
                    <Award size={10} className="text-gold" />
                    <span className="text-[8px] font-black text-gold uppercase tracking-widest">{user?.points} pts</span>
                  </div>
                </div>
              </button>
            ) : (
              <Link to="/login" className="flex flex-col items-center gap-0.5 text-gray-700 hover:text-gold transition-all group">
                <UserIcon size={24} className="group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold uppercase tracking-tighter">Sign In</span>
              </Link>
            )}

            {/* User Dropdown */}
            <AnimatePresence>
              {isUserMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 w-64 mt-4 bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden p-2 z-[60]"
                >
                  <div className="p-4 border-b border-gray-50 mb-2">
                    <p className="text-xs font-black text-gray-900">{user?.name}</p>
                    <p className="text-[10px] font-bold text-gray-400 truncate">{user?.email}</p>
                  </div>
                  <Link to="/account" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gold/5 group transition-all">
                    <UserIcon size={18} className="text-gray-400 group-hover:text-gold" />
                    <span className="text-xs font-bold text-gray-700 group-hover:text-gold">My Dashboard</span>
                  </Link>
                  <Link to="/orders" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gold/5 group transition-all">
                    <ShoppingCart size={18} className="text-gray-400 group-hover:text-gold" />
                    <span className="text-xs font-bold text-gray-700 group-hover:text-gold">My Orders</span>
                  </Link>
                  <Link to="/wishlist" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gold/5 group transition-all">
                    <Heart size={18} className="text-gray-400 group-hover:text-gold" />
                    <span className="text-xs font-bold text-gray-700 group-hover:text-gold">Wishlist</span>
                  </Link>
                  <div className="h-px bg-gray-50 my-2" />
                  <button 
                    onClick={signOut}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 group transition-all text-left"
                  >
                    <LogOut size={18} className="text-gray-400 group-hover:text-red-500" />
                    <span className="text-xs font-bold text-gray-700 group-hover:text-red-500">Sign Out</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link to="/cart" className="flex flex-col items-center gap-0.5 text-gray-700 hover:text-gold transition-all group relative">
            <div className="relative">
              <ShoppingCart size={24} className="group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1.5 -right-1.5 bg-gold text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">0</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-tighter">Cart</span>
          </Link>
        </div>
      </div>

      {/* Categories Navigation Bar - Desktop Only */}
      <div className="hidden lg:block border-t border-gray-50">
        <div className="max-w-7xl mx-auto px-8 flex items-center gap-8 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat) => (
            <div 
              key={cat.id} 
              className="relative group py-4"
              onMouseEnter={() => setActiveCategory(cat.id)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <Link 
                to={`/?category=${cat.id}`}
                className="text-[11px] font-black uppercase tracking-[0.15em] text-gray-500 hover:text-gold transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                {cat.name}
                <ChevronDown size={12} className={`transition-transform duration-300 ${activeCategory === cat.id ? 'rotate-180 text-gold' : ''}`} />
              </Link>
              
              {/* Subcategories Dropdown */}
              <AnimatePresence>
                {activeCategory === cat.id && cat.subcategories && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 bg-white shadow-2xl border border-gray-100 rounded-b-3xl py-6 px-8 min-w-[250px] z-50"
                  >
                    <div className="space-y-4">
                      {cat.subcategories.map((sub) => (
                        <Link 
                          key={sub}
                          to={`/?subcategory=${sub.toLowerCase().replace(/\s+/g, '-')}`}
                          className="block text-xs font-bold text-gray-400 hover:text-gold transition-colors whitespace-nowrap"
                        >
                          {sub}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-white z-[70] lg:hidden shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-black text-white">
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-white font-bold border-2 border-white">SR</div>
                  <span className="font-bold tracking-tight">Souvenir Republic</span>
                </Link>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <div className="mb-6">
                  <h3 className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] mb-4 px-2">Categories</h3>
                  <div className="space-y-1">
                    {CATEGORIES.map((cat) => (
                      <div key={cat.id} className="space-y-1">
                        <button 
                          onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                          className={`w-full text-left px-4 py-3.5 text-sm font-semibold rounded-xl flex items-center justify-between transition-all ${activeCategory === cat.id ? 'bg-gold/10 text-gold' : 'text-gray-800 hover:bg-gold/5'}`}
                        >
                          {cat.name}
                          <ChevronDown size={16} className={`transition-transform ${activeCategory === cat.id ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {activeCategory === cat.id && cat.subcategories && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden pl-8 space-y-1"
                            >
                              {cat.subcategories.map((sub) => (
                                <Link 
                                  key={sub}
                                  to={`/?subcategory=${sub.toLowerCase().replace(/\s+/g, '-')}`}
                                  onClick={() => setIsMenuOpen(false)}
                                  className="block py-2.5 text-xs font-bold text-gray-400 hover:text-gold transition-colors"
                                >
                                  {sub}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-100 space-y-3">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 mb-4 p-4 bg-gray-50 rounded-2xl">
                      <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-white font-black border-2 border-white shadow-lg">
                        {user?.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-black text-gray-900 uppercase tracking-tight">{user?.name}</p>
                        <div className="flex items-center gap-1">
                          <Award size={12} className="text-gold" />
                          <span className="text-[10px] font-black text-gold uppercase tracking-widest">{user?.points} Points</span>
                        </div>
                      </div>
                    </div>
                    <Link to="/account" onClick={() => setIsMenuOpen(false)} className="w-full bg-black text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-black/10 hover:bg-gold transition-all flex items-center justify-center gap-2">
                      <UserIcon size={18} /> My Account
                    </Link>
                    <button 
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-white border-2 border-red-100 text-red-500 py-4 rounded-2xl font-bold text-sm hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                    >
                      <LogOut size={18} /> Sign Out
                    </button>
                  </div>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full bg-black text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-black/10 hover:bg-gold transition-all flex items-center justify-center">
                      Sign In
                    </Link>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)} className="w-full bg-white border-2 border-black text-black py-4 rounded-2xl font-bold text-sm hover:bg-black hover:text-white transition-all flex items-center justify-center">
                      Register
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
