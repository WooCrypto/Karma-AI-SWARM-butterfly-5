import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Shield, Heart, Zap, Sparkles, Code2, Globe, ChevronDown } from 'lucide-react';

export default function TeamBios() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="team" className="py-24 relative overflow-hidden bg-[#050505] border-t border-white/10">
      {/* Decorative ambient background grids/glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono text-[#F59E0B] uppercase tracking-widest block mb-1 font-bold">
            Development & Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-black text-white tracking-tight">
            Designed & Engineered by Vilora Labs
          </h2>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed">
            Crafting state-of-the-art decentralized systems, generative algorithms, and cryptographically verified reputation environments.
          </p>
        </div>

        {/* Dynamic Studio Showcase Card */}
        <div className="max-w-3xl mx-auto">
          <div className="relative group">
            {/* Pulsing gradient background border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 via-[#ab9ff2] to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000 animate-tilt" />
            
            <div className="relative bg-[#0B0B0D] border border-white/10 rounded-3xl p-8 sm:p-10 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-500/10 text-[#F59E0B] text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded border border-[#F59E0B]/20">
                      Primary Core Studio
                    </span>
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-sans font-black text-white tracking-tight">
                    Vilora Labs
                  </h3>
                  <p className="text-slate-400 font-sans font-medium text-xs sm:text-sm">
                    Next-Generation Web3 Engineering & Interactive Systems
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-sans font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-all duration-300 cursor-pointer shadow-md"
                  >
                    <span>{isExpanded ? 'Hide Specs' : 'Show Specs'}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>

                  <a
                    href="https://viloralabs.xyz"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#F59E0B] text-black font-sans font-black text-xs uppercase tracking-wider hover:bg-amber-400 transition-all duration-300 shadow-lg shadow-amber-500/10 cursor-pointer shrink-0"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Visit Vilora Labs</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 pb-2">
                      <div className="space-y-2 bg-[#141416] p-4 rounded-2xl border border-white/5 hover:border-white/10 transition">
                        <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#F59E0B]">
                          <Code2 className="w-4 h-4" />
                        </div>
                        <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                          Generative Engineering
                        </h4>
                        <p className="text-slate-400 text-xs leading-relaxed">
                          Procedural SVG generation and interactive metadata-driven visual assets engineered to scale natively.
                        </p>
                      </div>

                      <div className="space-y-2 bg-[#141416] p-4 rounded-2xl border border-white/5 hover:border-white/10 transition">
                        <div className="w-8 h-8 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                          <Shield className="w-4 h-4" />
                        </div>
                        <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                          Cryptographic Integrity
                        </h4>
                        <p className="text-slate-400 text-xs leading-relaxed">
                          Live on-chain token state indexers and secure ledger validation systems that map authentic reputation indicators.
                        </p>
                      </div>

                      <div className="space-y-2 bg-[#141416] p-4 rounded-2xl border border-white/5 hover:border-white/10 transition">
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                          Full-Stack Ecosystems
                        </h4>
                        <p className="text-slate-400 text-xs leading-relaxed">
                          Integrated Firebase real-time infrastructure, robust query pipelines, and stateful multi-chain analytics.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="pt-4 text-center">
                <p className="text-[10px] font-mono text-slate-500">
                  DEVELOPED & MAINTAINED EXCLUSIVELY BY VILORA LABS • ALL RIGHTS RESERVED
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
