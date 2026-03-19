import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sparkles, Twitter, Github } from 'lucide-react';
import cyberConfig from './cyber.json';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#030303] text-white font-sans selection:bg-indigo-500/30">
      {/* Premium Background Effects */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-violet-600/10 blur-[150px]" />
        <div className="absolute top-[40%] left-[40%] w-[20%] h-[20%] rounded-full bg-blue-500/5 blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div whileHover={{ rotate: 15, scale: 1.1 }} className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-xl font-bold tracking-tight">{cyberConfig.siteNamePrefix}<span className="text-indigo-400">{cyberConfig.siteNameHighlight}</span></span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-white/70">
            <Link to="/" className={`hover:text-white transition-colors ${location.pathname === '/' ? 'text-white' : ''}`}>Home</Link>
            <Link to="/enhance" className={`hover:text-white transition-colors ${location.pathname === '/enhance' ? 'text-white' : ''}`}>Enhance</Link>
            <Link to="/features" className={`hover:text-white transition-colors ${location.pathname === '/features' ? 'text-white' : ''}`}>Features</Link>
            <Link to="/about" className={`hover:text-white transition-colors ${location.pathname === '/about' ? 'text-white' : ''}`}>About</Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/enhance">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                Try Now
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-white/70 hover:text-white" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-3/4 max-w-sm bg-[#0a0a0a] border-l border-white/10 z-[60] p-6 flex flex-col shadow-2xl"
            >
              <div className="flex justify-end mb-8">
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-white/5 rounded-full text-white/70 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex flex-col space-y-6 text-lg font-medium">
                <Link to="/" className={`hover:text-indigo-400 transition-colors ${location.pathname === '/' ? 'text-indigo-400' : 'text-white/70'}`}>Home</Link>
                <Link to="/enhance" className={`hover:text-indigo-400 transition-colors ${location.pathname === '/enhance' ? 'text-indigo-400' : 'text-white/70'}`}>Enhance Tool</Link>
                <Link to="/features" className={`hover:text-indigo-400 transition-colors ${location.pathname === '/features' ? 'text-indigo-400' : 'text-white/70'}`}>Features</Link>
                <Link to="/about" className={`hover:text-indigo-400 transition-colors ${location.pathname === '/about' ? 'text-indigo-400' : 'text-white/70'}`}>About</Link>
                <div className="h-px w-full bg-white/10 my-4"></div>
                <Link to="/privacy" className={`hover:text-indigo-400 transition-colors ${location.pathname === '/privacy' ? 'text-indigo-400' : 'text-white/70'}`}>Privacy & Security</Link>
              </div>
              <div className="mt-auto pt-8">
                <Link to="/enhance" className="block w-full">
                  <motion.button whileTap={{ scale: 0.95 }} className="w-full py-3 rounded-xl bg-white text-black font-semibold text-center">
                    Try Now
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="relative z-10 flex-1 pt-20 flex flex-col">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/50 backdrop-blur-lg pt-16 pb-8 px-6 mt-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">{cyberConfig.siteNamePrefix}<span className="text-indigo-400">{cyberConfig.siteNameHighlight}</span></span>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-white/40 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-white/40 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-sm text-white/40">
            <p>{cyberConfig.copyright}</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/privacy" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
