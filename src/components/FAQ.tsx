import { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQItem } from '../types';

interface FAQProps {
  isNested?: boolean;
}

export default function FAQ({ isNested = false }: FAQProps) {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const faqItems: FAQItem[] = [
    {
      id: 'faq-1',
      question: 'What is KarmaScore and how do these butterflies fit in?',
      answer: 'KarmaScore is a decentralized reputation and trust evaluation layer for Web3. It aggregates transaction histories, smart contract deployments, and community help signals on EVM, Solana, and beyond. Karma Butterflies represent the cultural and identity layer of this framework: each procedurally styled butterfly acts as a membership badge and social PFP, proving you are part of a movement to establish transparency and mutual contribution in crypto.'
    },
    {
      id: 'faq-2',
      question: 'Are Light Butterflies more valuable than Shadow Butterflies?',
      answer: 'Absolutely not. Light and Shadow are equal, fundamental partners in our ecosystem duality. Light butterflies symbolize standard-setting builders, educators, and community guides. Shadow butterflies represent lessons learned, resilience, security auditing, and the active exposure of bad actors. Both collections carry equivalent weight, governance access, and long-term ecosystem rewards.'
    },
    {
      id: 'faq-3',
      question: 'What is the "Karma Creed" and how does it drive contribution?',
      answer: "The Karma Creed is our collective pledge: We don't ask for payment. We don't chase upfront invoices. We start by adding value. We support builders and uplift communities because we believe good karma returns opportunities naturally. If a project succeeds and wants to share appreciation, we accept it. If not, we keep building anyway. Contribution first, rewards later."
    },
    {
      id: 'faq-4',
      question: 'How is the wallet score and alignment calculated in the analyzer?',
      answer: 'Our on-chain engine decodes metrics like developer smart-contracts compiled (Light alignment), forum contributions/contributor commits (Helper alignment), transaction density, and security audits against rug-risk exposure rates (Shadow alignment). These deterministic variables map your cryptographic address variables directly into a beautiful generative butterfly structure in real-time.'
    },
    {
      id: 'faq-5',
      question: 'What concrete rewards do Karma Butterfly holders receive?',
      answer: 'Holders unlock high-reputation trust badges, exclusive premium access inside our Alpha coordinate networks, voting privileges in the safety database registry, and direct treasury perks. Additionally, our voluntary charity channel operates to clean up the workspace—assisting victims of exploits, funding decentralized education, and building browser guardrails to root out security vulnerabilities.'
    },
    {
      id: 'faq-6',
      question: 'What is Karma Gamez and how do I earn real SOL?',
      answer: 'Karma Gamez (karmagamez.xyz) is our zero-risk, zero-commitment daily reward and staking portal. The mechanic is simple: Visit once a day ➔ Claim free tokens ➔ Stake them ➔ Earn real SOL. You do NOT need any money, there is ZERO financial risk, and you can try it instantly.'
    },
    {
      id: 'faq-7',
      question: 'Do I need a Karma Butterfly NFT to earn on Karma Gamez?',
      answer: 'No! If you do not own a Karma Butterfly NFT, you can still play and earn standard daily tokens. However, the NFT acts as a powerful earnings accelerator—NFT holders earn significantly faster with a built-in multiplier boost.'
    }
  ];

  const content = (
    <div className="space-y-3.5">
      {faqItems.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div
            key={item.id}
            className={`border rounded-2xl transition-all duration-300 bg-[#0c0c0e] overflow-hidden ${
              isOpen 
                ? 'border-purple-500/30 shadow-lg shadow-purple-500/5' 
                : 'border-white/5 hover:border-white/10 hover:bg-neutral-900/20'
            }`}
          >
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer group"
            >
              <div className="flex items-center gap-4.5">
                <div className={`p-2 rounded-xl border transition-colors shrink-0 ${
                  isOpen 
                    ? 'bg-purple-950/40 border-purple-500/30' 
                    : 'bg-neutral-900/60 border-white/5 group-hover:border-white/10'
                }`}>
                  <HelpCircle className={`w-4 h-4 transition-colors ${
                    isOpen ? 'text-purple-400' : 'text-slate-500'
                      }`} />
                </div>
                <span className="text-xs sm:text-sm font-sans font-black text-slate-100 pr-3 transition-colors group-hover:text-white">
                  {item.question}
                </span>
              </div>
              
              <div className={`p-1.5 rounded-lg border transition-all shrink-0 ${
                isOpen 
                  ? 'bg-purple-400 border-purple-500 rotate-180' 
                  : 'bg-neutral-900/80 border-white/5 group-hover:border-white/10'
              }`}>
                <ChevronDown className={`w-4 h-4 transition-all ${
                  isOpen ? 'text-white' : 'text-slate-400'
                }`} />
              </div>
            </button>

            {/* Animated collapse item using motion/react */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pl-14 sm:pl-[68px] border-t border-white/5 pt-4 bg-purple-950/5">
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-semibold">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );

  if (isNested) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="w-5 h-5 text-amber-500" />
          <h4 className="text-sm font-sans font-black text-white uppercase tracking-wider">
            COMMON INQUIRIES
          </h4>
        </div>
        {content}
      </div>
    );
  }

  return (
    <section id="faq" className="py-20 relative overflow-hidden bg-[#050505] border-t border-white/5">
      {/* Dynamic ambient backgrounds */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-amber-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-2.5xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-white/10 text-[10px] font-mono font-black text-amber-400 tracking-wider uppercase mb-3">
            <Sparkles className="w-3 h-3 animate-spin text-amber-400" />
            Answers & Clarity
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight uppercase">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed font-semibold">
            Everything you need to understand about the Karma Butterflies cultural movement, reputation systems, and our dual-scarcity structure.
          </p>
        </div>

        {content}
      </div>
    </section>
  );
}
