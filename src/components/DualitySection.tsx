import { useState } from 'react';
import SvgButterfly from './SvgButterfly';
import { ShieldCheck, Flame, BookOpen, Heart, AlertTriangle, Eye, Compass, Activity } from 'lucide-react';

export default function DualitySection() {
  const [activeSide, setActiveSide] = useState<'light' | 'shadow' | 'both'>('both');

  const lightAttributes = [
    { icon: Flame, title: 'Ecosystem Builders', desc: 'Deploying robust contracts, developing tooling, and committing verifiable code to secure the Web3 commons.' },
    { icon: BookOpen, title: 'Educators & Guides', desc: 'Answering community queries, drafting guides, and onboarding newcomers through patient guidance.' },
    { icon: Heart, title: 'Altruistic Helpers', desc: 'Sponsoring builders, funding public goods, and keeping the ecosystem welcoming for all participants.' },
  ];

  const shadowAttributes = [
    { icon: AlertTriangle, title: 'Exploit Exposure', desc: 'Flagging suspect codebases, isolating malicious contracts, and alerting peers about smart contract threats.' },
    { icon: Eye, title: 'Sleuth Vigilantes', desc: 'Tracing stolen funds, tracking rugged founders, and holding threat actors accountable to the public.' },
    { icon: Compass, title: 'Resilient Survivors', desc: 'Surviving market downturns, adapting strategies to severe conditions, and sharing hard-earned safety wisdom.' },
  ];

  return (
    <section id="duality" className="py-24 relative overflow-hidden bg-[#050505] border-t border-white/10">
      {/* Background soft mesh gradients */}
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono text-[#F59E0B] uppercase tracking-widest block mb-2">
            The Scarcity Structure
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-black text-white tracking-tight">
            Balanced Duality: Light & Shadow
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">
            There are no “good” or “evil” butterflies. Only butterflies that reflect different journeys. Without darkness there is no light; without mistakes there is no growth.
          </p>

          <div className="inline-flex bg-[#111] p-1 rounded-xl border border-white/10 mt-8">
            <button
              onClick={() => setActiveSide('both')}
              className={`px-4 py-2 rounded-lg font-sans font-semibold text-xs tracking-wider uppercase transition-all cursor-pointer ${
                activeSide === 'both' ? 'bg-[#F59E0B] text-black shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Unified Duality
            </button>
            <button
              onClick={() => setActiveSide('light')}
              className={`px-4 py-2 rounded-lg font-sans font-semibold text-xs tracking-wider uppercase transition-all cursor-pointer ${
                activeSide === 'light' ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              Light Collection
            </button>
            <button
              onClick={() => setActiveSide('shadow')}
              className={`px-4 py-2 rounded-lg font-sans font-semibold text-xs tracking-wider uppercase transition-all cursor-pointer ${
                activeSide === 'shadow' ? 'bg-purple-950/40 border border-purple-500/30 text-purple-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              Shadow Collection
            </button>
          </div>
        </div>

        {/* Split comparison panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Light Butterflies Panel */}
          {(activeSide === 'both' || activeSide === 'light') && (
            <div
              className={`rounded-3xl border transition-all duration-500 bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A] p-8 sm:p-10 flex flex-col justify-between ${
                activeSide === 'light'
                  ? 'border-emerald-500/50 shadow-lg shadow-emerald-500/5 col-span-2 max-w-4xl mx-auto w-full'
                  : 'border-white/10 hover:border-emerald-500/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <span className="text-emerald-400 font-mono text-[10px] uppercase tracking-widest font-bold">
                      Light Collection
                    </span>
                    <h3 className="text-2xl font-sans font-black text-white tracking-tight mt-1">
                      The Builders & Mentors
                    </h3>
                  </div>
                  <div className="p-2 rounded-xl bg-emerald-950/30 border border-emerald-500/20">
                    <SvgButterfly variant="light" size={70} flappingSpeed="slow" seed="light-duality" />
                  </div>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  Light Butterflies embody standard-bearers of growth, teaching, and active development. They fly to amplify honest founders, educate newcomers, and build robust public infrastructure.
                </p>

                <div className="space-y-6">
                  {lightAttributes.map((attr) => (
                    <div key={attr.title} className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-950/40 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <attr.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-sans font-bold text-slate-200">
                          {attr.title}
                        </h4>
                        <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                          {attr.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/5 mt-10 pt-6">
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest block">
                  🦋 Common Archetypes: Grand Architect • Guild Vanguard • Beacon of Trust
                </span>
              </div>
            </div>
          )}

          {/* Shadow Butterflies Panel */}
          {(activeSide === 'both' || activeSide === 'shadow') && (
            <div
              className={`rounded-3xl border transition-all duration-500 bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A] p-8 sm:p-10 flex flex-col justify-between ${
                activeSide === 'shadow'
                  ? 'border-purple-500/50 shadow-lg shadow-purple-500/5 col-span-2 max-w-4xl mx-auto w-full'
                  : 'border-white/10 hover:border-purple-500/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <span className="text-purple-400 font-mono text-[10px] uppercase tracking-widest font-bold">
                      Shadow Collection
                    </span>
                    <h3 className="text-2xl font-sans font-black text-white tracking-tight mt-1">
                      The Sentinels & Survivors
                    </h3>
                  </div>
                  <div className="p-2 rounded-xl bg-purple-950/30 border border-purple-500/20">
                    <SvgButterfly variant="shadow" size={70} flappingSpeed="slow" seed="shadow-duality" />
                  </div>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  Shadow Butterflies represent safety learned the hard way. They fly to expose exit scams and rug-pull exploits, track bad actors in key chains, and warn users of vulnerabilities.
                </p>

                <div className="space-y-6">
                  {shadowAttributes.map((attr) => (
                    <div key={attr.title} className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-purple-950/40 border border-purple-500/20 flex items-center justify-center text-purple-400">
                        <attr.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-sans font-bold text-slate-200">
                          {attr.title}
                        </h4>
                        <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                          {attr.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/5 mt-10 pt-6">
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest block">
                  🦋 Common Archetypes: Rogue Sentinel • Honeypot Hunter • Shadow Oracle
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
