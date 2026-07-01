import React, { useState, useMemo, useRef, useEffect } from 'react';
import JSZip from 'jszip';
import SvgButterfly from './SvgButterfly';
import { 
  Download, 
  Search, 
  SlidersHorizontal, 
  Grid3X3, 
  Sparkles, 
  CheckCircle, 
  Loader2, 
  Info,
  ExternalLink,
  ChevronRight,
  Shield,
  FileJson,
  Zap,
  Check
} from 'lucide-react';

// Helper function to calculate numeric hash from any seed string
const hashString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
};

// Generates complete metadata traits for a specific token ID
export const getButterflyMetadata = (id: number) => {
  const isLight = id <= 444;
  const seed = `karma-butterfly-${id}`;
  const h = hashString(seed);
  
  // Deterministic attributes
  const wingRoundness = 5 + (h % 30);
  const wingWidthFactor = 0.8 + ((h % 5) / 15);
  const detailIndex = h % 3;
  
  const detailStyle = [
    'Bio-Circuit Lines',
    'Quantum Rings',
    'Celestial Dust Trails'
  ][detailIndex];

  const rarity = 
    h % 20 === 0 ? 'Legendary' :
    h % 8 === 0 ? 'Epic' :
    h % 3 === 0 ? 'Rare' : 'Common';

  const powerScore = 60 + (h % 41);
  const coreFrequency = 1.0 + ((h % 9) / 2);

  // Archetypes alignment
  const archetype = isLight
    ? ['Grand Architect', 'Guild Vanguard', 'Beacon of Trust'][h % 3]
    : ['Rogue Sentinel', 'Honeypot Hunter', 'Shadow Oracle'][h % 3];

  return {
    id,
    name: `Karma Butterfly #${id}`,
    seed,
    alignment: isLight ? 'Light' : 'Shadow',
    collection: isLight ? 'Builders & Mentors' : 'Sentinels & Survivors',
    rarity,
    archetype,
    score: powerScore,
    traits: {
      'Wing Curvature': `${wingRoundness}px`,
      'Wing Expansion': `${Math.round(wingWidthFactor * 100)}%`,
      'Internal Circuit': detailStyle,
      'Chamber Frequency': `${coreFrequency} GHz`,
      'Resonance Level': powerScore,
      'Cybernetic Rank': rarity,
    }
  };
};

// Generates standard OpenSea/ERC-721 compatible metadata for smart contracts
export const getStandardERC721Metadata = (id: number) => {
  const meta = getButterflyMetadata(id);
  return {
    name: meta.name,
    description: `Karma Butterflies are a collection of 888 unique generative digital vectors representing on-chain trust, reputation, and builder credentials. Butterfly #${id} belongs to the ${meta.alignment} alignment.`,
    image: `ipfs://__REPLACE_WITH_YOUR_IMAGES_CID__/${id}.svg`,
    external_url: `https://karmascore.io/registry/${id}`,
    attributes: [
      { trait_type: "Alignment", value: meta.alignment },
      { trait_type: "Collection", value: meta.collection },
      { trait_type: "Rarity", value: meta.rarity },
      { trait_type: "Archetype", value: meta.archetype },
      { trait_type: "Wing Curvature", value: meta.traits['Wing Curvature'] },
      { trait_type: "Wing Expansion", value: meta.traits['Wing Expansion'] },
      { trait_type: "Internal Circuit", value: meta.traits['Internal Circuit'] },
      { trait_type: "Chamber Frequency", value: meta.traits['Chamber Frequency'] },
      { trait_type: "Resonance Level", display_type: "number", value: meta.traits['Resonance Level'] },
      { trait_type: "Cybernetic Rank", value: meta.traits['Cybernetic Rank'] }
    ]
  };
};

