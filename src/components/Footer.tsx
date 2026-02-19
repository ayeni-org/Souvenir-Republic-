import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gold text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Contact */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gold font-bold text-xl border-2 border-black">
                SR
              </div>
              <div>
                <h2 className="font-serif font-bold text-xl leading-tight text-black">SOUVENIR</h2>
                <p className="text-[10px] tracking-[0.2em] text-white font-bold uppercase">Republic</p>
              </div>
            </Link>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-black shrink-0 mt-1" />
                <p className="text-white/90">Souvenir Republic, old cash and carry Heritage Mall Dugbe ibadan.</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-black shrink-0" />
                <p className="text-white/90">08113248705</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-black shrink-0" />
                <p className="text-white/90">salamabass37@yahoo.com</p>
              </div>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-black font-bold uppercase tracking-widest text-sm mb-6">Customer Service</h3>
            <ul className="space-y-3 text-sm text-white/90">
              <li><Link to="/terms" className="hover:text-black transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/returns" className="hover:text-black transition-colors">Returns & Refunds</Link></li>
              <li><Link to="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="hover:text-black transition-colors">Cookies Policy</Link></li>
              <li><Link to="/contact" className="hover:text-black transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* My Account */}
          <div>
            <h3 className="text-black font-bold uppercase tracking-widest text-sm mb-6">My Account</h3>
            <ul className="space-y-3 text-sm text-white/90">
              <li><Link to="/cart" className="hover:text-black transition-colors">My Cart</Link></li>
              <li><Link to="/orders" className="hover:text-black transition-colors">My Orders</Link></li>
              <li><Link to="/wishlist" className="hover:text-black transition-colors">My Wishlist</Link></li>
              <li><Link to="/track" className="hover:text-black transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-black font-bold uppercase tracking-widest text-sm mb-6">Newsletter</h3>
            <p className="text-sm text-white/90 mb-6 leading-relaxed">
              Stay updated with new arrivals, exclusive offers, and special promotions from Souvenir Republic Dugbe Ibadan.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full bg-white/20 border border-white/30 rounded-lg py-3 px-4 text-sm placeholder:text-white/60 focus:outline-none focus:bg-white/30 transition-all"
              />
              <button className="w-full bg-black text-white py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors">
                SUBSCRIBE <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="mt-16 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <a href="#" className="text-black hover:scale-110 transition-transform"><Facebook size={20} /></a>
            <a href="#" className="text-black hover:scale-110 transition-transform"><Instagram size={20} /></a>
            <a href="#" className="text-black hover:scale-110 transition-transform"><Linkedin size={20} /></a>
            <a href="#" className="text-black hover:scale-110 transition-transform"><Twitter size={20} /></a>
          </div>
          <p className="text-xs text-white/80 text-center md:text-left">
            Copyright © 2026 Souvenir Republic Dugbe Ibadan. Powered by SmartBizness Integrated Solutions
          </p>
        </div>
      </div>
    </footer>
  );
};
