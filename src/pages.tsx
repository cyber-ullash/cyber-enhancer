import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Sparkles, Image as ImageIcon, Download, Loader2, AlertCircle, Settings2, UploadCloud, Link as LinkIcon, Copy, CheckCircle2, Share2, Zap, Palette, Shield, Cpu, Layers, ChevronRight, Lock, Server, Eye, RefreshCw } from 'lucide-react';
import cyberConfig from './cyber.json';

const LoadingSteps = [
  "Initializing quantum neural engine...",
  "Establishing secure processing tunnel...",
  "Analyzing deep image structure...",
  "Isolating compression artifacts...",
  "Detecting noise patterns...",
  "Engaging super-resolution models...",
  "Applying multi-pass neural enhancement...",
  "Reconstructing micro-details...",
  "Upscaling spatial resolution...",
  "Synthesizing missing textures...",
  "Enhancing edge contrast...",
  "Applying dynamic color grading...",
  "Balancing exposure and shadows...",
  "Running quality assurance checks...",
  "Finalizing high-definition output..."
];

function LoadingIndicator() {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hexString, setHexString] = useState('0x00000000');

  useEffect(() => {
    const totalTime = 15000; // 15 seconds total estimated
    const intervalTime = totalTime / LoadingSteps.length;

    const stepInterval = setInterval(() => {
      setStep((prev) => (prev < LoadingSteps.length - 1 ? prev + 1 : prev));
    }, intervalTime);

    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min((elapsed / totalTime) * 100, 99);
      setProgress(currentProgress);
    }, 50);

    const hexInterval = setInterval(() => {
      setHexString('0x' + Math.random().toString(16).substr(2, 8).toUpperCase());
    }, 100);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
      clearInterval(hexInterval);
    };
  }, []);

  return (
    <motion.div 
      key="loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center w-full h-full text-white relative overflow-hidden"
    >
      {/* Background Grid & Particles */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      
      {/* Data Stream Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`stream-${i}`}
            className="absolute w-px bg-gradient-to-b from-transparent via-indigo-500 to-transparent"
            style={{
              height: '40%',
              left: `${i * 10 + Math.random() * 5}%`,
              top: '-50%',
            }}
            animate={{
              top: ['-50%', '150%'],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Floating Background Elements */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`bg-${i}`}
          className="absolute rounded-full bg-indigo-500/5 blur-3xl"
          style={{
            width: Math.random() * 200 + 100,
            height: Math.random() * 200 + 100,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
          }}
          transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Pulse Waves */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`pulse-${i}`}
            className="absolute rounded-full border border-indigo-500/10"
            initial={{ width: 0, height: 0, opacity: 0 }}
            animate={{
              width: ['0%', '200%'],
              height: ['0%', '200%'],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 1.3,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Central Orb Complex */}
      <div className="relative w-48 h-48 mb-16 flex items-center justify-center">
        {/* Outer Scanning Ring */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-indigo-500/20"
        >
          <div className="absolute top-0 left-1/2 w-1 h-4 bg-indigo-400 shadow-[0_0_10px_rgba(99,102,241,1)] -translate-x-1/2 rounded-full" />
          <div className="absolute bottom-0 left-1/2 w-1 h-4 bg-violet-400 shadow-[0_0_10px_rgba(139,92,246,1)] -translate-x-1/2 rounded-full" />
        </motion.div>

        {/* Middle Dashed Ring */}
        <motion.div 
          animate={{ rotate: -360, scale: [1, 1.05, 1] }}
          transition={{ rotate: { duration: 15, repeat: Infinity, ease: "linear" }, scale: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute inset-4 rounded-full border-2 border-dashed border-violet-500/30"
        />

        {/* Inner Solid Ring */}
        <motion.div 
          animate={{ rotate: 180 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-8 rounded-full border border-indigo-400/40 border-r-transparent border-l-transparent"
        />

        {/* Core Glow */}
        <motion.div 
          animate={{ 
            scale: [0.8, 1.2, 0.8], 
            opacity: [0.5, 1, 0.5],
            filter: [`hue-rotate(0deg)`, `hue-rotate(${progress * 2}deg)`, `hue-rotate(0deg)`]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 blur-2xl"
        />
        
        {/* Center Node */}
        <motion.div 
          animate={{ scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-12 h-12 rounded-full bg-white shadow-[0_0_40px_rgba(255,255,255,1)] flex items-center justify-center overflow-hidden" 
        >
          <motion.div 
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-full h-1 bg-indigo-500/50 blur-[1px]"
          />
        </motion.div>
        
        {/* Orbiting Particles */}
        {[...Array(16)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute"
            style={{ top: '50%', left: '50%', transform: `rotate(${i * 22.5}deg) translateY(-65px)` }}
          >
            <motion.div
              animate={{ y: [0, -15, 0], opacity: [0.2, 1, 0.2], scale: [0.5, 1.5, 0.5] }}
              transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
              className={`w-1.5 h-1.5 rounded-full ${i % 2 === 0 ? 'bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.8)]' : 'bg-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.8)]'}`}
            />
          </div>
        ))}

        {/* Processing Sparks */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`spark-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{
              x: [0, (Math.random() - 0.5) * 200],
              y: [0, (Math.random() - 0.5) * 200],
              opacity: [0, 1, 0],
              scale: [1, 0],
            }}
            transition={{
              duration: 0.8 + Math.random() * 0.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Progress Section */}
      <div className="w-80 space-y-6 relative z-10">
        <div className="flex justify-between items-end mb-2 px-1">
          <span className="text-xs font-mono text-indigo-300/70">{hexString}</span>
          <span className="text-2xl font-light tracking-tighter text-white">{Math.floor(progress)}<span className="text-sm text-white/50">%</span></span>
        </div>

        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative backdrop-blur-sm border border-white/10">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-violet-400 to-indigo-500 bg-[length:200%_100%]"
            animate={{ width: `${progress}%`, backgroundPosition: ["0% 0%", "100% 0%"] }}
            transition={{ width: { duration: 0.1, ease: "linear" }, backgroundPosition: { duration: 2, repeat: Infinity, ease: "linear" } }}
          />
          <motion.div
            className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-white/80 to-transparent blur-[2px]"
            animate={{ left: `calc(${progress}% - 16px)` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>
        
        <div className="relative h-8 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.p
              key={step}
              initial={{ y: 20, opacity: 0, filter: "blur(8px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -20, opacity: 0, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-sm font-medium tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-white to-violet-200 absolute text-center w-full"
            >
              {LoadingSteps[step]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export function Home() {
  return (
    <section className="flex-1 flex items-center justify-center px-6 py-20 min-h-[80vh]">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-4xl mx-auto"
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}
          className="inline-flex items-center justify-center px-4 py-2 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_0_20px_rgba(255,255,255,0.02)]"
        >
          <Sparkles className="w-4 h-4 text-indigo-400 mr-2" />
          <span className="text-xs font-semibold tracking-widest text-indigo-200 uppercase">AI-Powered Image Enhancement</span>
        </motion.div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-8 leading-tight">
          {cyberConfig.heroTitleLine1} <br className="hidden md:block" />
          <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-400 bg-300% animate-gradient">{cyberConfig.heroTitleHighlight}</span> {cyberConfig.heroTitleLine2}
        </h1>
        <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed mb-12">
          {cyberConfig.siteDescription}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/enhance">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 rounded-full bg-white text-black font-medium shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center">
              Start Enhancing <ChevronRight className="w-5 h-5 ml-2" />
            </motion.button>
          </Link>
          <Link to="/features">
            <motion.button whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }} whileTap={{ scale: 0.95 }} className="px-8 py-4 rounded-full bg-white/5 text-white font-medium border border-white/10 transition-all">
              Explore Features
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export function Enhance() {
  const [mode, setMode] = useState<'url' | 'upload'>('url');
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  
  const [method, setMethod] = useState('4');
  const [size, setSize] = useState('high');
  
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<{title: string, message: string, type?: 'url' | 'upload' | 'server' | 'connection'} | null>(null);
  const [copied, setCopied] = useState(false);

  const [urlStatus, setUrlStatus] = useState<'idle' | 'validating' | 'valid' | 'invalid'>('idle');
  const [urlErrorMessage, setUrlErrorMessage] = useState('');

  useEffect(() => {
    if (!imageUrl) {
      setUrlStatus('idle');
      setUrlErrorMessage('');
      return;
    }

    let url;
    try {
      url = new URL(imageUrl);
      if (!['http:', 'https:'].includes(url.protocol)) {
        throw new Error('Invalid protocol');
      }
    } catch (e) {
      setUrlStatus('invalid');
      setUrlErrorMessage('Please enter a valid HTTP/HTTPS URL.');
      return;
    }

    setUrlStatus('validating');
    const timer = setTimeout(() => {
      const img = new Image();
      img.onload = () => {
        setUrlStatus('valid');
        setUrlErrorMessage('');
      };
      img.onerror = () => {
        setUrlStatus('invalid');
        setUrlErrorMessage('Image is inaccessible or invalid.');
      };
      img.src = imageUrl;
    }, 500);

    return () => clearTimeout(timer);
  }, [imageUrl]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFilePreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleCopy = () => {
    if (resultUrl) {
      navigator.clipboard.writeText(resultUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (resultUrl) {
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Enhanced Image',
            text: `Check out this enhanced image from ${cyberConfig.siteName}!`,
            url: resultUrl,
          });
        } catch (err) {
          console.error('Error sharing:', err);
        }
      } else {
        handleCopy();
      }
    }
  };

  const handleDownload = async () => {
    if (!resultUrl) return;
    try {
      const response = await fetch(resultUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `enhanced_${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed:', err);
      // Fallback to direct link if blob fetch fails
      window.open(resultUrl, '_blank');
    }
  };

  const handleEnhance = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'url' && !imageUrl) return;
    if (mode === 'upload' && !file) return;

    setLoading(true);
    setError(null);
    setResultUrl(null);

    try {
      let response;

      if (mode === 'url') {
        response = await fetch(`/api?imgurl=${encodeURIComponent(imageUrl)}&method=${method}&size=${size}`);
      } else {
        const formData = new FormData();
        formData.append('image', file as Blob);
        formData.append('method', method);
        formData.append('size', size);

        response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
      }
      
      const data = await response.json();

      if (!response.ok) {
        const errorType = data.error?.toLowerCase().includes('fetch') || data.error?.toLowerCase().includes('url') ? 'url' : 
                         data.error?.toLowerCase().includes('upload') || data.error?.toLowerCase().includes('file') ? 'upload' : 'server';
        
        throw { 
          title: data.error || 'Enhancement Failed', 
          message: data.details || data.message || 'An unknown error occurred during processing.',
          type: errorType
        };
      }

      const finalUrl = data.enhanced_url.startsWith('http') 
        ? data.enhanced_url 
        : `${window.location.origin}${data.enhanced_url}`;
        
      setResultUrl(finalUrl);
      
      setTimeout(() => {
        document.getElementById('result-preview')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    } catch (err: any) {
      if (err.title && err.message) {
        setError(err);
      } else {
        setError({ 
          title: 'Connection Error', 
          message: err.message || 'Failed to connect to the server.',
          type: 'connection'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto w-full flex-1">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">Enhance Your Image</h2>
        <p className="text-white/50">Upload a file or provide a URL to begin the enhancement process.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-5 space-y-6"
        >
          <form onSubmit={handleEnhance} className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-violet-500 opacity-50"></div>
            
            <div className="flex p-1 mb-8 bg-black/40 rounded-xl border border-white/5">
              <button
                type="button"
                onClick={() => setMode('url')}
                className={`flex-1 flex items-center justify-center py-2.5 text-sm font-medium rounded-lg transition-all ${mode === 'url' ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white/70'}`}
              >
                <LinkIcon className="w-4 h-4 mr-2" /> URL
              </button>
              <button
                type="button"
                onClick={() => setMode('upload')}
                className={`flex-1 flex items-center justify-center py-2.5 text-sm font-medium rounded-lg transition-all ${mode === 'upload' ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white/70'}`}
              >
                <UploadCloud className="w-4 h-4 mr-2" /> Upload
              </button>
            </div>

            <div className="mb-8">
              {mode === 'url' ? (
                <div className="space-y-2 relative">
                  <label className="text-sm font-medium text-white/70 ml-1">Image URL</label>
                  <div className="relative">
                    <input 
                      type="url" 
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://example.com/image.jpg" 
                      className={`w-full bg-black/50 border rounded-xl px-4 py-3.5 pr-12 text-white placeholder-white/20 focus:outline-none focus:ring-2 transition-all ${
                        urlStatus === 'invalid' 
                          ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50' 
                          : urlStatus === 'valid'
                          ? 'border-emerald-500/50 focus:ring-emerald-500/50 focus:border-emerald-500/50'
                          : 'border-white/10 focus:ring-indigo-500/50 focus:border-indigo-500/50'
                      }`}
                      required
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                      {urlStatus === 'validating' && <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />}
                      {urlStatus === 'valid' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                      {urlStatus === 'invalid' && <AlertCircle className="w-5 h-5 text-red-400" />}
                    </div>
                  </div>
                  <AnimatePresence>
                    {urlStatus === 'invalid' && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -10 }} 
                        className="text-xs text-red-400 ml-1 mt-1"
                      >
                        {urlErrorMessage}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70 ml-1">Upload Image</label>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-full h-32 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${filePreview ? 'border-indigo-500/50 bg-indigo-500/5' : 'border-white/10 bg-black/50 hover:bg-white/5 hover:border-white/20'}`}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden" 
                    />
                    {filePreview ? (
                      <div className="flex flex-col items-center">
                        <CheckCircle2 className="w-8 h-8 text-indigo-400 mb-2" />
                        <span className="text-sm text-indigo-200 font-medium">Image selected</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-white/40">
                        <UploadCloud className="w-8 h-8 mb-2" />
                        <span className="text-sm font-medium">Click to browse files</span>
                      </div>
                    )}
                  </motion.div>
                </div>
              )}
            </div>

            <div className="space-y-6 mb-8">
              <div className="flex items-center text-sm font-medium text-white/70 ml-1 mb-3">
                <Settings2 className="w-4 h-4 mr-2" /> Enhancement Settings
              </div>
              
              <div className="space-y-4 p-5 rounded-xl bg-black/30 border border-white/5">
                <div>
                  <label className="text-xs font-medium text-white/50 uppercase tracking-wider mb-2 block">Algorithm Method</label>
                  <div className="grid grid-cols-4 gap-2">
                    {['1', '2', '3', '4'].map((m) => (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        key={m}
                        type="button"
                        onClick={() => setMethod(m)}
                        className={`py-2 rounded-lg text-sm font-medium transition-all ${method === m ? 'bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
                      >
                        V{m}
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-xs font-medium text-white/50 uppercase tracking-wider mb-2 block">Output Size</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['low', 'medium', 'high'].map((s) => (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        key={s}
                        type="button"
                        onClick={() => setSize(s)}
                        className={`py-2 rounded-lg text-sm font-medium capitalize transition-all ${size === s ? 'bg-violet-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
                      >
                        {s}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <motion.button 
              whileHover={!(loading || (mode === 'url' ? (!imageUrl || urlStatus === 'invalid') : !file)) ? { scale: 1.02 } : {}}
              whileTap={!(loading || (mode === 'url' ? (!imageUrl || urlStatus === 'invalid') : !file)) ? { scale: 0.98 } : {}}
              type="submit" 
              disabled={loading || (mode === 'url' ? (!imageUrl || urlStatus === 'invalid') : !file)}
              className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center transition-all duration-300 relative overflow-hidden ${
                loading 
                  ? 'bg-indigo-600 text-white shadow-[0_0_30px_rgba(79,70,229,0.6)] scale-[0.98]' 
                  : 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            >
              {loading && (
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 w-[150%]"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              )}
              <span className="relative flex items-center justify-center z-10">
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div key="loading" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center">
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Enhancing...
                    </motion.div>
                  ) : (
                    <motion.div key="idle" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="flex items-center">
                      <Sparkles className="w-5 h-5 mr-2" /> Enhance Image
                    </motion.div>
                  )}
                </AnimatePresence>
              </span>
            </motion.button>

            <AnimatePresence>
              {resultUrl && !loading && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  type="button"
                  onClick={handleDownload}
                  className="w-full mt-4 py-4 rounded-xl font-semibold text-lg flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] transition-all"
                >
                  <Download className="w-5 h-5 mr-2" /> Download Result
                </motion.button>
              )}
            </AnimatePresence>
          </form>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start space-x-3"
              >
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-red-400 font-medium text-sm">{error.title}</h4>
                  <p className="text-red-400/70 text-xs mt-1">{error.message}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div 
          id="result-preview"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-7 h-[600px] rounded-[2rem] bg-white/[0.02] border border-white/10 backdrop-blur-xl overflow-hidden relative shadow-2xl flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            {loading ? (
              <LoadingIndicator key="loading" />
            ) : error ? (
              <motion.div 
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center text-center p-8 max-w-md"
              >
                <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20">
                  <AlertCircle className="w-10 h-10 text-red-400" />
                </div>
                <h3 className="text-2xl font-semibold text-red-400 mb-4">{error.title}</h3>
                <p className="text-white/60 mb-8 leading-relaxed">
                  {error.message}
                </p>
                
                <div className="w-full bg-white/5 rounded-2xl p-6 border border-white/10 text-left space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-white/40 uppercase tracking-widest">Troubleshooting Steps</p>
                    {error.type === 'url' && <LinkIcon className="w-4 h-4 text-indigo-400 opacity-50" />}
                    {error.type === 'upload' && <UploadCloud className="w-4 h-4 text-indigo-400 opacity-50" />}
                    {error.type === 'server' && <Server className="w-4 h-4 text-indigo-400 opacity-50" />}
                    {error.type === 'connection' && <RefreshCw className="w-4 h-4 text-indigo-400 opacity-50" />}
                  </div>
                  <ul className="text-sm text-white/60 space-y-3">
                    {error.type === 'url' && (
                      <>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-indigo-500/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                          </div>
                          Check if the image URL is public and accessible.
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-indigo-500/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                          </div>
                          Ensure the URL ends with a common image extension (.jpg, .png, .webp).
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-indigo-500/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                          </div>
                          Try uploading the file directly if the URL is restricted.
                        </li>
                      </>
                    )}
                    {error.type === 'upload' && (
                      <>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-indigo-500/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                          </div>
                          Ensure the file size is under 10MB.
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-indigo-500/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                          </div>
                          Check if the file format is supported (JPEG, PNG, WEBP).
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-indigo-500/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                          </div>
                          Try a different image if the current one is corrupted.
                        </li>
                      </>
                    )}
                    {error.type === 'server' && (
                      <>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-indigo-500/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                          </div>
                          Try a different enhancement method (V1-V4).
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-indigo-500/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                          </div>
                          The server might be busy, please wait a moment and try again.
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-indigo-500/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                          </div>
                          Check if the image content is too complex for the selected algorithm.
                        </li>
                      </>
                    )}
                    {error.type === 'connection' && (
                      <>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-indigo-500/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                          </div>
                          Check your internet connection.
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-indigo-500/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                          </div>
                          Refresh the page and try again.
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-indigo-500/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                          </div>
                          Ensure you are not using a VPN that might block the connection.
                        </li>
                      </>
                    )}
                    {!error.type && (
                      <>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-indigo-500/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                          </div>
                          Refresh the page and try again.
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-indigo-500/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                          </div>
                          Contact support if the issue persists.
                        </li>
                      </>
                    )}
                  </ul>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap justify-center gap-4 mt-8"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setError(null);
                      document.querySelector('form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    className="px-8 py-3 rounded-xl bg-white text-black font-semibold flex items-center shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all"
                  >
                    <RefreshCw className="w-5 h-5 mr-2" /> Try Again
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.reload()}
                    className="px-8 py-3 rounded-xl bg-white/10 text-white font-semibold flex items-center border border-white/10 hover:bg-white/20 transition-all"
                  >
                    <RefreshCw className="w-5 h-5 mr-2" /> Refresh Page
                  </motion.button>
                </motion.div>
              </motion.div>
            ) : resultUrl ? (
              <motion.div 
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 w-full h-full group"
              >
                <div className="absolute inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYNgfQIhQghgY0A2AMBjVQAwMowEwGgCjATAaAKMBMBqA0QAYDQC2AQB13Q4Rz5+36wAAAABJRU5ErkJggg==')] opacity-10"></div>
                
                <img 
                  src={resultUrl} 
                  alt="Enhanced result" 
                  className="relative z-10 w-full h-full object-contain"
                />
                
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 md:p-8">
                  <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
                    <div className="flex-1 min-w-0 w-full">
                      <p className="text-white font-medium text-lg mb-1">Enhanced Result</p>
                      <div className="flex items-center space-x-3 text-white/60 text-sm mb-4">
                        <span className="px-2 py-1 rounded bg-white/10 backdrop-blur-md">V{method}</span>
                        <span className="px-2 py-1 rounded bg-white/10 backdrop-blur-md capitalize">{size}</span>
                      </div>
                      
                      <div className="flex items-center bg-black/50 border border-white/10 rounded-lg overflow-hidden backdrop-blur-md w-full max-w-md">
                        <div className="px-3 py-2 text-xs text-white/50 truncate flex-1 font-mono">
                          {resultUrl}
                        </div>
                        <motion.button 
                          whileTap={{ scale: 0.9 }}
                          onClick={handleCopy}
                          className="p-2 hover:bg-white/10 transition-colors border-l border-white/10 text-white"
                          title="Copy URL"
                        >
                          {copied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                        </motion.button>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 flex-shrink-0 w-full md:w-auto justify-end">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleShare}
                        className="p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all backdrop-blur-md"
                        title="Share"
                      >
                        <Share2 className="w-5 h-5" />
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleDownload}
                        className="p-4 rounded-full bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                        title="Download Image"
                      >
                        <Download className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center text-white/20"
              >
                <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/5">
                  <ImageIcon className="w-10 h-10 opacity-50" />
                </div>
                <p className="text-sm font-medium tracking-widest uppercase">Preview Area</p>
                <p className="text-xs text-white/30 mt-2 max-w-xs text-center">Your enhanced image will appear here with a public URL</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export function Features() {
  const features = [
    { icon: Cpu, title: "Neural Upscaling", desc: "Advanced AI models reconstruct missing details for crystal clear resolution." },
    { icon: Palette, title: "Color Grading", desc: "Intelligent color balancing and vibrancy enhancement for professional looks." },
    { icon: Zap, title: "Lightning Fast", desc: "Optimized processing pipeline delivers enhanced images in seconds." },
    { icon: Shield, title: "Privacy First", desc: "Your images are processed securely and never used for model training." },
    { icon: Layers, title: "Multiple Methods", desc: "Choose from 4 different enhancement algorithms tailored to your needs." },
    { icon: Sparkles, title: "Artifact Removal", desc: "Automatically detects and removes JPEG compression artifacts and noise." }
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto w-full flex-1">
      <div className="text-center mb-20">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center justify-center px-4 py-2 mb-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
          <span className="text-xs font-semibold tracking-widest text-white/70 uppercase">Capabilities</span>
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-semibold mb-6">Professional Grade Features</motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-white/50 max-w-2xl mx-auto font-light">
          Everything you need to bring your images to life with cutting-edge AI technology.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.06] transition-all group cursor-default"
          >
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all">
              <feature.icon className="w-7 h-7 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-white/50 leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function About() {
  return (
    <section className="py-20 px-6 flex-1 flex items-center w-full">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0, rotate: 10 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} transition={{ duration: 0.8 }}
          className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center shadow-2xl shadow-indigo-500/30 mb-10"
        >
          <Sparkles className="w-12 h-12 text-white" />
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-4xl md:text-6xl font-semibold mb-8">
          About {cyberConfig.siteName}
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-lg md:text-xl text-white/60 font-light leading-relaxed mb-12">
          {cyberConfig.siteName} was built with a singular goal: to make professional-grade image enhancement accessible to everyone. 
          By leveraging state-of-the-art neural networks, we can reconstruct lost details, remove noise, and upscale images 
          with unprecedented clarity. Whether you're a professional photographer restoring old archives or just looking to 
          improve a cherished memory, our platform delivers uncompromising quality.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="inline-flex flex-col items-center space-y-4">
          <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10 flex items-center space-x-3">
            <span className="text-white/50">{cyberConfig.footerText}</span>
          </div>
          <p className="text-sm text-white/40">{cyberConfig.copyright}</p>
        </motion.div>
      </div>
    </section>
  );
}

export function Privacy() {
  return (
    <section className="py-20 px-6 max-w-4xl mx-auto w-full flex-1">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6">
          <Shield className="w-8 h-8 text-indigo-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy & Security</h1>
        <p className="text-lg text-white/50">Your data protection is our highest priority.</p>
      </motion.div>

      <div className="space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center mb-4">
            <Lock className="w-6 h-6 text-indigo-400 mr-3" />
            <h2 className="text-2xl font-semibold">Data Protection</h2>
          </div>
          <p className="text-white/60 leading-relaxed">
            All images uploaded to {cyberConfig.siteName} are processed securely and are automatically deleted from our servers immediately after processing. We do not store your personal images, nor do we use them to train our AI models. Your privacy remains entirely yours.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center mb-4">
            <Server className="w-6 h-6 text-violet-400 mr-3" />
            <h2 className="text-2xl font-semibold">Secure Infrastructure</h2>
          </div>
          <p className="text-white/60 leading-relaxed">
            Our platform is built on enterprise-grade infrastructure with end-to-end encryption. Every request is authenticated and processed in isolated environments to ensure maximum security against unauthorized access.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center mb-4">
            <Eye className="w-6 h-6 text-blue-400 mr-3" />
            <h2 className="text-2xl font-semibold">Transparency</h2>
          </div>
          <p className="text-white/60 leading-relaxed">
            Backed by the Cyber Bot Community, we adhere to strict ethical AI guidelines and continuous security audits to provide a safe and reliable service. We believe in complete transparency regarding how our algorithms process your data.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
