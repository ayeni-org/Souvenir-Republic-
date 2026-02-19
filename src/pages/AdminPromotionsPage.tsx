import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, Search, Filter, Tag, 
  Calendar, Clock, Trash2, Edit2,
  CheckCircle, AlertCircle, Image as ImageIcon,
  Zap, Gift, Percent
} from 'lucide-react';
import { useAdmin } from '../AdminContext';

export const AdminPromotionsPage: React.FC = () => {
  const { banners, updateBanners } = useAdmin();
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);

  const [coupons] = useState([
    { id: '1', code: 'WELCOME20', discount: '20%', type: 'Percentage', usage: '156/500', status: 'Active', expiry: '2026-12-31' },
    { id: '2', code: 'FREESHIP', discount: '₦2,500', type: 'Fixed', usage: '89/Unlimited', status: 'Active', expiry: '2026-06-30' },
    { id: '3', code: 'BLACKFRIDAY', discount: '50%', type: 'Percentage', usage: '0/1000', status: 'Scheduled', expiry: '2026-11-28' },
  ]);

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Promotions & Campaigns</h1>
          <p className="text-gray-500 text-sm font-medium">Manage discount codes, homepage banners, and seasonal offers.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsCouponModalOpen(true)}
            className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center gap-2"
          >
            <Tag size={16} /> New Coupon
          </button>
          <button 
            onClick={() => setIsBannerModalOpen(true)}
            className="bg-black text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gold transition-all shadow-lg shadow-black/10 flex items-center gap-2"
          >
            <Plus size={18} /> Add Banner
          </button>
        </div>
      </div>

      {/* Homepage Banners Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight flex items-center gap-3">
            <ImageIcon size={20} className="text-gold" /> Homepage Banners
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {banners.map((banner) => (
            <motion.div 
              key={banner.id}
              layout
              className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden group"
            >
              <div className="aspect-[21/9] relative overflow-hidden">
                <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex gap-2">
                    <button className="p-3 bg-white rounded-xl text-black hover:bg-gold transition-colors">
                      <Edit2 size={18} />
                    </button>
                    <button className="p-3 bg-white rounded-xl text-red-500 hover:bg-red-50 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${banner.active ? 'bg-emerald-500 text-white' : 'bg-gray-500 text-white'}`}>
                    {banner.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight mb-1">{banner.title}</h3>
                <p className="text-xs text-gray-500 font-medium line-clamp-1">{banner.subtitle}</p>
                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-[10px] font-black text-gold uppercase tracking-widest">Link: {banner.link}</span>
                  <button className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gold">Change Visibility</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Active Coupons Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight flex items-center gap-3">
            <Percent size={20} className="text-gold" /> Active Coupons
          </h2>
        </div>
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50">
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Coupon Code</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Discount</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Type</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Usage</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Expiry</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center text-gold">
                        <Tag size={14} />
                      </div>
                      <span className="text-sm font-black text-gray-900 font-mono">{coupon.code}</span>
                    </div>
                  </td>
                  <td className="p-6 text-sm font-black text-gray-900">{coupon.discount}</td>
                  <td className="p-6 text-xs font-bold text-gray-500 uppercase tracking-widest">{coupon.type}</td>
                  <td className="p-6 text-xs font-bold text-gray-700">{coupon.usage}</td>
                  <td className="p-6 text-xs font-bold text-gray-500">{coupon.expiry}</td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      coupon.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {coupon.status}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-300 hover:text-gold transition-colors"><Edit2 size={16} /></button>
                      <button className="p-2 text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
