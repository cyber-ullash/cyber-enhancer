import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Layout from './Layout';
import { Home, Enhance, Features, About, Privacy } from './pages';
import { Sparkles, AlertTriangle, Download } from 'lucide-react';
import cyberConfig from './cyber.json';

const UpdateRequiredModal: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-6"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="max-w-md w-full bg-gradient-to-b from-zinc-900 to-black border border-red-500/30 rounded-3xl p-8 text-center shadow-[0_0_50px_rgba(239,68,68,0.2)]"
      >
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight">Update Required</h2>
        <p className="text-zinc-400 mb-8 leading-relaxed">
          A critical update is available for <span className="text-indigo-400 font-semibold">Cyber Enhancer</span>. 
          To ensure security and access the latest AI models, you must update your application to the latest version.
        </p>
        
        <div className="space-y-4">
          <a 
            href="https://github.com/cyber-ullash/cyber-enhancer" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-indigo-500/20 group"
          >
            <Download className="w-5 h-5 mr-2 group-hover:bounce" />
            Download Update
          </a>
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center justify-center w-full py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-medium transition-all border border-white/10"
          >
            Check Again
          </button>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/5">
          <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-medium">
            CYBER BOT COMMUNITY | ULLASH × SHAON
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-[#030303] flex items-center justify-center"
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center shadow-[0_0_50px_rgba(99,102,241,0.5)] mb-6"
        >
          <Sparkles className="w-12 h-12 text-white" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">{cyberConfig.siteNamePrefix}<span className="text-indigo-400">{cyberConfig.siteNameHighlight}</span></h1>
          <div className="h-1 w-0 bg-gradient-to-r from-indigo-500 to-violet-500 mx-auto rounded-full"
               style={{ animation: 'fillBar 1.5s ease-in-out 0.5s forwards' }} />
          <style>{`@keyframes fillBar { to { width: 100%; } }`}</style>
        </motion.div>
      </div>
    </motion.div>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="flex-1 flex flex-col w-full"
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      {/* @ts-expect-error - React Router v6 Routes doesn't have key in its types but it's needed for AnimatePresence */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/enhance" element={<PageWrapper><Enhance /></PageWrapper>} />
        <Route path="/features" element={<PageWrapper><Features /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/privacy" element={<PageWrapper><Privacy /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [updateRequired, setUpdateRequired] = useState(false);

  useEffect(() => {
    document.title = cyberConfig.siteTitle;
    
    // Check version status
    const checkVersion = async () => {
      try {
        const response = await fetch('/api/version-status');
        const data = await response.json();
        if (data.is_valid === false) {
          setUpdateRequired(true);
          console.error("%c[Cyber Enhancer] UPDATE REQUIRED!", "color: red; font-size: 20px; font-weight: bold;");
          console.error("Please update your application to the latest version: https://github.com/cyber-ullash/cyber-enhancer");
        }
      } catch (error) {
        console.error("Failed to check version status:", error);
      }
    };
    
    checkVersion();
  }, []);
  
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {updateRequired && <UpdateRequiredModal key="update-modal" />}
        {showSplash ? (
          <SplashScreen key="splash" onComplete={() => setShowSplash(false)} />
        ) : (
          <motion.div key="app" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="min-h-screen flex flex-col">
            <Layout>
              <AnimatedRoutes />
            </Layout>
          </motion.div>
        )}
      </AnimatePresence>
    </BrowserRouter>
  );
}
