import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';

// Import Pages
import Home from './pages/Home';
import About from './pages/About';
import Work from './pages/Work';
import Downloads from './pages/Downloads';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

// --- IMPORT THE FOOTER HERE ---
import Footer from './components/Footer';

// --- THEME ENGINE ---
const THEMES = {
  red: { main: '#ff5f56', rgb: '255, 95, 86' },
  yellow: { main: '#ffbd2e', rgb: '255, 189, 46' },
  green: { main: '#10b981', rgb: '16, 185, 129' } // Default Green Accent
};

// --- GLOBAL KINETIC CURSOR ---
const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, .magnetic, .hover-trigger')) setIsHovered(true);
      else setIsHovered(false);
    };
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div 
        className="pointer-events-none fixed left-0 top-0 z-[10000] h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full hidden md:block transition-colors duration-500" 
        style={{ x: cursorX, y: cursorY, backgroundColor: "var(--theme-main)", boxShadow: "0 0 8px var(--theme-main)" }} 
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border hidden md:block transition-colors duration-500"
        animate={{ 
          width: isHovered ? 64 : 34, 
          height: isHovered ? 64 : 34, 
          borderColor: isHovered ? "var(--theme-main)" : 'rgba(15, 23, 42, 0.2)', 
          backgroundColor: isHovered ? 'rgba(var(--theme-rgb), 0.12)' : 'transparent' 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ x: cursorXSpring, y: cursorYSpring }}
      />
    </>
  );
};

// --- MAGNETIC BUTTON WRAPPER ---
const Magnetic = ({ children }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouse = (e) => {
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    x.set((e.clientX - left - width / 2) * 0.25);
    y.set((e.clientY - top - height / 2) * 0.35);
  };

  return (
    <motion.div ref={ref} onMouseMove={handleMouse} onMouseLeave={() => { x.set(0); y.set(0); }} style={{ x: springX, y: springY }} className="inline-block magnetic hover-trigger">
      {children}
    </motion.div>
  );
};

