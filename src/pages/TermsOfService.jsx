import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiFileText, FiCheckCircle, FiShield, FiMail } from 'react-icons/fi';

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Terms of Service | Shavin Heshan Joseph</title>
        <meta name="description" content="Terms of Service for Shavin Heshan Joseph's website, blog, downloads, and software services." />
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
            <FiFileText size={16} /> Website Terms & Agreement
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white uppercase tracking-tight mb-3">
            Terms of Service
          </h1>
          <p className="font-mono text-xs text-slate-500 dark:text-[#8a93a6]">
            Last Updated: August 4, 2026 • Official Publication of Shavin Heshan Joseph
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-sm md:text-base leading-relaxed">
          <section className="bg-white dark:bg-[#12151b] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <FiCheckCircle className="text-[color:var(--theme-main)]" /> 1. Acceptance of Terms
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              By accessing and using <strong className="text-slate-900 dark:text-white">shavinjoseph.me</strong>, you agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, you should immediately cease use of the site.
            </p>
          </section>

          <section className="bg-white dark:bg-[#12151b] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <FiShield className="text-[color:var(--theme-main)]" /> 2. Intellectual Property Rights
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-3">
              All content on this website, including engineering articles, code snippets, graphics, brand assets (KWAS, Flux, Nexa, DevForge), design layouts, and software binaries, is the property of Shavin Heshan Joseph unless otherwise indicated.
            </p>
            <p className="text-slate-600 dark:text-slate-300">
              You are permitted to share links to our articles and reference code snippets for educational or non-commercial purposes, provided clear credit and a link to the original source are maintained.
            </p>
          </section>

          <section className="bg-white dark:bg-[#12151b] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              3. Disclaimer of Warranties & Limitations
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              The technical information, diagnostic guides, and software downloads provided on this site are for informational and educational purposes only. While we strive for absolute accuracy in Windows kernel guides and system administration scripts, all tools and articles are provided "as is" without warranty of any kind.
            </p>
          </section>

          <section className="bg-white dark:bg-[#12151b] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              4. External Links & Advertisements
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Our site may contain links to external third-party websites or serve advertisements powered by Google AdSense. We do not assume responsibility for the content, privacy practices, or availability of third-party websites.
            </p>
          </section>

          <section className="bg-white dark:bg-[#12151b] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <FiMail className="text-[color:var(--theme-main)]" /> 5. Questions & Inquiries
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-2">
              For any questions regarding these Terms of Service, please contact:
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
