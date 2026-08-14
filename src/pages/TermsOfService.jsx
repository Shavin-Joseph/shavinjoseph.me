import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiFileText, FiCheckCircle, FiShield, FiMail, FiShoppingBag, FiTruck } from 'react-icons/fi';

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Terms & Conditions | Shavin Heshan Joseph</title>
        <meta name="description" content="Official Business Terms & Conditions for Shavin Heshan Joseph's website, online software services, transactions, and digital product delivery." />
        <link rel="canonical" href="https://shavinjoseph.me/terms-of-service" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <motion.main 
        initial={{ opacity: 0, y: 15 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full min-h-screen pt-28 pb-24 px-5 md:px-8 max-w-[900px] mx-auto text-slate-800 dark:text-slate-200"
      >
        {/* Header */}
        <div className="mb-10 pb-6 border-b border-slate-200 dark:border-white/10">
          <div className="font-mono text-xs text-[color:var(--theme-main)] uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
            <FiFileText size={16} /> Business Terms & Merchant Agreement
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white uppercase tracking-tight mb-3">
            Terms & Conditions
          </h1>
          <p className="font-mono text-xs text-slate-500 dark:text-[#8a93a6]">
            Last Updated: August 14, 2026 • Official Publication of Shavin Heshan Joseph
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-sm md:text-base leading-relaxed">
          <section className="bg-white dark:bg-[#12151b] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <FiCheckCircle className="text-[color:var(--theme-main)]" /> 1. Acceptance of Terms
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Welcome to <strong className="text-slate-900 dark:text-white">shavinjoseph.me</strong>, operated by Shavin Heshan Joseph in Sri Lanka. These Terms & Conditions govern your use of our website, software tools, digital downloads, and custom software development services. By accessing our platform or purchasing products/services, you agree to comply with these terms.
            </p>
          </section>

          <section className="bg-white dark:bg-[#12151b] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <FiShoppingBag className="text-[color:var(--theme-main)]" /> 2. Products, Pricing & Orders
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-3">
              We provide software applications, web development solutions, technical consulting, and digital products:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300 font-sans">
              <li><strong>Pricing:</strong> All prices listed on the website or quoted in service proposals are stated in LKR (Sri Lankan Rupees) or USD unless specified otherwise. Prices are subject to change prior to order confirmation.</li>
              <li><strong>Order Acceptance:</strong> Placing an order or invoice payment constitutes an offer to purchase. We reserve the right to accept or cancel orders due to product availability, pricing errors, or suspected unauthorized payment activity.</li>
            </ul>
          </section>

          <section className="bg-white dark:bg-[#12151b] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <FiShield className="text-[color:var(--theme-main)]" /> 3. Payment Processing via PayHere
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-3">
              Online payments on our website are processed securely using trusted PCI-DSS compliant third-party payment gateways, including <strong>PayHere Payment Gateway (PayHere Private Limited)</strong> and licensed partner bank acquiring networks in Sri Lanka.
            </p>
            <p className="text-slate-600 dark:text-slate-300">
              You agree to provide valid, accurate payment details and authorize us and our payment gateway to charge the total agreed order amount to your selected payment method.
            </p>
          </section>

          <section className="bg-white dark:bg-[#12151b] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <FiTruck className="text-[color:var(--theme-main)]" /> 4. Shipping & Digital Delivery Policy
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-3">
              Because our products and services consist of digital software applications, source code, and web solutions:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300 font-sans">
              <li><strong>Delivery Method:</strong> Delivery occurs electronically via email transmission, secure cloud download link, or direct deployment to client servers.</li>
              <li><strong>Delivery Timeline:</strong> Digital licenses and software downloads are delivered within <strong>24 to 48 hours</strong> following successful payment confirmation. Custom software project timelines are executed according to the agreed project milestone schedule.</li>
            </ul>
          </section>

          <section className="bg-white dark:bg-[#12151b] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              5. Returns & Refunds
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              All transactions, cancellations, and returns are governed by our official <a href="/refund-policy" className="text-[color:var(--theme-main)] underline font-semibold">Refund & Return Policy</a>. Eligible refunds will be credited back to your original payment method within 3 to 5 business days.
            </p>
          </section>

          <section className="bg-white dark:bg-[#12151b] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              6. Intellectual Property & Governing Law
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-3">
              All contents, code, designs, logos, and materials on this site belong to Shavin Heshan Joseph or licensors and are protected by intellectual property laws.
            </p>
            <p className="text-slate-600 dark:text-slate-300">
              These Terms & Conditions are governed by and construed in accordance with the laws of the Democratic Socialist Republic of Sri Lanka.
            </p>
          </section>

          <section className="bg-white dark:bg-[#12151b] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <FiMail className="text-[color:var(--theme-main)]" /> 7. Contact Us
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-2">
              If you have any questions regarding our Business Terms & Conditions, please contact us:
            </p>
            <p className="font-mono text-xs text-slate-800 dark:text-white font-bold">
              Email: <a href="mailto:josephshavin3@gmail.com" className="text-[color:var(--theme-main)] underline">josephshavin3@gmail.com</a>
            </p>
          </section>
        </div>
      </motion.main>
    </>
  );
};

export default TermsOfService;
