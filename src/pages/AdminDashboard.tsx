import React from 'react';
import { motion } from 'motion/react';
import { 
  Users, ShoppingBag, Package, DollarSign, 
  TrendingUp, ArrowUpRight, ArrowDownRight,
  Clock, CheckCircle, AlertCircle, Search,
  Settings
} from 'lucide-react';
import { useAdmin } from '../AdminContext';
import { Link } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const { activities, products } = useAdmin();

  const stats = [
    { label: 'Total Revenue', value: '₦12.4M', change: '+12.5%', icon: DollarSign, color: 'bg-emerald-500', trend: 'up' },
    { label: 'Active Orders', value: '156', change: '+5.2%', icon: ShoppingBag, color: 'bg-blue-500', trend: 'up' },
    { label: 'Total Products', value: products.length.toString(), change: '+2', icon: Package, color: 'bg-gold', trend: 'up' },
    { label: 'Total Customers', value: '2,845', change: '-1.4%', icon: Users, color: 'bg-purple-500', trend: 'down' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-500 text-sm font-medium">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-50 transition-all">
            Export Report
          </button>
          <button className="bg-black text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gold transition-all shadow-lg shadow-black/10">
            View Live Site
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black ${stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {stat.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.change}
              </div>
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-2xl font-black text-gray-900">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex items-center justify-between">
            <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">Recent Activity</h2>
            <button className="text-[10px] font-black text-gold uppercase tracking-widest hover:underline">View All</button>
          </div>
          <div className="divide-y divide-gray-50">
            {activities.length > 0 ? activities.slice(0, 8).map((activity) => (
              <div key={activity.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    activity.action === 'Login' ? 'bg-blue-50 text-blue-500' :
                    activity.action === 'Create' ? 'bg-emerald-50 text-emerald-500' :
                    activity.action === 'Delete' ? 'bg-red-50 text-red-500' : 'bg-gold/10 text-gold'
                  }`}>
                    {activity.action === 'Login' ? <CheckCircle size={18} /> :
                     activity.action === 'Delete' ? <AlertCircle size={18} /> : <Clock size={18} />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      <span className="font-black">{activity.adminName}</span> {activity.action.toLowerCase()}d {activity.target}
                    </p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{activity.timestamp}</p>
                  </div>
                </div>
                <button className="p-2 text-gray-300 hover:text-gold transition-colors">
                  <ArrowUpRight size={16} />
                </button>
              </div>
            )) : (
              <div className="p-12 text-center text-gray-400 font-medium">No recent activity</div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-3">
              {[
                { label: 'Add New Product', path: '/admin/products', icon: Package },
                { label: 'Manage Banners', path: '/admin/promotions', icon: ShoppingBag },
                { label: 'Review Search Logs', path: '/admin/analytics', icon: Search },
                { label: 'System Settings', path: '/admin/settings', icon: Settings },
              ].map((action, i) => (
                <Link 
                  key={i}
                  to={action.path}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gold/10 group transition-all"
                >
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400 group-hover:text-gold shadow-sm transition-colors">
                    <action.icon size={18} />
                  </div>
                  <span className="text-xs font-black text-gray-700 uppercase tracking-widest">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-black p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden text-white">
            <div className="relative z-10">
              <h3 className="text-lg font-black mb-2 uppercase tracking-tight">System Status</h3>
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">All Systems Operational</span>
              </div>
              <p className="text-gray-400 text-xs font-medium leading-relaxed mb-6">
                Last backup was completed 2 hours ago. 12.4GB of storage used.
              </p>
              <button className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                Run Diagnostics
              </button>
            </div>
            <TrendingUp className="absolute -right-10 -bottom-10 w-48 h-48 text-white/5 -rotate-12" />
          </div>
        </div>
      </div>
    </div>
  );
};
