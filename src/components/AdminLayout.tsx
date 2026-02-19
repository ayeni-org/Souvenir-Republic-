import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, Package, Layers, Users, 
  Settings, FileText, BarChart3, Shield, 
  LogOut, Menu, X, ChevronRight, Bell,
  Search, Globe, Image as ImageIcon, Navigation
} from 'lucide-react';
import { useAdmin } from '../AdminContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { admin, adminSignOut } = useAdmin();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Overview', path: '/admin' },
    { id: 'products', icon: Package, label: 'Products', path: '/admin/products' },
    { id: 'categories', icon: Layers, label: 'Categories', path: '/admin/categories' },
    { id: 'promotions', icon: ImageIcon, label: 'Promotions', path: '/admin/promotions' },
    { id: 'customers', icon: Users, label: 'Customers', path: '/admin/customers' },
    { id: 'content', icon: FileText, label: 'Content Pages', path: '/admin/content' },
    { id: 'navigation', icon: Navigation, label: 'Navigation', path: '/admin/navigation' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
    { id: 'settings', icon: Settings, label: 'Site Settings', path: '/admin/settings' },
    { id: 'security', icon: Shield, label: 'Security', path: '/admin/security' },
  ];

  const handleSignOut = () => {
    adminSignOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex text-[#141414] font-sans">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 bg-[#141414] text-white transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-72' : 'w-20'}`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="h-20 flex items-center px-6 border-b border-white/10">
            <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center text-black font-black text-xl shrink-0">SR</div>
            {isSidebarOpen && (
              <div className="ml-4 overflow-hidden whitespace-nowrap">
                <h1 className="font-black text-sm tracking-tighter uppercase leading-none">Admin</h1>
                <p className="text-[10px] font-black tracking-[0.2em] text-gold uppercase leading-none mt-1">Republic</p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto no-scrollbar">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link 
                  key={item.id}
                  to={item.path}
                  className={`flex items-center p-3 rounded-xl transition-all group ${isActive ? 'bg-gold text-black shadow-lg shadow-gold/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                >
                  <item.icon size={20} className={isActive ? 'text-black' : 'group-hover:text-gold transition-colors'} />
                  {isSidebarOpen && (
                    <span className="ml-4 text-xs font-black uppercase tracking-widest">{item.label}</span>
                  )}
                  {isActive && isSidebarOpen && (
                    <ChevronRight size={14} className="ml-auto" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-white/10">
            <button 
              onClick={handleSignOut}
              className="w-full flex items-center p-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all group"
            >
              <LogOut size={20} />
              {isSidebarOpen && (
                <span className="ml-4 text-xs font-black uppercase tracking-widest">Sign Out</span>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-20'}`}>
        {/* Header */}
        <header className="h-20 bg-white border-bottom border-gray-200 sticky top-0 z-40 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="h-6 w-px bg-gray-200 mx-2" />
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search admin..."
                className="bg-gray-50 border-none focus:ring-0 text-xs font-bold py-2 pl-10 pr-4 rounded-lg w-64"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-400 hover:text-gold transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-10 w-px bg-gray-200" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-gray-900 uppercase tracking-tight">{admin?.name}</p>
                <p className="text-[10px] font-bold text-gold uppercase tracking-widest">{admin?.role}</p>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 font-black border border-gray-200">
                {admin?.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
