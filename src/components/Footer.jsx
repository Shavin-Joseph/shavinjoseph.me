import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowUpRight, FiTerminal } from 'react-icons/fi';

// 1. AUTOMATICALLY IMPORT YOUR REAL BLOG DATA
import { HARDCODED_ARTICLES } from '../pages/Blog';

const Footer = ({ isDarkMode }) => {
  const [newestLogs, setNewestLogs] = useState([]);

  useEffect(() => {
    if (HARDCODED_ARTICLES) {
      const sortedArticles = [...HARDCODED_ARTICLES]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);
      setNewestLogs(sortedArticles);
    }
  }, []);

  const marqueeItems = [...newestLogs, ...newestLogs, ...newestLogs];

  return (
    <footer className={`relative w-full border-t z-50 transition-colors duration-400 ${
      isDarkMode ? "bg-[#0a0c10] border-white/10 text-white" : "bg-white border-slate-200 text-slate-900 shadow-inner"
    }`}>
      
      {/* --- TOP: ANIMATED BLOG MARQUEE & READ MORE BUTTON --- */}
      <div className={`flex items-stretch w-full border-b ${
        isDarkMode ? "border-white/10 bg-[#12151b]" : "border-slate-200 bg-slate-50"
      }`}>
        
        {/* Scrolling Marquee */}
        <div className="flex-1 overflow-hidden relative group py-2 md:py-3">
          <div className={`absolute left-0 top-0 bottom-0 w-8 md:w-24 z-10 pointer-events-none ${
            isDarkMode ? "bg-gradient-to-r from-[#12151b] to-transparent" : "bg-gradient-to-r from-slate-50 to-transparent"
          }`} />
          <div className={`absolute right-0 top-0 bottom-0 w-8 md:w-24 z-10 pointer-events-none ${
            isDarkMode ? "bg-gradient-to-l from-[#12151b] to-transparent" : "bg-gradient-to-l from-slate-50 to-transparent"
          }`} />

          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 80 }} 
            className={`flex whitespace-nowrap items-center font-mono text-[10px] md:text-xs uppercase tracking-widest ${
              isDarkMode ? "text-[#8a93a6]" : "text-slate-600"
            }`}
          >
            {marqueeItems.map((article, index) => (
              <React.Fragment key={index}>
                <Link 
                  to={`/blog/${article.id}`} 
                  className="mx-3 md:mx-8 flex items-center gap-2 hover:text-[color:var(--theme-main)] transition-colors duration-300 font-semibold"
                >
                  {article.title}
                </Link>
                <span className={isDarkMode ? "text-white/20" : "text-slate-300"}>///</span>
              </React.Fragment>
            ))}
          </motion.div>
        </div>

        {/* Read More Button */}
        <Link 
          to="/blog" 
          className={`flex items-center gap-1.5 md:gap-2 px-4 md:px-8 border-l transition-colors font-mono text-[9px] md:text-xs uppercase tracking-widest text-[color:var(--theme-main)] font-bold shrink-0 z-20 ${
            isDarkMode ? "bg-[#0a0c10] border-white/10 hover:bg-white/[0.03]" : "bg-white border-slate-200 hover:bg-slate-100"
          }`}
        >
          <span className="hidden sm:inline">Read All Logs</span>
          <span className="sm:hidden">Logs</span>
          <FiArrowUpRight size={12} className="md:w-[14px] md:h-[14px]" />
        </Link>
      </div>

      {/* --- MIDDLE: MAIN FOOTER CONTENT --- */}
      <div className="max-w-[1280px] mx-auto px-5 md:px-12 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-8">
        
        {/* Column 1: Brand & SEO Text */}
        <div className="lg:col-span-2 flex flex-col items-start">
          <Link to="/" className={`text-lg md:text-2xl font-bold uppercase tracking-tighter flex items-center gap-2 mb-3 md:mb-4 hover:text-[color:var(--theme-main)] transition-colors ${
            isDarkMode ? "text-white" : "text-slate-900"
          }`}>
            <FiTerminal className="text-[color:var(--theme-main)] w-4 h-4 md:w-5 md:h-5" /> Shavin Joseph
          </Link>
          <p className={`text-[11px] md:text-sm leading-relaxed max-w-md mb-4 md:mb-6 ${
            isDarkMode ? "text-[#8a93a6]" : "text-slate-600"
          }`}>
            A professional website developer and Android app developer based in Wattala, Sri Lanka. Architecting scalable full-stack applications, configuring network infrastructure, and deploying intelligent AI solutions.
          </p>
          <div className={`font-mono text-[8.5px] md:text-[10px] tracking-widest uppercase px-2.5 py-1 md:px-3 md:py-1.5 rounded-full border ${
            isDarkMode ? "border-white/10 bg-white/5 text-[#5b6472]" : "border-slate-300 bg-slate-100 text-slate-600"
          }`}>
            System Status: Online
          </div>
        </div>

        {/* Column 2 & 3: Links */}
        <div className="grid grid-cols-2 gap-4 lg:col-span-2 w-full">
          
          <nav aria-label="Footer Navigation" className="flex flex-col gap-2.5 md:gap-3">
            <h4 className={`font-mono text-[9px] md:text-[10px] uppercase tracking-widest mb-0.5 md:mb-2 ${
              isDarkMode ? "text-white" : "text-slate-900 font-bold"
            }`}>Directories</h4>
            <Link to="/" className={`text-[11px] md:text-sm hover:text-[color:var(--theme-main)] transition-colors w-max ${isDarkMode ? "text-[#8a93a6]" : "text-slate-600"}`}>System Root</Link>
            <Link to="/work" className={`text-[11px] md:text-sm hover:text-[color:var(--theme-main)] transition-colors w-max ${isDarkMode ? "text-[#8a93a6]" : "text-slate-600"}`}>Builds</Link>
            <Link to="/blog" className={`text-[11px] md:text-sm hover:text-[color:var(--theme-main)] transition-colors w-max ${isDarkMode ? "text-[#8a93a6]" : "text-slate-600"}`}>Logs</Link>
            <Link to="/downloads" className={`text-[11px] md:text-sm hover:text-[color:var(--theme-main)] transition-colors w-max ${isDarkMode ? "text-[#8a93a6]" : "text-slate-600"}`}>KWAS Repo</Link>
            <Link to="/privacy-policy" className={`text-[11px] md:text-sm hover:text-[color:var(--theme-main)] transition-colors w-max ${isDarkMode ? "text-[#8a93a6]" : "text-slate-600"}`}>Privacy Policy</Link>
            <Link to="/terms-of-service" className={`text-[11px] md:text-sm hover:text-[color:var(--theme-main)] transition-colors w-max ${isDarkMode ? "text-[#8a93a6]" : "text-slate-600"}`}>Terms of Service</Link>
          </nav>

          <div className="flex flex-col gap-2.5 md:gap-3">
            <h4 className={`font-mono text-[9px] md:text-[10px] uppercase tracking-widest mb-0.5 md:mb-2 ${
              isDarkMode ? "text-white" : "text-slate-900 font-bold"
            }`}>Network</h4>
            <a href="https://www.linkedin.com/in/shavin-joseph-5193a73b5" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-1.5 md:gap-2 text-[11px] md:text-sm hover:text-[color:var(--theme-main)] transition-colors w-max ${isDarkMode ? "text-[#8a93a6]" : "text-slate-600"}`}>
              <FiLinkedin className="w-3.5 h-3.5 md:w-4 md:h-4" /> LinkedIn
            </a>
            <a href="https://github.com/Shavin-Joseph" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-1.5 md:gap-2 text-[11px] md:text-sm hover:text-[color:var(--theme-main)] transition-colors w-max ${isDarkMode ? "text-[#8a93a6]" : "text-slate-600"}`}>
              <FiGithub className="w-3.5 h-3.5 md:w-4 md:h-4" /> GitHub
            </a>
            <a href="mailto:josephshavin3@gmail.com" className={`flex items-center gap-1.5 md:gap-2 text-[11px] md:text-sm hover:text-[color:var(--theme-main)] transition-colors w-max mt-1 md:mt-2 ${isDarkMode ? "text-[#8a93a6]" : "text-slate-600"}`}>
              <FiMail className="w-3.5 h-3.5 md:w-4 md:h-4 text-[color:var(--theme-main)]" /> Comm Link
            </a>
          </div>

        </div>

      </div>

      {/* --- BOTTOM: COPYRIGHT & LEGAL --- */}
      <div className={`border-t ${isDarkMode ? "border-white/5" : "border-slate-200"}`}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-12 py-3 md:py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className={`font-mono text-[8px] md:text-[10px] uppercase tracking-widest text-center ${
            isDarkMode ? "text-[#5b6472]" : "text-slate-500"
          }`}>
            &copy; 2026 Shavin Heshan Joseph. All Rights Reserved.
          </p>

          <div className="flex items-center gap-4 font-mono text-[8px] md:text-[10px] uppercase tracking-wider">
            <Link to="/privacy-policy" className={`hover:text-[color:var(--theme-main)] transition-colors ${isDarkMode ? "text-[#8a93a6]" : "text-slate-600"}`}>
              Privacy Policy
            </Link>
            <span className={isDarkMode ? "text-white/20" : "text-slate-300"}>•</span>
            <Link to="/terms-of-service" className={`hover:text-[color:var(--theme-main)] transition-colors ${isDarkMode ? "text-[#8a93a6]" : "text-slate-600"}`}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;