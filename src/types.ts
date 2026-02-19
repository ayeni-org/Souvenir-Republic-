export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Address {
  id: string;
  type: 'shipping' | 'billing';
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank';
  provider: string;
  last4: string;
  expiry?: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: { product: Product; quantity: number }[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  addresses: Address[];
  payments: PaymentMethod[];
  wishlist: string[]; // product IDs
  orders: Order[];
  newsletter: boolean;
  twoFactorEnabled: boolean;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Content Manager' | 'Moderator';
  mfaEnabled: boolean;
}

export interface AdminActivity {
  id: string;
  adminId: string;
  adminName: string;
  action: string;
  target: string;
  timestamp: string;
}

export interface SiteSettings {
  primaryColor: string;
  accentColor: string;
  borderRadius: string;
  enableRecentlyViewed: boolean;
  enableLoyaltyPoints: boolean;
  enableNewsletter: boolean;
  enableSavedCarts: boolean;
  infiniteScroll: boolean;
  announcementBanner: {
    enabled: boolean;
    text: string;
    link: string;
  };
}

export interface Banner {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  link: string;
  active: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  subcategory?: string;
  description?: string;
  specifications?: Record<string, string>;
  reviews?: Review[];
  stock: number;
  sku: string;
  active: boolean;
  frequentlyBoughtTogether?: string[]; // product IDs
}

export interface Category {
  id: string;
  name: string;
  subcategories?: string[];
}
