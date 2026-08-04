import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiShield, FiLock, FiCheckCircle, FiMail } from 'react-icons/fi';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Privacy Policy | Shavin Heshan Joseph</title>
        <meta name="description" content="Privacy Policy for Shavin Heshan Joseph's website and services. Learn how user data, cookies, Google AdSense, and analytics are handled securely." />
        <link rel="canonical" href="https://shavinjoseph.me/privacy-policy" />
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
            <FiShield size={16} /> Legal & Privacy Compliance
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white uppercase tracking-tight mb-3">
            Privacy Policy
          </h1>
          <p className="font-mono text-xs text-slate-500 dark:text-[#8a93a6]">
            Last Updated: August 4, 2026 • Official Publication of Shavin Heshan Joseph
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-sm md:text-base leading-relaxed">
          <section className="bg-white dark:bg-[#12151b] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <FiCheckCircle className="text-[color:var(--theme-main)]" /> 1. Overview & Commitment
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Welcome to <strong className="text-slate-900 dark:text-white">shavinjoseph.me</strong> ("Website", "Portfolio"), operated by Shavin Heshan Joseph based in Wattala, Sri Lanka. Your privacy is paramount. This Privacy Policy details how we collect, use, and protect your information when you access our website, technical blog, downloads, and web applications.
            </p>
          </section>

          <section className="bg-white dark:bg-[#12151b] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <FiLock className="text-[color:var(--theme-main)]" /> 2. Google AdSense & Third-Party Advertising
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Google AdSense serves advertisements on this Website. As part of Google's advertising network, third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites on the Internet:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300 font-sans">
              <li>Google's use of advertising cookies enables it and its partners to serve advertisements based on your visit to our Website and/or other sites on the Internet.</li>
              <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[color:var(--theme-main)] underline font-semibold">Google Ads Settings</a>.</li>
              <li>Alternatively, users can opt out of third-party vendor's use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-[color:var(--theme-main)] underline font-semibold">aboutads.info</a>.</li>
            </ul>
          </section>

          <section className="bg-white dark:bg-[#12151b] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              3. Information We Collect & Log Files
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-3">
              Like most standard website servers, we use log files and analytical tools. This includes internet protocol (IP) addresses, browser type, internet service provider (ISP), referring/exit pages, platform type, date/time stamp, and number of clicks to analyze trends, administer the site, and gather broad demographic information for aggregate use.
            </p>
            <p className="text-slate-600 dark:text-slate-300">
              When you submit a message via our Contact form, we collect your name, email address, and message details solely for the purpose of communicating directly with you. We do not sell, rent, or trade user contact lists.
            </p>
          </section>

          <section className="bg-white dark:bg-[#12151b] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              4. Cookies & Web Beacons
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              A cookie is a piece of data stored on the user's computer tied to information about the user. We may use both session ID cookies and persistent cookies to enhance navigation and store preferences (such as Light/Dark theme choices). You can disable cookies at any time through your individual web browser options.
            </p>
          </section>

          <section className="bg-white dark:bg-[#12151b] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              5. Children's Privacy (COPPA Compliance)
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              We prioritize privacy for young users. This Website does not knowingly collect any Personal Identifiable Information from children under the age of 13. If a parent or guardian believes that our site contains such data, please contact us immediately, and we will promptly remove it from our records.
            </p>
          </section>

          <section className="bg-white dark:bg-[#12151b] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <FiMail className="text-[color:var(--theme-main)]" /> 6. Contact Information
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-2">
              If you have any questions or suggestions regarding our Privacy Policy or AdSense disclosures, please reach out to:
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

export default PrivacyPolicy;
