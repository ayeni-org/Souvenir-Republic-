import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, Search, Filter, MoreVertical, 
  Mail, Phone, MapPin, ShoppingBag,
  Star, Shield, Ban, CheckCircle,
  ChevronLeft, ChevronRight, ArrowUpRight
} from 'lucide-react';

export const AdminCustomersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const customers = [
    { id: 'u1', name: 'Salam Abass', email: 'salam@example.com', phone: '+234 801 234 5678', orders: 12, spent: 450000, points: 1250, status: 'Active', joined: '2024-01-15' },
    { id: 'u2', name: 'Chioma Okoro', email: 'chioma@example.com', phone: '+234 802 345 6789', orders: 5, spent: 125000, points: 450, status: 'Active', joined: '2024-03-22' },
    { id: 'u3', name: 'John Doe', email: 'john@example.com', phone: '+234 803 456 7890', orders: 1, spent: 15000, points: 50, status: 'Inactive', joined: '2024-05-10' },
    { id: 'u4', name: 'Adebayo Kehinde', email: 'adebayo@example.com', phone: '+234 804 567 8901', orders: 24, spent: 1200000, points: 5400, status: 'Active', joined: '2023-11-05' },
  ];

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Customer Management</h1>
          <p className="text-gray-500 text-sm font-medium">View customer profiles, order history, and loyalty status.</p>
        </div>
        <button className="bg-black text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gold transition-all shadow-lg shadow-black/10 flex items-center gap-2">
          <Mail size={18} /> Email All Customers
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: 'Total Customers', value: '2,845', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Active This Month', value: '1,120', icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Loyalty Members', value: '856', icon: Star, color: 'text-gold', bg: 'bg-gold/10' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-6">
            <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-2xl font-black text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-[1.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, email, or phone..."
            className="w-full bg-gray-50 border-none focus:ring-0 text-sm font-bold py-3 pl-12 pr-4 rounded-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="bg-gray-50 text-gray-500 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition-all flex items-center gap-2">
          <Filter size={16} /> Filter
        </button>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50">
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Customer</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Contact</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Orders</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Spent</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Points</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center font-black text-sm">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-black text-gray-900">{customer.name}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Joined {customer.joined}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                        <Mail size={12} className="text-gray-400" /> {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                        <Phone size={12} className="text-gray-400" /> {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-sm font-black text-gray-900">{customer.orders}</td>
                  <td className="p-6 text-sm font-black text-gray-900">₦{customer.spent.toLocaleString()}</td>
                  <td className="p-6">
                    <span className="text-xs font-black text-gold bg-gold/5 px-3 py-1 rounded-full">
                      {customer.points} pts
                    </span>
                  </td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      customer.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-300 hover:text-gold transition-colors"><ArrowUpRight size={18} /></button>
                      <button className="p-2 text-gray-300 hover:text-red-500 transition-colors"><Ban size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