// --- GLOBAL ANIMATED LOGO ---
const GlobalLogo = ({ isDarkMode }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-6 lg:left-8 z-50 hidden md:block"
    >
      <Magnetic>
        <Link 
          to="/" 
          className={`flex items-center gap-1 group hover-trigger px-4 py-2 rounded-2xl backdrop-blur-[14px] border shadow-lg relative overflow-hidden transition-all duration-500 hover:border-[color:var(--theme-main)]/40 ${
            isDarkMode 
              ? "bg-[#0a0c10]/80 border-white/10 text-white" 
              : "bg-white/90 border-slate-200 text-slate-900 shadow-slate-200/50"
          }`}
        >
          <motion.div 
            animate={{ x: ['-200%', '300%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
            className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-[color:var(--theme-main)]/10 to-transparent skew-x-12 z-0"
          />
          <motion.div 
            animate={{ opacity: [1, 0.3, 1], scale: [1, 1.2, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-[var(--theme-main)] mr-2 relative z-10 shadow-[0_0_8px_var(--theme-main)]"
          />
          <div className="relative z-10 flex items-baseline">
            <span className={`font-sans font-black text-xl tracking-tighter ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              SJ
            </span>
            <motion.span 
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="font-mono font-bold text-lg tracking-tight text-[color:var(--theme-main)]"
            >
              .me
            </motion.span>
          </div>
        </Link>
      </Magnetic>
    </motion.div>
  );
};

// --- RESPONSIVE NAVIGATION BAR ---
const NavBar = ({ setTheme, isDarkMode, toggleDarkMode }) => {
  const location = useLocation();
  const path = location.pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [path]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Work', path: '/work' },
    { name: 'Downloads', path: '/downloads' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 md:gap-3 p-1.5 md:p-2 backdrop-blur-[16px] border rounded-full shadow-xl w-max transition-colors duration-300 ${
          isDarkMode
            ? "bg-[#0a0c10]/85 border-white/10 text-white shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]"
            : "bg-white/90 border-slate-300/80 text-slate-800 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.15)]"
        }`}
      >
        {/* Color Theme Dots + Dark/Light Mode Toggle */}
        <div className="flex items-center gap-1.5 pl-2 md:pl-3 flex-shrink-0">
          <button onClick={() => setTheme('red')} className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-[#ff5f56] hover:scale-125 transition-transform hover-trigger border border-black/20 shadow-inner" aria-label="Red Theme" />
          <button onClick={() => setTheme('yellow')} className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-[#ffbd2e] hover:scale-125 transition-transform hover-trigger border border-black/20 shadow-inner" aria-label="Yellow Theme" />
          <button onClick={() => setTheme('green')} className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-[#10b981] hover:scale-125 transition-transform hover-trigger border border-black/20 shadow-inner" aria-label="Green Theme" />
          
          {/* TOP NAVBAR DARK / LIGHT THEME TOGGLE BUTTON */}
          <button
            onClick={toggleDarkMode}
            className={`ml-1.5 p-1.5 rounded-full transition-all duration-300 flex items-center justify-center ${
              isDarkMode 
                ? "bg-white/10 text-amber-400 hover:bg-white/20" 
                : "bg-slate-100 text-amber-600 hover:bg-slate-200 border border-slate-200"
            }`}
            title={isDarkMode ? "Switch to Light Theme (Default)" : "Switch to Dark Theme"}
          >
            {isDarkMode ? <FiSun size={13} className="text-amber-400" /> : <FiMoon size={13} className="text-amber-600" />}
          </button>

          <div className={`w-[1px] h-5 ml-1 hidden md:block ${isDarkMode ? "bg-white/10" : "bg-slate-300"}`} />
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-1 md:gap-1.5 mr-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`whitespace-nowrap px-3 md:px-4 py-2 rounded-full font-mono text-[10px] md:text-[11px] tracking-[0.1em] uppercase transition-all duration-300 hover-trigger ${
                path === link.path 
                  ? isDarkMode
                    ? 'bg-white/[0.08] text-[color:var(--theme-main)] font-bold'
                    : 'bg-slate-100 text-[color:var(--theme-main)] font-bold shadow-sm'
                  : isDarkMode
                    ? 'text-[#8a93a6] hover:text-white hover:bg-white/[0.04]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Action Button */}
        <div className="hidden md:block">
          <Magnetic>
            <Link 
              to="/contact"
              className="block whitespace-nowrap px-5 md:px-6 py-2 md:py-2.5 bg-[var(--theme-main)] text-white font-mono text-[10px] md:text-[11px] tracking-[0.1em] uppercase font-bold rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex-shrink-0"
            >
              Let's Talk
            </Link>
          </Magnetic>
        </div>

        {/* Mobile Hamburger */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`flex md:hidden items-center justify-center w-10 h-10 mr-1 rounded-full cursor-pointer transition-colors ${
            isDarkMode ? "bg-white/[0.05] border border-white/10 text-white" : "bg-slate-100 border border-slate-300 text-slate-900"
          }`}
        >
          <div className="relative w-4 h-3 flex flex-col justify-between items-center pointer-events-none">
            <motion.span animate={isMobileMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }} className={`w-full h-[1.5px] rounded-full origin-center transition-transform ${isDarkMode ? "bg-white" : "bg-slate-900"}`} />
            <motion.span animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }} className={`w-full h-[1.5px] rounded-full transition-opacity ${isDarkMode ? "bg-white" : "bg-slate-900"}`} />
            <motion.span animate={isMobileMenuOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }} className={`w-full h-[1.5px] rounded-full origin-center transition-transform ${isDarkMode ? "bg-white" : "bg-slate-900"}`} />
          </div>
        </button>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed inset-0 z-[90] md:hidden flex flex-col items-center justify-center px-6 backdrop-blur-2xl ${
              isDarkMode ? "bg-[#0a0c10]/95 text-white" : "bg-white/95 text-slate-900"
            }`}
          >
            <div className="flex flex-col items-center w-full max-w-sm gap-2">
              {navLinks.map((link, i) => (
                <motion.div 
                  key={link.name} 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: i * 0.05 + 0.1, duration: 0.4 }}
                  className="w-full"
                >
                  <Link 
                    to={link.path} 
                    className={`block text-center py-4 text-lg font-mono tracking-[0.15em] uppercase border-b ${
                      path === link.path ? 'text-[color:var(--theme-main)] font-bold' : isDarkMode ? 'text-[#8a93a6] border-white/5' : 'text-slate-600 border-slate-200'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.4, duration: 0.4 }}
                className="w-full mt-8"
              >
                <Link 
                  to="/contact" 
                  className="flex items-center justify-center w-full py-4 bg-[var(--theme-main)] text-white font-mono text-sm tracking-[0.1em] uppercase font-bold rounded-2xl shadow-lg"
                >
                  Let's Talk
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- MAIN APP COMPONENT ---
const App = () => {
  const location = useLocation();
  const [activeTheme, setActiveTheme] = useState('green');
  const [isDarkMode, setIsDarkMode] = useState(false); // DEFAULT LIGHT THEME!

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--theme-main', THEMES[activeTheme].main);
    root.style.setProperty('--theme-rgb', THEMES[activeTheme].rgb);
  }, [activeTheme]);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  return (
    <div className={`font-sans selection:bg-[var(--theme-main)] selection:text-white min-h-screen relative overflow-x-hidden transition-colors duration-500 flex flex-col ${
      isDarkMode ? "bg-[#090b0f] text-[#eef1f6]" : "bg-[#f8fafc] text-slate-900"
    }`}>
      <CustomCursor />
      
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-30 w-full h-full" 
        style={{ 
          backgroundImage: isDarkMode 
            ? `linear-gradient(rgba(240,244,250,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(240,244,250,0.08) 1px, transparent 1px)`
            : `linear-gradient(rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.06) 1px, transparent 1px)`, 
          backgroundSize: '56px 56px', 
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 20%, black 20%, transparent 75%)', 
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 20%, black 20%, transparent 75%)' 
        }} 
      />

      <GlobalLogo isDarkMode={isDarkMode} />
      <NavBar setTheme={setActiveTheme} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <div className="flex-grow flex flex-col">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/work" element={<Work />} /> 
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog/*" element={<Blog />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
          </Routes>
        </AnimatePresence>
      </div>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default App;