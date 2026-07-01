import { useRef, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SvgButterfly from './components/SvgButterfly';
import SwarmTerminal from './components/SwarmTerminal';
import ProfileOverlay from './components/ProfileOverlay';
import KarmaGamezAd from './components/KarmaGamezAd';
import FAQ from './components/FAQ';
import { ArrowDown, Flame, ShieldAlert, Sparkles, Network, BookOpen, X, Heart, ExternalLink, Zap, Globe, Twitter, Link, Check, Share2, Send, Lock, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const analyzerRef = useRef<HTMLDivElement>(null);
  const [isBannerVisible, setIsBannerVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('banner-closed') !== 'true';
    }
    return true;
  });
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isDiscordGatedOpen, setIsDiscordGatedOpen] = useState(false);
  const [showPromo, setShowPromo] = useState(false);
  const [currentLang, setCurrentLang] = useState<'en' | 'es' | 'zh' | 'ja'>('en');
  const [isWelcomeExpanded, setIsWelcomeExpanded] = useState(false);
  const [isNftSectionExpanded, setIsNftSectionExpanded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      const savedLang = localStorage.getItem('language-preference') as 'en' | 'es' | 'zh' | 'ja' | null;
      if (savedLang && ['en', 'es', 'zh', 'ja'].includes(savedLang)) {
        setCurrentLang(savedLang);
      } else {
        const browserLang = navigator.language || (navigator as any).userLanguage || '';
        const lowerLang = browserLang.toLowerCase();
        
        if (lowerLang.startsWith('es')) {
          setCurrentLang('es');
        } else if (lowerLang.startsWith('zh')) {
          setCurrentLang('zh');
        } else if (lowerLang.startsWith('ja')) {
          setCurrentLang('ja');
        } else {
          setCurrentLang('en');
        }
      }
    }
  }, []);

  const handleLanguageChange = (lang: 'en' | 'es' | 'zh' | 'ja') => {
    setCurrentLang(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language-preference', lang);
    }
  };

  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const copyStoryLink = () => {
    const url = typeof window !== 'undefined' ? window.location.href : 'https://karmabutterflies.com';
    navigator.clipboard.writeText(url).then(() => {
      setIsLinkCopied(true);
      setTimeout(() => setIsLinkCopied(false), 2000);
    }).catch((err) => {
      console.error('Failed to copy story link: ', err);
    });
  };

  const [isLightMode, setIsLightMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme-preference') === 'light';
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('theme-preference', isLightMode ? 'light' : 'dark');
    if (isLightMode) {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  }, [isLightMode]);

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPromo(true);
    }, 3000); // Trigger right around the 3 second mark!
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo({
        top: 0,
        behavior: 'auto'
      });
    }
  }, []);

  useEffect(() => {
    const handleOpenStory = () => {
      setIsStoryOpen(true);
    };
    window.addEventListener('open-inspiration-story', handleOpenStory);
    return () => window.removeEventListener('open-inspiration-story', handleOpenStory);
  }, []);

  const scrollToAnalyzer = () => {
    window.location.hash = '#analyzer';
    if (analyzerRef.current) {
      analyzerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToOverlay = () => {
    window.location.hash = '#profile-overlay';
    if (analyzerRef.current) {
      analyzerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setTimeout(() => {
      const el = document.getElementById('profile-overlay');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 180);
  };

  const narrativePoints = [
    { type: 'build', text: 'Expose scams & bad actors inside early systems.', icon: ShieldAlert, color: 'text-[#F59E0B] border-white/10 bg-[#1A1A1A] hover:bg-white/5' },
    { type: 'scam', text: 'Reward honesty, developers, & ecosystem builders.', icon: Flame, color: 'text-emerald-400 border-white/10 bg-[#1A1A1A] hover:bg-white/5' },
    { type: 'help', text: 'Celebrate cultural growth & educate newcomers.', icon: Sparkles, color: 'text-cyan-400 border-white/10 bg-[#1A1A1A] hover:bg-white/5' },
    { type: 'ripple', text: 'Enforcing real accountability in the swarm.', icon: Network, color: 'text-purple-400 border-white/10 bg-[#1A1A1A] hover:bg-white/5' },
  ];

  return (
    <div className={`min-h-screen bg-[#050505] text-white font-sans selection:bg-[#F59E0B]/30 selection:text-[#F59E0B] overflow-x-hidden ${isBannerVisible ? 'pt-10' : 'pt-0'}`}>
      {/* Premium background static grid coordinates */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none opacity-50" />

      {/* Narrative High-conversion Invitation Announcement Bar */}
      {isBannerVisible && (
        <div className="fixed top-0 left-0 right-0 h-10 bg-[#F59E0B] text-[#050505] px-4 pr-12 text-center text-xs font-sans font-black tracking-wider flex items-center justify-center gap-2 z-[60] shadow-lg border-b border-amber-600/30">
          <span className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[45vw] sm:max-w-none flex items-center gap-1.5 justify-center">
            <span className="animate-bounce">🦋</span> 
            <span><strong>THE SWARM REVOLUTION:</strong> Helping each other, stopping scams, and sharing rewards.</span>
          </span>
          <button 
            onClick={() => setIsStoryOpen(true)}
            className="underline hover:text-amber-950 transition font-black uppercase text-[10px] tracking-widest ml-1 shrink-0 bg-black/10 px-2.5 py-0.5 rounded border border-black/10 cursor-pointer"
          >
            What Inspired Me
          </button>
          <span className="opacity-30">|</span>
          <a 
            href="https://gravemint.io/mint/FXSVHzLvVFey57U8ETuhHzrzDRT3FhvqzbxWpyoAJA4c"
            target="_blank"
            rel="noreferrer"
            className="bg-black text-white hover:bg-neutral-900 px-3 py-1 rounded-full text-[9px] font-mono tracking-widest hover:scale-102 transition-all shrink-0 font-extrabold flex items-center gap-1 shadow shadow-black/80"
          >
            MINT NOW ↗
          </a>
          <button
            onClick={() => {
              localStorage.setItem('banner-closed', 'true');
              setIsBannerVisible(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 bg-black/10 hover:bg-black/20 text-[#050505] hover:text-black rounded transition-all cursor-pointer flex items-center justify-center"
            title="Close Banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header Navigation */}
      <Navbar onScanClick={scrollToAnalyzer} isLightMode={isLightMode} onThemeToggle={toggleTheme} isBannerVisible={isBannerVisible} />

      {/* Hero Bento Grid Section Container */}
      <header className="relative pt-36 pb-16 md:pt-44 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Dynamic decorative backdrop circles */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#F59E0B]/5 rounded-full blur-3xl pointer-events-none" />

        {/* The Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* Bento Box 1: Brand / Welcome Badge */}
          <div id="credentials-card" className="lg:col-span-5 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-center relative overflow-hidden transition-all duration-300">
            <div className="absolute -top-10 -right-10 p-4 opacity-5 pointer-events-none">
              <svg className="w-56 h-56" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l-2 5-5 2 5 2 2 5 2-5 5-2-5-2-2-5z" />
              </svg>
            </div>
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg shadow-black/40">
                <span className="text-xl select-none">🦋</span>
              </div>
              <div>
                <h1 className="text-xl font-display font-black tracking-tight text-white leading-none uppercase">
                  KARMA BUTTERFLIES
                </h1>
                <span className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest block mt-1">
                  REPUTATION CREDENTIALS
                </span>
              </div>
            </div>
            <div className="space-y-4 mb-6">
              <h2 
                onClick={() => { if (isWelcomeExpanded) setIsWelcomeExpanded(false); }}
                className={`text-lg sm:text-2xl font-sans font-black text-[#F59E0B] tracking-tight leading-tight uppercase select-none ${
                  isWelcomeExpanded ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''
                }`}
              >
                Welcome Home, Anonymous Swarm.
                {isWelcomeExpanded && (
                  <span className="text-[10px] font-mono text-slate-500 lowercase ml-2 font-normal animate-pulse">
                    (click to close ×)
                  </span>
                )}
              </h2>
              
              <AnimatePresence initial={false}>
                {isWelcomeExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden space-y-4"
                  >
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-semibold">
                      Whether you're a developer, marketer, project manager, reply guy, alpha caller, trader, or absolute beginner—Karma Butterflies is built for <span className="text-[#F59E0B] font-extrabold">YOU</span>.
                    </p>
                    <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed font-sans font-medium">
                      We're a community united to uplift high-integrity projects, support builders, expose bad actors, and ensure everyday contributors get rewarded. No gatekeeping, no insider privilege—just fair, merit-based karma.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <button
              onClick={() => { if (!isWelcomeExpanded) setIsWelcomeExpanded(true); }}
              disabled={isWelcomeExpanded}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-orange-950/20 border border-[#F59E0B]/25 text-[10px] font-mono font-black text-[#F59E0B] tracking-wider uppercase self-start shadow-md shadow-amber-500/5 transition-all ${
                !isWelcomeExpanded 
                  ? 'hover:scale-102 hover:bg-orange-950/40 cursor-pointer' 
                  : 'opacity-60 cursor-default'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
              <span>🦋 EVERY CRYPTO USER BELONGS HERE. {!isWelcomeExpanded && "• Open to read…"}</span>
            </button>
          </div>

          {/* Bento Box 2: Hero Brand Focal Panel (Stunning Gold backing) */}
          <div className="lg:col-span-7 bg-[#F59E0B] text-black border border-white/10 rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            <div className="mb-8">
              <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-black/60 block mb-2">
                Concept Release
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black leading-[0.95] tracking-tighter text-black">
                YOUR WALLET<br />TELLS A STORY.
              </h2>
              <p className="text-sm sm:text-base font-semibold leading-relaxed text-black/80 mt-4 max-w-lg">
                Every action leaves a wingbeat. Transform on-chain reputational footprint history into legacy. We are not just generative art—we are a belief system.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 border-t border-black/10 pt-6">
              <button
                onClick={scrollToAnalyzer}
                className="px-6 py-3 bg-black text-white hover:bg-neutral-900 rounded-full font-sans font-bold text-xs tracking-wider uppercase transition shadow-md active:scale-97 cursor-pointer text-center whitespace-nowrap"
              >
                Check Karma Score
              </button>

              <a
                href="#staking"
                className="px-6 py-3 bg-neutral-950 text-emerald-400 hover:text-emerald-300 hover:bg-black rounded-full font-sans font-black text-xs tracking-wider uppercase transition-all shadow-md active:scale-97 text-center whitespace-nowrap inline-flex items-center gap-2 border border-emerald-500/20"
              >
                <span>Earn Karma Power Tokens Free 🪙</span>
              </a>

              <button
                onClick={scrollToOverlay}
                className="px-6 py-3 bg-neutral-950 text-amber-400 hover:text-white hover:bg-black rounded-full font-sans font-black text-xs tracking-wider uppercase transition-all shadow-md active:scale-97 cursor-pointer text-center whitespace-nowrap inline-flex items-center gap-1.5 border border-neutral-900"
              >
                <span>Floating SWARM X Badge</span>
                <span className="text-xs">📸</span>
              </button>
              
              <a
                href="https://gravemint.io/mint/FXSVHzLvVFey57U8ETuhHzrzDRT3FhvqzbxWpyoAJA4c"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 bg-white text-black hover:bg-neutral-100 rounded-full font-sans font-black text-xs tracking-wider uppercase transition shadow-md active:scale-97 text-center whitespace-nowrap inline-flex items-center gap-2 border border-black/15 shadow-black/10"
              >
                <span>Mint Butterflies Now</span>
                <span className="text-xs">↗</span>
              </a>

              <p className="hidden xl:block text-xs italic font-bold text-black/80 font-mono leading-tight">
                starts with karma.
              </p>
            </div>
          </div>

          {/* Bento Box 3: Generative Art Display */}
          <div className="lg:col-span-4 bg-gradient-to-b from-[#111111] to-[#050505] border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-between min-h-[300px]">
            <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest self-start">
              Art Preview • Nexus Seed
            </span>
            <div className="my-4 animate-pulse-glow">
              <SvgButterfly variant="nexus" size={170} flappingSpeed="slow" seed="bento-home-core" />
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-gray-400">Generative Butterfly Nexus</p>
              <span className="text-[9px] font-mono text-gray-600 block mt-1">
                procedural canvas engine
              </span>
            </div>
          </div>

          {/* Bento Box 4: The Movement Narrative Checklist */}
          <div className="lg:col-span-8 bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300">
            <div>
              <div 
                onClick={() => { if (isNftSectionExpanded) setIsNftSectionExpanded(false); }}
                className={`flex items-center justify-between border-b border-white/5 pb-4 mb-6 select-none ${
                  isNftSectionExpanded ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''
                }`}
              >
                <span className="text-xs font-mono text-gray-550 uppercase tracking-widest font-bold">
                  Ecosystem Alignment
                  {isNftSectionExpanded && (
                    <span className="text-[10px] font-mono text-slate-500 lowercase ml-2 font-normal animate-pulse">
                      (click to close ×)
                    </span>
                  )}
                </span>
                <span className="text-[10px] bg-amber-500/15 px-2.5 py-0.5 rounded border border-[#F59E0B]/20 text-[#F59E0B] font-mono font-bold">
                  🦋 NFTs WITH A PURPOSE
                </span>
              </div>
              
              <div className="space-y-6">
                <AnimatePresence initial={false}>
                  {isNftSectionExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden space-y-6"
                    >
                      <div>
                        <span className="font-mono text-slate-500 text-[10px] uppercase tracking-wider block mb-1">WHO WE ARE</span>
                        <h3 className="text-xl sm:text-2xl font-sans font-black text-white tracking-tight leading-snug">
                          Karma Butterflies NFTs are for builders, creators, token creators, traders, marketers, communities but most of all believers in a better crypto space.
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <div className="space-y-4 bg-black/40 border border-white/5 p-5 rounded-2xl">
                          <span className="font-mono text-[#F59E0B] text-[10px] uppercase tracking-widest block font-extrabold">Ecosystem Family</span>
                          <p className="text-xs sm:text-sm leading-relaxed text-slate-300 font-medium">
                            Whether you’re a developer, marketer, project manager, community member, reply guy, trader, educator, or someone looking to learn, Karma Butterflies brings together people with different skills and experiences under one community.
                          </p>
                        </div>

                        <div className="space-y-4 bg-gradient-to-br from-amber-500/5 to-transparent border border-amber-500/15 p-5 rounded-2xl flex flex-col justify-between">
                          <div className="space-y-2">
                            <span className="font-mono text-emerald-400 text-[10px] uppercase tracking-widest block font-extrabold">Our Mission</span>
                            <p className="text-xs sm:text-sm leading-relaxed text-slate-300 font-medium">
                              Our mission is to uplift promising projects, support builders, educate newcomers, create meaningful connections, and help expose bad actors who harm the crypto ecosystem.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                        <span className="text-slate-550">
                          Status: Connecting skills to real-world impacts
                        </span>
                        <span className="text-[#F59E0B] font-black">
                          ★ SHAPING THE FUTURE TOGETHER
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  onClick={() => { if (!isNftSectionExpanded) setIsNftSectionExpanded(true); }}
                  disabled={isNftSectionExpanded}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/10 border border-[#F59E0B]/20 text-[10px] font-mono font-black text-[#F59E0B] tracking-wider uppercase self-start shadow-md shadow-amber-500/5 transition-all ${
                    !isNftSectionExpanded 
                      ? 'hover:scale-102 hover:bg-amber-500/20 cursor-pointer' 
                      : 'opacity-60 cursor-default'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
                  <span>🦋 NFTs WITH A PURPOSE {!isNftSectionExpanded && "• Open to read…"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Floating SWARM X Badge Section (col-span-12) */}
          <div className="lg:col-span-12 mt-2">
            <ProfileOverlay />
          </div>

        </div>
      </header>

      {/* High-Impact Karma Gamez Promotion */}
      <KarmaGamezAd />

      {/* Main Consolidated SwarmTerminal Dashboard */}
      <div id="analyzer" ref={analyzerRef}>
        <SwarmTerminal isLightMode={isLightMode} />
      </div>

      {/* Standalone FAQ Accordion Section */}
      <FAQ />

      {/* Bottom Final CTA Footer Block */}
      <footer className="bg-gradient-to-b from-[#08080a] via-[#030304] to-[#010102] border-t border-white/10 pt-20 pb-12 relative overflow-hidden">
        {/* Subtle background ambient glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#F59E0B]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#10B981]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Dedicated Narrative/Inspiration Block */}
          <div id="inspiration" className="mb-20 border-b border-white/5 pb-16">
            <div className="max-w-2xl mx-auto bg-gradient-to-br from-[#0B0B0D] to-[#050506] border border-white/5 p-8 sm:p-10 rounded-[32px] relative overflow-hidden text-center shadow-2xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#F59E0B]/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -inset-px rounded-[32px] bg-gradient-to-br from-white/10 to-transparent opacity-50 pointer-events-none" />
              
              <span className="text-[10px] font-mono text-[#F59E0B] uppercase tracking-[0.25em] font-black block mb-4">
                ORIGIN & TRANSCENDENCE
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight leading-snug mb-4">
                What Inspired Karma Butterflies?
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-8 max-w-md mx-auto">
                Discover the real struggle, resilience, and community transformation that turned a personal hardship into a powerful framework of digital trust.
              </p>
              
              <button
                type="button"
                onClick={() => setIsStoryOpen(true)}
                className="px-8 py-4 bg-gradient-to-r from-[#F59E0B] to-amber-500 hover:from-amber-400 hover:to-amber-500 text-black font-sans font-black text-xs uppercase tracking-widest rounded-2xl transition duration-300 shadow-xl shadow-amber-500/10 hover:shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.98] cursor-pointer inline-flex items-center gap-2.5"
              >
                <span>Read What Inspired Me</span>
                <span className="text-sm">🦋</span>
              </button>
            </div>
          </div>

          {/* Social Links Callout Section - Premium interactive deck */}
          <div className="mb-16 bg-[#09090B]/80 border border-white/5 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#F59E0B]/30 to-transparent" />
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-2 text-center lg:text-left">
                <span className="text-[10px] font-mono text-[#F59E0B] uppercase tracking-[0.2em] font-extrabold block">
                  COMMUNITY SWARM HUB
                </span>
                <h4 className="text-lg sm:text-xl font-display font-black text-white tracking-tight">
                  Join the Karma Reputation Revolution
                </h4>
                <p className="text-slate-400 text-xs sm:text-sm max-w-md">
                  Connect with fellow builders, track network reputation campaigns, and participate in exclusive holder updates across our official social channels.
                </p>
              </div>

              {/* High-Fidelity Social Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 w-full lg:w-auto shrink-0">
                {/* Official X Link */}
                <a 
                  href="https://x.com/karmascore_ai" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl bg-black border border-white/10 hover:border-[#F59E0B]/50 hover:bg-[#F59E0B]/5 text-white hover:text-[#F59E0B] transition-all duration-350 cursor-pointer group shadow-md"
                >
                  <Twitter className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                  <div className="text-left font-sans">
                    <span className="text-[9px] font-mono text-slate-500 block uppercase tracking-wider group-hover:text-[#F59E0B]/70 leading-none">OFFICIAL X</span>
                    <span className="text-xs font-bold font-sans tracking-wide block mt-0.5 text-white group-hover:text-white">@karmascore_ai</span>
                  </div>
                </a>

                {/* Telegram Link */}
                <a 
                  href="https://t.me/KarmaScore" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl bg-black border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/5 text-white hover:text-emerald-400 transition-all duration-350 cursor-pointer group shadow-md"
                >
                  <Send className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                  <div className="text-left font-sans">
                    <span className="text-[9px] font-mono text-slate-500 block uppercase tracking-wider group-hover:text-emerald-400/70 leading-none">TELEGRAM</span>
                    <span className="text-xs font-bold font-sans tracking-wide block mt-0.5 text-white group-hover:text-white">KarmaScore Hub</span>
                  </div>
                </a>

                {/* Discord Community Link */}
                <a 
                  href="https://discord.gg/BjZTJw6kTb" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl bg-black border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/5 text-white hover:text-cyan-400 transition-all duration-350 cursor-pointer group shadow-md"
                >
                  <MessageSquare className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                  <div className="text-left font-sans">
                    <span className="text-[9px] font-mono text-slate-500 block uppercase tracking-wider group-hover:text-cyan-400/70 leading-none">DISCORD HUB</span>
                    <span className="text-xs font-bold font-sans tracking-wide block mt-0.5 text-white group-hover:text-white">Join Swarm Chat</span>
                  </div>
                </a>

                {/* Token-Gated Discord Link */}
                <button 
                  onClick={() => setIsDiscordGatedOpen(true)}
                  className="flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl bg-neutral-900 border border-[#F59E0B]/30 hover:border-[#F59E0B] hover:bg-amber-950/20 text-white hover:text-[#F59E0B] transition-all duration-350 cursor-pointer group shadow-md"
                >
                  <Lock className="w-4 h-4 shrink-0 text-[#F59E0B] transition-transform group-hover:scale-110" />
                  <div className="text-left font-sans">
                    <span className="text-[9px] font-mono text-[#F59E0B] block uppercase tracking-wider group-hover:text-[#F59E0B]/70 leading-none font-extrabold">TOKEN GATED</span>
                    <span className="text-xs font-bold font-sans tracking-wide block mt-0.5 text-white group-hover:text-white">Must Have NFT 🔒</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Main Top footer rows */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start pb-16 border-b border-white/5">
            {/* Logo description */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#F59E0B]">
                  <span className="text-xs select-none">🦋</span>
                </div>
                <div>
                  <span className="text-white font-sans font-bold text-sm tracking-wide block leading-none">
                    Karma Butterflies
                  </span>
                  <span className="text-gray-500 font-mono text-[8px] uppercase tracking-[0.25em] mt-1.5 block">
                    The Cultural Layer Of Trust
                  </span>
                </div>
              </div>
              <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
                We are transitioning from the age of speculation to the age of credentialed reputation. Join the swarms to verify, reward, and protect what is built.
              </p>
              <div className="bg-amber-950/10 border border-[#F59E0B]/10 rounded-2xl p-4 max-w-sm space-y-1.5">
                <span className="text-[9px] font-mono text-[#F59E0B] uppercase tracking-[0.15em] block font-black">
                  🛡️ Multi-Chain Launchpad
                </span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Community NFT alignment launches will be on <strong className="text-slate-200 font-bold">Solana</strong>, <strong className="text-slate-200 font-bold">Hedera</strong>, <strong className="text-slate-200 font-bold">BSC</strong>, <strong className="text-slate-200 font-bold">Ethereum</strong>, and <strong className="text-slate-200 font-bold">Base</strong> network.
                </p>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em]">
                Jump To Section
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <a href="#inspiration" className="text-slate-400 hover:text-[#F59E0B] transition-colors">Inspiration</a>
                <a href="#duality" className="text-slate-400 hover:text-[#F59E0B] transition-colors">Duality</a>
                <a href="#utility" className="text-slate-400 hover:text-[#F59E0B] transition-colors">Utility</a>
                <a href="#roadmap" className="text-slate-400 hover:text-[#F59E0B] transition-colors">Roadmap</a>
                <a href="#team" className="text-slate-400 hover:text-[#F59E0B] transition-colors">Guardians</a>
                <a href="#faq" className="text-slate-400 hover:text-[#F59E0B] transition-colors">FAQ</a>
              </div>
            </div>

            {/* Powerful Vision recap */}
            <div className="md:col-span-4 space-y-4">
              <div className="bg-[#0B0B0D] border border-white/5 p-5 rounded-2xl space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                <h4 className="text-[10px] font-mono font-bold text-[#F59E0B] uppercase tracking-[0.2em]">
                  The Long-Term Vision
                </h4>
                <div className="space-y-2 font-sans text-xs">
                  <p className="text-slate-350"><strong className="text-white">KarmaScore:</strong> The reputation layer for builders.</p>
                  <p className="text-slate-350"><strong className="text-white">Karma Token:</strong> The decentralized economic utility layer.</p>
                  <p className="text-slate-350"><strong className="text-white">Karma Butterflies:</strong> The visual cultural identity layer.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright, standard labels */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-5 text-center text-slate-500 font-mono text-[9px] tracking-widest uppercase mt-4 border-t border-white/5">
            <div className="space-y-1.5 text-center md:text-left">
              <span>© 2026 KARMA BUTTERFLIES. ALL RIGHTS RESERVED.</span>
              <p className="text-slate-400 text-[10px] tracking-normal font-sans normal-case">
                {currentLang === 'es' && (
                  <>
                    Un producto de{' '}
                    <a href="https://ViloraLabs.xyz" target="_blank" rel="noreferrer" className="text-slate-200 font-semibold hover:text-[#F59E0B] hover:underline transition-colors">
                      Vilora Labs
                    </a>{' '}
                    • Respaldado por{' '}
                    <a href="https://karmascore.xyz" target="_blank" rel="noreferrer" className="text-[#F59E0B] font-bold hover:underline">
                      karmascore.xyz
                    </a>
                  </>
                )}
                {currentLang === 'zh' && (
                  <>
                    <a href="https://ViloraLabs.xyz" target="_blank" rel="noreferrer" className="text-slate-200 font-semibold hover:text-[#F59E0B] hover:underline transition-colors">
                      Vilora Labs
                    </a>{' '}
                    出品 • 由{' '}
                    <a href="https://karmascore.xyz" target="_blank" rel="noreferrer" className="text-[#F59E0B] font-bold hover:underline">
                      karmascore.xyz
                    </a>
                    {' '}提供支持
                  </>
                )}
                {currentLang === 'ja' && (
                  <>
                    <a href="https://ViloraLabs.xyz" target="_blank" rel="noreferrer" className="text-slate-200 font-semibold hover:text-[#F59E0B] hover:underline transition-colors">
                      Vilora Labs
                    </a>{' '}
                    の製品 •{' '}
                    <a href="https://karmascore.xyz" target="_blank" rel="noreferrer" className="text-[#F59E0B] font-bold hover:underline">
                      karmascore.xyz
                    </a>
                    {' '}による支援
                  </>
                )}
                {currentLang === 'en' && (
                  <>
                    A product from{' '}
                    <a href="https://ViloraLabs.xyz" target="_blank" rel="noreferrer" className="text-slate-200 font-semibold hover:text-[#F59E0B] hover:underline transition-colors">
                      Vilora Labs
                    </a>{' '}
                    • Backed by{' '}
                    <a href="https://karmascore.xyz" target="_blank" rel="noreferrer" className="text-[#F59E0B] font-bold hover:underline">
                      karmascore.xyz
                    </a>
                  </>
                )}
                {' '}•{' '}
                <button
                  type="button"
                  onClick={() => setIsTermsOpen(true)}
                  className="text-slate-300 hover:text-[#F59E0B] font-bold hover:underline cursor-pointer transition ml-1"
                >
                  Terms of Use – Disclaimer and Limitation of Liability
                </button>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-slate-400 text-xs tracking-normal font-sans normal-case shrink-0">
              {/* Interactive Language Selector */}
              <div className="flex items-center gap-1 bg-[#09090B] border border-white/5 rounded-xl px-2.5 py-1 text-[10px] font-sans font-bold">
                <Globe className="w-3.5 h-3.5 text-[#F59E0B] mr-1.5 shrink-0" />
                <button
                  type="button"
                  onClick={() => handleLanguageChange('en')}
                  className={`px-1.5 py-0.5 rounded transition cursor-pointer ${
                    currentLang === 'en' ? 'bg-[#F59E0B] text-black font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => handleLanguageChange('es')}
                  className={`px-1.5 py-0.5 rounded transition cursor-pointer ${
                    currentLang === 'es' ? 'bg-[#F59E0B] text-black font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Spanish (Español) - Scale Preview"
                >
                  ES
                </button>
                <button
                  type="button"
                  onClick={() => handleLanguageChange('zh')}
                  className={`px-1.5 py-0.5 rounded transition cursor-pointer ${
                    currentLang === 'zh' ? 'bg-[#F59E0B] text-black font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Chinese (中文) - Scale Preview"
                >
                  ZH
                </button>
                <button
                  type="button"
                  onClick={() => handleLanguageChange('ja')}
                  className={`px-1.5 py-0.5 rounded transition cursor-pointer ${
                    currentLang === 'ja' ? 'bg-[#F59E0B] text-black font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Japanese (日本語) - Scale Preview"
                >
                  JA
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* What Inspired Me Popup Modal */}
      {isStoryOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#090909] border border-white/10 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl p-6 sm:p-10 relative">
            {/* Close button icon */}
            <button 
              onClick={() => setIsStoryOpen(false)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all text-slate-400 hover:text-white cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Inspiration Header */}
            <div className="mb-8 border-b border-white/5 pb-5">
              <span className="text-[10px] font-mono text-[#F59E0B] uppercase tracking-widest font-black block mb-2">
                ORIGIN STORY & INSPIRATION
              </span>
              <h2 className="text-2.5xl sm:text-3xl font-display font-black text-white tracking-tight leading-tight">
                What Inspired Karma Butterflies
              </h2>
            </div>

            {/* Story Content */}
            <div className="space-y-6 text-sm sm:text-base leading-relaxed text-slate-300 font-sans tracking-wide">
              <p className="font-extrabold text-white text-lg">
                Karma Butterflies wasn’t born from a marketing plan.
              </p>
              
              <p className="font-bold text-amber-400">
                It was born from a powerful lesson in karma and transformation.
              </p>

              <blockquote className="border-l-2 border-[#F59E0B] pl-4 py-1 italic text-slate-200">
                A simple silence became the spark of realization.
              </blockquote>

              <p>
                Right before this project began, I found myself in a challenging situation with my wife. I had stopped talking to her for a while, letting silence build up between us. But then, she turned around and did the exact same thing back to me.
              </p>

              <p className="font-semibold text-slate-300">
                Experiencing that silent treatment firsthand, I didn’t like it at all.
              </p>

              <p>
                It was a powerful, immediate lesson in karma: what you put out into the world always finds its way back to you. Since she has always reminded me of a beautiful, delicate butterfly—graceful yet powerful in her presence—this profound personal experience became the spark of inspiration.
              </p>

              <p>
                At the time, I was already documenting parts of my journey inside my Telegram community through messages, videos, and conversations. The people there saw the struggle in real time. They saw the uncertainty, the disappointment, and the questions that followed.
              </p>

              <p>
                As the community came together to support, encourage, and help each other, they showed me how adversity doesn't have to breed resentment. It can breed transformation.
              </p>

              <p className="font-bold text-white">
                But they also saw something else.
              </p>

              <p className="font-black text-xl text-emerald-400 select-none">
                They saw a community come together.
              </p>

              <p>
                People from across the crypto space reached out with encouragement, support, and kindness. Many of them were strangers. Some became friends. A few became teammates.
              </p>

              <p className="text-[#F59E0B] font-bold">
                They reminded me that pain doesn’t have to create bitterness.
              </p>

              <p className="font-extrabold text-white">
                It can create growth.
              </p>

              <p>
                That idea became the foundation of Karma Butterflies.
              </p>

              <p>
                A butterfly represents transformation. Not because life is perfect, but because challenges can change us into something stronger. The light and dark butterflies represent the reality that both joy and hardship shape who we become.
              </p>

              <p>
                Karma Butterflies is a reminder that every action matters. Every act of kindness creates a ripple. Every setback creates an opportunity to grow. Every person we meet leaves a mark on our journey.
              </p>

              <p className="font-medium text-slate-300">
                This project is dedicated to everyone who helped me keep moving forward when it would have been easier to quit.
              </p>

              {/* Poetic concluding quotes */}
              <div className="mt-8 pt-6 border-t border-white/5 space-y-2 text-center bg-amber-500/5 p-5 rounded-2xl border border-amber-500/10">
                <p className="text-base sm:text-lg font-black text-white italic tracking-tight">
                  “The community became the wings.”
                </p>
                <p className="text-base sm:text-lg font-black text-white italic tracking-tight">
                  “The journey became the butterfly.”
                </p>
                <p className="text-[#F59E0B] text-base sm:text-lg font-black italic tracking-tight">
                  “And the lesson became karma.”
                </p>
              </div>
            </div>

            {/* Share and Close actions bar */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-extrabold flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5 text-[#F59E0B]" />
                  Share Story:
                </span>
                
                {/* Copy Link button */}
                <button
                  type="button"
                  onClick={copyStoryLink}
                  className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-mono font-bold text-slate-300 hover:text-white flex items-center gap-1.5 transition cursor-pointer"
                  title="Copy direct story link"
                >
                  {isLinkCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Link className="w-3.5 h-3.5" />
                      <span>Copy link</span>
                    </>
                  )}
                </button>

                {/* Share on X button */}
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    "Discover what inspired Karma Butterflies 🦋—Turning positive action and community power into reputation."
                  )}&url=${encodeURIComponent(
                    typeof window !== "undefined" ? window.location.href : "https://karmabutterflies.com"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-mono font-bold text-slate-300 hover:text-[#1DA1F2] flex items-center gap-1.5 transition cursor-pointer"
                  title="Share on X"
                >
                  <Twitter className="w-3.5 h-3.5 text-[#1DA1F2]" />
                  <span>Post to X</span>
                </a>
              </div>

              <button 
                onClick={() => setIsStoryOpen(false)}
                className="w-full sm:w-auto px-6 py-2.5 bg-white text-black hover:bg-slate-250 transition font-sans font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-lg hover:scale-102"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Terms of Use – Disclaimer and Limitation of Liability Modal */}
      {isTermsOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#090909] border border-white/10 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl p-6 sm:p-10 relative">
            {/* Close button icon */}
            <button 
              onClick={() => setIsTermsOpen(false)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all text-slate-400 hover:text-white cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Terms Header */}
            <div className="mb-8 border-b border-white/5 pb-5">
              <span className="text-[10px] font-mono text-[#F59E0B] uppercase tracking-widest font-black block mb-2">
                OFFICIAL DISCLAIMER
              </span>
              <h2 className="text-2.5xl sm:text-3xl font-sans font-black text-white tracking-tight leading-tight">
                Terms of Use – Disclaimer & Liability Limitation
              </h2>
            </div>

            {/* Terms Content */}
            <div className="space-y-6 text-sm text-slate-300 font-sans tracking-wide">
              
              <div className="space-y-2 p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl">
                <span className="text-[10px] font-mono font-bold text-[#F59E0B] uppercase tracking-wider block">IMPORTANT PROTOCOL DISCLOSURES</span>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Please review this platform disclaimer meticulously. By accessing and interacting with Karma Butterflies and associated modules, you agree to the conditions defined below.
                </p>
              </div>

              {/* Point 1 */}
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-[#F59E0B] font-mono">1.</span> Informational Purposes Only
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Karma Butterflies provides commentary, visibility, discussion, and general information for informational and educational purposes only. Nothing on this platform constitutes financial, investment, legal, or trading advice.
                </p>
              </div>

              {/* Point 2 */}
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-[#F59E0B] font-mono">2.</span> No Endorsement or Recommendation
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Any reference to, discussion of, or visibility given to a project, asset, individual, or activity does not constitute an endorsement, solicitation, recommendation, guarantee, or verification of legitimacy, performance, or value.
                </p>
              </div>

              {/* Point 3 */}
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-[#F59E0B] font-mono">3.</span> Opinions, Not Statements of Fact
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  All content reflects independent opinions, observations, and community perspectives based on publicly available information or voluntary disclosures. Karma Butterflies does not present allegations, determinations of wrongdoing, or statements of fact.
                </p>
              </div>

              {/* Point 4 */}
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-[#F59E0B] font-mono">4.</span> No Market Influence or Coordination
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Karma Butterflies does not coordinate trades, organize buying or selling activity, influence market prices, provide signals, or engage in collective market behavior. Any actions taken by users or third parties are independent and voluntary.
                </p>
              </div>

              {/* Point 5 */}
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-[#F59E0B] font-mono">5.</span> No Fiduciary or Advisory Relationship
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Use of this platform does not create any fiduciary, advisory, broker, promoter, partnership, or agency relationship between Karma Butterflies and any user or third party.
                </p>
              </div>

              {/* Point 6 */}
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-[#F59E0B] font-mono">6.</span> Assumption of Risk
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Users acknowledge that participation in blockchain, digital assets, and online ecosystems involves significant risk. Users assume full responsibility for their decisions, actions, and outcomes.
                </p>
              </div>

              {/* Point 7 */}
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-[#F59E0B] font-mono">7.</span> Limitation of Liability
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  To the fullest extent permitted by law, Karma Butterflies and its operators disclaim all liability for any direct, indirect, incidental, consequential, or special damages, losses, or claims arising from the use of, reliance on, or interaction with the platform or its content.
                </p>
              </div>

              {/* Point 8 */}
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-[#F59E0B] font-mono">8.</span> No Guarantees
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Karma Butterflies makes no representations or warranties regarding accuracy, completeness, reliability, outcomes, or future performance of any information or discussion presented.
                </p>
              </div>

            </div>

            {/* Close footer button */}
            <div className="mt-8 pt-5 border-t border-white/5 flex justify-end">
              <button 
                onClick={() => setIsTermsOpen(false)}
                className="px-6 py-2.5 bg-white text-black hover:bg-slate-200 transition font-sans font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
              >
                Accept and Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3-Second Scroll/Time Promo Card */}
      <AnimatePresence>
        {showPromo && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[#111111]/95 backdrop-blur-md border border-[#F59E0B]/40 p-5 rounded-2xl shadow-[0_10px_40px_rgba(245,158,11,0.15)] flex flex-col gap-3.5"
          >
            {/* Close */}
            <button
              onClick={() => setShowPromo(false)}
              className="absolute top-3.5 right-3.5 text-slate-500 hover:text-white transition cursor-pointer"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-[#F59E0B]/30 flex items-center justify-center text-2xl shrink-0 animate-pulse">
                🦋
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-[#F59E0B] uppercase tracking-[0.2em] font-extrabold flex items-center gap-1.5">
                  <span>SWARM EVENT LIVE</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                </span>
                <h4 className="text-sm font-sans font-black text-white tracking-tight">
                  Scan & Mint Butterflies Now!
                </h4>
              </div>
            </div>

            <p className="text-slate-350 text-xs leading-relaxed font-sans font-medium">
              Transform your on-chain journey into reputation. Every action leaves a wingbeat. Join the swarms of self-purifying digital karma.
            </p>

            <div className="flex items-center gap-2.5 pt-2.5 border-t border-white/5">
              <button
                onClick={() => {
                  setShowPromo(false);
                  scrollToAnalyzer();
                }}
                className="flex-1 py-2 bg-neutral-900 border border-white/10 hover:bg-neutral-800 text-white font-sans font-bold text-[10px] uppercase tracking-wider rounded-lg transition-all text-center cursor-pointer"
              >
                Scan First
              </button>
              <a
                href="https://gravemint.io/mint/FXSVHzLvVFey57U8ETuhHzrzDRT3FhvqzbxWpyoAJA4c"
                target="_blank"
                rel="noreferrer"
                onClick={() => setShowPromo(false)}
                className="flex-1 py-2 bg-[#F59E0B] hover:bg-amber-400 text-black font-sans font-black text-[10px] uppercase tracking-wider rounded-lg transition-all text-center flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Mint Now</span>
                <span>↗</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Token Gated Discord Popup Modal */}
      {isDiscordGatedOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#090909] border border-amber-500/30 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative">
            {/* Ambient orange glow background */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-white/10 to-transparent opacity-50 pointer-events-none" />

            {/* Close button icon */}
            <button 
              onClick={() => setIsDiscordGatedOpen(false)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all text-slate-400 hover:text-white cursor-pointer z-10"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8 relative">
              {/* Icon badge */}
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-[#F59E0B]/30 flex items-center justify-center text-3xl mb-6 shadow-md shadow-amber-500/5 animate-bounce">
                🔒
              </div>

              {/* Header */}
              <span className="text-[10px] font-mono text-[#F59E0B] uppercase tracking-[0.25em] font-black block mb-2">
                EXCLUSIVITY PROTOCOL
              </span>
              <h3 className="text-2xl font-display font-black text-white tracking-tight leading-tight mb-4 uppercase">
                Token-Gated Discord Swarm
              </h3>

              {/* Instructions */}
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-semibold">
                To access the exclusive, restricted holder-only channels in our Discord community, you must own at least one <strong className="text-[#F59E0B]">Karma Butterfly NFT</strong>.
              </p>

              <div className="bg-black/50 border border-white/5 p-4 rounded-xl space-y-3 mb-6 font-sans text-xs sm:text-[13px] text-slate-400">
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-mono font-black text-[#F59E0B] shrink-0 mt-0.5">1</span>
                  <p className="leading-relaxed">Join our Discord community server via the official link below.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-mono font-black text-[#F59E0B] shrink-0 mt-0.5">2</span>
                  <p className="leading-relaxed">Navigate to the <strong className="text-white font-bold">#verify-wallet</strong> channel where our bot scans your Solana wallet.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-mono font-black text-[#F59E0B] shrink-0 mt-0.5">3</span>
                  <p className="leading-relaxed">Verify your holding to claim your <strong className="text-white font-bold">Swarm Elder</strong> role and unlock secret alpha, dev channels, and holder-only perks.</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <a
                  href="https://discord.gg/BjZTJw6kTb"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsDiscordGatedOpen(false)}
                  className="w-full sm:flex-1 py-3.5 bg-[#F59E0B] hover:bg-amber-400 text-black font-sans font-black text-xs uppercase tracking-widest rounded-xl transition duration-300 shadow-xl shadow-amber-500/10 hover:shadow-amber-500/20 text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Connect & Join Server</span>
                  <span>↗</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsDiscordGatedOpen(false)}
                  className="w-full sm:w-auto px-5 py-3.5 bg-neutral-900 border border-white/10 hover:bg-neutral-800 text-white font-sans font-bold text-xs uppercase tracking-widest rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

