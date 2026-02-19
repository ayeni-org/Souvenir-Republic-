import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Send, MessageSquare, Clock, Globe } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent! We will get back to you shortly.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFB]">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-12">
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-black text-gold uppercase tracking-[0.3em] mb-4"
          >
            Get In Touch
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight uppercase mb-6"
          >
            Contact Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 font-medium max-w-2xl mx-auto text-lg"
          >
            Have a question or need assistance? Our team at Souvenir Republic is here to help you find the perfect treasures for your home.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-gold/10 text-gold rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gold group-hover:text-white transition-all">
                <Phone size={24} />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2 uppercase tracking-tight">Call Us</h3>
              <p className="text-gray-500 font-medium mb-4">Available Mon-Sat, 9am - 6pm</p>
              <a href="tel:08113248705" className="text-lg font-black text-black hover:text-gold transition-colors">08113248705</a>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-gold/10 text-gold rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gold group-hover:text-white transition-all">
                <Mail size={24} />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2 uppercase tracking-tight">Email Us</h3>
              <p className="text-gray-500 font-medium mb-4">We'll respond within 24 hours</p>
              <a href="mailto:salamabass37@yahoo.com" className="text-lg font-black text-black hover:text-gold transition-colors break-all">salamabass37@yahoo.com</a>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-gold/10 text-gold rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gold group-hover:text-white transition-all">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2 uppercase tracking-tight">Visit Us</h3>
              <p className="text-gray-500 font-medium mb-4">Heritage Mall, Dugbe Ibadan</p>
              <p className="text-lg font-black text-black">Old Cash and Carry Section</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-gray-100 shadow-2xl">
              <h2 className="text-3xl font-black text-gray-900 mb-8 uppercase tracking-tight">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Full Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-gold rounded-2xl py-4 px-6 font-bold focus:outline-none transition-all"
                      placeholder="John Doe"
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Email Address</label>
                    <input 
                      type="email" 
                      required
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-gold rounded-2xl py-4 px-6 font-bold focus:outline-none transition-all"
                      placeholder="john@example.com"
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Subject</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-gold rounded-2xl py-4 px-6 font-bold focus:outline-none transition-all"
                    placeholder="How can we help?"
                    value={formState.subject}
                    onChange={(e) => setFormState({...formState, subject: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Message</label>
                  <textarea 
                    required
                    rows={5}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-gold rounded-3xl py-4 px-6 font-bold focus:outline-none transition-all resize-none"
                    placeholder="Tell us more about your inquiry..."
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                  ></textarea>
                </div>
                <button type="submit" className="w-full bg-black text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-gold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-black/10">
                  <Send size={20} />
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Preview */}
        <div className="bg-gold/5 rounded-[3rem] p-12 border border-gold/10 text-center">
          <h2 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tight">Common Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <h4 className="font-black text-gray-900">Delivery Times?</h4>
              <p className="text-sm text-gray-500 font-medium">Standard delivery takes 1-3 business days within Ibadan and 3-7 days nationwide.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-black text-gray-900">Return Policy?</h4>
              <p className="text-sm text-gray-500 font-medium">We offer a 7-day easy return policy for unused items in their original packaging.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-black text-gray-900">Payment Methods?</h4>
              <p className="text-sm text-gray-500 font-medium">We accept all major cards, bank transfers, and secure online payments.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
