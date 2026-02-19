import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, Layers, ChevronRight, Edit2, 
  Trash2, GripVertical, Eye, EyeOff
} from 'lucide-react';
import { useAdmin } from '../AdminContext';

export const AdminCategoriesPage: React.FC = () => {
  const { categories, updateCategories } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCatName, setNewCatName] = useState('');

  const toggleVisibility = (catId: string) => {
    const newCats = categories.map(cat => 
      cat.id === catId ? { ...cat, active: !cat.active } : cat
    );
    updateCategories(newCats);
  };

  const handleCreateCategory = () => {
    if (!newCatName.trim()) return;
    const newCat = {
      id: newCatName.toLowerCase().replace(/\s+/g, '-'),
      name: newCatName,
      subcategories: [],
      active: true
    };
    updateCategories([...categories, newCat]);
    setNewCatName('');
    setIsModalOpen(false);
  };

  const handleDeleteCategory = (catId: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      updateCategories(categories.filter(c => c.id !== catId));
    }
  };

  const handleAddSubcategory = (catId: string) => {
    const subName = prompt('Enter subcategory name:');
    if (subName) {
      const newCats = categories.map(cat => 
        cat.id === catId ? { ...cat, subcategories: [...cat.subcategories, subName] } : cat
      );
      updateCategories(newCats);
    }
  };

  const handleDeleteSubcategory = (catId: string, subName: string) => {
    const newCats = categories.map(cat => 
      cat.id === catId ? { ...cat, subcategories: cat.subcategories.filter(s => s !== subName) } : cat
    );
    updateCategories(newCats);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Category Management</h1>
          <p className="text-gray-500 text-sm font-medium">Organize your products into logical hierarchies.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gold transition-all shadow-lg shadow-black/10 flex items-center gap-2"
        >
          <Plus size={18} /> Add New Category
        </button>
      </div>

      {/* Categories List */}
      <div className="grid grid-cols-1 gap-6">
        {categories.map((cat) => (
          <motion.div 
            key={cat.id}
            layout
            className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden group"
          >
            <div className="p-6 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm text-gray-400 group-hover:text-gold transition-colors">
                  <Layers size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">{cat.name}</h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{cat.subcategories.length} Subcategories</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => toggleVisibility(cat.id)}
                  className={`p-2 rounded-lg transition-all ${cat.active ? 'text-emerald-500 hover:bg-emerald-50' : 'text-gray-300 hover:bg-gray-100'}`}
                >
                  {cat.active ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
                <button className="p-2 text-gray-300 hover:text-gold transition-all">
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => handleDeleteCategory(cat.id)}
                  className="p-2 text-gray-300 hover:text-red-500 transition-all"
                >
                  <Trash2 size={18} />
                </button>
                <div className="h-6 w-px bg-gray-200 mx-2" />
                <button className="p-2 text-gray-300 cursor-grab active:cursor-grabbing">
                  <GripVertical size={18} />
                </button>
              </div>
            </div>

            <div className="p-6 border-t border-gray-50">
              <div className="flex flex-wrap gap-3">
                {cat.subcategories.map((sub, i) => (
                  <div 
                    key={i}
                    className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 group/sub hover:border-gold transition-all"
                  >
                    <span className="text-xs font-bold text-gray-600">{sub}</span>
                    <button 
                      onClick={() => handleDeleteSubcategory(cat.id, sub)}
                      className="text-gray-300 hover:text-red-500 opacity-0 group-hover/sub:opacity-100 transition-all"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => handleAddSubcategory(cat.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-dashed border-gray-100 text-gray-400 hover:border-gold hover:text-gold transition-all text-xs font-bold"
                >
                  <Plus size={14} /> Add Sub
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Category Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Add New Category</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Trash2 size={20} className="text-gray-400" />
                </button>
              </div>

              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Category Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-gray-50 border-none focus:ring-2 focus:ring-gold rounded-xl py-4 px-6 font-bold" 
                    placeholder="e.g. Home Decor" 
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                  />
                </div>
              </div>

              <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end gap-4">
                <button onClick={() => setIsModalOpen(false)} className="px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-gray-500 hover:bg-gray-100 transition-all">
                  Cancel
                </button>
                <button 
                  onClick={handleCreateCategory}
                  className="bg-black text-white px-10 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gold transition-all shadow-xl shadow-black/10"
                >
                  Create Category
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
