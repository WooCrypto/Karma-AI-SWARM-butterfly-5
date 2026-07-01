import React, { useState } from 'react';
import { 
  Zap, 
  Calendar, 
  CheckCircle2, 
  CircleDot, 
  Hourglass, 
  Sparkles, 
  Flame, 
  Compass, 
  BookOpen, 
  ShieldAlert, 
  Trophy, 
  Award,
  Users,
  ChevronRight,
  TrendingUp,
  Megaphone,
  Radio
} from 'lucide-react';
import { RoadmapPhase } from '../types';

export default function Roadmap() {
  const [activeEvolutionTab, setActiveEvolutionTab] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [selectedStageId, setSelectedStageId] = useState<string>('evo-1');
  const [isAnnouncing, setIsAnnouncing] = useState<boolean>(false);

  const currentStrength = 742830;

  const stageTargets: Record<string, { numeric: number; label: string; name: string; targetText: string; nextLevelLabel: string }> = {
    'evo-1': {
      numeric: 750000,
      label: 'SWARM LVL 01: INCEPTION',
      name: 'Entire Collection Evolves',
      targetText: '750k Wingbeats',
      nextLevelLabel: 'LVL 01 SHAPE SHIFT'
    },
    'evo-2': {
      numeric: 1200000,
      label: 'SWARM LVL 02: CORE MORPH',
      name: 'New Artwork Unlocks',
      targetText: '1.2M Wingbeats',
      nextLevelLabel: 'LVL 02 ARTWORK UPGRADE'
    },
    'evo-3': {
      numeric: 1800000,
      label: 'SWARM LVL 03: STAMP DECOUPLING',
      name: 'Differentiated NFT Identifiers',
      targetText: '1.8M Wingbeats',
      nextLevelLabel: 'LVL 03 STAMP'
    },
    'evo-4': {
      numeric: 2500000,
      label: 'SWARM LVL 04: CHRONICLE REVELATION',
      name: 'Hidden Lore Appears',
      targetText: '2.5M Wingbeats',
      nextLevelLabel: 'LVL 04 STORY UNLOCKED'
    },
    'evo-5': {
      numeric: 3200000,
      label: 'SWARM LVL 05: COGNITIVE BOOST',
      name: 'New AI Features & Rewards Unlock',
      targetText: '3.2M Wingbeats',
      nextLevelLabel: 'LVL 05 REWARDS BOOST'
    },
    'evo-6': {
      numeric: 4500000,
      label: 'SWARM LVL 06: HYBRID RESURRECTION',
      name: 'Special Butterflies Emerge',
      targetText: '4.5M Wingbeats',
      nextLevelLabel: 'LVL 06 RARE SPAWN'
    },
    'evo-7': {
      numeric: 6000000,
      label: 'SWARM LVL 07: OMNIPRESENT SWARM',
      name: 'Community Emergence Canvas Contest',
      targetText: '6.0M Wingbeats',
      nextLevelLabel: 'LVL 07 VOTE'
    }
  };

  const selectedStage = stageTargets[selectedStageId] || stageTargets['evo-1'];
  const progressPercent = Math.min(100, Math.round((currentStrength / selectedStage.numeric) * 1000) / 10);

  const handleSelectStage = (id: string) => {
    setSelectedStageId(id);
    setIsAnnouncing(true);
    setTimeout(() => {
      setIsAnnouncing(false);
    }, 1000);
  };

  const roadmapData: RoadmapPhase[] = [
    {
      phase: 'Phase 01',
      title: 'Phase 1: Build the Swarm community',
      timeline: 'Q3 - Q4 2026',
      description: 'We are launching our main brand and community. Here we will start releasing the standard Light & Shadow Karma Butterflies for our fans.',
      status: 'in-progress',
      milestones: [
        'Interactive wallet trust rating tool (You can try it live on this page now!)',
        'Official minting event for 888 unique Light and Shadow NFTs',
        'Private group chat channels and update groups for early holders',
        'Early community voting panel to help direct our next steps'
      ]
    },
    {
      phase: 'Phase 02',
      title: 'Phase 2: Launch KarmaScores',
      timeline: 'Q1 2027',
      description: 'We are starting our rating system. It scans crypto wallets to give real-time scores based on your positive contributions and helpful actions.',
      status: 'upcoming',
      milestones: [
        'A simple Chrome browser extension that flags scam addresses to keep you safe',
        'Tools for other apps to recognize and reward helper wallets',
        'Fun tasks and community quests to boost your personal score',
        'A simple personal dashboard to track your rating and progress'
      ]
    },
    {
      phase: 'Phase 03',
      title: 'Phase 3: Introduce the Karma Token',
      timeline: 'Q2 2027',
      description: 'We will launch our official coin. This coin is used to reward people who protect users in crypto and help build positive community apps.',
      status: 'upcoming',
      milestones: [
        'Full security checks to make sure the token code is safe',
        'Locking and staking your tokens to support trusted new projects',
        'Monthly coin rewards sent directly to holders with good ratings',
        'Special rewards for finding system exploits and reporting scam groups'
      ]
    },
    {
      phase: 'Phase 04',
      title: 'Phase 4: Full Community Control',
      timeline: 'Q3 - Q4 2027',
      description: 'We hand over complete control of the project to our community. All butterfly holders will vote on rules and direct the future of the app together.',
      status: 'upcoming',
      milestones: [
        'Holders vote directly on safe list ratings and scam lists',
        'A community bank fund to pay for cool new ideas from developers',
        'Expanding our trust ratings to other networks like Solana and Base',
        'The global score system fully owned and run by the community'
      ]
    }
  ];

  // The 7 specific collective evolution states from user instructions
  const evolutionMilestones = [
    {
      id: 'evo-1',
      title: 'Entire Collection Evolves',
      description: 'Every single butterfly changes its physical artwork and colors at the same time, showing our overall community growth.',
      status: 'active',
      icon: Flame,
      progress: 74,
      target: '750k Wingbeats',
      action: 'Swarm Shape Shift'
    },
    {
      id: 'evo-2',
      title: 'New Artwork Unlocks',
      description: 'We release brand-new wing styles, premium detail designs, and background landscapes driven by the community trust score.',
      status: 'locked',
      icon: Sparkles,
      progress: 42,
      target: '1.2M Wingbeats',
      action: 'Artwork Upgrade'
    },
    {
      id: 'evo-3',
      title: 'Differentiated NFT Identifiers',
      description: 'Every butterfly gets its own unique digital stamp and specialty sticker so people can notice your specific rating instantly.',
      status: 'locked',
      icon: Award,
      progress: 25,
      target: '1.8M Wingbeats',
      action: 'Sticker Stamp'
    },
    {
      id: 'evo-4',
      title: 'Hidden Lore Appears',
      description: 'Unlock background story chapters, secret logs, and fun trivia about the Light and Shadow teams.',
      status: 'locked',
      icon: BookOpen,
      progress: 10,
      target: '2.5M Wingbeats',
      action: 'Story Unlocked'
    },
    {
      id: 'evo-5',
      title: 'New AI Features & Rewards Unlock',
      description: 'Unlocks smart AI safety warnings, automatic threat trackers, and direct rewarding payout prizes for top holders.',
      status: 'locked',
      icon: Zap,
      progress: 5,
      target: '3.2M Wingbeats',
      action: 'Rewards Boost'
    },
    {
      id: 'evo-6',
      title: 'Special Butterflies Emerge',
      description: 'A completely new, super rare hybrid class of butterflies will be born and given out to active community leaders and helpers.',
      status: 'locked',
      icon: Compass,
      progress: 0,
      target: '4.5M Wingbeats',
      action: 'Rare Spawn'
    },
    {
      id: 'evo-7',
      title: 'Community Emergence Canvas Contest',
      description: 'A fun art contest where holders vote on and co-design the next great butterfly design using AI art generators.',
      status: 'locked',
      icon: Users,
      progress: 0,
      target: '6.0M Wingbeats',
      action: 'Community Vote'
    }
  ];

  const filteredEvolutions = evolutionMilestones.filter(item => {
    if (activeEvolutionTab === 'unlocked') return item.status === 'active';
    if (activeEvolutionTab === 'locked') return item.status === 'locked';
    return true;
  });

  return (
    <section id="roadmap" className="py-24 relative overflow-hidden bg-[#050505] border-t border-white/10">
      {/* Background neon dots */}
      <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-[#F59E0B]/5 blur-3xl" />
      <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Core Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono text-[#F59E0B] uppercase tracking-widest block mb-1">
            Chronological Evolution
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-black text-white tracking-tight">
            The Karma Butterfly Roadmap
          </h2>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed">
            Unifying reputation, economy, and culture. Together, these layers compose a sustainable movement of accountability across decentralized networks.
          </p>
        </div>

        {/* NARRATIVE FOCUS: AI SWARM ENGINE BOX */}
        <div className="mb-20 bg-gradient-to-b from-[#111] to-[#0A0A0A] border border-white/10 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[450px] h-[300px] bg-gradient-to-bl from-[#F59E0B]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Narrative Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="text-left space-y-3">
                <span className="text-[10px] font-mono text-[#F59E0B] uppercase tracking-widest font-bold bg-amber-950/30 border border-[#F59E0B]/20 px-2.5 py-0.5 rounded-full inline-block">
                  Collective Consciousness
                </span>
                
                {/* Highlighted Quote requested by user */}
                <h3 className="text-xl sm:text-2xl font-serif italic text-white leading-relaxed tracking-tight border-l-2 border-[#F59E0B] pl-4">
                  “Every good action creates a wingbeat. Every wingbeat creates a storm. The swarm evolves together.”
                </h3>
              </div>

              {/* AI Explanation requested by user */}
              <div className="space-y-4 text-xs text-slate-400 leading-relaxed font-sans">
                <p>
                  <strong className="text-slate-200">Karma Butterflies are living NFTs powered by AI.</strong>
                </p>
                <p>
                  The AI measures the growth and impact of the community. As the community creates positive change throughout crypto, the entire butterfly swarm evolves into new forms. Every holder becomes part of the butterfly effect, proving that small actions can create massive change.
                </p>
              </div>

              {/* Progress counter */}
              <div className={`p-5 rounded-2xl border transition-all duration-300 space-y-4 relative overflow-hidden ${
                isAnnouncing 
                  ? 'bg-amber-950/35 border-[#F59E0B] shadow-[#F59E0B]/20 animate-pulse' 
                  : 'bg-black/55 border-white/10'
              }`}>
                {/* Stage Announcement Broadcast Tag */}
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#F59E0B] uppercase tracking-wider">
                    <Radio className={`w-3.5 h-3.5 ${isAnnouncing ? 'animate-ping' : 'animate-pulse'}`} />
                    <span>Stage Focus Announced</span>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                    STAGE {Object.keys(stageTargets).indexOf(selectedStageId) + 1} OF 7
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest">
                    TRACKING TARGET
                  </h4>
                  <p className="text-sm font-sans font-black text-white leading-tight">
                    {selectedStage.name}
                  </p>
                </div>

                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400 flex items-center gap-1.5 font-bold">
                      <TrendingUp className="w-3.5 h-3.5 text-[#F59E0B]" />
                      Collective Strength
                    </span>
                    <span className="text-[#F59E0B] font-extrabold font-mono">
                      {currentStrength.toLocaleString()} / {selectedStage.targetText}
                    </span>
                  </div>
                  
                  {/* Progress Bar Container */}
                  <div className="h-3.5 bg-neutral-950 rounded-full overflow-hidden border border-white/10 p-0.5">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-600 via-[#F59E0B] to-amber-300 rounded-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(245,158,11,0.5)]" 
                      style={{ width: `${progressPercent}%` }} 
                    />
                  </div>

                  <div className="text-[10px] font-mono text-slate-500 flex justify-between pt-1">
                    <span className="text-slate-400 font-bold">{selectedStage.label}</span>
                    <span className="text-[#F59E0B] font-extrabold">{progressPercent}% COMPLETED</span>
                  </div>
                </div>

                {/* Announcement status badge */}
                {isAnnouncing && (
                  <div className="absolute inset-x-0 bottom-0 bg-[#F59E0B] text-black py-1 text-center text-[9px] font-mono font-black tracking-widest uppercase transition-all duration-300">
                    🔊 STAGE BROADCAST INITIATED • UPDATE SENT
                  </div>
                )}
              </div>
            </div>

            {/* Right Evolution Grid list */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-[#F59E0B] animate-pulse" />
                  <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Swarm Evolution Milestones
                  </h4>
                </div>

                <div className="flex bg-[#050505] p-0.5 rounded border border-white/5 text-[9px] font-mono">
                  <button 
                    onClick={() => setActiveEvolutionTab('all')}
                    className={`px-2 py-1 rounded transition-colors ${activeEvolutionTab === 'all' ? 'bg-[#F59E0B] text-black font-bold' : 'text-slate-400 hover:text-slate-100'}`}
                  >
                    All ({evolutionMilestones.length})
                  </button>
                  <button 
                    onClick={() => setActiveEvolutionTab('unlocked')}
                    className={`px-2 py-1 rounded transition-colors ${activeEvolutionTab === 'unlocked' ? 'bg-amber-950/40 text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-100'}`}
                  >
                    Active
                  </button>
                  <button 
                    onClick={() => setActiveEvolutionTab('locked')}
                    className={`px-2 py-1 rounded transition-colors ${activeEvolutionTab === 'locked' ? 'bg-zinc-900 text-slate-400 font-bold' : 'text-slate-400 hover:text-slate-100'}`}
                  >
                    Locked
                  </button>
                </div>
              </div>

              {/* Dynamic scrollbox representing evolution path */}
              <div className="space-y-3 max-h-[365px] overflow-y-auto pr-1 select-none custom-scrollbar">
                {filteredEvolutions.map((evo, i) => {
                  const IconComp = evo.icon;
                  const isActive = evo.status === 'active';
                  const isSelected = selectedStageId === evo.id;
                  const globalIndex = evolutionMilestones.findIndex(item => item.id === evo.id);
                  const displayIndex = globalIndex !== -1 ? globalIndex + 1 : i + 1;
                  
                  return (
                    <button 
                      key={evo.id}
                      onClick={() => handleSelectStage(evo.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden cursor-pointer block ${
                        isSelected 
                          ? 'bg-amber-950/20 border-[#F59E0B] shadow-md shadow-[#F59E0B]/10 ring-1 ring-[#F59E0B]/30' 
                          : isActive 
                          ? 'bg-amber-950/10 border-white/10 hover:border-[#F59E0B]/30' 
                          : 'bg-black/40 border-white/5 hover:border-white/15 opacity-75 hover:opacity-100'
                      }`}
                    >
                      {/* Decorative index and status indicator */}
                      <div className="absolute top-2.5 right-3 flex items-center gap-2">
                        {isSelected && (
                          <span className="flex items-center gap-1 text-[8px] font-mono text-[#F59E0B] bg-amber-500/10 px-1.5 py-0.5 rounded border border-[#F59E0B]/20 animate-pulse">
                            <Radio className="w-2.5 h-2.5 text-[#F59E0B]" />
                            ANNOUNCED
                          </span>
                        )}
                        <span className="text-[9px] font-mono text-slate-500 font-bold">
                          STAGE 0{displayIndex}
                        </span>
                      </div>
                      
                      <div className="flex gap-4 items-start">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border ${
                          isSelected 
                            ? 'bg-[#F59E0B] text-black border-[#F59E0B] shadow-lg shadow-amber-500/10' 
                            : isActive 
                            ? 'bg-amber-500/15 text-[#F59E0B] border-amber-500/30' 
                            : 'bg-[#111] text-slate-500 border-white/10'
                        }`}>
                          <IconComp className="w-5 h-5" />
                        </div>

                        <div className="space-y-1.5 flex-grow pr-16 sm:pr-24">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h5 className={`text-xs font-sans font-black ${isSelected ? 'text-[#F59E0B]' : 'text-white'}`}>
                              {evo.title}
                            </h5>
                            <span className={`text-[8px] font-mono px-1.5 py-0.2 rounded ${
                              isActive 
                                ? 'bg-amber-500/15 text-[#F59E0B] border border-[#F59E0B]/20 animate-pulse' 
                                : isSelected 
                                ? 'bg-[#F59E0B]/10 text-[#F59E0B]'
                                : 'bg-[#151515] text-slate-500 border border-white/5'
                            }`}>
                              {isActive ? 'In Transition' : isSelected ? 'Highlighted Target' : 'Locked'}
                            </span>
                          </div>

                          <p className="text-[11px] text-slate-400 leading-relaxed font-sans pr-4">
                            {evo.description}
                          </p>

                          <div className="pt-2 flex items-center justify-between text-[9px] font-mono border-t border-white/5 mt-2">
                            <span className="text-slate-500">
                              Trigger Level: <strong className={isSelected ? 'text-[#F59E0B]' : 'text-slate-300'}>{evo.target}</strong>
                            </span>
                            <span className={`${isSelected || isActive ? 'text-[#F59E0B]' : 'text-slate-500'} font-bold uppercase flex items-center gap-1`}>
                              {isSelected && <Megaphone className="w-2.5 h-2.5 shrink-0" />}
                              {evo.action}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* Chronological Timeline Track */}
        <div className="text-left mb-10 max-w-4xl mx-auto border-b border-white/5 pb-4">
          <h3 className="text-lg font-sans font-black text-white uppercase tracking-wider flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#F59E0B]" />
            Long-Term Integration Timeline
          </h3>
          <p className="text-xs text-slate-500 mt-1">Explore our planned phases integration layout representing general web3 public network staging.</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical central path line */}
          <div className="absolute left-[29px] sm:left-1/2 top-0 bottom-0 w-[1.5px] bg-white/5 border-dashed border-white/10" />

          <div className="space-y-12">
            {roadmapData.map((phase, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div key={phase.phase} className={`flex flex-col sm:flex-row relative ${isEven ? 'sm:flex-row-reverse' : ''}`}>
                  {/* Timeline Badge Dot Anchor */}
                  <div className="absolute left-0 sm:left-1/2 -translate-x-[0px] sm:-translate-x-1/2 top-4 z-20 flex items-center justify-center w-[60px] h-[60px]">
                    <div className={`w-10 h-10 rounded-full border flex items-center justify-center ${
                      phase.status === 'completed'
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-400 shadow-md shadow-emerald-500/10'
                        : phase.status === 'in-progress'
                        ? 'bg-amber-950/40 border-[#F59E0B] text-[#F59E0B] animate-pulse-glow shadow-md shadow-[#F59E0B]/20'
                        : 'bg-[#050505] border-white/10 text-slate-500'
                    }`}>
                      {phase.status === 'completed' ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : phase.status === 'in-progress' ? (
                        <CircleDot className="w-5 h-5" />
                      ) : (
                        <Hourglass className="w-5 h-5" />
                      )}
                    </div>
                  </div>

                  {/* Date & Phase label opposite the card on desktop */}
                  <div className={`w-full sm:w-1/2 pl-20 sm:pl-0 sm:px-12 pt-6 pb-2 text-left ${isEven ? 'sm:text-right' : 'sm:text-left'}`}>
                    <span className="text-[11px] font-mono tracking-widest text-[#F59E0B] uppercase block font-bold">
                      {phase.phase}
                    </span>
                    <span className={`text-sm font-sans font-bold flex items-center gap-1.5 mt-1.5 ${
                      phase.status === 'in-progress' ? 'text-[#F59E0B]' : 'text-slate-300'
                    } ${isEven ? 'sm:justify-end' : 'sm:justify-start'}`}>
                      <Calendar className="w-4 h-4" />
                      {phase.timeline}
                    </span>
                    <span className="inline-block mt-3 px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase bg-[#1A1A1A] border border-white/10 text-slate-400">
                      {phase.status === 'completed'
                        ? 'Completed'
                        : phase.status === 'in-progress'
                        ? 'Active Development'
                        : 'Upcoming Phase'
                      }
                    </span>
                  </div>

                  {/* Contents block card */}
                  <div className="w-full sm:w-1/2 pl-20 sm:px-12">
                    <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors">
                      <h3 className="text-base sm:text-lg font-sans font-bold text-white tracking-tight">
                        {phase.title}
                      </h3>
                      <p className="text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed">
                        {phase.description}
                      </p>

                      <div className="mt-5 pt-5 border-t border-white/5 space-y-2">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold mb-1">
                          Key Milestones:
                        </span>
                        {phase.milestones.map((ms) => (
                          <div key={ms} className="flex gap-2 text-xs text-slate-400">
                            <span className="text-[#F59E0B] select-none">•</span>
                            <span className="leading-tight text-slate-300">{ms}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
