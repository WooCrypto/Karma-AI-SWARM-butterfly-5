import { ShieldCheck, Sparkles, Zap, MessageSquare } from 'lucide-react';

export default function ManifestoSection() {
  return (
    <section id="manifesto" className="py-24 relative overflow-hidden bg-[#070708] border-t border-b border-white/10">
      {/* Decorative ambient blurred lights */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-[#F59E0B]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[355px] h-[355px] bg-[#34d399]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Coordinates watermark */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Core Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Big Typography Display: Killer Line on the left (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] font-mono text-[#F59E0B] uppercase tracking-[0.25em] font-extrabold flex items-center gap-1.5 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
              <span>THE ECOSYSTEM COVENANT</span>
            </span>

            {/* Killer Line display */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-black tracking-tight text-white leading-[1.05]">
              We amplify <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-[#F59E0B] to-emerald-400">what’s real</span>, host the conversation, and <span className="text-emerald-400">protect</span> the ecosystem.
            </h2>

            {/* Accent border decorative spacer */}
            <div className="h-0.5 w-24 bg-gradient-to-r from-[#F59E0B] to-transparent rounded-full" />
            
            {/* Extended mission impact */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-sans max-w-2xl font-semibold">
              We move where quality is being built — backing legitimate projects with real power, visibility, marketing drafts, graphics, and community support. We amplify what’s real, host the conversation, and protect the ecosystem by calling out bad actors before they spread damage.
            </p>
          </div>

          {/* Visual card / interactive notice on the right (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative group">
              {/* Outer halo background */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#F59E0B]/30 to-emerald-500/30 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              
              {/* Card Container */}
              <div className="relative bg-[#0d0d0e]/95 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
                
                {/* Visual Header */}
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      Strategic Collaboration Note
                    </h3>
                    <p className="text-[10px] text-slate-500 font-mono">
                      VILORA LABS COVENANT
                    </p>
                  </div>
                </div>

                {/* Main Note Wording */}
                <p className="text-slate-350 text-xs sm:text-sm leading-relaxed">
                  <strong className="text-[#F59E0B]">Note:</strong> We support emerging projects through visibility, community engagement, and strategic collaboration, while encouraging transparency, accountability, and responsible behavior. Our role is to highlight constructive activity, foster healthy discussion, and call attention to practices that may harm the space.
                </p>

                {/* Badges / Micro-statistics list */}
                <div className="grid grid-cols-2 gap-3.5 pt-4 border-t border-white/5">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-[#F59E0B]/20 transition-all duration-350">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                      <span className="font-sans font-bold text-white text-[11px] uppercase tracking-wider">01. Amplification</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-mono mt-1 leading-normal">
                      We draft assets, refine media, and support real team efforts.
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/20 transition-all duration-350">
                    <div className="flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="font-sans font-bold text-white text-[11px] uppercase tracking-wider">02. Moderation</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-mono mt-1 leading-normal">
                      Vigilant peer observation before threat actors cause damage.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
