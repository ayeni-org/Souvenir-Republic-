import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Product, Order, Address, PaymentMethod } from './types';
import { useAdmin } from './AdminContext';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  updateProfile: (data: Partial<User>) => void;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  addToCart: (product: Product, quantity: number) => void;
  recentlyViewed: Product[];
  addRecentlyViewed: (product: Product) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { products } = useAdmin();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  useEffect(() => {
    // Simulate checking for existing session
    const savedUser = localStorage.getItem('sr_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    const savedRecent = localStorage.getItem('sr_recent');
    if (savedRecent) {
      setRecentlyViewed(JSON.parse(savedRecent));
    }
    
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, _password: string) => {
    setIsLoading(true);
    // Mock sign in
    const mockUser: User = {
      id: 'u1',
      name: 'Salam Abass',
      email: email,
      points: 1250,
      newsletter: true,
      twoFactorEnabled: false,
      addresses: [
        { id: 'a1', type: 'shipping', name: 'Home', street: 'Heritage Mall, Dugbe', city: 'Ibadan', state: 'Oyo', zip: '200263', isDefault: true }
      ],
      payments: [
        { id: 'p1', type: 'card', provider: 'Visa', last4: '4242', expiry: '12/26', isDefault: true }
      ],
      wishlist: ['1', '2'],
      orders: [
        { 
          id: 'SR-98765', 
          date: '2026-02-18', 
          total: 45000, 
          status: 'Shipped', 
          items: [{ product: products[0], quantity: 1 }, { product: products[1], quantity: 2 }] 
        }
      ]
    };
    setUser(mockUser);
    localStorage.setItem('sr_user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const signUp = async (name: string, email: string, _password: string) => {
    setIsLoading(true);
    const mockUser: User = {
      id: Date.now().toString(),
      name,
      email,
      points: 0,
      newsletter: false,
      twoFactorEnabled: false,
      addresses: [],
      payments: [],
      wishlist: [],
      orders: []
    };
    setUser(mockUser);
    localStorage.setItem('sr_user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('sr_user');
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem('sr_user', JSON.stringify(updated));
  };

  const addToWishlist = (productId: string) => {
    if (!user) return;
    if (user.wishlist.includes(productId)) return;
    updateProfile({ wishlist: [...user.wishlist, productId] });
  };

  const removeFromWishlist = (productId: string) => {
    if (!user) return;
    updateProfile({ wishlist: user.wishlist.filter(id => id !== productId) });
  };

  const addRecentlyViewed = (product: Product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      const updated = [product, ...filtered].slice(0, 10);
      localStorage.setItem('sr_recent', JSON.stringify(updated));
      return updated;
    });
  };

  const addToCart = (_product: Product, _quantity: number) => {
    // This would typically go to a CartContext, but for simplicity we'll just alert
    alert('Added to cart!');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      signIn, 
      signUp, 
      signOut, 
      updateProfile,
      addToWishlist,
      removeFromWishlist,
      addToCart,
      recentlyViewed,
      addRecentlyViewed
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
