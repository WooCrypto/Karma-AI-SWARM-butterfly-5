import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Scan,
  Sparkles,
  Coins,
  BookOpen,
  Users,
  ChevronDown,
  ArrowRight,
  TrendingUp,
  Award,
  Heart
} from 'lucide-react';

import WalletAnalyzer from './WalletAnalyzer';
import ButterflyRegistry from './ButterflyRegistry';
import BroadbandTreasury from './TreasuryPool';
import UtilitySection from './UtilitySection';
import Roadmap from './Roadmap';
import WhyKarmaExist from './WhyKarmaExist';
import DualitySection from './DualitySection';
import ManifestoSection from './ManifestoSection';
import TeamBios from './TeamBios';
import FAQ from './FAQ';
import KarmaCreed from './KarmaCreed';

export type TerminalTab = 'scanner' | 'nfts' | 'vault' | 'creed' | 'manifesto' | 'guardians';

interface SwarmTerminalProps {
  isLightMode: boolean;
}

export default function SwarmTerminal({ isLightMode }: SwarmTerminalProps) {
  const [activeTab, setActiveTab] = useState<TerminalTab>('scanner');
  const terminalRef = useRef<HTMLDivElement>(null);

  // Auto-switch tabs based on page scroll / window hash
  useEffect(() => {
    const handleHashAndEvents = (isInitial = false) => {
      const hash = window.location.hash.toLowerCase();
      if (!hash || hash === '#') return;

      let matchedTab: TerminalTab | null = null;
      const targetId = window.location.hash.slice(1);

      if (hash === '#analyzer') {
        matchedTab = 'scanner';
      } else if (hash === '#registry' || hash === '#profile-overlay') {
        matchedTab = isInitial ? 'scanner' : 'nfts';
      } else if (hash === '#creed' || hash === '#karma-creed' || hash === '#karma-creed-section') {
        matchedTab = 'creed';
      } else if (hash === '#treasury' || hash === '#utility' || hash === '#roadmap') {
        matchedTab = 'vault';
      } else if (hash === '#duality' || hash === '#narrative' || hash === '#why-karma' || hash === '#manifesto') {
        matchedTab = 'manifesto';
      } else if (hash === '#team' || hash === '#faq' || hash === '#guardians') {
        matchedTab = 'guardians';
      }

      if (matchedTab) {
        setActiveTab(matchedTab);
      }

      // If it's the initial load, do not scroll anywhere, let App.tsx control initial scroll position
      if (isInitial) {
        return;
      }

      // Smooth scroll to direct section ID if exists
      setTimeout(() => {
        const element = targetId ? document.getElementById(targetId) : null;
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (terminalRef.current && hash !== '#profile-overlay') {
          // Only fallback to terminal if the hash wasn't specifically targeting profile-overlay
          terminalRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    };

    // Listen to why-karma-view custom dispatchers
    const handleCustomWhyKarma = (e: Event) => {
      const customEvent = e as CustomEvent;
      const detail = customEvent.detail || {};
      let targetId = '';
      if (detail.view === 'pillars') {
        setActiveTab('manifesto');
        targetId = 'why-karma';
      } else if (detail.view === 'utility') {
        setActiveTab('vault');
        targetId = 'utility';
      }
      
      setTimeout(() => {
        const element = targetId ? document.getElementById(targetId) : null;
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (terminalRef.current) {
          terminalRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    };

    window.addEventListener('hashchange', () => handleHashAndEvents(false));
    window.addEventListener('set-why-karma-view', handleCustomWhyKarma);
    
    // Check initial hash on load (pass true for isInitial)
    handleHashAndEvents(true);

    return () => {
      window.removeEventListener('hashchange', () => handleHashAndEvents(false));
      window.removeEventListener('set-why-karma-view', handleCustomWhyKarma);
    };
  }, []);

  const tabDetails = [
    {
      id: 'scanner' as TerminalTab,
      label: 'Karma Score Hub',
      desc: 'Check Your Score',
      icon: Scan,
      accentColor: 'text-[#F59E0B]',
      activeBg: 'bg-[#F59E0B]',
      borderColor: 'border-[#F59E0B]'
    },
    {
      id: 'nfts' as TerminalTab,
      label: 'Butterfly NFT Hub',
      desc: 'Art, PFP Customization',
      icon: Sparkles,
      accentColor: 'text-rose-400',
      activeBg: 'bg-rose-500',
      borderColor: 'border-rose-500'
    },
    {
      id: 'creed' as TerminalTab,
      label: 'The Karma Way',
      desc: 'We Build For Good Karma',
      icon: Heart,
      accentColor: 'text-amber-400',
      activeBg: 'bg-amber-500',
      borderColor: 'border-amber-500'
    },
    {
      id: 'vault' as TerminalTab,
      label: 'Vault & Utilities',
      desc: 'Treasury Pool & Roadmap',
      icon: Coins,
      accentColor: 'text-emerald-400',
      activeBg: 'bg-emerald-500',
      borderColor: 'border-emerald-500'
    },
    {
      id: 'manifesto' as TerminalTab,
      label: 'Creed & Manifesto',
      desc: 'Reputation Pillars',
      icon: BookOpen,
      accentColor: 'text-purple-400',
      activeBg: 'bg-purple-500',
      borderColor: 'border-purple-500'
    },
    {
      id: 'guardians' as TerminalTab,
      label: 'Guardians & FAQ',
      desc: 'Team & Core Support',
      icon: Users,
      accentColor: 'text-cyan-400',
      activeBg: 'bg-cyan-500',
      borderColor: 'border-cyan-500'
    }
  ];

  const handleTabClick = (tabId: TerminalTab) => {
    setActiveTab(tabId);
    if (terminalRef.current) {
      terminalRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div 
      ref={terminalRef} 
      id="swarm-console-terminal" 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative"
    >
      {/* Decorative side blurs for modern glow */}
      <div className="absolute top-1/3 left-0 w-80 h-80 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 rounded-full bg-[#ec4899]/5 blur-3xl pointer-events-none" />

      {/* Terminal Segment Header for NFT Lovers */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-white/10 pb-6 mb-10 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-neutral-900 border border-white/10 text-[10px] font-mono text-[#F59E0B] tracking-wider uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-ping" />
            SWARM CONSOLE v1.8.4
          </div>
          <h2 className="text-3xl sm:text-4.5xl font-display font-black tracking-tight uppercase text-white">
            KARMA SWARM COMMAND
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl font-semibold leading-relaxed">
            Unifying our digital blueprint. Tap into any system matrix block below to forge PFPs, audit alignments, and harvest collective treasury metrics.
          </p>
        </div>

        {/* Console stats widgets */}
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 font-mono text-[10px]">
          <div className="bg-neutral-900/40 border border-white/5 rounded-xl px-4 py-2.5 shrink-0 flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <div>
              <p className="text-slate-500 uppercase leading-none font-bold">SWARM STATUS</p>
              <p className="text-white font-extrabold mt-0.5">SELF-PURIFYING</p>
            </div>
          </div>
          
          <div className="bg-neutral-900/40 border border-white/5 rounded-xl px-4 py-2.5 shrink-0 flex items-center gap-2.5">
            <Award className="w-4 h-4 text-[#F59E0B]" />
            <div>
              <p className="text-slate-500 uppercase leading-none font-bold">GUARDS</p>
              <p className="text-[#F59E0B] font-extrabold mt-0.5">888 UNIQUE BUTTERFLIES</p>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Tab bar */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 bg-[#0a0a0c]/80 border border-white/5 p-1.5 rounded-2.5xl mb-8 shadow-inner relative z-20">
        {tabDetails.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`relative col-span-1 py-4 px-3 rounded-2xl transition-all duration-300 flex flex-col items-center justify-center text-center group cursor-pointer overflow-hidden ${
                isActive 
                  ? 'bg-neutral-900 border border-white/10 shadow-lg shadow-black/60 scale-[1.02] z-10' 
                  : 'hover:bg-neutral-900/40 border border-transparent'
              }`}
            >
              {/* Active Underline glow */}
              {isActive && (
                <motion.div 
                  layoutId="activeTabGlow"
                  className={`absolute bottom-0 left-4 right-4 h-[2px] ${tab.activeBg} blur-[1px]`} 
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}

              <Icon className={`w-5 h-5 mb-1.5 transition-transform duration-300 group-hover:scale-110 ${isActive ? tab.accentColor : 'text-slate-400 group-hover:text-amber-400'}`} />
              <span className={`text-[10px] font-sans font-black tracking-wider uppercase block leading-tight ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                {tab.label}
              </span>
              <span className="text-[8px] font-mono font-medium text-slate-500 mt-0.5 leading-none block uppercase">
                {tab.desc}
              </span>
            </button>
          );
        })}
      </div>

      {/* Interactive Tabs Content */}
      <div className="relative overflow-hidden min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="w-full relative z-10"
          >
            {/* TAB CONTENT: SCANNER */}
            {activeTab === 'scanner' && (
              <div id="scanner-tab-content" className="space-y-6">
                <WalletAnalyzer />
              </div>
            )}

            {/* TAB CONTENT: BF NFTS */}
            {activeTab === 'nfts' && (
              <div id="nfts-tab-content" className="space-y-8">
                {/* Intro box */}
                <div id="registry-intro-banner" className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center relative overflow-hidden mb-2 shadow-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 blur-3xl pointer-events-none" />
                  <div className="space-y-2 max-w-2xl">
                    <span className="text-[10px] font-mono text-rose-400 uppercase tracking-[0.2em] font-extrabold block">
                      BUTTERFLIES ECOSYSTEM HUB
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight">
                      The Butterfly Collection & Avatar Suite
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm font-semibold leading-relaxed">
                      Unlock generative metadata combinations, inspect procedural seeds, and use the social media Add Floating X Badge Suite with dynamic layers. Set custom background frames to stand out on social media platforms.
                    </p>
                  </div>
                  <a
                    href="https://gravemint.io/mint/FXSVHzLvVFey57U8ETuhHzrzDRT3FhvqzbxWpyoAJA4c"
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 bg-rose-500 hover:bg-rose-400 text-white rounded-xl font-sans font-black text-[10px] tracking-wider uppercase transition shadow-lg shadow-rose-500/10 flex items-center gap-1.5 shrink-0"
                  >
                    <span>MINT PORTAL</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                <ButterflyRegistry />
              </div>
            )}

            {/* TAB CONTENT: VAULT UTILITIES */}
            {activeTab === 'vault' && (
              <div id="vault-tab-content" className="space-y-8">
                {/* Intro box */}
                <div id="treasury-intro-banner" className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center relative overflow-hidden mb-2 shadow-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-3xl pointer-events-none" />
                  <div className="space-y-2 max-w-2xl">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-[0.2em] font-extrabold block">
                      FINANCIAL HARMONICS ARCHITECTURE
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight">
                      Karma Vault & Collective Allocations
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm font-semibold leading-relaxed">
                      Explore our active USDT Liquidity Pool backed by actual transaction fees, review holder perks, and read the chronological roadmap driving multi-chain expansions.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-emerald-950/20 border border-emerald-500/20 text-[10px] font-mono font-black text-emerald-400 px-3.5 py-1.5 rounded-xl">
                    <Coins className="w-3.5 h-3.5 animate-bounce" />
                    <span>$USDT COLLECTIVE HEALTH</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-6">
                    <BroadbandTreasury />
                  </div>
                  <div className="lg:col-span-6">
                    <UtilitySection />
                  </div>
                </div>

                <div className="pt-6">
                  <Roadmap />
                </div>
              </div>
            )}

            {/* TAB CONTENT: THE KARMA CREED */}
            {activeTab === 'creed' && (
              <div id="creed" className="space-y-8">
                {/* Intro box */}
                <div id="karma-creed-intro-banner" className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center relative overflow-hidden mb-2 shadow-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-3xl pointer-events-none" />
                  <div className="space-y-2 max-w-2xl font-semibold">
                    <span className="text-[10px] font-mono text-[#F59E0B] uppercase tracking-[0.2em] font-extrabold block">
                      OUR SOVEREIGN MANIFESTO
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight">
                      We Don't Ask For Payment
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      At Karma Butterflies, we help projects, support builders, and uplift communities unconditionally because we believe in karma. Read our creed rules below.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-950/20 border border-[#F59E0B]/25 text-[10px] font-mono text-[#F59E0B] tracking-wider font-extrabold shrink-0">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
                    <span>CONTRIBUTION FIRST</span>
                  </div>
                </div>

                <KarmaCreed isLightMode={isLightMode} />
              </div>
            )}

            {/* TAB CONTENT: CREED */}
            {activeTab === 'manifesto' && (
              <div id="manifesto-tab-content" className="space-y-8">
                {/* Intro box */}
                <div id="why-karma-intro-banner" className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center relative overflow-hidden mb-2 shadow-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-3xl pointer-events-none" />
                  <div className="space-y-2 max-w-2xl font-semibold">
                    <span className="text-[10px] font-mono text-purple-400 uppercase tracking-[0.2em] font-extrabold block">
                      MANDATE OF REPUTATION
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight">
                      Creed pillars & Duality Matrix
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      Every soul carries light and shadow. Read our core design duality matrix and the values system representing our sovereign ecosystem protocol.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-950/20 border border-purple-500/25 text-[10px] font-mono text-purple-400 tracking-wider font-extrabold shrink-0">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>SYSTEM MANIFESTO</span>
                  </div>
                </div>

                <WhyKarmaExist />
                
                <div className="grid grid-cols-1 gap-8 pt-4">
                  <DualitySection />
                </div>

                <div className="pt-6">
                  <ManifestoSection />
                </div>
              </div>
            )}

            {/* TAB CONTENT: GUARDIANS */}
            {activeTab === 'guardians' && (
              <div id="guardians" className="space-y-8">
                {/* Intro box */}
                <div id="team-intro-banner" className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center relative overflow-hidden mb-2 shadow-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-3xl pointer-events-none" />
                  <div className="space-y-2 max-w-2xl">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.2em] block font-extrabold">
                      SUPPORT & GUARDIANS MATRIX
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight">
                      Ecosystem Guardians & Community Help
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm font-semibold leading-relaxed">
                      Meet the community guardians steering the swarm, or reference our comprehensive protocols FAQ to answer your questions.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-950/20 border border-cyan-500/25 text-[10px] font-mono text-cyan-400 tracking-wider font-extrabold shrink-0">
                    <Users className="w-3.5 h-3.5" />
                    <span>GUARDIAN SWARM</span>
                  </div>
                </div>

                <TeamBios />

                <div id="terminal-faq-nested" className="pt-6 border-t border-white/5">
                  <FAQ isNested />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
