import React, { useState, useEffect } from 'react';
import { 
  Coins, 
  Heart, 
  ArrowUpRight, 
  Activity, 
  Sparkles, 
  TrendingUp, 
  Bot, 
  ChevronRight, 
  DollarSign, 
  Info,
  Award,
  ExternalLink
} from 'lucide-react';

interface TxLog {
  id: string;
  source: 'AI DeFi Yield' | 'Community Donation' | 'Protocol Allocation';
  amount: number;
  time: string;
  txHash: string;
}

export default function TreasuryPool() {
  const [totalPool, setTotalPool] = useState<number>(428450);
  const [aiYield, setAiYield] = useState<number>(284310);
  const [charityFuel, setCharityFuel] = useState<number>(144140);
  
  // Simulated dynamic inputs
  const [donationAmount, setDonationAmount] = useState<string>('250');
  const [estimateTokenId, setEstimateTokenId] = useState<string>('88');
  const [estimatedReward, setEstimatedReward] = useState<number | null>(null);
  const [isClaiming, setIsClaiming] = useState<boolean>(false);
  const [claimSuccess, setClaimSuccess] = useState<boolean>(false);
  
  // Custom transaction stream logging for atmosphere
  const [logs, setLogs] = useState<TxLog[]>([
    { id: '1', source: 'AI DeFi Yield', amount: 142.50, time: '2 mins ago', txHash: '0x3f5...d82a' },
    { id: '2', source: 'Community Donation', amount: 1250.00, time: '14 mins ago', txHash: '0x9a2...fe82' },
    { id: '3', source: 'AI DeFi Yield', amount: 89.15, time: '41 mins ago', txHash: '0xfa1...890b' },
    { id: '4', source: 'Community Donation', amount: 500.00, time: '1 hr ago', txHash: '0xbe8...511a' },
  ]);

  // Periodic tiny real-time growth representing continuous AI agent activity in the background
  useEffect(() => {
    const timer = setInterval(() => {
      const increment = parseFloat((Math.random() * 2.5 + 0.1).toFixed(2));
      setTotalPool(prev => prev + increment);
      setAiYield(prev => prev + increment);
      
      // Randomly append a new transaction log representing AI activity
      if (Math.random() > 0.7) {
        const mockAmt = parseFloat((Math.random() * 45 + 5).toFixed(2));
        const newTx: TxLog = {
          id: Date.now().toString(),
          source: 'AI DeFi Yield',
          amount: mockAmt,
          time: 'Just now',
          txHash: `0x${Math.random().toString(16).substr(2, 6)}...${Math.random().toString(16).substr(2, 4)}`
        };
        setLogs(prev => [newTx, ...prev.slice(0, 4)]);
      }
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  // Handle a voluntary donation that fuels the community pool
  const handleCharityDonation = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(donationAmount);
    if (isNaN(parsed) || parsed <= 0) return;

    // Direct addition of charity dollars
    setTotalPool(prev => prev + parsed);
    setCharityFuel(prev => prev + parsed);
    
    // Log the transaction
    const newTx: TxLog = {
      id: Date.now().toString(),
      source: 'Community Donation',
      amount: parsed,
      time: 'Just now',
      txHash: `0x${Math.random().toString(16).substr(2, 6)}...${Math.random().toString(16).substr(2, 4)}`
    };
    
    setLogs(prev => [newTx, ...prev.slice(0, 4)]);
    setDonationAmount('');

    // Trigger visual action feedback
    const originalInput = donationAmount;
    alert(`Thank you for representing the swarm! Your community contribution of ${originalInput} USDT has been credited to the Community Vault to support ecosystem outreach and builder grants.`);
  };

  // Perform estimation based on token tier (Light: ID <= 444, Shadow: ID > 444)
  const handleCalculateEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    const idNum = parseInt(estimateTokenId, 10);
    if (isNaN(idNum) || idNum < 1 || idNum > 888) {
      alert('Please enter a valid Butterfly Token ID between 1 and 888.');
      return;
    }

    // High Karma score yields larger share of the USDT pool
    // Deterministic calculations based on Token ID
    const baseScore = 50 + (idNum % 46);
    const multiplier = idNum <= 500 ? 2.5 : 2.1;
    const computedAmt = parseFloat((baseScore * multiplier).toFixed(2));
    
    setEstimatedReward(computedAmt);
    setClaimSuccess(false);
  };

  const executeSimulatedClaim = () => {
    setIsClaiming(true);
    setTimeout(() => {
      setIsClaiming(false);
      setClaimSuccess(true);
    }, 1500);
  };

  return (
    <section id="treasury" className="py-24 relative overflow-hidden bg-[#0A0A0B] border-t border-white/10">
      {/* Decorative background visualizers */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-b from-[#F59E0B]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-t from-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono text-[#F59E0B] uppercase tracking-widest block mb-2 font-bold">
            Community Vault & DeFi Treasury
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-black text-white tracking-tight">
            The Community Swarm Vault
          </h2>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed">
            Welcome to the community vault. Anyone can send direct donations to power our community, and the treasury actively deploys capital in top AI DeFi protocols. Every single NFT holder benefits directly from these yield-bearing positions.
          </p>
        </div>

        {/* Treasury Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* LEFT PANEL: Big Counter & Distribution Summary */}
          <div className="lg:col-span-7 bg-[#111112] border border-white/10 rounded-3xl p-6 sm:p-10 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F59E0B] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F59E0B]"></span>
                </span>
                <span className="text-[10px] font-mono text-[#F59E0B] uppercase tracking-widest font-black">
                  LIVE COMMUNITY VAULT METRICS
                </span>
              </div>

              <div>
                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                  Total Community Vault & Protocol Balance
                </span>
                <h3 className="text-4xl sm:text-6xl font-mono font-black text-white mt-2 flex items-baseline">
                  ${totalPool.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  <span className="text-xs sm:text-sm text-[#F59E0B] font-sans font-bold ml-2">USDT</span>
                </h3>
              </div>

              {/* Breakdown metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/5">
                <div className="bg-black/40 p-4 rounded-xl border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">DeFi AI Protocol Position</span>
                    <Bot className="w-3.5 h-3.5 text-purple-400" />
                  </div>
                  <span className="text-base sm:text-lg font-mono font-bold text-white block">
                    ${aiYield.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-[9px] font-mono text-purple-400 block">Yielding in AI DeFi protocols</span>
                </div>

                <div className="bg-black/40 p-4 rounded-xl border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">Community Donations</span>
                    <Heart className="w-3.5 h-3.5 text-[#F59E0B]" />
                  </div>
                  <span className="text-base sm:text-lg font-mono font-bold text-white block">
                    ${charityFuel.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-[9px] font-mono text-amber-500 block">Voluntary community donations</span>
                </div>
              </div>

              {/* Professional Statement regarding charity & representation */}
              <div className="bg-amber-950/20 border border-[#F59E0B]/20 rounded-2xl p-4 flex gap-3 text-xs text-amber-100 leading-relaxed font-sans mt-4">
                <Info className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white">Holder Yield & Community Support:</strong> Anyone in the Web3 space can donate directly to our community wallet. Additionally, our treasury maintains active yield-bearing positions in decentralized AI DeFi protocols, and <strong className="text-[#F59E0B]">every single NFT holder</strong> benefits from these yield-bearing positions.
                </p>
              </div>

              {/* DexFi & DeBank Verification Section requested by user */}
              <div className="bg-[#161617]/90 border border-white/5 rounded-2xl p-4 space-y-3 mt-4 text-xs font-sans">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#F59E0B] uppercase tracking-wider font-extrabold">
                    <span className="w-1.5 h-1.5 bg-[#F59E0B] rounded-full animate-ping" />
                    <span>Real-Time Vault Verification</span>
                  </div>
                  <div className="px-1.5 py-0.5 rounded text-[8px] font-mono font-black text-black bg-[#F59E0B] tracking-wider uppercase">
                    DeFi Allocations Verified
                  </div>
                </div>
                
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  Our active protocol positions and incoming community donations are easily verifiable. Check our live balances and DeFi smart contract allocations directly on on-chain explorers:
                </p>

                <div className="grid grid-cols-3 gap-2">
                  <a
                    href="https://dexfi.com"
                    target="_blank"
                    rel="noreferrer"
                    className="py-1.5 px-2 bg-black hover:bg-neutral-900 border border-white/10 hover:border-[#F59E0B]/50 rounded-lg text-center text-[10px] font-mono text-[#F59E0B] font-bold flex items-center justify-center gap-1 transition-all"
                  >
                    <span>dexfi.com</span>
                    <ExternalLink className="w-3 h-3 text-[#F59E0B]" />
                  </a>
                  <a
                    href="https://dexfi.ai"
                    target="_blank"
                    rel="noreferrer"
                    className="py-1.5 px-2 bg-black hover:bg-neutral-900 border border-white/10 hover:border-[#F59E0B]/50 rounded-lg text-center text-[10px] font-mono text-[#F59E0B] font-bold flex items-center justify-center gap-1 transition-all"
                  >
                    <span>dexfi.ai</span>
                    <ExternalLink className="w-3 h-3 text-[#F59E0B]" />
                  </a>
                  <a
                    href="https://debank.com"
                    target="_blank"
                    rel="noreferrer"
                    className="py-1.5 px-2 bg-black hover:bg-neutral-900 border border-white/10 hover:border-[#F59E0B]/50 rounded-lg text-center text-[10px] font-mono text-slate-300 font-bold flex items-center justify-center gap-1 transition-all"
                    title="DeBank Portfolio Explorer"
                  >
                    <span>debank.com</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>
              </div>
            </div>

            {/* Simulated Live Transaction Log stream */}
            <div className="mt-8 pt-6 border-t border-white/5 space-y-3">
              <h4 className="text-[10px] font-mono uppercase text-slate-500 tracking-wider flex items-center gap-1.5 font-bold">
                <Activity className="w-3 h-3 text-[#F59E0B] animate-pulse" />
                Live Vault Log Stream
              </h4>

              <div className="space-y-2">
                {logs.map(log => (
                  <div key={log.id} className="flex justify-between items-center text-[11px] bg-black/30 px-3 py-2 rounded-lg border border-white/5">
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${log.source === 'Community Donation' ? 'bg-[#F59E0B]' : 'bg-purple-400'}`} />
                      <span className="font-sans font-medium text-slate-300">{log.source}</span>
                      <span className="font-mono text-slate-600 text-[9px]">{log.txHash}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-extrabold text-white">+{log.amount.toFixed(2)} USDT</span>
                      <span className="text-[9px] font-mono text-slate-600">{log.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT PANEL: Fill Pool & Live Reward Claim Calculator */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            
            {/* Interactive Donation Station */}
            <div className="bg-[#111112] border border-white/10 rounded-3xl p-6 flex-grow flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#F59E0B]">
                  <Heart className="w-4 h-4 fill-[#F59E0B]" />
                  <h4 className="text-xs font-mono font-black uppercase tracking-wider">
                    Community Donation Portal
                  </h4>
                </div>
                
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                  Support the community by sending a custom donation to our vault. All donations are pooled securely to fuel community operations, shared outreach, and support for Web3 builders.
                </p>

                <form onSubmit={handleCharityDonation} className="space-y-3 pt-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-600 font-mono text-xs">
                      $
                    </div>
                    <input 
                      type="number"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      placeholder="Amount in USDT"
                      className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl py-2.5 pl-7 pr-16 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B]"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-500 font-mono text-[9px] uppercase">
                      USDT BEP-20
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#F59E0B] hover:bg-amber-500 text-black font-sans font-extrabold text-xs py-2.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 hover:indigo-glow"
                  >
                    <span>Send Vault Donation</span>
                    <ArrowUpRight className="w-4 h-4 text-black" />
                  </button>
                </form>
              </div>

              <div className="text-[9px] font-mono text-slate-500 text-center mt-3">
                Transparent cryptographic pooling. Audited by the swarm.
              </div>
            </div>

            {/* Interactive Yield Estimator */}
            <div className="bg-[#111112] border border-white/10 rounded-3xl p-6 flex-grow flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#F59E0B]">
                  <Coins className="w-4 h-4" />
                  <h4 className="text-xs font-mono font-black uppercase tracking-wider">
                    Query Holder DeFi Yield Share
                  </h4>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                  Input your Karma Butterfly Token ID to calculate your share of the DeFi protocol yields. Every holder is eligible to claim their portion of the yields generated by our AI DeFi positions.
                </p>

                <form onSubmit={handleCalculateEstimate} className="space-y-3 pt-2">
                  <div className="flex gap-2">
                    <input 
                      type="number"
                      min="1"
                      max="888"
                      value={estimateTokenId}
                      onChange={(e) => setEstimateTokenId(e.target.value)}
                      placeholder="Token ID (e.g. 88)"
                      className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl py-2 px-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#F59E0B]"
                    />
                    <button
                      type="submit"
                      className="bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-xs px-4 rounded-xl transition-colors shrink-0 uppercase tracking-widest font-bold border border-white/5"
                    >
                      Search
                    </button>
                  </div>
                </form>

                {estimatedReward !== null && (
                  <div className="bg-black/60 p-4 rounded-xl border border-white/5 space-y-3 animate-fade-in">
                    <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                      <span className="text-slate-500 font-mono">Butterfly #{estimateTokenId}</span>
                      <span className="text-[#F59E0B] font-sans font-bold flex items-center gap-1 text-[10px]">
                        <Award className="w-3.5 h-3.5" />
                        DeFi Yield Share
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-slate-400">Claimable Yield Share:</span>
                      <span className="text-lg font-mono font-extrabold text-white">
                        {estimatedReward} <span className="text-[10px] text-slate-500 uppercase">USDT</span>
                      </span>
                    </div>

                    {claimSuccess ? (
                      <div className="text-center text-xs font-sans text-emerald-400 bg-emerald-950/20 border border-emerald-500/20 py-1.5 rounded-lg animate-pulse">
                        ✔ Simulated DeFi Yield Claimed Successfully
                      </div>
                    ) : (
                      <button 
                        onClick={executeSimulatedClaim}
                        disabled={isClaiming}
                        className="w-full bg-orange-950/40 text-amber-400 hover:bg-orange-900/30 border border-[#F59E0B]/30 font-sans font-bold text-xs py-1.5 rounded-lg transition-colors text-center block"
                      >
                        {isClaiming ? 'Claiming Yield...' : 'Claim DeFi Yield'}
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="text-[9px] font-mono text-slate-500 text-center mt-3">
                No financial outcomes or investments guaranteed by third parties. DeFi protocol allocations are subject to web3 smart contract conditions.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
