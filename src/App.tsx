import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { AccountPage } from './pages/AccountPage';
import { AuthPage } from './pages/AuthPage';
import { WishlistPage } from './pages/WishlistPage';
import { OrdersPage } from './pages/OrdersPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage, TermsContent, PrivacyContent, ReturnsContent, CookiesContent } from './pages/LegalPage';
import { AuthProvider, useAuth } from './AuthContext';
import { AdminProvider, useAdmin } from './AdminContext';
import { AdminLayout } from './components/AdminLayout';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminProductsPage } from './pages/AdminProductsPage';
import { AdminCategoriesPage } from './pages/AdminCategoriesPage';
import { AdminPromotionsPage } from './pages/AdminPromotionsPage';
import { AdminCustomersPage } from './pages/AdminCustomersPage';
import { AdminContentPage } from './pages/AdminContentPage';
import { AdminNavigationPage } from './pages/AdminNavigationPage';
import { AdminAnalyticsPage } from './pages/AdminAnalyticsPage';
import { AdminSecurityPage } from './pages/AdminSecurityPage';
import { AdminSettingsPage } from './pages/AdminSettingsPage';
import { AdminLoginPage } from './pages/AdminLoginPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFDFB]">
        <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdminAuthenticated } = useAdmin();

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <AdminLayout>{children}</AdminLayout>;
};

export default function App() {
  return (
    <AdminProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            
            {/* Account & Auth */}
            <Route path="/account" element={
              <ProtectedRoute>
                <AccountPage />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/register" element={<AuthPage />} />
            <Route path="/cart" element={<CartPage />} />
            
            {/* Protected Account Routes */}
            <Route path="/wishlist" element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
            <Route path="/track" element={<ProtectedRoute><TrackOrderPage /></ProtectedRoute>} />

            {/* Admin Panel */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
            <Route path="/admin/products" element={<ProtectedAdminRoute><AdminProductsPage /></ProtectedAdminRoute>} />
            <Route path="/admin/categories" element={<ProtectedAdminRoute><AdminCategoriesPage /></ProtectedAdminRoute>} />
            <Route path="/admin/promotions" element={<ProtectedAdminRoute><AdminPromotionsPage /></ProtectedAdminRoute>} />
            <Route path="/admin/customers" element={<ProtectedAdminRoute><AdminCustomersPage /></ProtectedAdminRoute>} />
            <Route path="/admin/content" element={<ProtectedAdminRoute><AdminContentPage /></ProtectedAdminRoute>} />
            <Route path="/admin/navigation" element={<ProtectedAdminRoute><AdminNavigationPage /></ProtectedAdminRoute>} />
            <Route path="/admin/analytics" element={<ProtectedAdminRoute><AdminAnalyticsPage /></ProtectedAdminRoute>} />
            <Route path="/admin/security" element={<ProtectedAdminRoute><AdminSecurityPage /></ProtectedAdminRoute>} />
            <Route path="/admin/settings" element={<ProtectedAdminRoute><AdminSettingsPage /></ProtectedAdminRoute>} />
            {/* Placeholders for other admin pages */}
            <Route path="/admin/:tab" element={<ProtectedAdminRoute><div className="p-12 text-center text-gray-400 font-black uppercase tracking-widest">View Under Construction</div></ProtectedAdminRoute>} />

            {/* Customer Service & Policies */}
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/terms" element={<LegalPage title="Terms & Conditions" content={<TermsContent />} />} />
            <Route path="/returns" element={<LegalPage title="Returns & Refunds" content={<ReturnsContent />} />} />
            <Route path="/privacy" element={<LegalPage title="Privacy Policy" content={<PrivacyContent />} />} />
            <Route path="/cookies" element={<LegalPage title="Cookies Policy" content={<CookiesContent />} />} />

            {/* Fallback */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </AdminProvider>
  );
}
