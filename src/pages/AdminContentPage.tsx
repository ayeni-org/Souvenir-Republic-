import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, Edit3, Eye, History, 
  Search, Plus, Globe, Shield, 
  RotateCcw, Info, ChevronRight, Save
} from 'lucide-react';

export const AdminContentPage: React.FC = () => {
  const [activePage, setActivePage] = useState<string | null>(null);

  const pages = [
    { id: 'terms', title: 'Terms & Conditions', lastUpdated: '2026-02-10', status: 'Published', icon: FileText },
    { id: 'privacy', title: 'Privacy Policy', lastUpdated: '2026-01-25', status: 'Published', icon: Shield },
    { id: 'returns', title: 'Returns & Refunds', lastUpdated: '2026-02-15', status: 'Published', icon: RotateCcw },
    { id: 'cookies', title: 'Cookies Policy', lastUpdated: '2025-12-01', status: 'Draft', icon: Info },
    { id: 'about', title: 'About Us', lastUpdated: '2026-02-18', status: 'Published', icon: Globe },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Content Management</h1>
          <p className="text-gray-500 text-sm font-medium">Edit legal policies, informational pages, and site copy.</p>
        </div>
        <button className="bg-black text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gold transition-all shadow-lg shadow-black/10 flex items-center gap-2">
          <Plus size={18} /> Create New Page
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Page List */}
        <div className="lg:col-span-1 space-y-4">
          {pages.map((page) => (
            <button 
              key={page.id}
              onClick={() => setActivePage(page.id)}
              className={`w-full text-left p-6 rounded-[2rem] border transition-all flex items-center gap-4 group ${
                activePage === page.id ? 'bg-black text-white border-black shadow-xl' : 'bg-white text-gray-900 border-gray-100 hover:border-gold'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                activePage === page.id ? 'bg-gold text-black' : 'bg-gray-50 text-gray-400 group-hover:text-gold'
              }`}>
                <page.icon size={20} />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-black uppercase tracking-tight">{page.title}</h3>
                <p className={`text-[10px] font-bold uppercase tracking-widest ${activePage === page.id ? 'text-gray-400' : 'text-gray-400'}`}>
                  Last updated: {page.lastUpdated}
                </p>
              </div>
              <ChevronRight size={16} className={activePage === page.id ? 'text-gold' : 'text-gray-300'} />
            </button>
          ))}
        </div>

        {/* Editor Placeholder */}
        <div className="lg:col-span-2">
          {activePage ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col h-[700px]"
            >
              <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">
                    Editing: {pages.find(p => p.id === activePage)?.title}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Live on Website</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="p-3 bg-gray-50 text-gray-400 hover:text-gold rounded-xl transition-colors">
                    <Eye size={18} />
                  </button>
                  <button className="p-3 bg-gray-50 text-gray-400 hover:text-gold rounded-xl transition-colors">
                    <History size={18} />
                  </button>
                  <button className="bg-black text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gold transition-all flex items-center gap-2">
                    <Save size={16} /> Save Changes
                  </button>
                </div>
              </div>
              <div className="flex-1 p-8">
                <div className="w-full h-full bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center p-12">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-gray-300 mb-6">
                    <Edit3 size={32} />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-2">Rich Text Editor</h3>
                  <p className="text-gray-500 text-sm max-w-sm mx-auto mb-8">
                    This is where you would edit the content for the <strong>{pages.find(p => p.id === activePage)?.title}</strong> page using a visual editor.
                  </p>
                  <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                    <div className="h-4 bg-gray-200 rounded-full w-full"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-full"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-2/3"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-full"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm h-[700px] flex flex-col items-center justify-center text-center p-12">
              <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center text-gray-300 mb-8">
                <FileText size={40} />
              </div>
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-4">Select a page to edit</h2>
              <p className="text-gray-500 max-w-xs mx-auto">
                Choose a page from the list on the left to start editing its content and metadata.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