export default function ButterflyRegistry() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'light' | 'shadow'>('all');
  const [sortBy, setSortBy] = useState<'id-asc' | 'id-desc' | 'score-desc'>('id-asc');
  const [selectedId, setSelectedId] = useState<number | null>(1); // Default to #1 selected
  const [visibleCount, setVisibleCount] = useState(24); // Lazy load initial count
  
  // Evolved showcase states
  const [inspectMode, setInspectMode] = useState<'genesis' | 'evolved'>('genesis');
  const [evolvedIds, setEvolvedIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('karma_evolved_ids');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [mutatingId, setMutatingId] = useState<number | null>(null);
  const [mutationProgress, setMutationProgress] = useState(0);
  const [mutationStepText, setMutationStepText] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('karma_evolved_ids', JSON.stringify(evolvedIds));
    } catch (e) {
      console.warn(e);
    }
  }, [evolvedIds]);

  // ZIP generation states
  const [zippingCollection, setZippingCollection] = useState<'light' | 'shadow' | 'full' | null>(null);
  const [zipProgress, setZipProgress] = useState(0);
  const [zipStatusText, setZipStatusText] = useState('');
  
  // Single download states
  const [downloandingPng, setDownloadingPng] = useState(false);

  // Intersection observer or simple element-scroll triggers for infinite scrolling performance
  const containerRef = useRef<HTMLDivElement>(null);

  // Load more trigger
  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 24, 888));
  };

  const handleEvolveTrigger = (id: number) => {
    if (mutatingId !== null) return;
    setMutatingId(id);
    setMutationProgress(0);
    setMutationStepText('ACCESSING METAMORPHOSIS VECTORS...');

    let current = 0;
    const interval = setInterval(() => {
      current += 4;
      if (current >= 100) {
        clearInterval(interval);
        setMutationProgress(100);
        setMutationStepText('MUTATION SUCCESSFUL! TOKEN SYNCHRONIZED.');
        setTimeout(() => {
          setEvolvedIds(prev => {
            if (prev.includes(id)) return prev;
            return [...prev, id];
          });
          setMutatingId(null);
        }, 800);
      } else {
        setMutationProgress(current);
        if (current < 20) {
          setMutationStepText('DECONSTRUCTING GENESIS DNA...');
        } else if (current < 45) {
          setMutationStepText('INJECTING 852Hz SOLFEGGIO WAVE...');
        } else if (current < 70) {
          setMutationStepText('RECONSTRUCTING DRAGON WING FRAMES...');
        } else if (current < 90) {
          setMutationStepText('STABILIZING CRYSTALLINE ENERGY...');
        } else {
          setMutationStepText('FINALIZING BLOCK REGISTRATION...');
        }
      }
    }, 80);
  };

  const handleResetTrigger = (id: number) => {
    setEvolvedIds(prev => prev.filter(item => item !== id));
  };

  // Generate lists
  const allButterflies = useMemo(() => {
    const arr = [];
    for (let i = 1; i <= 888; i++) {
      arr.push(i);
    }
    return arr;
  }, []);

  const filteredButterflies = useMemo(() => {
    let result = allButterflies;

    // Filter by Tab (Light vs Shadow)
    if (activeTab === 'light') {
      result = result.filter(id => id <= 444);
    } else if (activeTab === 'shadow') {
      result = result.filter(id => id > 444);
    }

    // Filter by Search Term
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(id => {
        const metadata = getButterflyMetadata(id);
        return (
          id.toString() === term ||
          metadata.name.toLowerCase().includes(term) ||
          metadata.archetype.toLowerCase().includes(term) ||
          metadata.rarity.toLowerCase() === term
        );
      });
    }

    // Sort
    return [...result].sort((a, b) => {
      if (sortBy === 'id-asc') return a - b;
      if (sortBy === 'id-desc') return b - a;
      if (sortBy === 'score-desc') {
        const scoreA = getButterflyMetadata(a).score;
        const scoreB = getButterflyMetadata(b).score;
        return scoreB - scoreA;
      }
      return a - b;
    });
  }, [allButterflies, activeTab, searchTerm, sortBy]);

  // Reset page when triggers change
  useEffect(() => {
    setVisibleCount(24);
  }, [activeTab, searchTerm, sortBy]);

  // Get current selected butterfly details
  const selectedMetadata = useMemo(() => {
    if (selectedId === null) return null;
    return getButterflyMetadata(selectedId);
  }, [selectedId]);

  // Scroll listener to auto-load more items when scrolling down
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (target.scrollHeight - target.scrollTop <= target.clientHeight + 100) {
      if (visibleCount < filteredButterflies.length) {
        handleLoadMore();
      }
    }
  };

  // Function to capture the pure raw SVG element of a given token, return it as string
  const getSvgStringForToken = (id: number) => {
    const meta = getButterflyMetadata(id);
    const variant = meta.alignment === 'Light' ? 'light' : 'shadow';
    const seed = meta.seed;
    
    // Exact colors from SvgButterfly engine
    const getColors = () => {
      if (variant === 'shadow') {
        return { primary: '#c084fc', secondary: '#ec4899', glow: 'drop-shadow(0 0 20px rgba(192, 132, 252, 0.6))' };
      } else {
        return { primary: '#34d399', secondary: '#67e8f9', glow: 'drop-shadow(0 0 20px rgba(52, 211, 153, 0.6))' };
      }
    };
    
    const colors = getColors();
    const h = hashString(seed);
    const wingRoundness = 5 + (h % 30);
    const wingWidthFactor = 0.8 + ((h % 5) / 15);
    const detailIndex = h % 3;

    const antennaL = "M100 70 Q 75 40 65 30 Q 60 25 55 25";
    const antennaR = "M100 70 Q 125 40 135 30 Q 140 25 145 25";

    // Build the SVG code without react-motion elements so dry SVGs compile cleanly offline
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="800" height="800" style="background:#050505; font-family:sans-serif; overflow:visible;">
      <defs>
        <linearGradient id="wingGrad-${seed}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${colors.primary}" />
          <stop offset="50%" stop-color="${colors.secondary}" />
          <stop offset="100%" stop-color="${colors.primary}" stop-opacity="0.4" />
        </linearGradient>
        <linearGradient id="wingAccent-${seed}" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.8" />
          <stop offset="100%" stop-color="${colors.primary}" stop-opacity="0.1" />
        </linearGradient>
        <radialGradient id="bodyGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#1e293b" />
          <stop offset="70%" stop-color="#0f172a" />
          <stop offset="100%" stop-color="#020617" />
        </radialGradient>
      </defs>
      
      <!-- Background subtle halo -->
      <circle cx="100" cy="100" r="80" fill="none" stroke="${colors.primary}" stroke-opacity="0.1" stroke-width="4" />
      <circle cx="100" cy="100" r="1.5" fill="${colors.secondary}" opacity="0.6" />
      <circle cx="50" cy="60" r="1" fill="${colors.primary}" opacity="0.5" />
      <circle cx="150" cy="60" r="1.2" fill="${colors.secondary}" opacity="0.4" />
      <circle cx="70" cy="150" r="1.5" fill="${colors.primary}" opacity="0.6" />
      
      <!-- Antennas -->
      <path d="${antennaL}" fill="none" stroke="${colors.primary}" stroke-width="1.5" stroke-linecap="round" opacity="0.8" />
      <circle cx="55" cy="25" r="2.5" fill="${colors.secondary}" />
      <path d="${antennaR}" fill="none" stroke="${colors.primary}" stroke-width="1.5" stroke-linecap="round" opacity="0.8" />
      <circle cx="145" cy="25" r="2.5" fill="${colors.secondary}" />

      <!-- Left Wings (Static High Res) -->
      <g>
        <path d="M100 100 C 70 ${40 - wingRoundness / 2}, 30 ${30 + wingRoundness}, 10 ${60 + wingRoundness / 2} C -3 ${78 * wingWidthFactor}, 25 110, 100 100 Z" fill="url(#wingGrad-${seed})" stroke="${colors.primary}" stroke-width="0.75" opacity="0.9" />
        ${detailIndex === 0 ? `<path d="M100 100 Q 55 70 30 75 Q 45 85 100 100" fill="none" stroke="url(#wingAccent-${seed})" stroke-width="1.5" opacity="0.6" />` : ''}
        ${detailIndex === 1 ? `<circle cx="60" cy="70" r="6" fill="none" stroke="${colors.secondary}" stroke-width="1" opacity="0.6" /><line x1="100" y1="100" x2="60" y2="70" stroke="${colors.secondary}" stroke-width="0.5" opacity="0.6" />` : ''}
        ${detailIndex === 2 ? `<path d="M100 100 C 80 80, 60 85, 45 70 C 60 90, 80 95, 100 100" fill="url(#wingAccent-${seed})" opacity="0.5" />` : ''}
        <path d="M100 100 C 75 110, 40 135, 25 155 C 10 170, 35 180, 65 160 C 85 145, 95 125, 100 100 Z" fill="url(#wingGrad-${seed})" stroke="${colors.primary}" stroke-width="0.5" opacity="0.8" />
      </g>

      <!-- Right Wings (Static High Res) -->
      <g>
        <path d="M100 100 C 130 ${40 - wingRoundness / 2}, 170 ${30 + wingRoundness}, 190 ${60 + wingRoundness / 2} C 203 ${78 * wingWidthFactor}, 175 110, 100 100 Z" fill="url(#wingGrad-${seed})" stroke="${colors.primary}" stroke-width="0.75" opacity="0.9" />
        ${detailIndex === 0 ? `<path d="M100 100 Q 145 70 170 75 Q 155 85 100 100" fill="none" stroke="url(#wingAccent-${seed})" stroke-width="1.5" opacity="0.6" />` : ''}
        ${detailIndex === 1 ? `<circle cx="140" cy="70" r="6" fill="none" stroke="${colors.secondary}" stroke-width="1" opacity="0.6" /><line x1="100" y1="100" x2="140" y2="70" stroke="${colors.secondary}" stroke-width="0.5" opacity="0.6" />` : ''}
        ${detailIndex === 2 ? `<path d="M100 100 C 120 80, 140 85, 155 70 C 140 90, 120 95, 100 100" fill="url(#wingAccent-${seed})" opacity="0.5" />` : ''}
        <path d="M100 100 C 125 110, 160 135, 175 155 C 190 170, 165 180, 135 160 C 115 145, 105 125, 100 100 Z" fill="url(#wingGrad-${seed})" stroke="${colors.primary}" stroke-width="0.5" opacity="0.8" />
      </g>

      <!-- Central Body -->
      <g id="body">
        <rect x="94" y="65" width="12" height="85" rx="6" fill="url(#bodyGrad)" stroke="${colors.secondary}" stroke-width="1.5" />
        <rect x="97" y="70" width="6" height="75" rx="3" fill="${colors.primary}" opacity="0.8" />
        <circle cx="100" cy="62" r="5" fill="#1e293b" stroke="${colors.primary}" stroke-width="1" />
        <circle cx="100" cy="62" r="2.5" fill="${colors.secondary}" />
      </g>
      
      <!-- Label on-chain stamp -->
      <text x="10" y="190" fill="#4b5563" font-size="6" font-family="monospace" letter-spacing="1">TOKEN ID: #${id}</text>
      <text x="190" y="190" fill="#4b5563" font-size="6" font-family="monospace" text-anchor="end" letter-spacing="1">${meta.alignment.toUpperCase()} COLLECTION</text>
    </svg>`;
  };

  // Convert SVG string to real PNG payload via a temporary canvas
  const drawSvgToCanvas = (svgStr: string): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const svgBlob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 1000; // Super high-res 1000x1000 pixels
        canvas.height = 1000;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context failed'));
          return;
        }
        
        ctx.fillStyle = '#050505'; // Dark background
        ctx.fillRect(0, 0, 1000, 1000);
        ctx.drawImage(img, 0, 0, 1000, 1000);
        
        canvas.toBlob((blob) => {
          URL.revokeObjectURL(url);
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Blob conversion failed'));
          }
        }, 'image/png');
      };

      img.onerror = (e) => {
        URL.revokeObjectURL(url);
        reject(e);
      };

      img.src = url;
    });
  };

  // Handles downloading a single butterfly as SVG
  const handleSingleDownloadSvg = () => {
    if (!selectedId) return;
    const svgStr = getSvgStringForToken(selectedId);
    const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `karma-butterfly-${selectedId}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Handles downloading a single butterfly as PNG
  const handleSingleDownloadPng = async () => {
    if (!selectedId) return;
    setDownloadingPng(true);
    try {
      const svgStr = getSvgStringForToken(selectedId);
      const blob = await drawSvgToCanvas(svgStr);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `karma-butterfly-${selectedId}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert('Error rendering high-res PNG. Falling back to SVG download.');
    } finally {
      setDownloadingPng(false);
    }
  };

  // Handles single download of metadata JSON
  const handleSingleDownloadJson = () => {
    if (!selectedId) return;
    const stdMeta = getStandardERC721Metadata(selectedId);
    const dataStr = JSON.stringify(stdMeta, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedId}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // BULK ZIP PACKAGING ENGINE (Optimized)
  const compileBulkZip = async (type: 'light' | 'shadow' | 'full') => {
    if (zippingCollection !== null) return;
    
    setZippingCollection(type);
    setZipProgress(1);
    setZipStatusText('Initializing JSZip compiler...');

    // To ensure perfect compatibility with OpenSea, Thirdweb, and IPFS uploaders:
    // We package exactly matching directories:
    // 1. "images/" containing only standard token SVG files ([id].svg)
    // 2. "metadata/" containing only standard token ERC-721 JSON files ([id].json)
    // We avoid writing any extra files (such as index manifests, Readme files, or additional formats)
    // inside the ZIP so the uploader registers exactly the requested number of tokens (e.g. exactly 888 for the full package) with zero mismatches.
    
    try {
      const zip = new JSZip();
      const startId = type === 'light' ? 1 : (type === 'shadow' ? 445 : 1);
      const endId = type === 'light' ? 444 : (type === 'shadow' ? 888 : 888);
      
      const imagesFolder = zip.folder('images');
      const metaFolder = zip.folder('metadata');
      
      // Step 1: Pack SVGs and Metadata JSON files (very fast)
      setZipStatusText('Compiling vector SVGs and JSON metadata packets...');
      await new Promise(resolve => setTimeout(resolve, 300));
      
      for (let i = startId; i <= endId; i++) {
        const stdMeta = getStandardERC721Metadata(i);

        // Add SVG file named exactly [id].svg inside images/
        const svgStr = getSvgStringForToken(i);
        if (imagesFolder) {
          imagesFolder.file(`${i}.svg`, svgStr);
        }

        // Add Metadata JSON file named exactly [id].json inside metadata/
        if (metaFolder) {
          metaFolder.file(`${i}.json`, JSON.stringify(stdMeta, null, 2));
        }

        // Periodically yield thread to prevent browser UI freezing
        if (i % 100 === 0 || i === endId) {
          const pct = Math.round(((i - startId + 1) / (endId - startId + 1)) * 85);
          setZipProgress(pct);
          setZipStatusText(`Packaging artifacts: ${i - startId + 1}/${endId - startId + 1} matching modules...`);
          await new Promise(resolve => setTimeout(resolve, 35));
        }
      }

      // Step 2: Compress and download as Blob
      setZipProgress(90);
      setZipStatusText('Compressing collection folder into ZIP archive... (This may take a few seconds)');
      await new Promise(resolve => setTimeout(resolve, 100));

      const zipBlob = await zip.generateAsync({ type: 'blob' }, (metadata) => {
        const cmpPct = 90 + Math.round(metadata.percent / 10);
        setZipProgress(cmpPct);
      });

      setZipProgress(100);
      setZipStatusText('Complete! Initializing browser attachment stream.');
      
      const downloadUrl = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `karma-butterflies-${type}-collection.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      setZippingCollection(null);
    } catch (e) {
      console.error(e);
      alert('An error occurred during bulk bundling. Please try again.');
      setZippingCollection(null);
    }
  };

  return (
    <section id="registry" className="py-24 relative overflow-hidden bg-[#050505] border-t border-white/10">
      {/* Decorative meshes */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-[#F59E0B]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono text-[#F59E0B] uppercase tracking-widest block mb-1.5 font-bold">
            The Digital Stamp Ledger
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-black text-white tracking-tight">
            The 888 Butterfly Registry
          </h2>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed">
            The entire on-chain alignment database is completely mapped. Use the interactive scroll viewer to explore all 444 Light and 444 Shadow butterflies.
          </p>
        </div>

        {/* REGISTRY VIEWER LAYOUT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT WINDOW: Search, Filter, and 2000-Butterfly Virtual Grids */}
          <div className="lg:col-span-8 bg-[#1A1A1A] border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col justify-between min-h-[680px]">
            <div className="space-y-5">
              
              {/* Filter bar and search panel */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-b border-white/5 pb-5">
                {/* Search */}
                <div className="relative w-full sm:w-72">
                  <span className="absolute left-3 top-2.5 text-slate-500">
                    <Search className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    className="w-full bg-[#050505] border border-white/10 hover:border-white/20 focus:border-[#F59E0B]/80 rounded-xl px-9 py-2 text-white font-mono placeholder:text-slate-600 text-xs outline-none transition"
                    placeholder="Search by Token ID or Trait..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Grid Tabs */}
                <div className="flex bg-[#050505] p-1 rounded-lg border border-white/10 self-stretch sm:self-auto">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded font-mono text-[10px] tracking-wider uppercase font-bold transition-all cursor-pointer ${
                      activeTab === 'all'
                        ? 'bg-[#F59E0B] text-black shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    All (888)
                  </button>
                  <button
                    onClick={() => setActiveTab('light')}
                    className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded font-mono text-[10px] tracking-wider uppercase font-bold transition-all cursor-pointer ${
                      activeTab === 'light'
                        ? 'bg-amber-950/40 border border-amber-500/30 text-amber-400 shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Light (444)
                  </button>
                  <button
                    onClick={() => setActiveTab('shadow')}
                    className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded font-mono text-[10px] tracking-wider uppercase font-bold transition-all cursor-pointer ${
                      activeTab === 'shadow'
                        ? 'bg-purple-950/40 border border-purple-500/30 text-purple-400 shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Shadow (444)
                  </button>
                </div>
              </div>

              {/* Sorting and result count */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>
                  Showing <strong className="text-slate-300">{filteredButterflies.length}</strong> aligns matched
                </span>
                
                <div className="flex items-center gap-2">
                  <span>Sort By:</span>
                  <select
                    className="bg-[#050505] border border-white/5 rounded px-2 py-1 text-slate-300 outline-none hover:border-white/10 text-[10px] uppercase tracking-wide cursor-pointer font-bold font-mono"
                    value={sortBy}
                    onChange={(e: any) => setSortBy(e.target.value)}
                  >
                    <option value="id-asc">Token ID Asc</option>
                    <option value="id-desc">Token ID Desc</option>
                    <option value="score-desc">Peak Karma Score</option>
                  </select>
                </div>
              </div>

              {/* GRIDS SCROLLER CONTAINER */}
              {filteredButterflies.length === 0 ? (
                <div className="py-24 text-center space-y-3">
                  <p className="text-slate-500 font-mono text-sm">No results match your search signature.</p>
                  <button
                    onClick={() => { setSearchTerm(''); setActiveTab('all'); }}
                    className="px-4 py-1.5 bg-[#050505] hover:bg-neutral-900 border border-white/10 rounded-lg text-xs font-mono text-[#F59E0B]"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div 
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar border border-white/5 p-2 rounded-xl bg-black/30"
                  onScroll={handleScroll}
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#444 #111'
                  }}
                >
                  {filteredButterflies.slice(0, visibleCount).map((id) => {
                    const isSelected = selectedId === id;
                    // Precompute alignment variant
                    const isLight = id <= 444;
                    const itemMeta = getButterflyMetadata(id);
                    
                    return (
                      <div
                        key={id}
                        id={`token-card-${id}`}
                        onClick={() => setSelectedId(id)}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer relative group flex flex-col justify-between overflow-hidden ${
                          isSelected
                            ? isLight
                              ? 'bg-amber-950/20 border-[#F59E0B] shadow-inner font-bold'
                              : 'bg-purple-950/20 border-purple-500 shadow-inner font-bold'
                            : 'bg-[#050505] border-white/5 hover:border-white/15'
                        }`}
                      >
                        {/* Hover interaction panel - Reveals specs, rarity, KarmaScore */}
                        <div className={`absolute inset-0 bg-[#0C0C0D]/98 p-3 sm:p-4 flex flex-col justify-between text-left opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20 border ${
                          isLight ? 'border-[#F59E0B]/30' : 'border-purple-500/30'
                        }`}>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                              <span className="text-[10px] font-mono font-bold text-slate-400">#{id} Profile</span>
                              <span className={`text-[8px] font-mono font-black uppercase px-1.5 py-0.5 rounded ${
                                itemMeta.rarity === 'Legendary' ? 'bg-yellow-950/40 text-yellow-500 border border-yellow-500/20 animate-pulse' :
                                itemMeta.rarity === 'Epic' ? 'bg-pink-950/40 text-pink-400 border border-pink-400/20' :
                                itemMeta.rarity === 'Rare' ? 'bg-cyan-950/40 text-cyan-400 border border-cyan-400/20' :
                                'bg-slate-900 text-slate-400 border border-white/5'
                              }`}>
                                {itemMeta.rarity}
                              </span>
                            </div>
                            
                            <div className="space-y-1">
                              <span className="text-[8px] font-mono uppercase text-slate-500 block leading-tight">Archetype</span>
                              <span className="text-[10px] font-sans font-bold text-white block truncate leading-tight">
                                {itemMeta.archetype}
                              </span>
                            </div>

                            <div className="space-y-1">
                              <span className="text-[8px] font-mono uppercase text-slate-500 block leading-tight">Quantum Frame</span>
                              <span className="text-[10px] font-mono text-slate-300 block truncate leading-tight">
                                {itemMeta.traits['Internal Circuit']}
                              </span>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                            <div className="flex flex-col">
                              <span className="text-[8px] font-mono uppercase text-[#F59E0B] tracking-wider leading-none">KarmaScore</span>
                              <span className="text-sm font-sans font-black text-white leading-none mt-1">
                                {itemMeta.score} <span className="text-[9px] text-slate-500 font-mono">/100</span>
                              </span>
                            </div>
                            
                            <span className="text-[8px] font-mono text-slate-500 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                              {itemMeta.alignment}
                            </span>
                          </div>
                        </div>

                        {/* Token Tag Badge */}
                        <div className="absolute top-2 left-2 text-[9px] font-mono text-slate-500 group-hover:text-slate-300 transition-colors">
                          #{id}
                        </div>
                        
                        <div className={`absolute top-2 right-2 w-1.5 h-1.5 rounded-full ${
                          isLight ? 'bg-emerald-400' : 'bg-purple-400'
                        }`} />

                        {/* Centered Svg Preview */}
                        <div className="my-3 flex items-center justify-center pointer-events-none transition-transform group-hover:scale-105 duration-300">
                          <SvgButterfly 
                            variant={isLight ? 'light' : 'shadow'} 
                            size={72} 
                            flappingSpeed={isSelected ? 'normal' : 'none'} 
                            seed={`karma-butterfly-${id}`} 
                          />
                        </div>

                        {/* Title details */}
                        <div className="space-y-1">
                          <span className={`text-[8px] tracking-wider uppercase font-mono block ${
                            isLight ? 'text-emerald-400' : 'text-purple-400'
                          }`}>
                            {isLight ? 'Light Collect' : 'Shadow Collect'}
                          </span>
                          <span className="text-[11px] font-mono text-slate-300 block truncate">
                            ID {id} Peak
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  {/* Load More Indicator block */}
                  {visibleCount < filteredButterflies.length && (
                    <div 
                      onClick={handleLoadMore}
                      className="col-span-full py-4 bg-[#050505] hover:bg-neutral-900 border border-white/5 hover:border-white/15 rounded-xl text-center text-xs font-mono text-slate-400 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Showing {visibleCount} of {filteredButterflies.length} • Click/Scroll to load more...</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick Helper Banner */}
            <div className="mt-4 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 font-mono text-[10px]">
              <span className="flex items-center gap-1.5 text-slate-500">
                <Info className="w-3.5 h-3.5 text-[#F59E0B]" />
                Use search input prefix 'Rare' or ID numbers to jump segments
              </span>
              <span>Loaded 888 Verified Vectors</span>
            </div>

          </div>

          {/* RIGHT WINDOW: High-Fidelity Focused Inspector & Traits Breakdown */}
          <div className="lg:col-span-4 bg-[#1A1A1A] border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
            {selectedMetadata ? (
              <div className="space-y-6 h-full flex flex-col justify-between">
                
                {/* Form Toggle Selector */}
                <div className="flex bg-black/60 p-1 rounded-xl border border-white/5 w-full">
                  <button
                    onClick={() => setInspectMode('genesis')}
                    className={`flex-1 py-2 text-center rounded-lg font-mono text-[10px] sm:text-xs uppercase tracking-wider font-extrabold transition-all cursor-pointer ${
                      inspectMode === 'genesis'
                        ? 'bg-neutral-800 text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Genesis Form
                  </button>
                  <button
                    onClick={() => setInspectMode('evolved')}
                    className={`flex-1 py-2 text-center rounded-lg font-mono text-[10px] sm:text-xs uppercase tracking-wider font-extrabold transition-all relative overflow-hidden cursor-pointer ${
                      inspectMode === 'evolved'
                        ? 'bg-purple-950/40 border border-purple-500/30 text-purple-400 shadow-md'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    Evolved Form 🦋
                    <span className="absolute top-0.5 right-1 text-[7px] bg-purple-500 text-white font-sans px-1 rounded-full leading-none py-0.5 animate-pulse">NEW</span>
                  </button>
                </div>

                {inspectMode === 'genesis' ? (
                  // GENESIS FORM DISPLAY (Original default rendering, unchanged features)
                  <div className="space-y-6">
                    {/* Inspector Header with Rarity Stamp */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">
                          Registry Inspector
                        </span>
                        <span className={`text-[9px] font-mono font-bold uppercase px-2.5 py-0.5 rounded border ${
                          selectedMetadata.rarity === 'Legendary'
                            ? 'text-yellow-400 border-yellow-500/30 bg-yellow-950/25 animate-pulse-glow'
                            : selectedMetadata.rarity === 'Epic'
                            ? 'text-pink-400 border-pink-500/30 bg-pink-950/25'
                            : selectedMetadata.rarity === 'Rare'
                            ? 'text-cyan-400 border-cyan-500/30 bg-cyan-950/25'
                            : 'text-slate-400 border-white/5 bg-slate-900/60'
                        }`}>
                          {selectedMetadata.rarity}
                        </span>
                      </div>
                      
                      <h3 className="text-xl sm:text-2xl font-sans font-black text-white">
                        {selectedMetadata.name}
                      </h3>
                      
                      <p className="text-slate-400 text-xs font-mono">
                        Deterministic Seed: <span className="text-slate-300 font-bold select-all block mt-0.5 leading-none bg-[#050505] p-2 rounded border border-white/5 overflow-x-auto truncate">{selectedMetadata.seed}</span>
                      </p>
                    </div>

                    {/* Big Animated Render Box */}
                    <div className="bg-[#050505] relative rounded-2xl py-6 flex flex-col items-center justify-center border border-white/5 shadow-inner min-h-[220px]">
                      <div className="absolute top-2 left-3 text-[10px] bg-[#1A1A1A]/70 px-2 py-0.5 text-slate-400 border border-white/5 rounded font-mono">
                        Alignment: {selectedMetadata.alignment}
                      </div>
                      
                      <div className="absolute top-2 right-3 text-xs font-mono font-bold text-[#F59E0B]">
                        Resonance: {selectedMetadata.score}
                      </div>

                      <SvgButterfly 
                        variant={selectedMetadata.alignment === 'Light' ? 'light' : 'shadow'} 
                        size={160} 
                        flappingSpeed="slow" 
                        seed={selectedMetadata.seed} 
                      />
                      
                      <div className="mt-3 text-center z-10 font-mono text-[9px] text-[#F59E0B] tracking-wider uppercase">
                        {selectedMetadata.archetype} Archetype
                      </div>
                    </div>

                    {/* Traits Breakdown List */}
                    <div className="space-y-2.5">
                      <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold mb-1.5 flex items-center gap-1">
                        <SlidersHorizontal className="w-3.5 h-3.5 text-[#F59E0B]" />
                        Procedural Trait Profile
                      </h4>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                        {Object.entries(selectedMetadata.traits).map(([key, value]) => (
                          <div key={key} className="bg-[#050505] p-2.5 rounded-lg border border-white/5">
                            <span className="text-slate-500 text-[8px] font-bold block uppercase mb-0.5 leading-none">{key}</span>
                            <span className="text-slate-200 font-bold">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Export Toolkit Box */}
                    <div className="border-t border-white/5 pt-5 space-y-4">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold leading-none">
                        Individual Asset Export Toolkit
                      </span>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={handleSingleDownloadSvg}
                          className="px-3.5 py-2.5 bg-black hover:bg-neutral-900 border border-white/10 hover:border-white/20 text-white rounded-lg text-xs font-mono uppercase tracking-wider font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5 text-[#F59E0B]" />
                          <span>Vector SVG</span>
                        </button>

                        <button
                          onClick={handleSingleDownloadPng}
                          disabled={downloandingPng}
                          className="px-3.5 py-2.5 bg-black hover:bg-neutral-900 border border-white/10 hover:border-white/20 text-white rounded-lg text-xs font-mono uppercase tracking-wider font-bold flex items-center justify-center gap-1.5 transition disabled:opacity-40 cursor-pointer"
                        >
                          {downloandingPng ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 text-[#F59E0B] animate-spin" />
                              <span>Generating...</span>
                            </>
                          ) : (
                            <>
                              <Download className="w-3.5 h-3.5 text-purple-400" />
                              <span>Raster PNG</span>
                            </>
                          )}
                        </button>
                      </div>

                      <button
                        onClick={handleSingleDownloadJson}
                        className="w-full py-2 bg-[#050505] hover:bg-neutral-900 border border-white/5 rounded-lg text-xs font-mono text-slate-400 hover:text-slate-200 flex items-center justify-center gap-2 transition cursor-pointer"
                      >
                        <FileJson className="w-3.5 h-3.5 text-teal-400" />
                        <span>Download ERC-721 Metadata JSON string</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  // EVOLVED DEC_DECK DISPLAY (Meticulously matches the user image mockup)
                  <div className="space-y-4">
                    {evolvedIds.includes(selectedMetadata.id) ? (
                      /* DECODER CARD (THE UNLOCKED MASTERPIECE CARD) */
                      <div className="relative bg-[#020203] border-2 border-[#1a1a24] select-none rounded-2xl overflow-hidden p-5 text-purple-400/90 font-mono shadow-[0_0_35px_rgba(168,85,247,0.12)]">
                        {/* Decorative scanlines overlay */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[size:100%_4px,3px_100%] pointer-events-none opacity-40" />
                        
                        {/* Top Hardware Controller Strip */}
                        <div className="flex items-center justify-between mb-4 relative z-10">
                          {/* macos terminal buttons */}
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                            <div className="flex flex-col ml-2 leading-none">
                              <span className="text-[9px] font-bold text-slate-400 tracking-tight">{`>_ karma-decoder`}</span>
                              <span className="text-[7px] text-slate-600 mt-0.5">v1.0.7-beta</span>
                            </div>
                          </div>

                          {/* Top right token indicator box */}
                          <div className="border border-[#F59E0B]/30 bg-amber-950/10 px-2.5 py-0.5 rounded text-right flex flex-col justify-center font-mono select-none">
                            <span className="text-slate-500 text-[6.5px] uppercase tracking-widest leading-none block mb-0.5">Butterfly</span>
                            <span className="text-[#F59E0B] font-extrabold text-[10px] leading-none">#{selectedMetadata.id + 1000}</span>
                          </div>
                        </div>

                        {/* Decoded id and upgraded stamp */}
                        <div className="flex items-center justify-between border-b border-purple-950/40 pb-2.5 mb-2 relative z-10">
                          <span className="text-[9px] text-[#a855f7]/80 uppercase tracking-widest font-black">
                            DECODED ID: Butterfly #{selectedMetadata.id + 1000}
                          </span>
                          
                          {/* diagonaled layout badge */}
                          <div className="text-[8px] font-black tracking-widest text-[#a855f7] border border-[#a855f7]/30 px-2 py-0.5 rounded bg-[#a855f7]/5 select-none uppercase">
                            EVOLVED ///
                          </div>
                        </div>

                        {/* Level indicator */}
                        <div className="inline-block bg-purple-950/30 border border-purple-500/20 rounded px-2 py-0.5 text-[9px] text-purple-300 font-extrabold mb-1.5 relative z-10">
                          Lvl {3 + (selectedMetadata.id % 3)}
                        </div>

                        {/* Large Crystalline Svg Area */}
                        <div className="bg-[#050508] relative rounded-xl p-3 flex flex-col items-center justify-center border border-purple-500/10 overflow-hidden shadow-inner min-h-[190px]">
                          {/* target scope compass marks */}
                          <div className="absolute inset-0 bg-[radial-gradient(#151221_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
                          
                          <SvgButterfly 
                            evolved={true} 
                            size={160} 
                            flappingSpeed="slow" 
                            seed={selectedMetadata.seed} 
                          />
                        </div>

                        {/* Alignment and Title */}
                        <div className="text-center mt-3 mb-2.5 relative z-10">
                          <span className="inline-block px-3 py-0.5 rounded-full border border-[#a855f7]/25 bg-purple-950/40 text-[#a855f7]/90 text-[8.5px] uppercase tracking-[0.15em] font-black mb-1">
                            ALIGNMENT: <span className="text-white">{selectedMetadata.alignment.toUpperCase()}</span>
                          </span>
                          
                          <h3 className="text-xl sm:text-2xl font-sans font-black text-white tracking-tight leading-none">
                            {selectedMetadata.alignment === 'Light' ? 'Celestial Vanguard' : selectedMetadata.archetype}
                          </h3>
                          
                          <p className="text-slate-500 font-mono text-[7px] tracking-wide max-w-xs mx-auto leading-relaxed uppercase mt-1">
                            EVOLVED THROUGH TRUTH. POWERED BY INTENTION. WITNESS. TRANSFORM. TRANSCEND.
                          </p>
                        </div>

                        {/* 4-Box Technical Parameters Board */}
                        <div className="grid grid-cols-4 gap-1.5 border-t border-purple-950/40 pt-2.5 relative z-10 text-center">
                          {/* box 1 */}
                          <div className="bg-black/40 border border-purple-950/40 p-1.5 rounded flex flex-col justify-between">
                            <span className="text-[6.5px] text-slate-500 font-bold uppercase block tracking-wider">KARMA</span>
                            <span className="text-[10px] text-purple-300 font-extrabold mt-0.5">{(selectedMetadata.score * 97 + 500).toLocaleString()}</span>
                          </div>
                          {/* box 2 */}
                          <div className="bg-black/40 border border-purple-950/40 p-1.5 rounded flex flex-col justify-between">
                            <span className="text-[6.5px] text-slate-500 font-bold uppercase block tracking-wider">RARITY</span>
                            <span className="text-[9px] text-[#e879f9] font-black mt-0.5">MYTHIC</span>
                          </div>
                          {/* box 3 */}
                          <div className="bg-black/40 border border-purple-950/40 p-1.5 rounded flex flex-col justify-between">
                            <span className="text-[6.5px] text-slate-500 font-bold uppercase block tracking-wider">FREQ</span>
                            <span className="text-[9px] text-slate-350 font-extrabold mt-0.5">{[396, 417, 528, 639, 741, 852, 963][selectedMetadata.id % 7]}Hz</span>
                          </div>
                          {/* box 4 */}
                          <div className="bg-black/40 border border-[#F59E0B]/20 p-1.5 rounded flex flex-col justify-between">
                            <span className="text-[6.5px] text-slate-500 font-bold uppercase block tracking-wider">MINTED</span>
                            <span className="text-[9px] text-amber-400 font-bold mt-0.5">04.25.25</span>
                          </div>
                        </div>

                        {/* Copyable txn code footer */}
                        <div className="mt-3 pt-2.5 border-t border-purple-950/40 flex items-center justify-between text-[7.5px] text-slate-600 relative z-10 select-all">
                          <span className="truncate max-w-[80%] font-mono leading-none bg-black/60 p-1 rounded border border-white/5">
                            0x{Math.abs(hashString(selectedMetadata.seed)).toString(16).padEnd(40, 'e')}
                          </span>
                          
                          <span className="text-[9px] text-[#a855f7] opacity-80" title="QR Verified Alignment Data">
                            ▦
                          </span>
                        </div>
                      </div>
                    ) : mutatingId === selectedMetadata.id ? (
                      /* ACTIVE MUTATION / UPGRADE CONVERSION SCREEN */
                      <div className="bg-[#040405] border border-purple-500/20 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[360px] text-center space-y-5 shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(rgba(147,51,234,0.05)_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />
                        
                        <div className="w-16 h-16 rounded-full bg-purple-950/30 border-2 border-purple-500/40 border-t-purple-500 flex items-center justify-center text-3xl animate-spin">
                          🌀
                        </div>

                        <div className="space-y-2">
                          <span className="text-[10px] uppercase font-mono tracking-[0.2em] font-extrabold text-purple-400 block animate-pulse">
                            Metamorphosis Metacell Active
                          </span>
                          <h4 className="text-white font-sans font-black text-lg">
                            Evolving Butterfly #{selectedMetadata.id}
                          </h4>
                          <p className="text-slate-400 text-xs max-w-xs font-medium">
                            Injecting solfeggio codes and restructuring micro-circuits into dynamic dragon wing forms.
                          </p>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full max-w-xs space-y-1.5 font-mono">
                          <div className="flex justify-between text-[10px] text-slate-500 font-bold">
                            <span className="animate-pulse">{mutationStepText}</span>
                            <span>{mutationProgress}%</span>
                          </div>
                          
                          <div className="w-full bg-[#111] h-2.5 rounded-full overflow-hidden border border-white/5 relative">
                            <div 
                              className="h-full bg-gradient-to-r from-purple-500 to-[#d946ef] transition-all duration-100"
                              style={{ width: `${mutationProgress}%` }}
                            />
                          </div>
                        </div>

                        <div className="text-[9px] font-mono text-slate-500 bg-white/5 px-3 py-1 rounded">
                          DO NOT TERMINATE CLIENT CONNECTION
                        </div>
                      </div>
                    ) : (
                      /* METAMORPHOSIS PREVIEW (CHAMBER LOCKED / UPGRADE SIMULATOR OPTION) */
                      <div className="bg-[#050505] border border-white/10 rounded-2xl p-6 flex flex-col justify-between min-h-[360px]">
                        <div className="space-y-4">
                          <div className="w-12 h-12 bg-purple-950/40 border border-purple-500/20 rounded-xl flex items-center justify-center text-2xl animate-pulse">
                            🔒
                          </div>

                          <div className="space-y-2">
                            <span className="text-[9px] font-mono text-purple-400 uppercase tracking-widest font-black block">
                              METAMORPHOSIS OPTION
                            </span>
                            <h3 className="text-lg font-sans font-black text-white">
                              Evolved Metamorphosis Locked
                            </h3>
                            <p className="text-slate-400 text-xs leading-relaxed font-sans font-medium">
                              The Evolved collection consists of <strong className="text-slate-200">888 unique dragon-wing transmutations</strong>. The upgrade process will open for all Genesis holders after the 1st collection has been fully minted on-chain.
                            </p>
                            <p className="text-slate-400 text-xs leading-relaxed font-sans font-medium">
                              You can simulate and preview the entire metamorphosis process here to see #{selectedMetadata.id}'s potential evolved form!
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2 pt-4 border-t border-white/5">
                          {/* Trigger simulated evolution button */}
                          <button
                            onClick={() => handleEvolveTrigger(selectedMetadata.id)}
                            className="w-full py-3 bg-gradient-to-r from-purple-950 via-[#7c3aed]/10 to-[#d946ef]/10 hover:from-purple-900 border border-purple-500/40 hover:border-purple-500 text-purple-300 hover:text-white rounded-xl text-xs uppercase tracking-wider font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                          >
                            <Zap className="w-3.5 h-3.5 text-[#e879f9] animate-pulse" />
                            <span>Preview Metamorphosis Upgrading</span>
                          </button>

                          <a
                            href="https://gravemint.io/mint/FXSVHzLvVFey57U8ETuhHzrzDRT3FhvqzbxWpyoAJA4c"
                            target="_blank"
                            rel="noreferrer"
                            className="w-full py-3 bg-gradient-to-r from-teal-950 to-emerald-950/25 hover:from-teal-900 border border-emerald-500/30 text-emerald-300 hover:text-emerald-100 font-sans font-extrabold text-[11px] uppercase tracking-wider text-center rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
                          >
                            <span>Mint Genuine Swarm ↗</span>
                          </a>
                          
                          <div className="text-[8.5px] font-mono text-slate-500 text-center max-w-[240px] mx-auto leading-relaxed">
                            Simulated upgrade operates purely client-side. No crypto token burning is required to view the evolved card.
                          </div>
                        </div>
                      </div>
                    )}

                    {evolvedIds.includes(selectedMetadata.id) && (
                      <div className="flex gap-2">
                        {/* reset simulation toggler */}
                        <button
                          onClick={() => handleResetTrigger(selectedMetadata.id)}
                          className="w-full py-2 bg-[#050505] hover:bg-neutral-900 border border-white/5 text-slate-500 hover:text-slate-300 rounded-lg text-[10px] font-mono uppercase tracking-wider font-extrabold flex items-center justify-center gap-1.5 transition cursor-pointer"
                        >
                          <span>Revert Metamorphosis Simulation</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}

              </div>
            ) : (
              <div className="h-full flex flex-col justify-center items-center text-center py-20 text-slate-500 space-y-3 font-mono text-xs">
                <Grid3X3 className="w-8 h-8 text-[#F59E0B] animate-pulse" />
                <p>Select any butterfly token in the ledger grid to run high-resolution render diagnostics and inspect procedural characteristics.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
