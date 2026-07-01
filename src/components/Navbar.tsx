import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Twitter, 
  Sun, 
  Moon, 
  ChevronDown, 
  Lock, 
  Coins, 
  TrendingUp, 
  Sparkles, 
  Heart, 
  Award, 
  HelpingHand,
  Compass,
  FileText,
  UserCheck,
  Gamepad2,
  ShieldAlert
} from 'lucide-react';

interface NavbarProps {
  onScanClick: () => void;
  isLightMode: boolean;
  onThemeToggle: () => void;
  isBannerVisible?: boolean;
}

interface MenuItem {
  label: string;
  href: string;
  icon: any;
  external?: boolean;
  highlight?: boolean;
}

export default function Navbar({ onScanClick, isLightMode, onThemeToggle, isBannerVisible = true }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const triggerWhyKarma = (view: 'utility' | 'pillars', tab?: 'support' | 'uplift' | 'impact' | 'help') => {
    const event = new CustomEvent('set-why-karma-view', { detail: { view, tab } });
    window.dispatchEvent(event);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const menuItems: MenuItem[] = [
    { label: 'Inspiration', href: '#inspiration', icon: Compass },
    { label: 'X Badge 🦋', href: '#profile-overlay', icon: Award, highlight: true },
    { label: 'Karma Score', href: '#analyzer', icon: ShieldAlert },
    { label: 'NFT Hub', href: '#registry', icon: Coins },
    { label: 'Staking 🪙', href: '#staking', icon: TrendingUp },
    { label: 'Gamez 🎮', href: 'https://karmagamez.xyz', icon: Gamepad2, external: true },
    { label: 'Treasury', href: '#treasury', icon: Coins },
    { label: 'Creed', href: '#creed', icon: FileText },
    { label: 'Guardians', href: '#guardians', icon: UserCheck },
  ];

  return (
    <>
      <nav
        id="main-nav"
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          isBannerVisible ? 'top-10' : 'top-0'
        } ${
          scrolled 
            ? 'py-3 bg-black/75 backdrop-blur-md border-b border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]' 
            : 'py-5 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 group shrink-0">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-[#F59E0B] to-amber-400 group-hover:scale-105 transition-transform duration-300 shadow-md shadow-amber-500/20">
                <span className="text-slate-950 font-sans font-bold text-lg select-none">🦋</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-sans font-black text-xs sm:text-sm tracking-wide leading-none group-hover:text-[#F59E0B] transition-colors">
                  Karma Butterflies
                </span>
                <span className="text-slate-450 font-mono text-[8px] uppercase tracking-widest leading-none mt-0.5">
                  by KarmaScore
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2 bg-white/[0.03] border border-white/5 px-2.5 py-1.5 rounded-2xl">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      if (item.href === '#inspiration') {
                        window.dispatchEvent(new CustomEvent('open-inspiration-story'));
                      } else if (item.href.startsWith('#')) {
                        e.preventDefault();
                        window.location.hash = item.href;
                        const el = document.getElementById(item.href.slice(1));
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }
                    }}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className={`px-3 py-1.5 rounded-xl font-sans font-extrabold text-[10px] tracking-wider uppercase transition-all duration-200 flex items-center gap-1.5 ${
                      item.highlight
                        ? 'text-amber-400 bg-amber-500/10 border border-amber-500/25 shadow-sm shadow-amber-500/5 hover:bg-amber-500/20 hover:scale-103'
                        : item.external
                        ? 'text-[#F59E0B] hover:text-amber-300 hover:scale-103'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}

              {/* Why Karma Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  onMouseEnter={() => setDropdownOpen(true)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-[10px] font-sans font-extrabold tracking-wider uppercase transition-all cursor-pointer ${
                    dropdownOpen ? 'text-[#F59E0B] bg-white/5' : 'text-amber-400 hover:text-white'
                  }`}
                >
                  <span>Why Karma?</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-[#F59E0B]' : ''}`} />
                </button>

                {dropdownOpen && (
                  <div 
                    onMouseLeave={() => setDropdownOpen(false)}
                    className="absolute right-0 top-full mt-2 w-[420px] bg-neutral-950/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.8)] overflow-hidden z-50 p-4 animate-fade-in"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {/* Column 1: Financial & Holder Perks */}
                      <div className="space-y-1.5 border-r border-white/5 pr-4">
                        <div className="text-[8px] font-mono font-black text-amber-500 uppercase tracking-widest pb-1 border-b border-white/5 flex items-center gap-1">
                          <Coins className="w-2.5 h-2.5 text-amber-500" />
                          <span>HOLDER UTILITIES</span>
                        </div>
                        
                        <button
                          onClick={() => triggerWhyKarma('utility')}
                          className="w-full text-left p-1.5 rounded-xl hover:bg-white/5 transition group flex flex-col cursor-pointer"
                        >
                          <span className="text-[10px] font-sans font-black text-white group-hover:text-amber-400 transition-colors">
                            Why Karma Butterflies?
                          </span>
                          <span className="text-[9px] text-slate-450 leading-tight mt-0.5">
                            How we help normal crypto users out-perform insiders.
                          </span>
                        </button>

                        <button
                          onClick={() => triggerWhyKarma('utility')}
                          className="w-full text-left p-1.5 rounded-xl hover:bg-white/5 transition group flex flex-col cursor-pointer"
                        >
                          <span className="text-[10px] font-sans font-black text-white group-hover:text-amber-400 transition-colors flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5 text-amber-500" />
                            <span>Private Deal Flow</span>
                          </span>
                          <span className="text-[9px] text-slate-450 leading-tight mt-0.5">
                            Get first access to presales and beta rounds.
                          </span>
                        </button>

                        <button
                          onClick={() => triggerWhyKarma('utility')}
                          className="w-full text-left p-1.5 rounded-xl hover:bg-white/5 transition group flex flex-col cursor-pointer"
                        >
                          <span className="text-[10px] font-sans font-black text-white group-hover:text-amber-400 transition-colors flex items-center gap-1">
                            <Coins className="w-2.5 h-2.5 text-emerald-450" />
                            <span>Marketing Mining</span>
                          </span>
                          <span className="text-[9px] text-slate-450 leading-tight mt-0.5">
                            Earn real payouts for memes and reviews.
                          </span>
                        </button>

                        <button
                          onClick={() => triggerWhyKarma('utility')}
                          className="w-full text-left p-1.5 rounded-xl hover:bg-white/5 transition group flex flex-col cursor-pointer"
                        >
                          <span className="text-[10px] font-sans font-black text-white group-hover:text-amber-400 transition-colors flex items-center gap-1">
                            <TrendingUp className="w-2.5 h-2.5 text-purple-400" />
                            <span>Revenue Share Vault</span>
                          </span>
                          <span className="text-[9px] text-slate-450 leading-tight mt-0.5">
                            Payouts from client fees and AI Defi pools.
                          </span>
                        </button>
                      </div>

                      {/* Column 2: Ecosystem & Mission Pillars */}
                      <div className="space-y-1.5 pl-1">
                        <div className="text-[8px] font-mono font-black text-emerald-450 uppercase tracking-widest pb-1 border-b border-white/5 flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
                          <span>ECOSYSTEM PILLARS</span>
                        </div>

                        <button
                          onClick={() => triggerWhyKarma('pillars', 'support')}
                          className="w-full text-left p-1.5 rounded-xl hover:bg-white/5 transition group flex flex-col cursor-pointer"
                        >
                          <span className="text-[10px] font-sans font-black text-white group-hover:text-emerald-450 transition-colors flex items-center gap-1">
                            <Heart className="w-2.5 h-2.5 text-amber-500" />
                            <span>Support Others</span>
                          </span>
                          <span className="text-[9px] text-slate-450 leading-tight mt-0.5">
                            Providing counseling and peer networks.
                          </span>
                        </button>

                        <button
                          onClick={() => triggerWhyKarma('pillars', 'uplift')}
                          className="w-full text-left p-1.5 rounded-xl hover:bg-white/5 transition group flex flex-col cursor-pointer"
                        >
                          <span className="text-[10px] font-sans font-black text-white group-hover:text-emerald-450 transition-colors flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
                            <span>Uplift Builders</span>
                          </span>
                          <span className="text-[9px] text-slate-450 leading-tight mt-0.5">
                            Graphics, audits and exposure for builders.
                          </span>
                        </button>

                        <button
                          onClick={() => triggerWhyKarma('pillars', 'impact')}
                          className="w-full text-left p-1.5 rounded-xl hover:bg-white/5 transition group flex flex-col cursor-pointer"
                        >
                          <span className="text-[10px] font-sans font-black text-white group-hover:text-emerald-450 transition-colors flex items-center gap-1">
                            <Award className="w-2.5 h-2.5 text-purple-400" />
                            <span>Create Lasting Impact</span>
                          </span>
                          <span className="text-[9px] text-slate-450 leading-tight mt-0.5">
                            Constructive deeds into reputation.
                          </span>
                        </button>

                        <button
                          onClick={() => triggerWhyKarma('pillars', 'help')}
                          className="w-full text-left p-1.5 rounded-xl hover:bg-white/5 transition group flex flex-col cursor-pointer"
                        >
                          <span className="text-[10px] font-sans font-black text-white group-hover:text-emerald-450 transition-colors flex items-center gap-1">
                            <HelpingHand className="w-2.5 h-2.5 text-cyan-400" />
                            <span>Help in Need</span>
                          </span>
                          <span className="text-[9px] text-slate-450 leading-tight mt-0.5">
                            Hands-on assistance when times are hard.
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Action Controls */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <button
                onClick={onThemeToggle}
                className="p-2 text-slate-400 hover:text-[#F59E0B] transition-all rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center cursor-pointer hover:scale-105"
                title={isLightMode ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              >
                {isLightMode ? <Moon className="w-4 h-4 text-[#F59E0B]" /> : <Sun className="w-4 h-4 text-amber-400 animate-pulse" />}
              </button>

              {/* Twitter Icon */}
              <a
                href="https://x.com/karmascore_ai"
                target="_blank"
                rel="noreferrer"
                className="p-2 text-slate-400 hover:text-[#F59E0B] hover:bg-white/5 border border-transparent hover:border-white/10 rounded-xl transition-all cursor-pointer"
                title="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>

              {/* Desktop CTA buttons */}
              <div className="hidden lg:flex items-center gap-2">
                <button
                  onClick={onScanClick}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-[#F59E0B]/30 hover:border-[#F59E0B]/80 text-xs font-sans font-black tracking-widest uppercase transition-all duration-300 cursor-pointer text-[#F59E0B] hover:scale-102 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                >
                  Karma Score
                </button>

                <a
                  href="https://gravemint.io/mint/FXSVHzLvVFey57U8ETuhHzrzDRT3FhvqzbxWpyoAJA4c"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-[#F59E0B] text-black hover:bg-amber-400 rounded-xl font-sans font-black text-xs tracking-widest uppercase transition-all duration-300 shadow-lg shadow-amber-500/10 hover:scale-102 cursor-pointer"
                >
                  Mint Now ↗
                </a>
              </div>

              {/* Mobile Mint CTA button */}
              <a
                href="https://gravemint.io/mint/FXSVHzLvVFey57U8ETuhHzrzDRT3FhvqzbxWpyoAJA4c"
                target="_blank"
                rel="noreferrer"
                className="lg:hidden px-3.5 py-2 bg-[#F59E0B] text-black hover:bg-amber-405 rounded-xl font-sans font-black text-[10px] tracking-wider uppercase transition shadow-md hover:scale-102 flex items-center justify-center cursor-pointer"
              >
                Mint ↗
              </a>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-350 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center cursor-pointer"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Slide-out Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 lg:hidden"
            />

            {/* Slide-out Panel from Right */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 24, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-[295px] sm:w-[340px] bg-[#08080A]/95 backdrop-blur-xl border-l border-white/10 z-50 p-6 flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.8)] lg:hidden"
            >
              {/* Top Section */}
              <div className="space-y-6 overflow-y-auto max-h-[78vh] pr-1">
                {/* Header inside Menu */}
                <div className="flex items-center justify-between pb-4 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🦋</span>
                    <div className="flex flex-col">
                      <span className="text-white font-sans font-black text-sm tracking-wide">
                        Karma Navigation
                      </span>
                      <span className="text-slate-500 font-mono text-[8px] uppercase tracking-wider">
                        by KarmaScore
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-450 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Navigation Link Stack */}
                <div className="space-y-1.5">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={(e) => {
                          setMobileMenuOpen(false);
                          if (item.href === '#inspiration') {
                            window.dispatchEvent(new CustomEvent('open-inspiration-story'));
                          } else if (item.href.startsWith('#')) {
                            e.preventDefault();
                            window.location.hash = item.href;
                            const el = document.getElementById(item.href.slice(1));
                            if (el) {
                              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }
                        }}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noopener noreferrer' : undefined}
                        className={`flex items-center justify-between py-2.5 px-4 rounded-xl text-xs font-sans font-extrabold tracking-wider uppercase transition-all ${
                          item.highlight
                            ? 'text-amber-400 bg-amber-500/5 border border-amber-500/20 hover:bg-amber-500/10'
                            : item.external
                            ? 'text-[#F59E0B] bg-amber-500/5 border border-amber-500/10'
                            : 'text-slate-300 hover:text-[#F59E0B] hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{item.label}</span>
                        </div>
                        {item.highlight && (
                          <span className="text-[8px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-mono font-black">HOT</span>
                        )}
                        {item.external && (
                          <span className="text-[8px] bg-[#F59E0B]/20 text-[#F59E0B] px-1.5 py-0.5 rounded font-mono font-black">LIVE</span>
                        )}
                      </a>
                    );
                  })}
                </div>

                {/* Collapsible dropdown for "Why Karma" on mobile */}
                <div className="bg-white/[0.02] rounded-2xl p-4 border border-white/5 space-y-2">
                  <button
                    onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                    className="w-full flex items-center justify-between text-[#F59E0B] font-sans font-black text-[10px] tracking-wider uppercase py-1"
                  >
                    <span>Why Karma Butterflies?</span>
                    <ChevronDown className={`w-4 h-4 transition-transform text-[#F59E0B] ${mobileDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {mobileDropdownOpen && (
                    <div className="space-y-3 pt-3 border-t border-white/5 pl-1 animate-fade-in">
                      <button
                        onClick={() => triggerWhyKarma('utility')}
                        className="w-full text-left block text-[11px] font-bold text-slate-300 hover:text-[#F59E0B] transition"
                      >
                        💡 <span className="underline ml-1">Holder Utilities Overview</span>
                      </button>
                      <button
                        onClick={() => triggerWhyKarma('utility')}
                        className="w-full text-left block text-[11px] font-bold text-slate-300 hover:text-[#F59E0B] transition"
                      >
                        🔒 <span className="underline ml-1">Private Deal Flow Access</span>
                      </button>
                      <button
                        onClick={() => triggerWhyKarma('utility')}
                        className="w-full text-left block text-[11px] font-bold text-slate-300 hover:text-[#F59E0B] transition"
                      >
                        🪙 <span className="underline ml-1">Marketing Mining Rewards</span>
                      </button>
                      <button
                        onClick={() => triggerWhyKarma('utility')}
                        className="w-full text-left block text-[11px] font-bold text-slate-300 hover:text-[#F59E0B] transition"
                      >
                        📈 <span className="underline ml-1">Revenue Share Vault</span>
                      </button>
                      
                      <div className="h-[1px] bg-white/5 my-2" />
                      
                      <button
                        onClick={() => triggerWhyKarma('pillars', 'support')}
                        className="w-full text-left block text-[11px] font-bold text-slate-300 hover:text-[#F59E0B] transition"
                      >
                        ❤️ <span className="underline ml-1">Support Others Pillar</span>
                      </button>
                      <button
                        onClick={() => triggerWhyKarma('pillars', 'uplift')}
                        className="w-full text-left block text-[11px] font-bold text-slate-300 hover:text-[#F59E0B] transition"
                      >
                        ✨ <span className="underline ml-1">Uplift Builders Program</span>
                      </button>
                      <button
                        onClick={() => triggerWhyKarma('pillars', 'impact')}
                        className="w-full text-left block text-[11px] font-bold text-slate-300 hover:text-[#F59E0B] transition"
                      >
                        🏆 <span className="underline ml-1">Create Lasting Impact</span>
                      </button>
                      <button
                        onClick={() => triggerWhyKarma('pillars', 'help')}
                        className="w-full text-left block text-[11px] font-bold text-slate-300 hover:text-[#F59E0B] transition"
                      >
                        🤝 <span className="underline ml-1">Help in Need Aid</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Drawer Actions */}
              <div className="space-y-4 pt-6 border-t border-white/5 bg-[#08080A]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-sans text-xs">Follow us</span>
                    <a
                      href="https://x.com/karmascore_ai"
                      target="_blank"
                      rel="noreferrer"
                      className="w-7 h-7 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center transition"
                    >
                      <Twitter className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">v1.2.0 Beta</span>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onScanClick();
                    }}
                    className="w-full text-center py-3 rounded-xl bg-slate-900 border border-white/10 text-white font-sans font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition"
                  >
                    Karma Score
                  </button>
                  <a
                    href="https://gravemint.io/mint/FXSVHzLvVFey57U8ETuhHzrzDRT3FhvqzbxWpyoAJA4c"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-3 rounded-xl bg-[#F59E0B] text-black font-sans font-black text-xs uppercase tracking-widest flex items-center justify-center gap-1 hover:bg-amber-400 transition"
                  >
                    <span>Mint Now ↗</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
