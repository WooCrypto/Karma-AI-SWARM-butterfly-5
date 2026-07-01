import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Copy, 
  Check, 
  Twitter, 
  Sparkles, 
  Award, 
  Zap, 
  ExternalLink,
  ShieldAlert,
  Coins
} from 'lucide-react';

interface KarmaCreedProps {
  isLightMode?: boolean;
}

export default function KarmaCreed({ isLightMode }: KarmaCreedProps) {
  const [activeVersion, setActiveVersion] = useState<'short' | 'long'>('short');
  const [copiedText, setCopiedText] = useState<'short' | 'long' | null>(null);

  const shortCreed = `We don’t ask for payment.

We start by creating value.

We help projects, support builders, and uplift communities because we believe in karma.

If appreciation comes later, we accept it.

If not, we keep building.

Contribution first. Rewards later.

That’s the Karma Butterflies way. 🦋

#Karma #KarmaButterflies #KarmaScore #Solana #Web3`;

  const longCreed = `We don’t ask for payment.

We don’t chase invoices.

We don’t demand compensation before contributing.

At Karma Butterflies, we start by helping. We support projects, share ideas, make connections, create content, and contribute value because we believe in karma.

If a project succeeds and wants to show appreciation, we gladly accept it. But our actions are never dependent on a payment first.

We believe good energy creates opportunities.
We believe contribution creates reputation.
We believe karma rewards those who help others level up.

That’s why we work first.

Not because we’re obligated.
Not because we’re expecting something.

Because that’s who we are.

Build. Support. Uplift.

The rest is karma. 🦋

#Karma #KarmaButterflies #KarmaScore #CryptoCommunity #Web3 #Solana #Builders #NFTs #CryptoTwitter`;

  const copyToClipboard = (text: string, type: 'short' | 'long') => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => {
      setCopiedText(null);
    }, 2500);
  };

  const tweetIntent = (text: string) => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div id="karma-creed-section" className="space-y-8">
      {/* Interactive Hub card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left column: Epic Poster Layout */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#121214] via-[#1A111E] to-[#0A0A0B] border border-purple-500/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group shadow-xl">
          {/* Background vector glow effects */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ec4899]/10 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3  py-1.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-[10px] font-mono font-black text-purple-400 tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              Sovereign Decree
            </div>
            
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-white uppercase leading-none">
                THE WALLET <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-rose-400 to-amber-400">
                  CREED SYSTEM
                </span>
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-semibold">
                In Web3, reputation is the ultimate backing. We don't build paywalls or request upfront fees. We forge proof-of-work in public corridors.
              </p>
            </div>

            {/* Custom Interactive Tag lists */}
            <div className="pt-2 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-black/40 border border-white/5 rounded-lg text-[9px] font-mono text-slate-400 uppercase font-black tracking-wider hover:border-purple-500/30 transition-all">
                #ContributionFirst
              </span>
              <span className="px-3 py-1 bg-black/40 border border-white/5 rounded-lg text-[9px] font-mono text-[#F59E0B] uppercase font-black tracking-wider hover:border-[#F59E0B]/30 transition-all">
                #SolanaWeb3
              </span>
              <span className="px-3 py-1 bg-black/40 border border-white/5 rounded-lg text-[9px] font-mono text-rose-400 uppercase font-black tracking-wider hover:border-rose-500/30 transition-all">
                #WeKeepBuilding
              </span>
            </div>
          </div>

          {/* Quick stats for NFT collectors */}
          <div className="relative z-10 grid grid-cols-3 gap-3 pt-8 border-t border-white/10 mt-8 font-mono text-[9px]">
            <div className="bg-black/50 p-2.5 rounded-xl border border-white/5 text-center">
              <p className="text-slate-500 font-bold uppercase leading-tight">INITIATIVE</p>
              <p className="text-white font-extrabold mt-0.5 uppercase">UNCONDITIONAL</p>
            </div>
            <div className="bg-black/50 p-2.5 rounded-xl border border-white/5 text-center">
              <p className="text-slate-500 font-bold uppercase leading-tight">MINT STAGE</p>
              <p className="text-[#F59E0B] font-extrabold mt-0.5 uppercase">COMMUNITY</p>
            </div>
            <div className="bg-black/50 p-2.5 rounded-xl border border-white/5 text-center">
              <p className="text-slate-500 font-bold uppercase leading-tight">VALUES MESH</p>
              <p className="text-purple-400 font-extrabold mt-0.5 uppercase">DECENTRALIZED</p>
            </div>
          </div>
        </div>

        {/* Right column: Interactive Tablet Box */}
        <div className="lg:col-span-7 bg-[#111112] border border-white/10 rounded-2.5xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl">
          
          <div className="space-y-6">
            {/* Header controls select */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-500 animate-pulse" />
                <span className="text-xs font-mono text-slate-300 font-extrabold uppercase tracking-wide">
                  SELECT CREED MATRIX MODE
                </span>
              </div>
              
              {/* Short / Long toggle selectors */}
              <div className="flex bg-black/50 rounded-xl p-1 border border-white/5">
                <button
                  onClick={() => setActiveVersion('short')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-extrabold uppercase transition-all tracking-wider cursor-pointer ${
                    activeVersion === 'short'
                      ? 'bg-purple-500 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Short
                </button>
                <button
                  onClick={() => setActiveVersion('long')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-extrabold uppercase transition-all tracking-wider cursor-pointer ${
                    activeVersion === 'long'
                      ? 'bg-purple-500 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Long Version
                </button>
              </div>
            </div>

            {/* Content text block styled beautifully for Web3 collectors */}
            <div className="relative min-h-[300px] flex flex-col justify-center bg-black/40 border border-white/5 rounded-2xl p-5 sm:p-7 leading-relaxed font-sans font-extrabold text-[#FAFBFD] shadow-inner text-sm select-all">
              <div className="absolute top-3 right-3 text-[9px] font-mono text-slate-600 uppercase font-black select-none">
                {activeVersion === 'short' ? '⚡ EXPRESS TRANSIT' : '🔮 ARCHIVAL TRANSMISSION'}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeVersion}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {activeVersion === 'short' ? (
                    <div className="space-y-5">
                      <p className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-[#F59E0B] text-lg sm:text-xl font-black font-display uppercase tracking-tight">
                        We don’t ask for payment.
                      </p>
                      <p className="text-white text-base">
                        We start by creating value.
                      </p>
                      <p className="text-slate-300 font-semibold text-xs sm:text-sm">
                        We help projects, support builders, and uplift communities because we believe in karma.
                      </p>
                      <div className="border-l-2 border-purple-500 pl-4 py-1 space-y-1 my-3 bg-purple-950/10 rounded-r-lg">
                        <p className="text-slate-300 font-semibold text-xs leading-relaxed">
                          If appreciation comes later, we accept it. If not, we keep building.
                        </p>
                      </div>
                      <p className="text-lg font-black uppercase text-white tracking-widest font-mono text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">
                        Contribution first. Rewards later.
                      </p>
                      <p className="text-slate-300 text-xs sm:text-sm font-black italic">
                        That’s the Karma Butterflies way. 🦋
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3.5 text-xs sm:text-sm">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        <div className="p-3 bg-red-950/10 border border-red-500/20 rounded-xl">
                          <p className="text-rose-400 font-mono text-[9px] uppercase font-black tracking-wider mb-1">CONTRACTUAL BAN</p>
                          <p className="text-white text-xs font-bold leading-tight">No upfront invoices or initial payment blockades.</p>
                        </div>
                        <div className="p-3 bg-emerald-950/10 border border-emerald-500/20 rounded-xl">
                          <p className="text-emerald-400 font-mono text-[9px] uppercase font-black tracking-wider mb-1">PRO-ENERGY DRIVEN</p>
                          <p className="text-white text-xs font-bold leading-tight">We seed energy first to trigger the law of Karma.</p>
                        </div>
                      </div>

                      <p className="font-bold text-slate-300">
                        At Karma Butterflies, we start by helping. We support projects, share ideas, make connections, create content, and contribute value because we believe in karma.
                      </p>

                      <p className="text-[#F59E0B] font-display uppercase font-black text-xs sm:text-sm">
                        If a project succeeds and wants to show appreciation, we gladly accept it. But our actions are never dependent on a payment first.
                      </p>

                      <div className="bg-purple-950/20 border border-purple-500/20 rounded-xl p-3 font-mono text-[10px] space-y-1 text-purple-300">
                        <p className="font-extrabold flex items-center gap-1">🟢 WE BELIEVE GOOD ENERGY CREATES OPPORTUNITIES</p>
                        <p className="font-extrabold flex items-center gap-1">🟢 WE BELIEVE CONTRIBUTION CREATES REPUTATION</p>
                        <p className="font-extrabold flex items-center gap-1">🟢 WE BELIEVE KARMA REWARDS THOSE WHO HELP OTHERS</p>
                      </div>

                      <p className="text-white">
                        That’s why we work first. Not because we’re obligated. Not because we’re expecting something.
                      </p>

                      <p className="text-xs sm:text-sm text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400 font-black uppercase text-center py-2 tracking-widest font-display">
                        Build. Support. Uplift. The rest is karma. 🦋
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Interactive footer suite triggers */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-6 mt-6 border-t border-white/5">
            <button
              onClick={() => copyToClipboard(activeVersion === 'short' ? shortCreed : longCreed, activeVersion)}
              className="w-full sm:flex-1 py-3 px-4 bg-purple-500 hover:bg-purple-400 text-white rounded-xl text-xs font-mono font-extrabold uppercase tracking-widest transition flex items-center justify-center gap-1.5 active:scale-98 cursor-pointer shadow-lg shadow-purple-500/10"
            >
              {copiedText === activeVersion ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>TRANSMISSION COPIED!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>COPY TO CLIPBOARD</span>
                </>
              )}
            </button>

            <button
              onClick={() => tweetIntent(activeVersion === 'short' ? shortCreed : longCreed)}
              className="w-full sm:flex-1 py-3 px-4 bg-black/60 hover:bg-neutral-900 border border-white/10 text-white hover:text-[#1DA1F2] hover:border-[#1DA1F2]/40 rounded-xl text-xs font-mono font-extrabold uppercase tracking-widest transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
            >
              <Twitter className="w-4 h-4" />
              <span>SHARE TO TWITTER</span>
            </button>
          </div>

        </div>
      </div>

      {/* Decorative prompt message under the boxes */}
      <div className="p-4 bg-amber-950/20 border border-[#F59E0B]/30 rounded-2xl flex items-start gap-3">
        <span className="p-1.5 bg-[#F59E0B]/10 rounded-lg text-[#F59E0B] shrink-0 font-bold">🦋</span>
        <div className="space-y-1">
          <p className="text-[11px] font-mono text-slate-300 font-extrabold uppercase leading-none">
            MEMBER PUSH MESSAGE
          </p>
          <p className="text-[10px] font-sans font-semibold text-slate-400 leading-normal">
            You are fully permitted to share, clip, print, or tweet these decrees. They are public-domain vectors registered on-chain for the global builders ecosystem. Take action, share the message, and let karma settle.
          </p>
        </div>
      </div>
    </div>
  );
}
