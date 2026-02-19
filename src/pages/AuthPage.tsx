import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, Lock, User, ArrowRight, Facebook, 
  Github, Chrome, ChevronLeft, ShieldCheck 
} from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useAuth } from '../AuthContext';

export const AuthPage: React.FC = () => {
  const { user, isAuthenticated, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine initial state based on path
  const [isSignIn, setIsSignIn] = useState(location.pathname === '/account');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/account');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    setIsSignIn(location.pathname === '/account');
  }, [location.pathname]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isSignIn) {
        await signIn(formData.email, formData.password);
      } else {
        await signUp(formData.name, formData.email, formData.password);
      }
    } catch (error) {
      alert('Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignIn(!isSignIn);
    // Update URL without full navigation if possible, or just use state
    // For this implementation, we'll just use state for the animation
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFB]">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-4 md:p-8 py-20 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-gold/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-black/5 rounded-full blur-3xl animate-pulse delay-700" />
        
        <div className="w-full max-w-5xl bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 flex flex-col md:flex-row relative min-h-[650px]">
          
          {/* Form Side */}
          <div className={`w-full md:w-3/5 p-8 md:p-16 flex flex-col justify-center transition-all duration-700 ease-in-out ${isSignIn ? 'md:order-1' : 'md:order-2'}`}>
            {/* Logo */}
            <div className="absolute top-8 left-8 flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-black text-sm">SR</div>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Souvenir Republic</span>
            </div>

            <div className="mb-10 text-center">
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 uppercase tracking-tight">
                {isSignIn ? 'Sign in to Republic' : 'Create Account'}
              </h1>
              
              {/* Social Icons */}
              <div className="flex justify-center gap-4 mt-6">
                {[Facebook, Chrome, Github].map((Icon, i) => (
                  <button key={i} className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold hover:shadow-lg transition-all group">
                    <Icon size={20} className="group-hover:scale-110 transition-transform" />
                  </button>
                ))}
              </div>
              
              <p className="text-gray-300 text-[10px] font-black uppercase tracking-[0.2em] mt-8">
                {isSignIn ? 'or use your email account:' : 'or use your email for registration:'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 max-w-sm mx-auto w-full">
              <AnimatePresence mode="wait">
                {!isSignIn && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    <div className="relative">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                      <input 
                        type="text" 
                        required={!isSignIn}
                        className="w-full bg-gray-50 border-2 border-transparent focus:border-gold rounded-2xl py-4 px-6 pl-14 font-bold focus:outline-none transition-all"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input 
                    type="email" 
                    required
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-gold rounded-2xl py-4 px-6 pl-14 font-bold focus:outline-none transition-all"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input 
                    type="password" 
                    required
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-gold rounded-2xl py-4 px-6 pl-14 font-bold focus:outline-none transition-all"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>

              {isSignIn && (
                <div className="text-center">
                  <button type="button" className="text-xs font-bold text-gray-400 hover:text-gold transition-colors border-b border-transparent hover:border-gold pb-0.5">
                    Forgot your password?
                  </button>
                </div>
              )}

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-gold text-white py-5 rounded-full font-black flex items-center justify-center gap-3 hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-gold/20 disabled:opacity-50 mt-8"
              >
                {isLoading ? 'PROCESSING...' : (isSignIn ? 'SIGN IN' : 'SIGN UP')}
              </button>
            </form>
          </div>

          {/* Overlay Side */}
          <div className={`w-full md:w-2/5 bg-gold text-white p-12 md:p-16 flex flex-col items-center justify-center text-center relative overflow-hidden transition-all duration-700 ease-in-out ${isSignIn ? 'md:order-2' : 'md:order-1'}`}>
            {/* Decorative Shapes */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 -translate-y-1/2 translate-x-1/2 rotate-45" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 translate-y-1/2 -translate-x-1/2 rounded-full" />
            
            <div className="relative z-10 max-w-xs">
              <h2 className="text-4xl font-black mb-6 leading-tight tracking-tight uppercase">
                {isSignIn ? 'Hello, Friend!' : 'Welcome Back!'}
              </h2>
              <p className="text-white/80 text-sm font-medium leading-relaxed mb-10">
                {isSignIn 
                  ? 'Enter your personal details and start journey with us' 
                  : 'To keep connected with us please login with your personal info'}
              </p>
              <button 
                onClick={toggleMode}
                className="w-full border-2 border-white text-white py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white hover:text-gold transition-all"
              >
                {isSignIn ? 'SIGN UP' : 'SIGN IN'}
              </button>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};
