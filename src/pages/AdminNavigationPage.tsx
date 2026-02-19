import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Navigation, Plus, GripVertical, ExternalLink, 
  Trash2, Edit2, ChevronDown, Layout, 
  Menu as MenuIcon, Smartphone, Monitor, Save
} from 'lucide-react';

export const AdminNavigationPage: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<'header' | 'footer' | 'mobile'>('header');

  const headerLinks = [
    { id: '1', label: 'Home', path: '/', type: 'Internal' },
    { id: '2', label: 'Shop All', path: '/shop', type: 'Internal' },
    { id: '3', label: 'Kitchenware', path: '/category/kitchenware', type: 'Category' },
    { id: '4', label: 'Souvenirs', path: '/category/souvenirs', type: 'Category' },
    { id: '5', label: 'Contact', path: '/contact', type: 'Internal' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Navigation Management</h1>
          <p className="text-gray-500 text-sm font-medium">Manage header menus, footer links, and mobile navigation.</p>
        </div>
        <button className="bg-black text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gold transition-all shadow-lg shadow-black/10 flex items-center gap-2">
          <Save size={18} /> Publish Changes
        </button>
      </div>

      {/* Menu Selector */}
      <div className="flex p-1.5 bg-gray-100 rounded-2xl w-fit">
        {[
          { id: 'header', label: 'Header Menu', icon: Monitor },
          { id: 'mobile', label: 'Mobile Menu', icon: Smartphone },
          { id: 'footer', label: 'Footer Links', icon: Layout },
        ].map((menu) => (
          <button
            key={menu.id}
            onClick={() => setActiveMenu(menu.id as any)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeMenu === menu.id ? 'bg-white text-gold shadow-sm' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <menu.icon size={14} />
            {menu.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Menu Structure */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">Menu Structure</h2>
              <button className="flex items-center gap-2 text-[10px] font-black text-gold uppercase tracking-widest hover:underline">
                <Plus size={14} /> Add Menu Item
              </button>
            </div>

            <div className="space-y-3">
              {headerLinks.map((link) => (
                <div 
                  key={link.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-gold transition-all group"
                >
                  <button className="text-gray-300 cursor-grab active:cursor-grabbing">
                    <GripVertical size={18} />
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-black text-gray-900 uppercase tracking-tight">{link.label}</span>
                      <span className="text-[10px] font-black text-gold bg-gold/5 px-2 py-0.5 rounded uppercase tracking-widest">
                        {link.type}
                      </span>
                    </div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{link.path}</p>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-gray-400 hover:text-gold transition-colors"><Edit2 size={16} /></button>
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Preview / Help */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-black text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg font-black mb-4 uppercase tracking-tight">Live Preview</h3>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                  <div className="w-8 h-8 bg-gold rounded-lg"></div>
                  <div className="flex gap-3">
                    <div className="w-8 h-2 bg-white/20 rounded-full"></div>
                    <div className="w-8 h-2 bg-white/20 rounded-full"></div>
                    <div className="w-8 h-2 bg-white/20 rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  {headerLinks.map(l => (
                    <div key={l.id} className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{l.label}</span>
                      <ChevronDown size={12} className="text-gray-600" />
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-6 text-center">
                Visual representation of the {activeMenu} menu
              </p>
            </div>
            <Navigation className="absolute -right-10 -bottom-10 w-48 h-48 text-white/5 rotate-12" />
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight mb-4">Navigation Tips</h3>
            <ul className="space-y-4">
              {[
                'Drag items to reorder them',
                'Nesting items creates dropdowns',
                'Use internal paths for faster loading',
                'External links open in new tabs',
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-xs font-medium text-gray-500">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full mt-1.5 shrink-0"></div>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
