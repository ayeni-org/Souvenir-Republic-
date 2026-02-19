import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser, AdminActivity, SiteSettings, Banner, Product, Category } from './types';
import { MOCK_PRODUCTS, CATEGORIES } from './constants';

interface AdminContextType {
  admin: AdminUser | null;
  isAdminAuthenticated: boolean;
  adminSignIn: (email: string, pass: string) => Promise<void>;
  adminSignOut: () => void;
  activities: AdminActivity[];
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  banners: Banner[];
  updateBanners: (newBanners: Banner[]) => void;
  products: Product[];
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  addProduct: (product: Product) => void;
  categories: Category[];
  updateCategories: (newCats: Category[]) => void;
  logActivity: (action: string, target: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const DEFAULT_SETTINGS: SiteSettings = {
  primaryColor: '#D4AF37', // Gold
  accentColor: '#000000',
  borderRadius: '1.5rem',
  enableRecentlyViewed: true,
  enableLoyaltyPoints: true,
  enableNewsletter: true,
  enableSavedCarts: true,
  infiniteScroll: false,
  announcementBanner: {
    enabled: true,
    text: 'Free Delivery on Premium Orders Over ₦50,000',
    link: '/shop'
  }
};

const INITIAL_BANNERS: Banner[] = [
  { id: '1', image: 'https://picsum.photos/seed/banner1/1920/1080', title: 'Premium Kitchenware', subtitle: 'Elevate your cooking experience', link: '/category/kitchenware', active: true },
  { id: '2', image: 'https://picsum.photos/seed/banner2/1920/1080', title: 'Luxury Souvenirs', subtitle: 'Memories that last forever', link: '/category/souvenirs', active: true },
];

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem('sr_admin_user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [activities, setActivities] = useState<AdminActivity[]>(() => {
    const saved = localStorage.getItem('sr_admin_activities');
    return saved ? JSON.parse(saved) : [];
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('sr_site_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [banners, setBanners] = useState<Banner[]>(() => {
    const saved = localStorage.getItem('sr_banners');
    return saved ? JSON.parse(saved) : INITIAL_BANNERS;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('sr_admin_products');
    if (saved) return JSON.parse(saved);
    return MOCK_PRODUCTS;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('sr_admin_categories');
    return saved ? JSON.parse(saved) : CATEGORIES;
  });

  useEffect(() => {
    localStorage.setItem('sr_admin_user', JSON.stringify(admin));
    localStorage.setItem('sr_admin_activities', JSON.stringify(activities));
    localStorage.setItem('sr_site_settings', JSON.stringify(settings));
    localStorage.setItem('sr_banners', JSON.stringify(banners));
    localStorage.setItem('sr_admin_products', JSON.stringify(products));
    localStorage.setItem('sr_admin_categories', JSON.stringify(categories));
  }, [admin, activities, settings, banners, products, categories]);

  const logActivity = (action: string, target: string) => {
    if (!admin) return;
    const newActivity: AdminActivity = {
      id: Math.random().toString(36).substr(2, 9),
      adminId: admin.id,
      adminName: admin.name,
      action,
      target,
      timestamp: new Date().toLocaleString()
    };
    setActivities(prev => [newActivity, ...prev].slice(0, 100));
  };

  const adminSignIn = async (email: string, pass: string) => {
    // Mock admin auth
    if (email === 'admin@souvenirrepublic.com' && pass === 'admin123') {
      const user: AdminUser = {
        id: 'admin-1',
        name: 'Super Admin',
        email,
        role: 'Admin',
        mfaEnabled: true
      };
      setAdmin(user);
      logActivity('Login', 'Admin Panel');
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const adminSignOut = () => {
    logActivity('Logout', 'Admin Panel');
    setAdmin(null);
  };

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    logActivity('Update', 'Site Settings');
  };

  const updateBanners = (newBanners: Banner[]) => {
    setBanners(newBanners);
    logActivity('Update', 'Homepage Banners');
  };

  const updateProduct = (product: Product) => {
    setProducts(prev => prev.map(p => p.id === product.id ? product : p));
    logActivity('Update', `Product: ${product.name}`);
  };

  const deleteProduct = (id: string) => {
    const p = products.find(prod => prod.id === id);
    setProducts(prev => prev.filter(prod => prod.id !== id));
    if (p) logActivity('Delete', `Product: ${p.name}`);
  };

  const addProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
    logActivity('Create', `Product: ${product.name}`);
  };

  const updateCategories = (newCats: Category[]) => {
    setCategories(newCats);
    logActivity('Update', 'Categories');
  };

  return (
    <AdminContext.Provider value={{
      admin,
      isAdminAuthenticated: !!admin,
      adminSignIn,
      adminSignOut,
      activities,
      settings,
      updateSettings,
      banners,
      updateBanners,
      products,
      updateProduct,
      deleteProduct,
      addProduct,
      categories,
      updateCategories,
      logActivity
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
