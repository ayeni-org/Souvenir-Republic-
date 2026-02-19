import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { useAdmin } from '../AdminContext';

export const BannerSlider: React.FC = () => {
  const { banners } = useAdmin();
  const activeBanners = banners.filter(b => b.active);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % activeBanners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeBanners.length]);

  const next = () => setCurrent((prev) => (prev + 1) % activeBanners.length);
  const prev = () => setCurrent((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);

  if (activeBanners.length === 0) return null;

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 md:px-8 mt-4 overflow-hidden group">
      <div className="relative h-[200px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 bg-black flex items-center"
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <img 
                src={activeBanners[current].image} 
                alt={activeBanners[current].title}
                className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
            </div>

            {/* Content - Temu Style Boldness */}
            <div className="relative z-10 px-8 md:px-16 max-w-2xl text-white">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4 border border-white/30"
              >
                <Zap size={14} className="text-yellow-400 fill-yellow-400" />
                Featured Offer
              </motion.div>
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-6xl font-black leading-tight mb-4 drop-shadow-lg"
              >
                {activeBanners[current].title}
              </motion.h2>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-sm md:text-xl text-white/90 font-medium mb-8"
              >
                {activeBanners[current].subtitle}
              </motion.p>
              <Link 
                to={activeBanners[current].link}
                className="inline-block bg-white text-black px-8 py-3 md:px-10 md:py-4 rounded-full font-black text-sm md:text-base uppercase tracking-wider shadow-xl hover:bg-gold hover:text-white transition-all"
              >
                Shop Now
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        {activeBanners.length > 1 && (
          <>
            <button 
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-black z-20"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-black z-20"
            >
              <ChevronRight size={24} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {activeBanners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`h-1.5 rounded-full transition-all ${current === idx ? 'w-8 bg-white' : 'w-2 bg-white/40'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
