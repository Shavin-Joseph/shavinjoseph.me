import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiRefreshCw, FiCheckCircle, FiShield, FiMail, FiHelpCircle, FiClock, FiAlertCircle } from 'react-icons/fi';

const RefundPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Refund & Return Policy | Shavin Heshan Joseph</title>
        <meta name="description" content="Refund and Return Policy for Shavin Heshan Joseph's website, digital products, software applications, and developer services." />
        <link rel="canonical" href="https://shavinjoseph.me/refund-policy" />
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
            <FiRefreshCw size={16} /> Business Policies & Customer Satisfaction
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white uppercase tracking-tight mb-3">
            Refund & Return Policy
          </h1>
          <p className="font-mono text-xs text-slate-500 dark:text-[#8a93a6]">
            Last Updated: August 14, 2026 • Official Publication of Shavin Heshan Joseph
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-sm md:text-base leading-relaxed">
          <section className="bg-white dark:bg-[#12151b] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <FiCheckCircle className="text-[color:var(--theme-main)]" /> 1. Overview & Commitment
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Thank you for choosing <strong className="text-slate-900 dark:text-white">shavinjoseph.me</strong>. We value your satisfaction and strive to provide you with the best software development services, digital applications, and online experience. If you are not completely satisfied with your purchase or service order, we are here to assist you.
            </p>
          </section>

          <section className="bg-white dark:bg-[#12151b] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <FiClock className="text-[color:var(--theme-main)]" /> 2. Returns & Cancellation Period
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-3">
              We accept cancellation and refund requests within <strong>7 days</strong> from the date of initial purchase or service booking.
            </p>
            <p className="text-slate-600 dark:text-slate-300">
              To be eligible for a return or service cancellation, you must provide proof of purchase or transaction receipt generated via our payment gateway (PayHere / Bank Transfer) along with a valid description of the issue.
            </p>
          </section>

          <section className="bg-white dark:bg-[#12151b] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <FiShield className="text-[color:var(--theme-main)]" /> 3. Refunds & Payment Processing
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-3">
              Once your request is received and reviewed, we will notify you of the approval or rejection status of your refund.
            </p>
            <p className="text-slate-600 dark:text-slate-300">
              If your refund is approved, it will be processed and automatically credited to your original payment method (Visa, MasterCard, LANKAPAY, or direct bank transfer) within <strong>3 to 5 business days</strong>, depending on your card issuer or payment gateway processing timeline.
            </p>
          </section>

          <section className="bg-white dark:bg-[#12151b] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <FiAlertCircle className="text-[color:var(--theme-main)]" /> 4. Non-Returnable & Non-Refundable Items
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-3">
              Certain digital products and custom software solutions are non-returnable and non-refundable once delivered:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300 font-sans">
              <li>Custom-built software applications, websites, or APIs where full source code has already been delivered.</li>
              <li>Downloadable digital assets or license keys after successful activation.</li>
              <li>Completed consultation hours or dedicated development labor hours.</li>
            </ul>
          </section>

          <section className="bg-white dark:bg-[#12151b] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <FiHelpCircle className="text-[color:var(--theme-main)]" /> 5. Defective or Undelivered Digital Services
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              In the event that a digital software delivery fails or experiences technical defects preventing execution, please contact our support team immediately. We will promptly issue a fixed patch update, re-deliver the digital asset, or process a 100% full refund based on your preference.
            </p>
          </section>

          <section className="bg-white dark:bg-[#12151b] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <FiMail className="text-[color:var(--theme-main)]" /> 6. Contact Support for Refunds
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-2">
              If you have any questions or require assistance regarding refunds, cancellations, or billing, please contact our support team:
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

export default RefundPolicy;
