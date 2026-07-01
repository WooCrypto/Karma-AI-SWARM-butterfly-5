import { motion } from 'motion/react';
import { ExternalLink, Sparkles, ShieldCheck } from 'lucide-react';
import SvgButterfly from './SvgButterfly';

export default function WalletAnalyzer() {
  return (
    <div className="w-full max-w-2xl mx-auto" id="wallet-analyzer-container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-b from-[#111111] to-[#08080a] border border-[#F59E0B]/30 rounded-3xl p-8 sm:p-10 text-center overflow-hidden shadow-2xl shadow-amber-500/5 hover:border-[#F59E0B]/60 transition-all duration-500 group"
      >
        {/* Glowing ambient backgrounds */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#F59E0B]/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#F59E0B]/15 transition-all duration-700" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-rose-500/5 rounded-full blur-[80px] pointer-events-none" />

        {/* Subtle decorative grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative space-y-8 flex flex-col items-center">
          {/* Animated Centered Butterfly */}
          <div className="relative flex items-center justify-center w-40 h-40">
            <div className="absolute inset-0 bg-[#F59E0B]/10 rounded-full blur-3xl animate-pulse" />
            <SvgButterfly variant="nexus" size={140} flappingSpeed="slow" seed="karma-score-badge" className="relative z-10" />
          </div>

          <div className="space-y-3 max-w-lg">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-[#F59E0B]/30 rounded-full text-[10px] font-mono font-black text-[#F59E0B] tracking-widest uppercase">
              <Sparkles className="w-3 h-3 text-[#F59E0B] animate-pulse" />
              <span>Karma AI Ecosystem</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight leading-tight uppercase">
              Visit Karma AI to check your karma wallet score
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
              Ready to reveal your true on-chain footprint and digital reputation? Check your verified score directly on the official Karma Score portal.
            </p>
          </div>

          {/* Little glowing call to action button */}
          <motion.a
            href="https://karmascore.xyz"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-sans font-black text-xs tracking-widest uppercase bg-gradient-to-r from-[#F59E0B] via-amber-400 to-[#F59E0B] text-black shadow-[0_0_30px_rgba(245,158,11,0.25)] hover:shadow-[0_0_40px_rgba(245,158,11,0.45)] hover:from-amber-400 hover:to-[#F59E0B] transition-all duration-300 font-extrabold group/btn"
          >
            <span>Verify Karma Score</span>
            <ExternalLink className="w-3.5 h-3.5 stroke-[3px] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </motion.a>

          <div className="pt-2">
            <span className="text-slate-650 font-mono text-[9px] tracking-widest uppercase flex items-center gap-1 justify-center">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-650" />
              <span>Secure Connection • Instant Verification</span>
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
