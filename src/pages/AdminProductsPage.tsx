import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, Search, Filter, MoreVertical, 
  Edit2, Trash2, Eye, EyeOff, Package,
  ChevronLeft, ChevronRight, ArrowUpDown
} from 'lucide-react';
import { useAdmin } from '../AdminContext';
import { Product } from '../types';

export const AdminProductsPage: React.FC = () => {
  const { products, deleteProduct, updateProduct, addProduct } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (product: Product | null) => {
    setEditingProduct(product);
    setFormData(product || {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      price: 0,
      image: 'https://picsum.photos/seed/new/400/400',
      category: 'Kitchenware',
      stock: 0,
      sku: '',
      active: true,
      description: '',
      specifications: {}
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingProduct) {
      updateProduct({ ...editingProduct, ...formData } as Product);
    } else {
      addProduct(formData as Product);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const toggleVisibility = (product: Product) => {
    updateProduct({ ...product, active: !product.active });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Product Management</h1>
          <p className="text-gray-500 text-sm font-medium">Manage your inventory, pricing, and visibility.</p>
        </div>
        <button 
          onClick={() => handleOpenModal(null)}
          className="bg-black text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gold transition-all shadow-lg shadow-black/10 flex items-center gap-2"
        >
          <Plus size={18} /> Add New Product
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-[1.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or SKU..."
            className="w-full bg-gray-50 border-none focus:ring-0 text-sm font-bold py-3 pl-12 pr-4 rounded-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button className="bg-gray-50 text-gray-500 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition-all flex items-center gap-2">
            <Filter size={16} /> Filter
          </button>
          <button className="bg-gray-50 text-gray-500 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition-all flex items-center gap-2">
            <ArrowUpDown size={16} /> Sort
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50">
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Product</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">SKU</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Price</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Stock</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-gray-900 line-clamp-1">{product.name}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ID: {product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-xs font-black text-gray-500 font-mono uppercase tracking-tight">{product.sku}</td>
                  <td className="p-6">
                    <span className="text-[10px] font-black text-gold uppercase tracking-widest bg-gold/5 px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                  </td>
                  <td className="p-6 text-sm font-black text-gray-900">₦{product.price.toLocaleString()}</td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${product.stock > 10 ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                      <span className="text-xs font-bold text-gray-700">{product.stock} units</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <button 
                      onClick={() => toggleVisibility(product)}
                      className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                        product.active ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {product.active ? <Eye size={12} /> : <EyeOff size={12} />}
                      {product.active ? 'Visible' : 'Hidden'}
                    </button>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleOpenModal(product)}
                        className="p-2 text-gray-400 hover:text-gold transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Showing 1 to {filteredProducts.length} of {products.length} products</p>
          <div className="flex items-center gap-2">
            <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-400 hover:text-gold disabled:opacity-50 transition-all" disabled>
              <ChevronLeft size={16} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center bg-gold text-white rounded-lg text-xs font-black shadow-lg shadow-gold/20">1</button>
            <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-400 hover:text-gold disabled:opacity-50 transition-all" disabled>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Product Modal (Add/Edit) */}
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
              className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Trash2 size={20} className="text-gray-400" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto flex-1 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Product Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-50 border-none focus:ring-2 focus:ring-gold rounded-xl py-3 px-4 font-bold" 
                      value={formData.name || ''} 
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">SKU</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-50 border-none focus:ring-2 focus:ring-gold rounded-xl py-3 px-4 font-bold" 
                      value={formData.sku || ''} 
                      onChange={(e) => setFormData({...formData, sku: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Category</label>
                    <select 
                      className="w-full bg-gray-50 border-none focus:ring-2 focus:ring-gold rounded-xl py-3 px-4 font-bold"
                      value={formData.category || 'Kitchenware'}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                      <option>Kitchenware</option>
                      <option>Souvenirs</option>
                      <option>Gifts</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Price (₦)</label>
                    <input 
                      type="number" 
                      className="w-full bg-gray-50 border-none focus:ring-2 focus:ring-gold rounded-xl py-3 px-4 font-bold" 
                      value={formData.price || 0} 
                      onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Description</label>
                  <textarea 
                    rows={4} 
                    className="w-full bg-gray-50 border-none focus:ring-2 focus:ring-gold rounded-xl py-3 px-4 font-bold" 
                    value={formData.description || ''}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Stock Quantity</label>
                    <input 
                      type="number" 
                      className="w-full bg-gray-50 border-none focus:ring-2 focus:ring-gold rounded-xl py-3 px-4 font-bold" 
                      value={formData.stock || 0} 
                      onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Image URL</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-50 border-none focus:ring-2 focus:ring-gold rounded-xl py-3 px-4 font-bold" 
                      value={formData.image || ''} 
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end gap-4">
                <button onClick={() => setIsModalOpen(false)} className="px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-gray-500 hover:bg-gray-100 transition-all">
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="bg-black text-white px-10 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gold transition-all shadow-xl shadow-black/10"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
