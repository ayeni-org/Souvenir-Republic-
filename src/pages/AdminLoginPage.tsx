import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Mail, ShieldCheck, ArrowRight, Smartphone } from 'lucide-react';
import { useAdmin } from '../AdminContext';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [step, setStep] = useState<'login' | 'mfa'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const { adminSignIn } = useAdmin();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate initial login check
    setTimeout(() => {
      if (email === 'admin@souvenirrepublic.com' && password === 'admin123') {
        setStep('mfa');
      } else {
        alert('Invalid credentials');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleMfaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Simulate MFA verification
      if (mfaCode === '123456') {
        await adminSignIn(email, password);
        navigate('/admin');
      } else {
        alert('Invalid MFA code. Try 123456');
      }
    } catch (error) {
      alert('Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#141414] flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gold/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gold/5 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden relative z-10"
      >
        <div className="p-10 md:p-12">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-white font-black text-2xl mx-auto mb-6 shadow-xl shadow-black/20">SR</div>
            <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Admin Portal</h1>
            <p className="text-gray-400 text-sm font-medium mt-2">Secure access for Souvenir Republic administrators</p>
          </div>

          <AnimatePresence mode="wait">
            {step === 'login' ? (
              <motion.form 
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleLoginSubmit} 
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Admin Email</label>
                  <div className="relative">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                    <input 
                      type="email" 
                      required
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-gold rounded-2xl py-4 px-6 pl-14 font-bold focus:outline-none transition-all"
                      placeholder="admin@souvenirrepublic.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                    <input 
                      type="password" 
                      required
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-gold rounded-2xl py-4 px-6 pl-14 font-bold focus:outline-none transition-all"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-black text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-gold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-black/10 disabled:opacity-50"
                >
                  {isLoading ? 'VERIFYING...' : 'CONTINUE'}
                  <ArrowRight size={20} />
                </button>
              </motion.form>
            ) : (
              <motion.form 
                key="mfa"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleMfaSubmit} 
                className="space-y-6"
              >
                <div className="bg-gold/10 p-6 rounded-3xl border border-gold/20 mb-8 flex items-center gap-4">
                  <div className="w-12 h-12 bg-gold rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <Smartphone size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">Two-Factor Auth</h3>
                    <p className="text-xs text-gray-500 font-medium">Enter the 6-digit code from your app</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Verification Code</label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                    <input 
                      type="text" 
                      required
                      maxLength={6}
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-gold rounded-2xl py-4 px-6 pl-14 font-black text-2xl tracking-[0.5em] focus:outline-none transition-all text-center"
                      placeholder="000000"
                      value={mfaCode}
                      onChange={(e) => setMfaCode(e.target.value)}
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-black text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-gold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-black/10 disabled:opacity-50"
                >
                  {isLoading ? 'AUTHENTICATING...' : 'VERIFY & LOGIN'}
                </button>
                
                <button 
                  type="button"
                  onClick={() => setStep('login')}
                  className="w-full text-xs font-black text-gray-400 uppercase tracking-widest hover:text-gold transition-colors"
                >
                  Back to Login
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
        
        <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
          <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Authorized Personnel Only</p>
        </div>
      </motion.div>
    </div>
  );
};
