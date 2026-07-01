import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Sparkles, 
  ArrowRight, 
  Users, 
  Award, 
  Flame, 
  HelpingHand, 
  Coins, 
  Lock, 
  TrendingUp, 
  Zap, 
  Layers, 
  HelpCircle, 
  CheckCircle2, 
  ShieldAlert 
} from 'lucide-react';
import SvgButterfly from './SvgButterfly';

export default function WhyKarmaExist() {
  const [viewMode, setViewMode] = useState<'utility' | 'pillars'>('utility');
  const [activeTab, setActiveTab] = useState<'support' | 'uplift' | 'impact' | 'help'>('support');

  useEffect(() => {
    const handleSetView = (e: any) => {
      if (e.detail) {
        if (e.detail.view) setViewMode(e.detail.view);
        if (e.detail.tab) setActiveTab(e.detail.tab);
        
        // Let it render first, then scroll cleanly
        setTimeout(() => {
          const el = document.getElementById('why-karma');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 50);
      }
    };
    
    window.addEventListener('set-why-karma-view', handleSetView);
    return () => window.removeEventListener('set-why-karma-view', handleSetView);
  }, []);

  const tabsContent = {
    support: {
      title: 'Support Others',
      icon: Heart,
      color: 'amber',
      tagline: 'Lending a hand when it matters most.',
      description: 'We believe no one should navigate the space alone. Whether you need guidance or want to lift someone up, we build the networks that bridge help and hope. We actively help those who need it.',
      perks: ['Provides peer-to-peer mentoring', 'Direct community outreach programs', 'Tracks altruistic assistance footprints'],
      butterflyVariant: 'light' as const,
      butterflySeed: 'support-impact-karma',
      evolved: false
    },
    uplift: {
      title: 'Uplift Projects',
      icon: Sparkles,
      color: 'emerald',
      tagline: 'Amplifying high-integrity builders.',
      description: 'Honest creators deserve the spotlight. We give emerging developers the graphics, strategy drafts, and exposure needed to rise above the noise of bad actors.',
      perks: ['Free design & media refinement drafts', 'Co-marketing with verified networks', 'Accountability and security vetting'],
      butterflyVariant: 'nexus' as const,
      butterflySeed: 'uplift-growth-matrix',
      evolved: true
    },
    impact: {
      title: 'Create Lasting Impact',
      icon: Award,
      color: 'purple',
      tagline: 'Leaving a legendary legacy behind.',
      description: 'Your actions are your true currency. Every constructive gesture, pull request, and polite discussion builds an indestructible chain of reputation.',
      perks: ['On-chain reputation credentialing', 'Milestone badges & active status cards', 'Long-term ecosystem voting alignment'],
      butterflyVariant: 'shadow' as const,
      butterflySeed: 'legacy-reputation-engine',
      evolved: true
    },
    help: {
      title: 'Help for those in Need',
      icon: HelpingHand,
      color: 'cyan',
      tagline: 'Because everyone deserves wings.',
      description: 'We prioritize real human connection over transactions. If you are struggling, trying to learn, or facing difficulties, we step in to provide support, spotlight, and resources.',
      perks: ['Open-door developer assistance', 'Safe spaces for educational support', 'Targeted ecosystem resources'],
      butterflyVariant: 'light' as const,
      butterflySeed: 'assistance-help-hand',
      evolved: true
    }
  };

  const current = tabsContent[activeTab];

  // Helper classes for pillar color styling
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'emerald':
        return {
          text: 'text-emerald-400',
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/20',
          activeBg: 'bg-emerald-500 text-black',
          glow: 'shadow-emerald-500/10',
          accent: '#10B981',
          badge: 'bg-emerald-500/10 text-emerald-400'
        };
      case 'purple':
        return {
          text: 'text-purple-400',
          bg: 'bg-purple-500/10',
          border: 'border-purple-500/20',
          activeBg: 'bg-purple-500 text-white',
          glow: 'shadow-purple-500/10',
          accent: '#A78BFA',
          badge: 'bg-purple-500/10 text-purple-400'
        };
      case 'cyan':
        return {
          text: 'text-cyan-400',
          bg: 'bg-cyan-500/10',
          border: 'border-cyan-500/20',
          activeBg: 'bg-cyan-500 text-black',
          glow: 'shadow-cyan-500/10',
          accent: '#22D3EE',
          badge: 'bg-cyan-500/10 text-cyan-400'
        };
      case 'amber':
      default:
        return {
          text: 'text-[#F59E0B]',
          bg: 'bg-amber-500/10',
          border: 'border-amber-500/20',
          activeBg: 'bg-[#F59E0B] text-black',
          glow: 'shadow-amber-500/10',
          accent: '#F59E0B',
          badge: 'bg-amber-500/10 text-[#F59E0B]'
        };
    }
  };

  const style = getColorClasses(current.color);

  return (
    <section id="why-karma" className="py-24 relative overflow-hidden bg-[#050505] border-t border-b border-white/10">
      {/* Decorative Grid and Ambient Lights */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-35 pointer-events-none" />
      <div className="absolute -bottom-10 right-10 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
      <div className="absolute -top-10 left-10 w-96 h-96 rounded-full bg-cyan-700/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Block */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="text-[10px] font-mono text-[#F59E0B] uppercase tracking-[0.25em] font-extrabold flex items-center justify-center gap-1.5 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
            <span>COMMUNITY COHESION & HOLDER UTILITY</span>
          </span>
          <h2 className="text-3xl sm:text-4.5xl font-sans font-black text-white tracking-tight leading-tight">
            Why Karma Butterflies Exist
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
            We bridge deep community support with exclusive, high-integrity opportunities. Click the tabs below to explore our purpose or holder architecture.
          </p>
        </div>

        {/* High-Level Switcher - BIG & BOLD TO CLICK */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-14 max-w-4xl mx-auto">
          {/* Why Karma Butterflies Tab Indicator - BIG, BOLD, AND ACTIVE BY DEFAULT */}
          <button
            onClick={() => setViewMode('utility')}
            className={`w-full md:w-1/2 p-5 rounded-3xl border text-left transition-all duration-300 relative overflow-hidden group cursor-pointer ${
              viewMode === 'utility'
                ? 'border-amber-500/80 bg-neutral-900/85 shadow-[0_0_30px_rgba(245,158,11,0.2)] scale-[1.03] z-10'
                : 'border-white/5 bg-black/40 hover:border-white/15 hover:bg-neutral-900/60'
            }`}
          >
            {/* Glowing active banner */}
            <div className={`absolute top-0 right-0 px-3.5 py-1 text-[8px] font-mono uppercase tracking-widest font-black rounded-bl-xl transition-all duration-300 ${
              viewMode === 'utility' ? 'bg-[#F59E0B] text-black animate-pulse' : 'bg-white/5 text-slate-500'
            }`}>
              {viewMode === 'utility' ? '🔥 MAIN ADVANTAGE' : 'HOLDER PERKS'}
            </div>

            <div className="flex items-start gap-3 mt-1">
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
                viewMode === 'utility' ? 'bg-[#F59E0B]/20 text-[#F59E0B]' : 'bg-white/5 text-slate-400'
              }`}>
                <Coins className="w-5.5 h-5.5" />
              </div>
              <div>
                <span className="block font-sans font-black text-lg sm:text-xl text-white tracking-tight leading-none">
                  Why Karma Butterflies?
                </span>
                <span className="block text-xs font-mono text-slate-400 mt-1.5 uppercase tracking-wide group-hover:text-amber-400 transition-colors">
                  Insider opportunities & revenue options
                </span>
              </div>
            </div>
          </button>

          {/* Social Pillars Tab Indicator */}
          <button
            onClick={() => setViewMode('pillars')}
            className={`w-full md:w-1/2 p-5 rounded-3xl border text-left transition-all duration-300 relative overflow-hidden group cursor-pointer ${
              viewMode === 'pillars'
                ? 'border-emerald-500/80 bg-neutral-900/85 shadow-[0_0_30px_rgba(16,185,129,0.2)] scale-[1.03] z-10'
                : 'border-white/5 bg-black/40 hover:border-white/15 hover:bg-neutral-900/60'
            }`}
          >
            <div className={`absolute top-0 right-0 px-3.5 py-1 text-[8px] font-mono uppercase tracking-widest font-black rounded-bl-xl transition-all duration-300 ${
              viewMode === 'pillars' ? 'bg-emerald-500 text-black animate-pulse' : 'bg-white/5 text-slate-500'
            }`}>
              {viewMode === 'pillars' ? '✨ ACTIVE VISION' : 'SOCIAL PILLARS'}
            </div>

            <div className="flex items-start gap-3 mt-1">
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
                viewMode === 'pillars' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-slate-400'
              }`}>
                <Sparkles className="w-5.5 h-5.5" />
              </div>
              <div>
                <span className="block font-sans font-black text-lg sm:text-xl text-white tracking-tight leading-none">
                  Ecosystem Pillars
                </span>
                <span className="block text-xs font-mono text-slate-400 mt-1.5 uppercase tracking-wide group-hover:text-emerald-400 transition-colors">
                  Supporting & uplifting builders
                </span>
              </div>
            </div>
          </button>
        </div>


        {/* ======================================= */}
        {/* VIEW MODE A: HOLDER UTILITY & REWARDS   */}
        {/* ======================================= */}
        {viewMode === 'utility' && (
          <div className="space-y-8 animate-fade-in">
            {/* Top Concept Banner Card */}
            <div className="bg-gradient-to-r from-[#121214] via-[#1c140a] to-[#0A0A0B] border border-[#F59E0B]/35 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none hidden md:block">
                <span className="text-9xl select-none">💎</span>
              </div>
              <div className="absolute -left-16 -top-16 w-32 h-32 rounded-full bg-amber-500/10 blur-3xl" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                <div className="lg:col-span-8 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-950/40 border border-[#F59E0B]/30 text-[10px] font-mono font-black text-[#F59E0B] tracking-wider uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-ping" />
                    EXCLUSIVE COLLECTIVE EQUALIZER
                  </div>
                  
                  <h3 className="text-2xl sm:text-4.5xl font-sans font-black text-white tracking-tight leading-tight">
                    The NFT gives ordinary users access normally reserved for <span className="text-[#F59E0B]">insiders</span>.
                  </h3>
                  
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-semibold max-w-3xl">
                    Whether you're a developer, marketer, project manager, reply guy, or learner—Karma Butterflies brings everyone together under one powerful ecosystem.
                  </p>

                  <div className="p-4 bg-black/60 rounded-2xl border border-white/5 inline-block">
                    <p className="text-[#F59E0B] text-sm sm:text-base font-black">
                      💡 "Now the average holder isn't just speculating—they're getting paid for contributing."
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-black/50 rounded-3xl border border-white/10 text-center relative min-h-[220px]">
                  <div className="absolute top-3 right-3 text-[9px] font-mono text-slate-500">
                    CONCEPT PREVIEW
                  </div>
                  <div className="my-2 select-none hover:scale-105 transition-transform duration-500">
                    <SvgButterfly 
                      variant="nexus" 
                      size={130} 
                      flappingSpeed="fast" 
                      seed="karma-utility-gold-seed" 
                      evolved={true}
                    />
                  </div>
                  <p className="text-xs font-mono text-amber-500 font-extrabold uppercase tracking-widest mt-2">
                    Karma Butterfly Spirit
                  </p>
                  <p className="text-[9px] font-mono text-slate-500 uppercase mt-1">
                    Insider access, shared rewards
                  </p>
                </div>
              </div>
            </div>

            {/* Premium Three-Column Bento Grid representing the features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Feature 1: Private Deal Flow */}
              <div className="bg-gradient-to-b from-[#111112] to-[#0A0A0B] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-amber-500/30 transition-all group shadow-xl">
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-[#F59E0B]/20 flex items-center justify-center text-[#F59E0B] mb-5">
                    <Lock className="w-5.5 h-5.5" />
                  </div>
                  
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-extrabold block mb-2">
                    OPPORTUNITY ACQUISITION
                  </span>
                  
                  <h4 className="text-xl sm:text-2xl font-sans font-black text-white leading-tight mb-4">
                    Access to Private Deal Flow
                  </h4>
                  
                  <p className="text-slate-350 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
                    Projects approaching the collective often have exclusive offerings. NFT holders get first access to highly restricted rounds and opportunities, leveling the playing field.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="text-[10px] font-mono text-slate-450 uppercase tracking-wider font-extrabold pb-1.5 border-b border-white/5">
                    Collective offerings include:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Presales', 'Whitelists', 'Beta Access', 'NFT Mints', 'Node Sales'].map((item) => (
                      <span key={item} className="px-2.5 py-1 rounded-lg bg-white/5 text-[10px] font-mono font-extrabold text-slate-300 border border-white/5 hover:border-[#F59E0B]/40 hover:text-[#F59E0B] transition-all">
                        ⚡ {item}
                      </span>
                    ))}
                  </div>
                  <div className="pt-3 flex items-center gap-1.5 text-[10px] font-mono font-black text-amber-400 uppercase tracking-widest mt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    NFT HOLDERS GET FIRST ACCESS
                  </div>
                </div>
              </div>

              {/* Feature 2: Marketing Mining */}
              <div className="bg-gradient-to-b from-[#111112] to-[#0A0A0B] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-emerald-500/30 transition-all group shadow-xl">
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5">
                    <Coins className="w-5.5 h-5.5" />
                  </div>
                  
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-extrabold block mb-2">
                    ATTENTION INCENTIVES
                  </span>
                  
                  <h4 className="text-xl sm:text-2xl font-sans font-black text-white leading-tight mb-4">
                    Marketing Mining
                  </h4>
                  
                  <p className="text-slate-350 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
                    Think of it like liquidity mining, but for attention. Projects deposit real marketing budgets, and NFT holders earn rewards by actively pushing ideas forward.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="text-[10px] font-mono text-slate-450 uppercase tracking-wider font-extrabold pb-1.5 border-b border-white/5">
                    Earn absolute rewards by:
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {['Posting Content', 'Creating Memes', 'Referrals', 'Community Support'].map((activity) => (
                      <div key={activity} className="p-2 rounded-lg bg-black/40 border border-white/5 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span className="text-[9.5px] font-mono text-slate-300 font-bold leading-tight">{activity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-3 flex items-center gap-1.5 text-[10px] font-mono font-black text-emerald-400 uppercase tracking-widest mt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    REWARDS DIRECT FOR CONTRIBUTION
                  </div>
                </div>
              </div>

              {/* Feature 3: Revenue Sharing Vault */}
              <div className="bg-gradient-to-b from-[#111112] to-[#0A0A0B] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-purple-500/30 transition-all group shadow-xl">
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-5">
                    <TrendingUp className="w-5.5 h-5.5" />
                  </div>
                  
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-extrabold block mb-2">
                    TREASURY ARCHITECTURE
                  </span>
                  
                  <h4 className="text-xl sm:text-2xl font-sans font-black text-white leading-tight mb-4">
                    Revenue Sharing Vault
                  </h4>
                  
                  <p className="text-slate-350 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
                    Part of collective revenue flows into decentralized finance (DeFi) optimization streams and smart AI agents. Additionally, real clients contribute direct revenue share.
                  </p>
                </div>

                <div className="space-y-4 pt-1">
                  <div className="p-4 bg-purple-950/15 border border-purple-500/15 rounded-2xl space-y-2">
                    <div className="flex items-center gap-1 text-[10px] text-purple-400 font-mono font-black uppercase">
                      <Zap className="w-3 h-3" />
                      <span>Defi & AI Managed Pools</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-normal">
                      Algorithmic pools grow over time, backstop floor values, and yield sustainable rewards directly back to the active swarm community.
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-black text-purple-400 uppercase tracking-widest pt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                    CLIENT REVENUE SHARING DIRECTLY
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}


        {/* ======================================= */}
        {/* VIEW MODE B: DIRECT ECOSYSTEM PILLARS   */}
        {/* ======================================= */}
        {viewMode === 'pillars' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch animate-fade-in">
            
            {/* Left Column: Direct Statement and Core info */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#121214] to-[#0A0A0B] border border-white/10 rounded-3xl p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <span className="text-9xl select-none">🦋</span>
              </div>

              <div className="space-y-6">
                <span className="text-slate-500 text-[10px] font-mono uppercase tracking-[0.2em] font-bold block">
                  OUR SOCIAL MISSION
                </span>
                
                <h3 className="text-2xl sm:text-3xl font-sans font-black text-white tracking-tight leading-snug">
                  A community built on positive action. 
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-semibold">
                  We recognize those who support others, uplift projects, and create lasting impact across the ecosystem. If you build with integrity, help a peer, or need a shoulder during a technical storm, you are exactly why this family exists.
                </p>

                <p className="text-slate-450 text-xs leading-relaxed">
                  We design procedural systems that turn clean track-records and helpful peer interactions into dynamic generative art. Honest footprints generate pristine, radiant wings, allowing anyone to verify your community-first alignment instantly.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-950/20 border border-[#F59E0B]/20 text-[10px] font-mono font-black text-[#F59E0B] tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
                  🦋 TURNING ACTIONS INTO REPUTATION.
                </div>
              </div>
            </div>

            {/* Right Column: Gamified Interactive Selector */}
            <div className="lg:col-span-7 bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Tab selector buttons list */}
                <div className="text-slate-400 text-xs font-mono mb-4 font-bold tracking-wide uppercase">
                  Interactive Action Center • Pick a Pillar
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-8">
                  {Object.entries(tabsContent).map(([key, data]) => {
                    const tIcon = data.icon;
                    const isActive = activeTab === key;
                    const tColor = getColorClasses(data.color);
                    return (
                      <button
                        key={key}
                        onClick={() => setActiveTab(key as any)}
                        className={`p-3 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between gap-3 text-xs font-semibold cursor-pointer ${
                          isActive 
                            ? `${tColor.border} bg-[#1a1a1a] shadow-lg shadow-black/60 scale-[1.02]` 
                            : 'border-white/5 bg-black/40 hover:border-white/10 hover:bg-neutral-900/60'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? tColor.bg : 'bg-white/5'}`}>
                          {React.createElement(tIcon, { className: `w-4 h-4 ${isActive ? tColor.text : 'text-slate-400'}` })}
                        </div>
                        <span className={`block font-sans font-bold leading-tight ${isActive ? 'text-white' : 'text-slate-400'}`}>
                          {data.title}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Display Panel of Selected Active tab */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-2">
                  
                  {/* Active Info block (7 cols) */}
                  <div className="md:col-span-7 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-md ${style.badge} border ${style.border}`}>
                        Active Pillar
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] text-emerald-400 font-mono font-bold">WE WILL HELP</span>
                    </div>

                    <h4 className="text-xl sm:text-2xl font-sans font-black text-white leading-tight">
                      {current.title}
                    </h4>
                    
                    <p className={`text-xs sm:text-sm font-bold ${style.text} italic`}>
                      “{current.tagline}”
                    </p>

                    <p className="text-slate-350 text-xs sm:text-sm leading-relaxed font-sans font-medium">
                      {current.description}
                    </p>

                    {/* Bullet perks */}
                    <div className="space-y-2 pt-2">
                      {current.perks.map((perk, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                          <span className={`w-1.5 h-1.5 rounded-full ${style.text}`} />
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Living Art reflection preview (5 cols) */}
                  <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-black/35 rounded-2xl border border-white/5 relative min-h-[220px]">
                    <div className="absolute top-2 right-2 text-[9px] font-mono text-slate-600 block">
                      LIVE SHAPE
                    </div>
                    
                    {/* Procedural Canvas Rendering preview representing the choice */}
                    <div className="my-2 select-none hover:scale-105 transition-transform duration-500">
                      <SvgButterfly 
                        variant={current.butterflyVariant} 
                        size={120} 
                        flappingSpeed="normal" 
                        seed={current.butterflySeed} 
                        evolved={current.evolved}
                      />
                    </div>

                    <p className="text-[10px] font-mono text-slate-400 text-center uppercase tracking-widest mt-1.5">
                      {current.title} Spirit
                    </p>
                    <span className="text-[9px] font-mono text-slate-600 block text-center">
                      shaping positive actions
                    </span>
                  </div>

                </div>
              </div>

              {/* Bottom mini interaction row */}
              <div className="mt-8 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  <span>Interact above to observe diverse ecosystem traits</span>
                </div>
                <button 
                  onClick={() => {
                    const keys = Object.keys(tabsContent) as any[];
                    const nextIndex = (keys.indexOf(activeTab) + 1) % keys.length;
                    setActiveTab(keys[nextIndex]);
                  }}
                  className="text-[10px] uppercase font-mono font-black text-[#F59E0B] bg-amber-500/10 hover:bg-amber-500/20 px-3.5 py-1.5 rounded-lg border border-[#F59E0B]/20 transition flex items-center gap-1 cursor-pointer"
                >
                  <span>Cycle Traits</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
