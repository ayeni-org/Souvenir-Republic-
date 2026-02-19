import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, TrendingUp, TrendingDown, Download, 
  Calendar, Filter, ArrowUpRight, ArrowDownRight,
  ShoppingBag, Users, DollarSign, Package,
  ChevronDown, MousePointer2, Clock
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, LineChart, Line,
  AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';

export const AdminAnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const salesData = [
    { name: 'Mon', sales: 45000, orders: 12 },
    { name: 'Tue', sales: 52000, orders: 15 },
    { name: 'Wed', sales: 38000, orders: 10 },
    { name: 'Thu', sales: 65000, orders: 18 },
    { name: 'Fri', sales: 85000, orders: 24 },
    { name: 'Sat', sales: 120000, orders: 35 },
    { name: 'Sun', sales: 95000, orders: 28 },
  ];

  const categoryData = [
    { name: 'Kitchenware', value: 45 },
    { name: 'Souvenirs', value: 30 },
    { name: 'Gifts', value: 15 },
    { name: 'Appliances', value: 10 },
  ];

  const COLORS = ['#D4AF37', '#141414', '#8E9299', '#E4E3E0'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Analytics & Reports</h1>
          <p className="text-gray-500 text-sm font-medium">Track sales performance, customer behavior, and inventory trends.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-xl py-3 pl-6 pr-12 text-xs font-black uppercase tracking-widest focus:ring-2 focus:ring-gold transition-all cursor-pointer"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">Last Year</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
          <button className="bg-black text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gold transition-all shadow-lg shadow-black/10 flex items-center gap-2">
            <Download size={18} /> Export Report
          </button>
        </div>
      </div>

      {/* High-Level Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '₦2.4M', trend: '+12.5%', isUp: true, icon: DollarSign },
          { label: 'Total Orders', value: '156', trend: '+8.2%', isUp: true, icon: ShoppingBag },
          { label: 'Avg. Order Value', value: '₦15,380', trend: '-2.4%', isUp: false, icon: TrendingUp },
          { label: 'Conversion Rate', value: '3.2%', trend: '+0.5%', isUp: true, icon: MousePointer2 },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                <stat.icon size={20} />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${stat.isUp ? 'text-emerald-500' : 'text-red-500'}`}>
                {stat.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.trend}
              </div>
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-2xl font-black text-gray-900">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Sales Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">Revenue Overview</h2>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gold rounded-full"></div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Revenue</span>
              </div>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F1F1" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#9CA3AF' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#9CA3AF' }}
                  tickFormatter={(value) => `₦${value/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#141414', 
                    border: 'none', 
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: '900'
                  }}
                  itemStyle={{ color: '#D4AF37' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#D4AF37" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorSales)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="lg:col-span-1 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col">
          <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-8">Sales by Category</h2>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full space-y-3 mt-8">
              {categoryData.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{item.name}</span>
                  </div>
                  <span className="text-xs font-black text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Products Table */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-8">Top Performing Products</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="pb-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Product</th>
                <th className="pb-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Sales</th>
                <th className="pb-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Revenue</th>
                <th className="pb-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { name: '1070-1035 Half Stainless', sales: 45, revenue: '₦135,000', growth: '+15.2%', isUp: true },
                { name: '12pc Wooden Rotating Spice Jar', sales: 28, revenue: '₦560,000', growth: '+8.4%', isUp: true },
                { name: '17pcs Tea Set', sales: 12, revenue: '₦216,000', growth: '-2.1%', isUp: false },
                { name: '3 In 1 Non Stick Pot', sales: 18, revenue: '₦243,000', growth: '+12.8%', isUp: true },
              ].map((product, i) => (
                <tr key={i} className="group">
                  <td className="py-4">
                    <span className="text-sm font-black text-gray-900 uppercase tracking-tight group-hover:text-gold transition-colors">{product.name}</span>
                  </td>
                  <td className="py-4 text-sm font-bold text-gray-500">{product.sales} units</td>
                  <td className="py-4 text-sm font-black text-gray-900">{product.revenue}</td>
                  <td className="py-4">
                    <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${product.isUp ? 'text-emerald-500' : 'text-red-500'}`}>
                      {product.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      {product.growth}
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
