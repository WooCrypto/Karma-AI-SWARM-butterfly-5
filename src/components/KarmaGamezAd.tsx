import React from 'react';
import { Gamepad2, Coins, Zap, ShieldCheck, XCircle, CheckCircle, ArrowRight, ExternalLink } from 'lucide-react';

export default function KarmaGamezAd() {
  return (
    <section id="staking" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
      <div className="relative bg-gradient-to-br from-[#0F0F12] via-[#09090B] to-[#040405] border border-white/10 rounded-[32px] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl">
        
        {/* Dynamic Glowing Accents */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F59E0B]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -inset-px rounded-[32px] bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-40 pointer-events-none" />

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          
          {/* Left Text Column: Tagline & Core Pitch */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10.5px] font-mono font-black text-emerald-400 tracking-wider uppercase">
              <Gamepad2 className="w-3.5 h-3.5 animate-pulse" />
              <span>Ecosystem Feature • Karma Gamez</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight leading-[1.1] uppercase">
                Visit once a day. <br />
                <span className="text-[#F59E0B]">Earn tokens.</span> <br />
                Stake them to <span className="text-emerald-400">earn real SOL.</span>
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm font-sans font-semibold leading-relaxed max-w-xl">
                Experience a revolutionary, value-first gaming and staking portal. Zero-risk, zero-commitment, and absolute transparency. Show up daily to claim ecosystem points, stake them into active yield pools, and unlock real Solana rewards.
              </p>
            </div>

            {/* Instant Trust Matrix: Zero risk, zero commitment */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-black/40 p-4 rounded-2xl border border-white/5">
              <div className="flex items-center gap-2.5">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <div className="font-sans leading-none">
                  <span className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider">Do I need money?</span>
                  <span className="text-xs font-black text-white block mt-0.5">No, 100% Free ❌</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2.5">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <div className="font-sans leading-none">
                  <span className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider">Is it risky?</span>
                  <span className="text-xs font-black text-white block mt-0.5">Zero Risk ❌</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="font-sans leading-none">
                  <span className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider">Try it instantly?</span>
                  <span className="text-xs font-black text-emerald-400 block mt-0.5">Yes, Instantly! ✅</span>
                </div>
              </div>
            </div>

            {/* CTA action row */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <a 
                href="https://karmagamez.xyz"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-black font-sans font-black text-xs uppercase tracking-widest rounded-2xl transition duration-300 shadow-xl shadow-emerald-500/10 hover:shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98] cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <span>Launch Karma Gamez</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest text-center sm:text-left">
                ⚡ redirected to karmagamez.xyz
              </span>
            </div>
          </div>

          {/* Right Bento Grid Column: Mechanics */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-4">
            
            {/* Mechanic 1: Showing Up */}
            <div className="bg-[#121216] border border-white/5 p-5 rounded-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-colors duration-300">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none text-emerald-400">
                <Coins className="w-16 h-16" />
              </div>
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mt-0.5">
                  <Coins className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-sans font-black text-white uppercase tracking-wide">
                    Free Daily Drops
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    No barriers to entry. Free tokens just for showing up. Claim yours every single day to start accumulating your power score.
                  </p>
                </div>
              </div>
            </div>

            {/* Mechanic 2: Staking to SOL */}
            <div className="bg-[#121216] border border-white/5 p-5 rounded-2xl relative overflow-hidden group hover:border-[#F59E0B]/30 transition-colors duration-300">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none text-[#F59E0B]">
                <ShieldCheck className="w-16 h-16" />
              </div>
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-amber-500/10 border border-[#F59E0B]/20 text-[#F59E0B] mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-sans font-black text-white uppercase tracking-wide">
                    Stake to Earn Real SOL
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Lock your free daily tokens inside our audited smart staking vaults to yield actual, liquid, spendable Solana (SOL) rewards.
                  </p>
                </div>
              </div>
            </div>

            {/* Mechanic 3: Earnings Accelerator */}
            <div className="bg-[#121216]/50 border border-amber-500/15 p-5 rounded-2xl relative overflow-hidden group hover:border-[#F59E0B]/40 transition-all duration-300 bg-gradient-to-br from-[#F59E0B]/5 to-transparent">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none text-[#F59E0B]">
                <Zap className="w-16 h-16 animate-pulse" />
              </div>
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[#F59E0B] mt-0.5">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-sans font-black text-amber-400 uppercase tracking-wide flex items-center gap-1.5">
                    <span>Ecosystem Accelerator</span>
                    <span className="text-[9px] bg-amber-500 text-black px-1.5 py-0.5 rounded font-mono font-bold tracking-wider uppercase">BOOST</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong className="text-white">NFT = Earnings Accelerator.</strong> No NFT? You still earn. Have a Karma Butterfly NFT? Your daily multiplier increases, boosting your yield faster.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
