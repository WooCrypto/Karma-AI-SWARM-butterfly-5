import { ShieldCheck, Vote, Key, Users, Award, Cpu, Gem, HeartHandshake, ExternalLink } from 'lucide-react';

export default function UtilitySection() {
  const utilities = [
    {
      icon: Cpu,
      title: 'Autonomous AI Guild Agents',
      desc: 'Live enterprise-grade AI agents operate continuously in the background. By executing reputation index mining, optimizing multi-chain arbitrage, and validating whitehat blacklists, they capture yield to consistently reward verified holders who believe in the sovereign reputation vision.',
      badge: 'AI Reward Engine'
    },
    {
      icon: Award,
      title: 'KarmaScore Multipliers',
      desc: 'Holders secure permanent boosts (+15% to +45% depending on tier) to their KarmaScore indexes, amplifying reputation across partnered applications and dApps.',
      badge: 'Score Layer'
    },
    {
      icon: Users,
      title: 'Private Alpha Circle',
      desc: 'Unlock exclusive forums for elite builders and seasoned investigators to exchange tokenomics reviews, security warnings, and potential project reviews.',
      badge: 'Social Layer'
    },
    {
      icon: Vote,
      title: 'Swarm Governance',
      desc: 'Participate in the Karma DAO proposal pool to allocate reputation resources, whitelist projects for amplification, or cast alerts on bad actors.',
      badge: 'Power Layer'
    },
    {
      icon: Key,
      title: 'Priority App Integration',
      desc: 'Gain instant access to unreleased KarmaScore reputation extensions, API gateways, browser-based scam trackers, and customized developer kits.',
      badge: 'Product Layer'
    },
    {
      icon: ShieldCheck,
      title: 'Reputation Achievements',
      desc: 'Log and show your verifiable ecosystem contributions via cryptographic claim badges attached directly to your Karma Butterfly metadata profile.',
      badge: 'Identity Layer'
    }
  ];

  const beliefs = [
    {
      icon: Gem,
      title: 'Reputation Exceeds Hype',
      text: 'Speculative volume decays, but verifiable integrity builds compound interest. Collectors invest in belonging to an ecosystem that prizes hard data over manufactured hype.'
    },
    {
      icon: HeartHandshake,
      title: 'Trust as the Supreme Asset',
      text: 'As artificial intelligence and automated fraud vector networks scale up, trust becomes the rarest currency in decentralized environments. Karma Butterflies represent a claim on that trust.'
    }
  ];

  return (
    <section id="utility" className="py-24 relative overflow-hidden bg-[#050505] border-t border-white/10">
      {/* Visual background details */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#F59E0B]/5 to-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono text-[#F59E0B] uppercase tracking-widest block mb-2">
            Value Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-black text-white tracking-tight">
            Ecosystem Membership & Utility
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">
            A Karma Butterfly is much more than art—it serves as a cryptographic credentials badge inside a unified reputation framework.
          </p>
        </div>

        {/* 3x2 Grid for NFT Utilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {utilities.map((util, index) => {
            const isAiAgent = index === 0;
            return (
              <div
                key={util.title}
                className={`group relative bg-[#1A1A1A] border transition-all duration-300 flex flex-col justify-between rounded-2xl p-6 ${
                  isAiAgent 
                    ? 'border-[#F59E0B]/30 bg-gradient-to-b from-[#1A1A1A] to-[#121213] shadow-[0_4px_24px_rgba(245,158,11,0.05)] md:col-span-2 lg:col-span-1' 
                    : 'border-white/10 hover:border-[#F59E0B]/40 hover:bg-[#202020]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-10 h-10 rounded-xl bg-[#050505] border flex items-center justify-center transition-all ${
                      isAiAgent 
                        ? 'border-[#F59E0B]/20 text-[#F59E0B] bg-amber-950/10' 
                        : 'border-white/5 group-hover:border-[#F59E0B]/20 text-slate-400 group-hover:text-[#F59E0B] group-hover:bg-amber-950/20'
                    }`}>
                      <util.icon className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-mono font-black tracking-widest text-[#F59E0B] bg-orange-950/20 px-2.5 py-0.5 rounded border border-[#F59E0B]/20">
                      {util.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-sans font-bold text-white group-hover:text-[#F59E0B] transition-colors">
                    {util.title}
                  </h3>
                  <p className="text-slate-400 text-xs mt-3 leading-relaxed">
                    {util.desc}
                  </p>

                  {isAiAgent && (
                    <div className="mt-5 pt-4 border-t border-white/5 space-y-3">
                      {/* DexFi sticker & redirect explanation */}
                      <div className="flex items-center gap-2">
                        <div className="px-2 py-0.5 rounded text-[8px] font-mono font-black text-black bg-[#F59E0B] tracking-widest flex items-center gap-1 animate-pulse shadow shadow-amber-500/20">
                          <span>DEXFI APPROVED</span>
                        </div>
                        <span className="text-[9px] font-mono text-slate-400 font-extrabold tracking-wider">TREASURY CO-SIGN</span>
                      </div>
                      
                      <p className="text-[11px] text-slate-300 font-sans leading-normal">
                        Holders can monitor active community DeFi positions right here on our dashboard, or verify real-time audited smart holdings and balances on partner networks:
                      </p>

                      <div className="grid grid-cols-3 gap-1.5 text-center pt-1">
                        <a
                          href="https://dexfi.com"
                          target="_blank"
                          rel="noreferrer"
                          className="py-1.5 px-1 rounded-lg bg-black/40 hover:bg-black border border-white/5 hover:border-[#F59E0B]/40 text-[9px] text-[#F59E0B] font-mono transition-all flex items-center justify-center gap-1 font-bold"
                        >
                          <span>dexfi.com</span>
                          <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                        </a>
                        <a
                          href="https://dexfi.ai"
                          target="_blank"
                          rel="noreferrer"
                          className="py-1.5 px-1 rounded-lg bg-black/40 hover:bg-black border border-white/5 hover:border-[#F59E0B]/40 text-[9px] text-[#F59E0B] font-mono transition-all flex items-center justify-center gap-1 font-bold"
                        >
                          <span>dexfi.ai</span>
                          <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                        </a>
                        <a
                          href="https://debank.com"
                          target="_blank"
                          rel="noreferrer"
                          className="py-1.5 px-1 rounded-lg bg-black/40 hover:bg-black border border-white/5 hover:border-[#F59E0B]/40 text-[9px] text-slate-300 font-mono transition-all flex items-center justify-center gap-1 font-bold"
                        >
                          <span>debank.com</span>
                          <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Accent bottom hover glow line */}
                <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#F59E0B]/0 to-transparent group-hover:via-[#F59E0B]/30 transition-all duration-500" />
              </div>
            );
          })}
        </div>

        {/* Double Banner for Why People Buy */}
        <div className="bg-[#1A1A1A] border border-white/10 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-[#F59E0B]/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4">
              <span className="text-[10px] font-mono text-[#F59E0B] uppercase tracking-widest font-bold">
                The Cultural Shift
              </span>
              <h3 className="text-2xl font-sans font-bold text-white tracking-tight mt-2">
                Why Join Karma Butterflies?
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed">
                We are transitioning from the age of hype to the age of credentialed reputation. Your wallet tells a story—let it reflect honor.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {beliefs.map((belief) => (
                <div key={belief.title} className="bg-[#050505] p-6 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-3 text-[#F59E0B] mb-3">
                    <belief.icon className="w-5 h-5" />
                    <h4 className="text-sm font-sans font-bold text-slate-200">
                      {belief.title}
                    </h4>
                  </div>
                  <p className="text-slate-450 text-xs leading-relaxed">
                    {belief.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
