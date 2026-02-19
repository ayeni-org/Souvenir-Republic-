import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import { ChevronRight } from 'lucide-react';

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 flex-shrink-0 hidden lg:block">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="bg-black text-white px-6 py-4">
          <h2 className="font-bold uppercase tracking-wider text-sm">Categories</h2>
        </div>
        <nav className="p-2">
          {CATEGORIES.map((category) => (
            <div key={category.id} className="group">
              <Link 
                to={`/?category=${category.id}`}
                className="w-full flex items-center justify-between py-3.5 px-4 text-sm font-bold text-gray-700 hover:bg-gold/5 hover:text-gold rounded-2xl transition-all"
              >
                {category.name}
                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              {category.subcategories && (
                <div className="hidden group-hover:block pl-8 pr-4 pb-2">
                  {category.subcategories.map((sub) => (
                    <Link 
                      key={sub} 
                      to={`/?subcategory=${sub.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block py-1.5 text-xs font-medium text-gray-400 hover:text-gold transition-colors"
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="mt-6 bg-gold/5 rounded-3xl p-6 border border-gold/10">
        <h3 className="font-black text-gold text-xs uppercase tracking-widest mb-4">Price Range</h3>
        <div className="space-y-3">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">₦</span>
            <input type="number" placeholder="Min" className="w-full bg-white border border-gray-100 rounded-xl py-2.5 pl-7 pr-3 text-xs font-bold focus:outline-none focus:border-gold" />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">₦</span>
            <input type="number" placeholder="Max" className="w-full bg-white border border-gray-100 rounded-xl py-2.5 pl-7 pr-3 text-xs font-bold focus:outline-none focus:border-gold" />
          </div>
        </div>
        <button className="w-full mt-6 bg-black text-white py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg shadow-black/10">
          Apply Filter
        </button>
      </div>
    </aside>
  );
};
