import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { motion } from 'motion/react';

interface LegalPageProps {
  title: string;
  content: React.ReactNode;
}

export const LegalPage: React.FC<LegalPageProps> = ({ title, content }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFB]">
      <Header />
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 md:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-12 tracking-tight uppercase text-center">{title}</h1>
          
          <div className="bg-white p-10 md:p-16 rounded-[3rem] border border-gray-100 shadow-sm prose prose-gold max-w-none">
            {content}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

// Content components for different legal pages
export const TermsContent = () => (
  <div className="space-y-8 text-gray-600 font-medium leading-relaxed">
    <section>
      <h2 className="text-2xl font-black text-black uppercase tracking-tight mb-4">1. Introduction</h2>
      <p>Welcome to Souvenir Republic. By accessing our website and purchasing our products, you agree to be bound by the following terms and conditions. Please read them carefully before using our services.</p>
    </section>
    <section>
      <h2 className="text-2xl font-black text-black uppercase tracking-tight mb-4">2. Product Information</h2>
      <p>We strive to provide accurate descriptions and images of our products. However, we do not warrant that product descriptions or other content are error-free. Prices are subject to change without notice.</p>
    </section>
    <section>
      <h2 className="text-2xl font-black text-black uppercase tracking-tight mb-4">3. Ordering & Payment</h2>
      <p>All orders are subject to acceptance and availability. Payment must be made in full at the time of ordering. We accept various payment methods as indicated on our checkout page.</p>
    </section>
    <section>
      <h2 className="text-2xl font-black text-black uppercase tracking-tight mb-4">4. Limitation of Liability</h2>
      <p>Souvenir Republic shall not be liable for any indirect, incidental, or consequential damages arising out of the use of our products or website.</p>
    </section>
  </div>
);

export const PrivacyContent = () => (
  <div className="space-y-8 text-gray-600 font-medium leading-relaxed">
    <section>
      <h2 className="text-2xl font-black text-black uppercase tracking-tight mb-4">Data Collection</h2>
      <p>We collect personal information that you provide to us, such as your name, email address, and shipping details, to process your orders and improve your shopping experience.</p>
    </section>
    <section>
      <h2 className="text-2xl font-black text-black uppercase tracking-tight mb-4">How We Use Your Information</h2>
      <p>Your information is used to fulfill orders, communicate with you about your purchases, and send you promotional offers if you have opted in to our newsletter.</p>
    </section>
    <section>
      <h2 className="text-2xl font-black text-black uppercase tracking-tight mb-4">Data Security</h2>
      <p>We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or alteration.</p>
    </section>
  </div>
);

export const ReturnsContent = () => (
  <div className="space-y-8 text-gray-600 font-medium leading-relaxed">
    <section>
      <h2 className="text-2xl font-black text-black uppercase tracking-tight mb-4">Return Policy</h2>
      <p>We offer a 7-day easy return policy. If you are not satisfied with your purchase, you can return the item in its original condition and packaging within 7 days of delivery.</p>
    </section>
    <section>
      <h2 className="text-2xl font-black text-black uppercase tracking-tight mb-4">Refund Process</h2>
      <p>Once we receive and inspect your return, we will notify you of the approval or rejection of your refund. Approved refunds will be processed within 5-10 business days.</p>
    </section>
    <section>
      <h2 className="text-2xl font-black text-black uppercase tracking-tight mb-4">Exchanges</h2>
      <p>We only replace items if they are defective or damaged. If you need to exchange it for the same item, please contact our support team.</p>
    </section>
  </div>
);

export const CookiesContent = () => (
  <div className="space-y-8 text-gray-600 font-medium leading-relaxed">
    <section>
      <h2 className="text-2xl font-black text-black uppercase tracking-tight mb-4">What are Cookies?</h2>
      <p>Cookies are small text files stored on your device that help us improve website functionality and provide a personalized shopping experience.</p>
    </section>
    <section>
      <h2 className="text-2xl font-black text-black uppercase tracking-tight mb-4">Types of Cookies We Use</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Essential Cookies:</strong> Necessary for the website to function properly.</li>
        <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our site.</li>
        <li><strong>Targeting Cookies:</strong> Used to deliver relevant advertisements to you.</li>
      </ul>
    </section>
  </div>
);
