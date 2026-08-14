import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiShield, FiLock, FiCheckCircle, FiMail, FiCreditCard, FiExternalLink } from 'react-icons/fi';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Privacy Policy | Shavin Heshan Joseph</title>
        <meta name="description" content="Official Privacy Policy for Shavin Heshan Joseph's website, online transactions, PayHere payment processing, Google AdSense disclosures, and data protection." />
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
            Last Updated: August 14, 2026 • Official Publication of Shavin Heshan Joseph
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-sm md:text-base leading-relaxed">
          <section className="bg-white dark:bg-[#12151b] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <FiCheckCircle className="text-[color:var(--theme-main)]" /> 1. Overview & Consent
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              At <strong className="text-slate-900 dark:text-white">shavinjoseph.me</strong> ("Website"), operated by Shavin Heshan Joseph in Sri Lanka, we are committed to protecting the privacy and security of our visitors and customers. This Privacy Policy outlines how we collect, use, share, and safeguard your personal information when you access our website, purchase digital products, or order custom software development services. By using our website, you consent to the practices described in this policy.
            </p>
          </section>

          <section className="bg-white dark:bg-[#12151b] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <FiLock className="text-[color:var(--theme-main)]" /> 2. Information We Collect & Log Files
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-3">
              When you visit or make a transaction on our website, we may collect the following information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300 font-sans">
              <li><strong>Personal Identification Information:</strong> Your name, email address, phone number, and billing details provided voluntarily during inquiry, registration, or service checkout.</li>
              <li><strong>Payment & Billing Data:</strong> Payment details necessary to process your transactions (credit/debit card numbers, mobile wallet tokens). All online card transactions are processed securely via PCI-DSS compliant third-party payment gateways (such as <strong>PayHere Payment Gateway</strong>). We do not store or access your full credit card details on our servers.</li>
              <li><strong>Technical Browsing Data:</strong> IP address, browser type, device information, operating system, referring pages, and date/time stamps collected automatically using cookies and analytical logs.</li>
            </ul>
          </section>

          <section className="bg-white dark:bg-[#12151b] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <FiCreditCard className="text-[color:var(--theme-main)]" /> 3. Google AdSense & Advertising Policy Disclosures
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-3">
              This Website serves advertisements powered by Google AdSense and third-party advertising networks. In accordance with Google Publisher Policies, we maintain strict privacy disclosures:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300 font-sans mb-4">
              <li>Third-party vendors, including Google, use cookies, web beacons, and device identifiers to serve ads based on your prior visits to this website or other sites on the Internet.</li>
              <li>Google's use of advertising cookies enables it and its partners to serve personalized ads based on your browsing activity across partner websites.</li>
              <li>You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[color:var(--theme-main)] underline font-semibold">Google Ads Settings</a>.</li>
              <li>Alternatively, you can opt out of third-party vendor cookies for interest-based advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-[color:var(--theme-main)] underline font-semibold">aboutads.info</a> or <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-[color:var(--theme-main)] underline font-semibold">Your Online Choices</a>.</li>
            </ul>
            <p className="text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-200 dark:border-white/10 text-xs md:text-sm">
              <strong>Google Data Usage Transparency:</strong> To learn more about how Google collects and processes data when you visit partner websites, please visit <a href="https://www.google.com/policies/privacy/partners/" target="_blank" rel="noopener noreferrer" className="text-[color:var(--theme-main)] underline font-bold inline-flex items-center gap-1">How Google uses data when you use our partners' sites or apps <FiExternalLink size={12} /></a>.
            </p>
          </section>

          <section className="bg-white dark:bg-[#12151b] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              4. No Personally Identifiable Information (PII) Passed to Ad Networks
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-3">
              We strictly adhere to Google's Identifying Users Policy. We do not pass, share, or transmit any personally identifiable information (such as real names, email addresses, or phone numbers) to Google ad services or third-party ad networks.
            </p>
          </section>

          <section className="bg-white dark:bg-[#12151b] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              5. Children's Privacy (COPPA Compliance)
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-3">
              In compliance with the Children's Online Privacy Protection Act (COPPA), our content, software services, and advertisements are directed at a general technical audience and are not directed at children under 13 years of age.
            </p>
            <p className="text-slate-600 dark:text-slate-300">
              We do not knowingly collect personal data or select interest-based ad targeting for users under the age of 13.
            </p>
          </section>

          <section className="bg-white dark:bg-[#12151b] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <FiMail className="text-[color:var(--theme-main)]" /> 6. Contact Information
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-2">
              If you have any questions or concerns regarding our Privacy Policy or Google Publisher disclosures, please contact us:
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
