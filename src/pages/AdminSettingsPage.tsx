import React from 'react';
import { motion } from 'motion/react';
import { 
  Settings, Palette, Bell, Globe, 
  Shield, Smartphone, Award, ShoppingCart,
  Mail, Layout, Type
} from 'lucide-react';
import { useAdmin } from '../AdminContext';

export const AdminSettingsPage: React.FC = () => {
  const { settings, updateSettings } = useAdmin();

  const handleToggle = (key: keyof typeof settings) => {
    if (typeof settings[key] === 'boolean') {
      updateSettings({ [key]: !settings[key] });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Site Settings</h1>
          <p className="text-gray-500 text-sm font-medium">Configure global branding, features, and notifications.</p>
        </div>
        <button 
          onClick={() => alert('All settings have been synchronized and saved.')}
          className="bg-black text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gold transition-all shadow-lg shadow-black/10"
        >
          Save All Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Branding & Appearance */}
        <div className="space-y-8">
          <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h3 className="text-lg font-black text-gray-900 mb-6 uppercase tracking-tight flex items-center gap-3">
              <Palette size={20} className="text-gold" /> Branding & Appearance
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Primary Color</label>
                  <div className="flex gap-2">
                    <input 
                      type="color" 
                      className="w-12 h-12 rounded-xl border-none p-0 overflow-hidden cursor-pointer" 
                      value={settings.primaryColor}
                      onChange={(e) => updateSettings({ primaryColor: e.target.value })}
                    />
                    <input 
                      type="text" 
                      className="flex-1 bg-gray-50 border-none focus:ring-2 focus:ring-gold rounded-xl py-3 px-4 font-mono text-xs font-bold" 
                      value={settings.primaryColor}
                      onChange={(e) => updateSettings({ primaryColor: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Accent Color</label>
                  <div className="flex gap-2">
                    <input 
                      type="color" 
                      className="w-12 h-12 rounded-xl border-none p-0 overflow-hidden cursor-pointer" 
                      value={settings.accentColor}
                      onChange={(e) => updateSettings({ accentColor: e.target.value })}
                    />
                    <input 
                      type="text" 
                      className="flex-1 bg-gray-50 border-none focus:ring-2 focus:ring-gold rounded-xl py-3 px-4 font-mono text-xs font-bold" 
                      value={settings.accentColor}
                      onChange={(e) => updateSettings({ accentColor: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Border Radius</label>
                <select 
                  className="w-full bg-gray-50 border-none focus:ring-2 focus:ring-gold rounded-xl py-3 px-4 font-bold"
                  value={settings.borderRadius}
                  onChange={(e) => updateSettings({ borderRadius: e.target.value })}
                >
                  <option value="0.5rem">Small (8px)</option>
                  <option value="1rem">Medium (16px)</option>
                  <option value="1.5rem">Large (24px)</option>
                  <option value="2.5rem">Extra Large (40px)</option>
                </select>
              </div>
            </div>
          </section>

          <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h3 className="text-lg font-black text-gray-900 mb-6 uppercase tracking-tight flex items-center gap-3">
              <Bell size={20} className="text-gold" /> Announcement Banner
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div>
                  <h4 className="font-bold text-gray-900">Enable Banner</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Show top announcement bar</p>
                </div>
                <button 
                  onClick={() => updateSettings({ announcementBanner: { ...settings.announcementBanner, enabled: !settings.announcementBanner.enabled } })}
                  className={`w-12 h-6 rounded-full transition-all relative ${settings.announcementBanner.enabled ? 'bg-gold' : 'bg-gray-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.announcementBanner.enabled ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Banner Text</label>
                <input 
                  type="text" 
                  className="w-full bg-gray-50 border-none focus:ring-2 focus:ring-gold rounded-xl py-3 px-4 font-bold" 
                  value={settings.announcementBanner.text}
                  onChange={(e) => updateSettings({ announcementBanner: { ...settings.announcementBanner, text: e.target.value } })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Banner Link</label>
                <input 
                  type="text" 
                  className="w-full bg-gray-50 border-none focus:ring-2 focus:ring-gold rounded-xl py-3 px-4 font-bold" 
                  value={settings.announcementBanner.link}
                  onChange={(e) => updateSettings({ announcementBanner: { ...settings.announcementBanner, link: e.target.value } })}
                />
              </div>
            </div>
          </section>
        </div>

        {/* Feature Toggles */}
        <div className="space-y-8">
          <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h3 className="text-lg font-black text-gray-900 mb-6 uppercase tracking-tight flex items-center gap-3">
              <Layout size={20} className="text-gold" /> User Features
            </h3>
            <div className="space-y-4">
              {[
                { key: 'enableRecentlyViewed', label: 'Recently Viewed Products', icon: Globe },
                { key: 'enableLoyaltyPoints', label: 'Loyalty & Rewards System', icon: Award },
                { key: 'enableNewsletter', label: 'Newsletter Subscriptions', icon: Mail },
                { key: 'enableSavedCarts', label: 'Saved Carts & Wishlists', icon: ShoppingCart },
                { key: 'infiniteScroll', label: 'Infinite Scroll on Shop', icon: Layout },
              ].map((feature) => (
                <div key={feature.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400 shadow-sm">
                      <feature.icon size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{feature.label}</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        {settings[feature.key as keyof typeof settings] ? 'Active' : 'Disabled'}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleToggle(feature.key as keyof typeof settings)}
                    className={`w-12 h-6 rounded-full transition-all relative ${settings[feature.key as keyof typeof settings] ? 'bg-gold' : 'bg-gray-200'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings[feature.key as keyof typeof settings] ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-black text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg font-black mb-4 uppercase tracking-tight flex items-center gap-3">
                <Shield size={20} className="text-gold" /> Maintenance Mode
              </h3>
              <p className="text-gray-400 text-xs font-medium leading-relaxed mb-8">
                Enabling maintenance mode will prevent customers from accessing the site. Only authorized admins will be able to view the frontend.
              </p>
              <button className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-red-500/20">
                Enable Maintenance Mode
              </button>
            </div>
            <Settings className="absolute -right-10 -bottom-10 w-48 h-48 text-white/5 rotate-12" />
          </section>
        </div>
      </div>
    </div>
  );
};
