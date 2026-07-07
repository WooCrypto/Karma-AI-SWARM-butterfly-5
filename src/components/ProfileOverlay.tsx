import React, { useState, useRef, useEffect, DragEvent, ChangeEvent, MouseEvent } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { saveWalletProfile, getWalletProfile } from '../lib/firebase';
import SvgButterfly from './SvgButterfly';
import { 
  Upload, 
  Download, 
  RotateCw, 
  Sparkles, 
  CornerRightDown, 
  ShieldCheck, 
  BadgeCheck, 
  Check, 
  RefreshCw, 
  Grid, 
  X, 
  Share2, 
  Heart, 
  User, 
  Flame, 
  Info,
  Sliders,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  Move,
  MousePointer,
  Hand,
  Plus,
  Minus
} from 'lucide-react';

interface SavedOverlay {
  id: string;
  name: string;
  timestamp: string;
  dataUrl: string;
}

export default function ProfileOverlay() {
  // Input address or auto-detected address
  const [address, setAddress] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [detectedAlignment, setDetectedAlignment] = useState<'light' | 'shadow' | 'nexus'>('light');
  const [detectedSeed, setDetectedSeed] = useState<string>('karma-social-layer');
  const [isEvolved, setIsEvolved] = useState<boolean>(false);

  const [isScanningSolana, setIsScanningSolana] = useState<boolean>(false);
  const [solanaNftsOwned, setSolanaNftsOwned] = useState<string[]>([]);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [verifiedNftMint, setVerifiedNftMint] = useState<string | null>(null);

  const verifySolanaNfts = async (walletAddressStr: string) => {
    setIsScanningSolana(true);
    setVerificationError(null);
    setSolanaNftsOwned([]);
    setVerifiedNftMint(null);

    // Demo bypass for testing the on-chain verified state in sandboxes
    const lowerAddress = walletAddressStr.toLowerCase();
    if (lowerAddress === 'demo' || lowerAddress === 'test' || lowerAddress.includes('111111111') || lowerAddress === 'karma') {
      await new Promise(resolve => setTimeout(resolve, 1200)); // elegant loading effect
      const mockMint = "KarmaDemoMintAddressFvqzbxWpyoAJA4c";
      setSolanaNftsOwned([mockMint]);
      setVerifiedNftMint(mockMint);
      setDetectedAlignment('nexus');
      setDetectedSeed(mockMint);
      setGlowColor('#10b981');
      setIsEvolved(true);
      setSelectedBadge('holder');
      setIsScanningSolana(false);
      return;
    }
    
    try {
      const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");
      const owner = new PublicKey(walletAddressStr);
      const targetContract = "FXSVHzLvVFey57U8ETuhHzrzDRT3FhvqzbxWpyoAJA4c";
      
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(owner, {
        programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
      });
      
      let tokenAccounts2022 = { value: [] as any[] };
      try {
        tokenAccounts2022 = await connection.getParsedTokenAccountsByOwner(owner, {
          programId: new PublicKey("TokenzQdBNbXt6421xg5RiS2WxsDk6GNE6MC7tx8vwg")
        });
      } catch (e) {
        console.warn("Token2022 parsed accounts query failed:", e);
      }
      
      const allAccounts = [...tokenAccounts.value, ...tokenAccounts2022.value];
      const candidateMints: string[] = [];
      
      for (const account of allAccounts) {
        const info = account.account?.data?.parsed?.info;
        if (info) {
          const amount = info.tokenAmount?.uiAmount;
          const decimals = info.tokenAmount?.decimals;
          const mint = info.mint;
          if (amount === 1 && decimals === 0 && mint) {
            candidateMints.push(mint);
          }
        }
      }
      
      if (candidateMints.length === 0) {
        setIsScanningSolana(false);
        return;
      }
      
      const METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
      const pdaAddresses = candidateMints.map(mintStr => {
        const mintPubKey = new PublicKey(mintStr);
        const [pda] = PublicKey.findProgramAddressSync(
          [
            new TextEncoder().encode('metadata'),
            METADATA_PROGRAM_ID.toBytes(),
            mintPubKey.toBytes()
          ],
          METADATA_PROGRAM_ID
        );
        return pda;
      });
      
      const targetBytes = new PublicKey(targetContract).toBytes();
      const verified: string[] = [];
      
      const chunks: PublicKey[][] = [];
      for (let i = 0; i < pdaAddresses.length; i += 99) {
        chunks.push(pdaAddresses.slice(i, i + 99));
      }
      
      for (const chunk of chunks) {
        const infos = await connection.getMultipleAccountsInfo(chunk);
        for (let i = 0; i < infos.length; i++) {
          const info = infos[i];
          if (info && info.data) {
            const dataBuffer = new Uint8Array(info.data);
            let found = false;
            for (let j = 0; j <= dataBuffer.length - 32; j++) {
              let match = true;
              for (let k = 0; k < 32; k++) {
                if (dataBuffer[j + k] !== targetBytes[k]) {
                  match = false;
                  break;
                }
              }
              if (match) {
                found = true;
                break;
              }
            }
            if (found) {
              const globalIdx = pdaAddresses.indexOf(chunk[i]);
              if (globalIdx !== -1) {
                verified.push(candidateMints[globalIdx]);
              }
            }
          }
        }
      }
      
      if (verified.length > 0) {
        setSolanaNftsOwned(verified);
        setVerifiedNftMint(verified[0]);
        setDetectedAlignment('nexus');
        setDetectedSeed(verified[0]);
        setGlowColor('#10b981');
        setIsEvolved(true);
        setSelectedBadge('holder');
      }
    } catch (err: any) {
      console.error("Solana verification query failed:", err);
      setVerificationError("Network verification failed. Using default high-fidelity sandbox values instead.");
    } finally {
      setIsScanningSolana(false);
    }
  };

  const handleConnectPhantom = async () => {
    const solanaProvider = (window as any).solana;
    if (solanaProvider && solanaProvider.isPhantom) {
      try {
        const response = await solanaProvider.connect();
        const walletAddress = response.publicKey.toString();
        setAddress(walletAddress);
        setIsConnected(true);
        await verifySolanaNfts(walletAddress);
      } catch (err: any) {
        console.error("Phantom request denied", err);
      }
    } else {
      alert("Phantom Wallet is not detected. Please install the Phantom extension or open this page inside Phantom's in-app Web3 browser.");
    }
  };

  // Uploaded image state
  const [uploadedBaseImg, setUploadedBaseImg] = useState<string | null>(null);
  const [imgName, setImgName] = useState<string>('');
  const [imageRatio, setImageRatio] = useState<number>(1); // width / height
  const [bgType, setBgType] = useState<'image' | 'transparent' | 'dark'>('transparent');
  const [baseImgZoom, setBaseImgZoom] = useState<number>(1.0);
  const [baseImgPanX, setBaseImgPanX] = useState<number>(0);
  const [baseImgPanY, setBaseImgPanY] = useState<number>(0);

  const [editMode, setEditMode] = useState<'butterfly' | 'background'>('butterfly');

  // Gesture state management
  const [touchStartDist, setTouchStartDist] = useState<number | null>(null);
  const [touchStartZoom, setTouchStartZoom] = useState<number>(1);
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [panStart, setPanStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [panStartOffset, setPanStartOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Overlay controller variables
  const [overlayScale, setOverlayScale] = useState<number>(20); // 10% to 60% of image width
  const [offsetX, setOffsetX] = useState<number>(3); // Right margin, 0% to 50%
  const [offsetY, setOffsetY] = useState<number>(3); // Top margin, 0% to 50%
  const [rotation, setRotation] = useState<number>(0); // -180deg to 180deg
  const [glowSize, setGlowSize] = useState<number>(15); // Glow blur radius
  const [glowColor, setGlowColor] = useState<string>('#F59E0B');
  const [enableGlow, setEnableGlow] = useState<boolean>(true);
  const [keyOutBackground, setKeyOutBackground] = useState<boolean>(false);
  const [enableSwarmBg, setEnableSwarmBg] = useState<boolean>(false);
  const [swarmTolerance, setSwarmTolerance] = useState<number>(85); // 10 to 200
  const [swarmKeyMode, setSwarmKeyMode] = useState<'auto' | 'white' | 'dark' | 'chroma'>('auto');
  const [swarmChromaColor, setSwarmChromaColor] = useState<string>('#FFFFFF');
  const [croppedBaseImgUrl, setCroppedBaseImgUrl] = useState<string>('');

  // Effect to dynamically compute the cropped base image with transparent background in the UI
  useEffect(() => {
    if (!uploadedBaseImg) {
      setCroppedBaseImgUrl('');
      return;
    }

    if (!keyOutBackground && !enableSwarmBg) {
      setCroppedBaseImgUrl(uploadedBaseImg);
      return;
    }

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      // Downscale slightly for extremely fast processing in UI
      const maxDim = 600;
      let w = img.naturalWidth;
      let h = img.naturalHeight;
      if (w > maxDim || h > maxDim) {
        if (w > h) {
          h = Math.round((h * maxDim) / w);
          w = maxDim;
        } else {
          w = Math.round((w * maxDim) / h);
          h = maxDim;
        }
      }

      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, w, h);
      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;

      // Sample background colors from 3 top points (top-left, top-middle, top-right)
      // and skip bottom corners to prevent cropping the person's body/shoulders!
      const topPoints = [
        { x: 5, y: 5 },
        { x: Math.floor(w / 2), y: 5 },
        { x: w - 6, y: 5 }
      ];

      const sampledColors: { r: number; g: number; b: number }[] = [];
      topPoints.forEach(coord => {
        const idx = (coord.y * w + coord.x) * 4;
        if (idx < data.length) {
          const alpha = data[idx + 3];
          if (alpha > 120) {
            sampledColors.push({
              r: data[idx],
              g: data[idx + 1],
              b: data[idx + 2]
            });
          }
        }
      });

      // Convert hex to rgb helper
      const hexToRgb = (hex: string) => {
        const cleanHex = hex.replace('#', '');
        const num = parseInt(cleanHex, 16);
        return {
          r: (num >> 16) & 255,
          g: (num >> 8) & 255,
          b: num & 255
        };
      };
      const chromaRgb = hexToRgb(swarmChromaColor);

      // Run pixel-by-pixel color matching and filtering
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        if (a === 0) continue;

        let isBgColor = false;

        if (swarmKeyMode === 'auto') {
          // Check similarity to top background colors
          for (const sc of sampledColors) {
            const dist = Math.sqrt(
              Math.pow(r - sc.r, 2) +
              Math.pow(g - sc.g, 2) +
              Math.pow(b - sc.b, 2)
            );
            if (dist < swarmTolerance) {
              isBgColor = true;
              break;
            }
          }
          // Fallback basic light/dark corner check
          if (!isBgColor) {
            const brightness = (r + g + b) / 3;
            if (brightness > 235 && swarmTolerance > 40) {
              isBgColor = true;
            } else if (brightness < 35 && swarmTolerance > 40) {
              isBgColor = true;
            }
          }
        } else if (swarmKeyMode === 'white') {
          const brightness = (r + g + b) / 3;
          if (brightness > (255 - swarmTolerance)) {
            isBgColor = true;
          }
        } else if (swarmKeyMode === 'dark') {
          const brightness = (r + g + b) / 3;
          if (brightness < swarmTolerance) {
            isBgColor = true;
          }
        } else if (swarmKeyMode === 'chroma') {
          const dist = Math.sqrt(
            Math.pow(r - chromaRgb.r, 2) +
            Math.pow(g - chromaRgb.g, 2) +
            Math.pow(b - chromaRgb.b, 2)
          );
          if (dist < swarmTolerance) {
            isBgColor = true;
          }
        }

        if (isBgColor) {
          data[i + 3] = 0; // Transparent
        }
      }

      // State-of-the-art Edge Feathering Anti-Aliasing pass
      const alphaBuffer = new Uint8Array(w * h);
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          alphaBuffer[y * w + x] = data[(y * w + x) * 4 + 3];
        }
      }
      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          const idx = (y * w + x) * 4;
          if (data[idx + 3] > 0) {
            const aLeft  = alphaBuffer[y * w + (x - 1)];
            const aRight = alphaBuffer[y * w + (x + 1)];
            const aUp    = alphaBuffer[(y - 1) * w + x];
            const aDown  = alphaBuffer[(y + 1) * w + x];
            if (aLeft === 0 || aRight === 0 || aUp === 0 || aDown === 0) {
              data[idx + 3] = Math.round(data[idx + 3] * 0.45);
            }
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      setCroppedBaseImgUrl(canvas.toDataURL('image/png'));
    };
    img.src = uploadedBaseImg;
  }, [uploadedBaseImg, keyOutBackground, enableSwarmBg, swarmKeyMode, swarmTolerance, swarmChromaColor]);

  // 3D PFP Ring variables
  const [enablePfpRing, setEnablePfpRing] = useState<boolean>(true);
  const [pfpRingColor, setPfpRingColor] = useState<string>('#F59E0B');
  const [pfpRingThickness, setPfpRingThickness] = useState<number>(12); // thickness out of 1000
  const [pfpRingGlow, setPfpRingGlow] = useState<number>(15); // glow blur radius
  const [pfpRingDiameter, setPfpRingDiameter] = useState<number>(92); // diameter percentage

  // Badge selection
  // None, Holder Pill, Genesis Badge, Verified Pill
  const [selectedBadge, setSelectedBadge] = useState<'none' | 'holder' | 'genesis' | 'verified'>('holder');

  // Preview / Canvas reference
  const containerRef = useRef<HTMLDivElement>(null);
  const hiddenButterflyRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const gestureModeRef = useRef<'butterfly' | 'background'>('butterfly');

  // Generation & saving states
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [savedCreations, setSavedCreations] = useState<SavedOverlay[]>([]);
  const [activeTab, setActiveTab] = useState<'editor' | 'swarm' | 'library'>('editor');
  const [socialModalPreset, setSocialModalPreset] = useState<{
    open: boolean;
    dataUrl: string | null;
    platform: 'x-pfp' | 'x-banner' | 'tg' | 'discord';
  }>({ open: false, dataUrl: null, platform: 'x-pfp' });

  // Load saved address and initial creations on mount
  useEffect(() => {
    const savedAddr = localStorage.getItem('karma_scanned_address');
    if (savedAddr) {
      setAddress(savedAddr);
      setIsConnected(true);
      deriveButterflyFromAddress(savedAddr);
    }

    // Load items in library
    const cached = localStorage.getItem('karma_overlay_creations');
    if (cached) {
      try {
        setSavedCreations(JSON.parse(cached));
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  // Load profile from Firestore when connected
  useEffect(() => {
    let active = true;
    const loadProfile = async () => {
      if (isConnected && address) {
        try {
          const profile = await getWalletProfile(address);
          if (!active) return;
          if (profile) {
            if (profile.detectedAlignment) setDetectedAlignment(profile.detectedAlignment as any);
            if (profile.detectedSeed) setDetectedSeed(profile.detectedSeed);
            if (profile.isEvolved !== undefined) setIsEvolved(profile.isEvolved);
            if (profile.selectedBadge) setSelectedBadge(profile.selectedBadge as any);
            if (profile.verifiedNfts) setSolanaNftsOwned(profile.verifiedNfts);
            
            if (profile.detectedAlignment === 'nexus') setGlowColor('#10b981');
            else if (profile.detectedAlignment === 'shadow') setGlowColor('#c084fc');
            else setGlowColor('#34d399');
          } else {
            // New user in Firestore - initialize with current defaults
            await saveWalletProfile(address, {
              address,
              detectedAlignment,
              detectedSeed,
              isEvolved,
              selectedBadge,
              verifiedNfts: solanaNftsOwned
            });
          }
        } catch (err) {
          console.error("Firestore wallet load failed:", err);
        }
      }
    };
    loadProfile();
    return () => {
      active = false;
    };
  }, [isConnected, address]);

  // Save profile to Firestore on any change
  useEffect(() => {
    if (isConnected && address) {
      const timer = setTimeout(() => {
        saveWalletProfile(address, {
          address,
          detectedAlignment,
          detectedSeed,
          isEvolved,
          selectedBadge,
          verifiedNfts: solanaNftsOwned
        });
      }, 500); // short debounce to group simultaneous state changes
      return () => clearTimeout(timer);
    }
  }, [isConnected, address, detectedAlignment, detectedSeed, isEvolved, selectedBadge, solanaNftsOwned]);

  const deriveButterflyFromAddress = (addr: string) => {
    let sum = 0;
    for (let i = 0; i < addr.length; i++) {
      sum += addr.charCodeAt(i);
    }

    // Determine values
    let align: 'light' | 'shadow' | 'nexus' = 'light';
    if (sum % 77 === 0) align = 'nexus';
    else if (sum % 2 === 1) align = 'shadow';

    setDetectedAlignment(align);
    setDetectedSeed(addr);

    // Dynamic glow match
    if (align === 'nexus') {
      setGlowColor('#10b981'); // emerald
    } else if (align === 'shadow') {
      setGlowColor('#c084fc'); // purple
    } else {
      setGlowColor('#34d399'); // light teal-emerald
    }

    // Check if user has mutated/evolved this butterfly
    const evolvedList = localStorage.getItem('karma_evolved_ids');
    if (evolvedList) {
      try {
        const ids = JSON.parse(evolvedList) as string[];
        const bId = `Butterfly #${(sum % 8999) + 1000}`;
        if (ids.includes(bId)) {
          setIsEvolved(true);
        } else {
          setIsEvolved(false);
        }
      } catch {
        setIsEvolved(false);
      }
    }
  };

  const handleConnectMock = async () => {
    const trimmedAddress = address.trim();
    if (!trimmedAddress) {
      // Create random beautiful address
      const hex = '0123456789abcdef';
      let mock = '0x';
      for (let i = 0; i < 40; i++) {
        mock += hex[Math.floor(Math.random() * 16)];
      }
      setAddress(mock);
      setIsConnected(true);
      deriveButterflyFromAddress(mock);
    } else if (!trimmedAddress.startsWith('0x') && trimmedAddress.length >= 32) {
      // It is a Solana public key!
      setAddress(trimmedAddress);
      setIsConnected(true);
      await verifySolanaNfts(trimmedAddress);
    } else {
      setAddress(trimmedAddress);
      setIsConnected(true);
      deriveButterflyFromAddress(trimmedAddress);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setAddress('');
    setIsEvolved(false);
    setSolanaNftsOwned([]);
    setVerifiedNftMint(null);
    setVerificationError(null);
    // Maintain standard default seed
    setDetectedAlignment('light');
    setDetectedSeed('karma-social-layer');
    setGlowColor('#F59E0B');
  };

  // Image upload handlers
  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, WEBP).');
      return;
    }
    setImgName(file.name.split('.')[0] || 'profile_composition');
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      setUploadedBaseImg(src);
      setBgType('image');

      // Extract ratio
      const imgTemp = new Image();
      imgTemp.onload = () => {
        setImageRatio(imgTemp.width / imgTemp.height);
      };
      imgTemp.src = src;
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processImageFile(e.target.files[0]);
    }
  };

  // Preset quick-toggles
  const applyPreset = (align: 'light' | 'shadow' | 'nexus', isEv: boolean) => {
    setDetectedAlignment(align);
    setIsEvolved(isEv);
    setDetectedSeed(`preset-${align}-${isEv ? 'evolved' : 'normal'}`);
    
    if (align === 'nexus') setGlowColor('#10b981');
    else if (align === 'shadow') setGlowColor('#c084fc');
    else setGlowColor('#34d399');
  };

  // Main high-resolution generation engine using Canvas
  const generateSocialComposition = async (targetSize: number = 500) => {
    setIsGenerating(true);

    try {
      // 1. Load background if image mode is active and we have an image
      const useBgImage = uploadedBaseImg && (bgType === 'image' || enableSwarmBg);
      const baseImg = new Image();
      
      if (useBgImage && uploadedBaseImg) {
        await new Promise<void>((resolve, reject) => {
          baseImg.onload = () => resolve();
          baseImg.onerror = () => reject(new Error('Failed to load profile base image'));
          baseImg.src = uploadedBaseImg;
        });
      }

      // 2. Create offscreen SVG butterfly image
      const svgContainer = hiddenButterflyRef.current;
      const svgElement = svgContainer?.querySelector('svg');
      if (!svgElement) throw new Error('Rendered Vector Butterfly Node could not be found');

      // Clear any temporary classes that could cause rendering offsets or animations in static serialization
      const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement;
      clonedSvg.setAttribute('width', targetSize.toString());
      clonedSvg.setAttribute('height', targetSize.toString());

      const svgString = new XMLSerializer().serializeToString(clonedSvg);
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const blobUrl = URL.createObjectURL(svgBlob);

      const vectorImg = new Image();
      await new Promise<void>((resolve, reject) => {
        vectorImg.onload = () => resolve();
        vectorImg.onerror = () => reject(new Error('Vector conversion failed'));
        vectorImg.src = blobUrl;
      });

      // 3. Prepare high-resolution canvas
      const canvas = document.createElement('canvas');
      canvas.width = targetSize;
      canvas.height = targetSize;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Failed to acquire 2D canvas context');

      // High quality smoothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // 4. Draw profile background
      if (enableSwarmBg) {
        // Draw solid SWARM Orange background
        ctx.fillStyle = '#F59E0B';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else if (bgType === 'dark') {
        // Draw solid dark background
        ctx.fillStyle = '#070708';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else if (bgType === 'transparent') {
        // Transparent background
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      if (useBgImage) {
        // Create an offscreen canvas to process and key out the base image
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext('2d');

        if (tempCtx) {
          tempCtx.imageSmoothingEnabled = true;
          tempCtx.imageSmoothingQuality = 'high';

          const zoom = baseImgZoom;
          const panX = (baseImgPanX / 100) * canvas.width;
          const panY = (baseImgPanY / 100) * canvas.height;

          // Draw to fill the square while preserving aspect ratio
          const imgRatio = baseImg.naturalWidth / baseImg.naturalHeight;
          let drawW = canvas.width;
          let drawH = canvas.height;
          if (imgRatio > 1) {
            drawW = canvas.height * imgRatio;
          } else {
            drawH = canvas.width / imgRatio;
          }

          const w = drawW * zoom;
          const h = drawH * zoom;
          const x = (canvas.width - w) / 2 + panX;
          const y = (canvas.height - h) / 2 + panY;

          tempCtx.drawImage(baseImg, x, y, w, h);

          // Apply intelligent key-out background effect if requested or if Swarm mode is active
          if (keyOutBackground || enableSwarmBg) {
            const imgData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
            const data = imgData.data;

            // Sample background colors from top edge points to intelligently detect backdrop
            // (Avoiding bottom corners to protect person's clothes / shoulders!)
            const corners = [
              { x: 5, y: 5 },
              { x: Math.floor(tempCanvas.width / 2), y: 5 },
              { x: tempCanvas.width - 6, y: 5 }
            ];

            const sampledColors: { r: number; g: number; b: number }[] = [];
            corners.forEach(coord => {
              const idx = (coord.y * tempCanvas.width + coord.x) * 4;
              if (idx < data.length) {
                const alpha = data[idx + 3];
                // Only sample if solid/mostly solid (avoid sampling pre-transparent zones)
                if (alpha > 120) {
                  sampledColors.push({
                    r: data[idx],
                    g: data[idx + 1],
                    b: data[idx + 2]
                  });
                }
              }
            });

            // Convert hex to rgb helper
            const hexToRgb = (hex: string) => {
              const cleanHex = hex.replace('#', '');
              const num = parseInt(cleanHex, 16);
              return {
                r: (num >> 16) & 255,
                g: (num >> 8) & 255,
                b: num & 255
              };
            };
            const chromaRgb = hexToRgb(swarmChromaColor);

            // Run pixel-by-pixel color matching and filtering
            for (let i = 0; i < data.length; i += 4) {
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];
              const a = data[i + 3];

              if (a === 0) continue;

              let isBgColor = false;

              if (swarmKeyMode === 'auto') {
                // 1. Check similarity to corner background colors
                for (const sc of sampledColors) {
                  const dist = Math.sqrt(
                    Math.pow(r - sc.r, 2) +
                    Math.pow(g - sc.g, 2) +
                    Math.pow(b - sc.b, 2)
                  );
                  if (dist < swarmTolerance) {
                    isBgColor = true;
                    break;
                  }
                }
                // Fallback basic light/dark corner check
                if (!isBgColor) {
                  const brightness = (r + g + b) / 3;
                  if (brightness > 235 && swarmTolerance > 40) {
                    isBgColor = true;
                  } else if (brightness < 35 && swarmTolerance > 40) {
                    isBgColor = true;
                  }
                }
              } else if (swarmKeyMode === 'white') {
                const brightness = (r + g + b) / 3;
                if (brightness > (255 - swarmTolerance)) {
                  isBgColor = true;
                }
              } else if (swarmKeyMode === 'dark') {
                const brightness = (r + g + b) / 3;
                if (brightness < swarmTolerance) {
                  isBgColor = true;
                }
              } else if (swarmKeyMode === 'chroma') {
                const dist = Math.sqrt(
                  Math.pow(r - chromaRgb.r, 2) +
                  Math.pow(g - chromaRgb.g, 2) +
                  Math.pow(b - chromaRgb.b, 2)
                );
                if (dist < swarmTolerance) {
                  isBgColor = true;
                }
              }

              if (isBgColor) {
                data[i + 3] = 0; // Set alpha to 0 (cropped out!)
              }
            }

            // State-of-the-art Edge Feathering Anti-Aliasing pass
            const compW = tempCanvas.width;
            const compH = tempCanvas.height;
            const alphaBuffer = new Uint8Array(compW * compH);
            for (let y = 0; y < compH; y++) {
              for (let x = 0; x < compW; x++) {
                alphaBuffer[y * compW + x] = data[(y * compW + x) * 4 + 3];
              }
            }
            for (let y = 1; y < compH - 1; y++) {
              for (let x = 1; x < compW - 1; x++) {
                const idx = (y * compW + x) * 4;
                if (data[idx + 3] > 0) {
                  const aLeft  = alphaBuffer[y * compW + (x - 1)];
                  const aRight = alphaBuffer[y * compW + (x + 1)];
                  const aUp    = alphaBuffer[(y - 1) * compW + x];
                  const aDown  = alphaBuffer[(y + 1) * compW + x];
                  if (aLeft === 0 || aRight === 0 || aUp === 0 || aDown === 0) {
                    data[idx + 3] = Math.round(data[idx + 3] * 0.45);
                  }
                }
              }
            }

            tempCtx.putImageData(imgData, 0, 0);
          }

          // Composite the cropped/keyed image onto the main canvas
          ctx.drawImage(tempCanvas, 0, 0);
        }
      }

      // Draw 3D glowing PFP ring if enabled
      if (enablePfpRing) {
        ctx.save();
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const radius = (canvas.width / 2) * (pfpRingDiameter / 100);

        // 1. Soft dark outer drop shadow (for high contrast and isolation)
        ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
        ctx.shadowBlur = canvas.width * 0.02;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = canvas.width * 0.005;
        
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = canvas.width * 0.006;
        ctx.stroke();

        // 2. High-intensity neon glow of the chosen ring color
        ctx.shadowColor = pfpRingColor;
        ctx.shadowBlur = canvas.width * (pfpRingGlow / 100);
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = pfpRingColor;
        ctx.lineWidth = canvas.width * (pfpRingThickness / 1000);
        ctx.stroke();

        // Remove shadow/glow effects to render crisp bevel outlines
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // 3. 3D Metallic highlight gradient for reflective volume
        const grad = ctx.createLinearGradient(cx - radius, cy - radius, cx + radius, cy + radius);
        grad.addColorStop(0, '#ffffff'); // Top-left shiny reflection
        grad.addColorStop(0.3, pfpRingColor);
        grad.addColorStop(0.7, '#92400e'); // Golden/Amber shadow
        grad.addColorStop(1, '#ffffff'); // Bottom-right reflection

        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = grad;
        ctx.lineWidth = canvas.width * (pfpRingThickness / 1400);
        ctx.stroke();

        // 4. Inner crisp white highlight ring (subtle glass/bevel effect)
        ctx.beginPath();
        ctx.arc(cx, cy, radius - (canvas.width * (pfpRingThickness / 2000)), 0, 2 * Math.PI);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = canvas.width * 0.0015;
        ctx.stroke();

        // 5. Outer sharp dark boundary line for precise definition
        ctx.beginPath();
        ctx.arc(cx, cy, radius + (canvas.width * (pfpRingThickness / 2000)), 0, 2 * Math.PI);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.lineWidth = canvas.width * 0.0015;
        ctx.stroke();

        ctx.restore();
      }

      // 4.5. Procedural elegant glowing snow butterflies (the "magical swarm background layer")
      const drawSnowButterfly = (c: CanvasRenderingContext2D, x: number, y: number, s: number, op: number, rot: number) => {
        c.save();
        c.translate(x, y);
        c.rotate((rot * Math.PI) / 180);
        
        // Wing shape with soft glow
        c.fillStyle = `rgba(255, 255, 255, ${op})`;
        c.shadowColor = 'rgba(255, 255, 255, 0.5)';
        c.shadowBlur = s * 0.35;
        c.shadowOffsetX = 0;
        c.shadowOffsetY = 0;
        
        // Draw left wing
        c.beginPath();
        c.moveTo(0, 0);
        c.bezierCurveTo(-s * 0.8, -s * 0.8, -s * 1.2, 0, -s * 0.2, s * 0.2);
        c.bezierCurveTo(-s * 0.8, s * 0.8, -s * 0.3, s * 1.2, 0, s * 0.3);
        c.closePath();
        c.fill();

        // Draw right wing
        c.beginPath();
        c.moveTo(0, 0);
        c.bezierCurveTo(s * 0.8, -s * 0.8, s * 1.2, 0, s * 0.2, s * 0.2);
        c.bezierCurveTo(s * 0.8, s * 0.8, s * 0.3, s * 1.2, 0, s * 0.3);
        c.closePath();
        c.fill();

        // Draw thin body
        c.fillStyle = `rgba(255, 255, 255, ${op * 1.1})`;
        c.beginPath();
        c.ellipse(0, s * 0.1, s * 0.05, s * 0.35, 0, 0, 2 * Math.PI);
        c.closePath();
        c.fill();

        // Draw two tiny elegant antennae
        c.strokeStyle = `rgba(255, 255, 255, ${op * 0.7})`;
        c.lineWidth = s * 0.035;
        c.beginPath();
        c.moveTo(0, -s * 0.25);
        c.quadraticCurveTo(-s * 0.15, -s * 0.45, -s * 0.18, -s * 0.4);
        c.moveTo(0, -s * 0.25);
        c.quadraticCurveTo(s * 0.15, -s * 0.45, s * 0.18, -s * 0.4);
        c.stroke();

        c.restore();
      };

      // Scatter 6-7 small, magical, highly elegant transparent snow butterflies in corner areas and backgrounds
      const snowButterflies = [
        { x: canvas.width * 0.15, y: canvas.height * 0.18, size: canvas.width * 0.045, op: 0.18, rot: -20 },
        { x: canvas.width * 0.85, y: canvas.height * 0.22, size: canvas.width * 0.042, op: 0.16, rot: 15 },
        { x: canvas.width * 0.12, y: canvas.height * 0.82, size: canvas.width * 0.038, op: 0.15, rot: 35 },
        { x: canvas.width * 0.88, y: canvas.height * 0.78, size: canvas.width * 0.035, op: 0.14, rot: -45 },
        { x: canvas.width * 0.35, y: canvas.height * 0.75, size: canvas.width * 0.028, op: 0.12, rot: 10 },
        { x: canvas.width * 0.65, y: canvas.height * 0.12, size: canvas.width * 0.032, op: 0.13, rot: -12 }
      ];

      snowButterflies.forEach(b => {
        drawSnowButterfly(ctx, b.x, b.y, b.size, b.op, b.rot);
      });

      // 5. Draw transparent SvgButterfly with positioning, rotation, and glows
      // Calc size ratio (exactly corresponding to the preview element width & height)
      const bWidth = canvas.width * (overlayScale / 100);
      const bHeight = canvas.height * (overlayScale / 100);

      // Now positioned relative to left (offsetX) and top (offsetY)
      const posX = canvas.width * (offsetX / 100);
      const posY = canvas.height * (offsetY / 100);

      // Translate to center of butterfly
      const centerX = posX + bWidth / 2;
      const centerY = posY + bHeight / 2;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate((rotation * Math.PI) / 180);

      // Optional High resolution dropshadow/glow
      if (enableGlow) {
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = (canvas.width * (glowSize / 100)) / 2;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      }

      // Draw vector butterfly
      ctx.drawImage(vectorImg, -bWidth / 2, -bHeight / 2, bWidth, bHeight);
      ctx.restore();

      // 6. Optional badge overlay text rounded container (making it prominent and high-fidelity)
      if (selectedBadge !== 'none') {
        let badgeText = 'Karma Butterfly';
        if (selectedBadge === 'holder') badgeText = 'Karma Butterfly Holder';
        else if (selectedBadge === 'genesis') badgeText = 'Genesis Butterfly';
        else if (selectedBadge === 'verified') badgeText = 'KarmaScore Verified';

        // Badge size is designed to be highly visible and perfectly scaled (4.5% height)
        const fontHeight = Math.max(22, Math.floor(canvas.height * 0.045));
        ctx.font = `900 ${fontHeight}px sans-serif`;

        const iconSize = fontHeight * 1.1;
        const spacing = fontHeight * 0.45;
        const textWidth = ctx.measureText(badgeText).width;

        const paddingX = fontHeight * 1.3;
        const paddingY = fontHeight * 0.65;
        const pillWidth = textWidth + iconSize + spacing + paddingX * 2;
        const pillHeight = fontHeight + paddingY * 2;

        // Position bottom center with a generous 6.5% bottom margin
        const badgeX = (canvas.width - pillWidth) / 2;
        const badgeY = canvas.height - pillHeight - (canvas.height * 0.065);

        // Draw glossy slate pill background with deep ambient shadow
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
        ctx.shadowBlur = fontHeight * 0.5;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = fontHeight * 0.15;

        ctx.fillStyle = 'rgba(10, 10, 11, 0.95)';
        ctx.strokeStyle = '#F59E0B'; // Rich Amber orange stroke
        ctx.lineWidth = Math.max(2, Math.floor(canvas.height * 0.0045));
        
        // Draw rounded path
        const radius = pillHeight / 2;
        ctx.beginPath();
        ctx.moveTo(badgeX + radius, badgeY);
        ctx.lineTo(badgeX + pillWidth - radius, badgeY);
        ctx.arcTo(badgeX + pillWidth, badgeY, badgeX + pillWidth, badgeY + radius, radius);
        ctx.lineTo(badgeX + pillWidth, badgeY + pillHeight - radius);
        ctx.arcTo(badgeX + pillWidth, badgeY + pillHeight, badgeX + pillWidth - radius, badgeY + pillHeight, radius);
        ctx.lineTo(badgeX + radius, badgeY + pillHeight);
        ctx.arcTo(badgeX, badgeY + pillHeight, badgeX, badgeY + pillHeight - radius, radius);
        ctx.lineTo(badgeX, badgeY + radius);
        ctx.arcTo(badgeX, badgeY, badgeX + radius, badgeY, radius);
        ctx.closePath();
        
        ctx.fill();
        // Remove shadow for stroke to keep it sharp
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.stroke();

        // Draw the luxurious 8-point gold star verification checkmark icon
        const iconX = badgeX + paddingX + iconSize / 2;
        const iconY = badgeY + pillHeight / 2;
        ctx.save();
        ctx.translate(iconX, iconY);
        ctx.fillStyle = '#F59E0B';
        ctx.beginPath();
        const points = 8;
        const outerRadius = iconSize / 2;
        const innerRadius = iconSize / 3;
        for (let i = 0; i < points * 2; i++) {
          const angle = (i * Math.PI) / points;
          const r = i % 2 === 0 ? outerRadius : innerRadius;
          ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
        }
        ctx.closePath();
        ctx.fill();

        // Draw small checkmark inside the star
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = fontHeight * 0.12;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(-outerRadius * 0.4, -outerRadius * 0.05);
        ctx.lineTo(-outerRadius * 0.1, outerRadius * 0.25);
        ctx.lineTo(outerRadius * 0.4, -outerRadius * 0.3);
        ctx.stroke();
        ctx.restore();

        // Draw luxury text matching the position
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(badgeText, badgeX + paddingX + iconSize + spacing, badgeY + pillHeight / 2 + (fontHeight * 0.02));
        ctx.restore();
      }

      // 7. Apply cohesive luxury glassy card glaze over the entire final image
      ctx.save();
      const glassGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      glassGrad.addColorStop(0, 'rgba(255, 255, 255, 0.08)'); // Top-left high glass sheen
      glassGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.03)');
      glassGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
      glassGrad.addColorStop(0.8, 'rgba(255, 255, 255, 0.01)');
      glassGrad.addColorStop(1, 'rgba(255, 255, 255, 0.04)'); // Subtle bottom-right glaze reflection
      ctx.fillStyle = glassGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw a subtle thin white inset border (glass frame) for that perfect premium finish
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = canvas.width * 0.005; // thin elegant frame
      ctx.strokeRect(canvas.width * 0.0025, canvas.height * 0.0025, canvas.width * 0.995, canvas.height * 0.995);
      ctx.restore();

      // Convert to dynamic png url
      const finalUrl = canvas.toDataURL('image/png');
      
      // Cleanup blob url
      URL.revokeObjectURL(blobUrl);

      return finalUrl;

    } catch (err) {
      console.error(err);
      alert('An error occurred during composition rendering.');
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  // Gestures and interactions
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const isButterfly = (e.target as HTMLElement).closest('#butterfly-overlay') !== null;
    const activeMode = isButterfly ? 'butterfly' : editMode;
    gestureModeRef.current = activeMode;
    if (isButterfly && editMode !== 'butterfly') {
      setEditMode('butterfly');
    }

    if (e.touches.length === 2) {
      // Pinch gesture
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setTouchStartDist(dist);
      setTouchStartZoom(activeMode === 'butterfly' ? overlayScale : baseImgZoom);
    } else if (e.touches.length === 1) {
      // Pan gesture
      setIsPanning(true);
      setPanStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      if (activeMode === 'butterfly') {
        setPanStartOffset({ x: offsetX, y: offsetY });
      } else {
        setPanStartOffset({ x: baseImgPanX, y: baseImgPanY });
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const activeMode = gestureModeRef.current;
    if (e.touches.length === 2 && touchStartDist !== null) {
      e.preventDefault();
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = dist / touchStartDist;
      if (activeMode === 'butterfly') {
        // Scale butterfly size (range: 5% to 100%)
        const newScale = Math.min(100, Math.max(5, Math.round(touchStartZoom * factor)));
        setOverlayScale(newScale);
      } else {
        // Scale background zoom (range: 1.0 to 4.0)
        const newZoom = Math.min(4.0, Math.max(1.0, parseFloat((touchStartZoom * factor).toFixed(2))));
        setBaseImgZoom(newZoom);
      }
    } else if (e.touches.length === 1 && isPanning) {
      e.preventDefault();
      const dx = e.touches[0].clientX - panStart.x;
      const dy = e.touches[0].clientY - panStart.y;

      const containerWidth = containerRef.current?.clientWidth || 400;
      const containerHeight = containerRef.current?.clientHeight || 400;

      const pctX = (dx / containerWidth) * 100;
      const pctY = (dy / containerHeight) * 100;

      if (activeMode === 'butterfly') {
        // Drag butterfly (natural movement: dragging right increases offset, dragging down increases offset)
        const newOffsetX = Math.min(110, Math.max(-50, Math.round(panStartOffset.x + pctX)));
        const newOffsetY = Math.min(110, Math.max(-50, Math.round(panStartOffset.y + pctY)));
        setOffsetX(newOffsetX);
        setOffsetY(newOffsetY);
      } else {
        // Drag background image
        const newPanX = Math.min(200, Math.max(-200, Math.round(panStartOffset.x + pctX)));
        const newPanY = Math.min(200, Math.max(-200, Math.round(panStartOffset.y + pctY)));
        setBaseImgPanX(newPanX);
        setBaseImgPanY(newPanY);
      }
    }
  };

  const handleTouchEnd = () => {
    setTouchStartDist(null);
    setIsPanning(false);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    
    const isButterfly = (e.target as HTMLElement).closest('#butterfly-overlay') !== null;
    const activeMode = isButterfly ? 'butterfly' : editMode;
    gestureModeRef.current = activeMode;
    if (isButterfly && editMode !== 'butterfly') {
      setEditMode('butterfly');
    }

    setIsPanning(true);
    setPanStart({ x: e.clientX, y: e.clientY });
    if (activeMode === 'butterfly') {
      setPanStartOffset({ x: offsetX, y: offsetY });
    } else {
      setPanStartOffset({ x: baseImgPanX, y: baseImgPanY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPanning) return;
    e.preventDefault();
    const dx = e.clientX - panStart.x;
    const dy = e.clientY - panStart.y;

    const containerWidth = containerRef.current?.clientWidth || 400;
    const containerHeight = containerRef.current?.clientHeight || 400;

    const pctX = (dx / containerWidth) * 100;
    const pctY = (dy / containerHeight) * 100;

    const activeMode = gestureModeRef.current;
    if (activeMode === 'butterfly') {
      // Natural non-inverted dragging
      const newOffsetX = Math.min(110, Math.max(-50, Math.round(panStartOffset.x + pctX)));
      const newOffsetY = Math.min(110, Math.max(-50, Math.round(panStartOffset.y + pctY)));
      setOffsetX(newOffsetX);
      setOffsetY(newOffsetY);
    } else {
      const newPanX = Math.min(200, Math.max(-200, Math.round(panStartOffset.x + pctX)));
      const newPanY = Math.min(200, Math.max(-200, Math.round(panStartOffset.y + pctY)));
      setBaseImgPanX(newPanX);
      setBaseImgPanY(newPanY);
    }
  };

  const handleMouseUpOrLeave = () => {
    setIsPanning(false);
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const isButterfly = (e.target as HTMLElement).closest('#butterfly-overlay') !== null;
    if (isButterfly) {
      setEditMode('butterfly');
    }
    const activeMode = isButterfly ? 'butterfly' : editMode;
    const zoomFactor = e.deltaY < 0 ? 1.05 : 0.95;
    if (activeMode === 'butterfly') {
      const newScale = Math.min(100, Math.max(5, Math.round(overlayScale * zoomFactor)));
      setOverlayScale(newScale);
    } else {
      const newZoom = Math.min(4.0, Math.max(1.0, parseFloat((baseImgZoom * zoomFactor).toFixed(2))));
      setBaseImgZoom(newZoom);
    }
  };

  const handleDownload = async () => {
    // Generate high resolution 2048px image for actual file download
    const fullResUrl = await generateSocialComposition(2048);
    if (!fullResUrl) return;

    // Trigger download
    const link = document.createElement('a');
    link.download = `${imgName || 'unnamed'}_karma_overlay.png`;
    link.href = fullResUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Save overlay to the library tab with a lightweight 350px image to prevent localStorage QuotaExceededError
    const storageUrl = await generateSocialComposition(350);
    if (!storageUrl) return;

    const newItem: SavedOverlay = {
      id: Math.random().toString(36).substring(2, 9),
      name: `${imgName || 'unnamed'} + 🦋`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      dataUrl: storageUrl
    };

    const updated = [newItem, ...savedCreations.slice(0, 11)]; // Cap at 12 items
    setSavedCreations(updated);
    try {
      localStorage.setItem('karma_overlay_creations', JSON.stringify(updated));
    } catch (err) {
      console.warn("Storage quota limit reached, saving single item as fallback", err);
      try {
        localStorage.setItem('karma_overlay_creations', JSON.stringify([newItem]));
      } catch (innerErr) {
        console.error("Local storage completely full", innerErr);
      }
    }
  };

  // Launch Social Crop modal
  const handleLaunchSocialCrop = async (platform: 'x-pfp' | 'x-banner' | 'tg' | 'discord') => {
    const fullResUrl = await generateSocialComposition(2048);
    if (!fullResUrl) return;

    // Based on platform, draw onto scaled output card
    const sourceImg = new Image();
    sourceImg.onload = () => {
      let targetW = 400;
      let targetH = 400;
      if (platform === 'x-banner') {
        targetW = 1500;
        targetH = 500;
      } else if (platform === 'tg') {
        targetW = 512;
        targetH = 512;
      } else if (platform === 'discord') {
        targetW = 128;
        targetH = 128;
      }

      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Keep original aspect ratio, crop / fill to fit target boundary
        const imgRatio = sourceImg.width / sourceImg.height;
        const targetRatio = targetW / targetH;
        let drawW = targetW;
        let drawH = targetH;
        let dx = 0;
        let dy = 0;

        if (imgRatio > targetRatio) {
          // wider than target, fit height
          drawW = targetH * imgRatio;
          dx = (targetW - drawW) / 2;
        } else {
          // taller than target, fit width
          drawH = targetW / imgRatio;
          dy = (targetH - drawH) / 2;
        }

        ctx.fillStyle = '#050505'; // background filler black
        ctx.fillRect(0, 0, targetW, targetH);
        ctx.drawImage(sourceImg, dx, dy, drawW, drawH);

        setSocialModalPreset({
          open: true,
          dataUrl: canvas.toDataURL('image/png'),
          platform
        });
      }
    };
    sourceImg.src = fullResUrl;
  };

  // Quick reset parameters
  const resetOverlayConfigs = () => {
    setOverlayScale(20);
    setOffsetX(3);
    setOffsetY(3);
    setRotation(0);
    setGlowSize(15);
    setEnableGlow(true);
    setSelectedBadge('holder');
    setEnablePfpRing(true);
    setPfpRingColor('#F59E0B');
    setPfpRingThickness(12);
    setPfpRingGlow(15);
    setPfpRingDiameter(92);
    setEnableSwarmBg(false);
  };

  const removeSavedCreation = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    const filtered = savedCreations.filter(c => c.id !== id);
    setSavedCreations(filtered);
    try {
      localStorage.setItem('karma_overlay_creations', JSON.stringify(filtered));
    } catch (err) {
      console.error("Failed to update localStorage after deletion", err);
    }
  };

  return (
    <section id="profile-overlay" className="py-20 relative overflow-hidden bg-[#0A0A0A] border-b border-white/10">
      {/* Absolute ambient lights fitting our luxury design */}
      <div className="absolute -top-40 right-10 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 left-10 w-96 h-96 rounded-full bg-teal-500/5 blur-3xl pointer-events-none" />

      {/* Hidden container used to serialize scalable vector butterfly structure seamlessly */}
      <div ref={hiddenButterflyRef} className="absolute -left-[5000px] -top-[5000px]">
        <SvgButterfly 
          variant={detectedAlignment} 
          seed={detectedSeed} 
          evolved={isEvolved} 
          flappingSpeed="none" 
          size={500} 
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header content defining the karma story */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-[10px] font-mono text-[#F59E0B] uppercase tracking-[0.25em] font-extrabold flex items-center gap-1.5 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-ping" />
              <span>Identity Customization Suite</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans font-black text-white tracking-tight">
              Floating SWARM X Badge
            </h2>
            <p className="text-slate-400 text-sm mt-3 leading-relaxed max-w-xl">
              Let your karma fly with you everywhere. This utility superimposes your custom high-fidelity generative Karma Butterfly onto your profile picture or favorite digital canvas instantly showing ownership. Floating SWARM X Badge suite allows seamless badging on the go!
            </p>
          </div>

          {/* Tab Selection */}
          <div className="flex bg-[#161617] border border-white/5 p-1 rounded-xl shrink-0 self-start md:self-auto gap-1">
            <button
              onClick={() => {
                setActiveTab('editor');
                setEnableSwarmBg(false);
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-sans font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'editor' 
                  ? 'bg-[#F59E0B] text-black shadow' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Badge Generator
            </button>
            <button
              onClick={() => {
                setActiveTab('swarm');
                setEnableSwarmBg(true); // Auto-activate swarm background mode when clicking the tab
                setKeyOutBackground(true);
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-sans font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'swarm' 
                  ? 'bg-[#F59E0B] text-black shadow' 
                  : 'text-slate-400 hover:text-[#F59E0B]'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>SWARM Theme</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('library');
                setEnableSwarmBg(false);
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-sans font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'library' 
                  ? 'bg-[#F59E0B] text-black shadow' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>My Creations</span>
              {savedCreations.length > 0 && (
                <span className={`w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center ${
                  activeTab === 'library' ? 'bg-black text-[#F59E0B]' : 'bg-amber-500/20 text-[#F59E0B]'
                }`}>
                  {savedCreations.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {activeTab === 'editor' || activeTab === 'swarm' ? (
          
          /* Editor Tab Layout grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Box 2: Image drag drop attachment */}
              <div className="col-span-12 lg:col-span-5 bg-[#111111]/90 border border-white/10 rounded-2xl p-5 space-y-4">
                {/* User Presets / Alignment Filters moved here */}
                <div className="space-y-2 border-b border-white/5 pb-3">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-extrabold">Butterfly Alignment Presets</span>
                  <div className="grid grid-cols-4 gap-1.5 pt-1">
                    <button 
                      onClick={() => applyPreset('light', false)}
                      className={`py-1.5 text-[9px] font-mono rounded bg-emerald-950/10 text-[#34d399] border hover:bg-emerald-950/20 transition cursor-pointer text-center font-bold uppercase ${
                        detectedAlignment === 'light' && !isEvolved ? 'border-[#34d399]/70' : 'border-[#34d399]/10'
                      }`}
                    >
                      Light
                    </button>
                    <button 
                      onClick={() => applyPreset('shadow', false)}
                      className={`py-1.5 text-[9px] font-mono rounded bg-purple-950/10 text-[#c084fc] border hover:bg-purple-950/20 transition cursor-pointer text-center font-bold uppercase ${
                        detectedAlignment === 'shadow' && !isEvolved ? 'border-[#c084fc]/70' : 'border-[#c084fc]/10'
                      }`}
                    >
                      Shadow
                    </button>
                    <button 
                      onClick={() => applyPreset('nexus', false)}
                      className={`py-1.5 text-[9px] font-mono rounded bg-teal-950/10 text-[#10b981] border hover:bg-teal-950/20 transition cursor-pointer text-center font-bold uppercase ${
                        detectedAlignment === 'nexus' && !isEvolved ? 'border-[#10b981]/70' : 'border-[#10b981]/10'
                      }`}
                    >
                      Nexus
                    </button>
                    <button 
                      onClick={() => applyPreset('light', true)}
                      className={`py-1.5 text-[9px] font-mono rounded bg-pink-950/10 text-pink-400 border hover:bg-pink-950/20 transition cursor-pointer text-center font-bold uppercase ${
                        isEvolved ? 'border-pink-400/70' : 'border-pink-400/10'
                      }`}
                    >
                      Evolved
                    </button>
                  </div>
                </div>

                <h3 className="text-xs font-mono font-extrabold uppercase text-[#F59E0B] tracking-wider flex items-center gap-1.5 border-b border-white/5 pb-3">
                  <Upload className="w-4 h-4" />
                  <span>Attach Canvas File</span>
                </h3>

                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border border-dashed border-white/10 hover:border-[#F59E0B]/40 bg-black/40 rounded-xl p-6 text-center transition-all cursor-pointer group space-y-3"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] text-slate-400 group-hover:text-[#F59E0B] group-hover:bg-amber-950/20 border border-white/5 group-hover:border-[#F59E0B]/20 flex items-center justify-center mx-auto transition-all">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-sans text-white font-bold leading-none">
                      Drag & drop your profile image
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono mt-1">
                      Supports PNG, JPG, JPEG, WEBP (Square Recommended)
                    </p>
                  </div>
                </div>

                {uploadedBaseImg && (
                  <div className="flex items-center justify-between bg-black/20 p-2.5 rounded-xl border border-white/5">
                    <div className="flex items-center gap-2 max-w-[70%]">
                      <div className="w-10 h-10 rounded bg-[#1A1A1A] overflow-hidden flex items-center justify-center shrink-0 border border-white/5">
                        <img src={uploadedBaseImg} alt="Uploaded source preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="truncate">
                        <p className="text-xs font-bold text-white truncate text-slate-200 leading-none">{imgName}</p>
                        <span className="text-[8.5px] font-mono text-slate-500 block mt-0.5">Custom base canvas</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setUploadedBaseImg(null);
                        setImgName('');
                      }}
                      className="p-1 px-2.5 rounded text-[10px] bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 border border-rose-500/20 font-mono uppercase tracking-wider cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>

            {/* Live Render/Preview panel: 7 columns */}
            <div className="col-span-12 lg:col-span-7 lg:row-span-2 space-y-6">
              
              {/* Box: Canvas Studio Board */}
              <div className="bg-[#111111]/90 border border-white/10 rounded-2xl p-5 md:p-6 sm:p-8 flex flex-col justify-between items-center relative min-h-[460px]">
                
                {/* Header info */}
                <div className="w-full flex justify-between items-center border-b border-white/5 pb-4 mb-4">
                  <div>
                    <span className="text-[9.5px] font-mono text-slate-400 uppercase tracking-widest block font-extrabold">LIVE PREVIEW</span>
                    <p className="text-slate-500 font-sans text-xs italic leading-none mt-1">
                      “Let your karma fly with you everywhere”
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={resetOverlayConfigs}
                      title="Reset Position"
                      className="p-1 px-2 text-[10px] bg-neutral-900 border border-white/5 hover:border-slate-800 text-slate-400 hover:text-white rounded font-mono uppercase tracking-wider flex items-center gap-1 cursor-pointer transition"
                    >
                      <RefreshCw className="w-3 h-3" /> Reset
                    </button>
                  </div>
                </div>

                {/* Main Composition Canvas Preview Box */}
                <div 
                  ref={containerRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUpOrLeave}
                  onMouseLeave={handleMouseUpOrLeave}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onWheel={handleWheel}
                  className={`relative w-full max-w-[340px] md:max-w-[400px] aspect-square rounded-2xl border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden shadow-inner transition-all select-none ${
                    enableSwarmBg
                      ? 'bg-[#F59E0B]'
                      : bgType === 'transparent'
                      ? 'bg-[linear-gradient(45deg,#161617_25%,transparent_25%),linear-gradient(-45deg,#161617_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#161617_75%),linear-gradient(-45deg,transparent_75%,#161617_75%)] bg-[size:16px_16px] bg-[position:0_0,0_8px,8px_-8px,-8px_0] bg-[#070708]'
                      : bgType === 'dark'
                      ? 'bg-[#0B0B0C]'
                      : 'bg-[#070708]'
                  }`}
                >
                  {(bgType === 'image' || enableSwarmBg) && !uploadedBaseImg ? (
                    <div className="text-center p-8 space-y-4">
                      <div className="w-16 h-16 rounded-2xl bg-amber-500/5 border border-[#F59E0B]/20 flex items-center justify-center text-4xl mx-auto animate-bounce duration-1000">
                        📸
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-white font-black uppercase tracking-widest">No Base Image Selected</p>
                        <p className="text-[11px] text-slate-500 leading-relaxed max-w-[240px] mx-auto">
                          Attach your profile photo to begin layering, or switch canvas background to Transparent / Deep Slate above.
                        </p>
                      </div>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="py-1.5 px-3 bg-[#F59E0B] hover:bg-amber-400 text-black rounded-lg text-[10px] uppercase font-mono tracking-widest font-extrabold cursor-pointer"
                      >
                        Browse Photo ↗
                      </button>
                    </div>
                  ) : (
                    <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl">
                      
                      {/* Base Image */}
                      {(bgType === 'image' || enableSwarmBg) && uploadedBaseImg && (
                        <div 
                          className="w-full h-full transition-transform duration-75 pointer-events-none"
                          style={{
                            transform: `scale(${baseImgZoom}) translate(${baseImgPanX}%, ${baseImgPanY}%)`,
                          }}
                        >
                          <img 
                            src={croppedBaseImgUrl || uploadedBaseImg} 
                            alt="Workspace Base" 
                            className="w-full h-full object-cover rounded-xl" 
                          />
                        </div>
                      )}

                      {/* glowing 3D Ring around PFP */}
                      {enablePfpRing && (
                        <div 
                          className="absolute pointer-events-none rounded-full transition-all duration-300 flex items-center justify-center z-10"
                          style={{
                            width: `${pfpRingDiameter}%`,
                            height: `${pfpRingDiameter}%`,
                            border: `${Math.max(1, pfpRingThickness / 3.5)}px solid ${pfpRingColor}`,
                            boxShadow: `0 0 ${pfpRingGlow * 1.5}px ${pfpRingColor}, inset 0 0 ${pfpRingGlow * 1.2}px ${pfpRingColor}, 0 4px 12px rgba(0,0,0,0.6)`,
                            background: 'transparent',
                          }}
                        >
                          {/* Inner bevel ring reflection */}
                          <div 
                            className="absolute inset-[1px] rounded-full border border-white/50 pointer-events-none"
                          />
                          {/* Outer dark shadow ring for depth */}
                          <div 
                            className="absolute -inset-[2px] rounded-full border border-black/40 pointer-events-none"
                          />
                          {/* Glossy overlay effect */}
                          <div 
                            className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none"
                          />
                        </div>
                      )}

                      {/* Floating Vector Butterfly Overlay */}
                      <div 
                        id="butterfly-overlay"
                        className="absolute cursor-move select-none active:scale-[1.02] transition-transform"
                        style={{
                          top: `${offsetY}%`,
                          left: `${offsetX}%`,
                          width: `${overlayScale}%`,
                          height: `${overlayScale}%`,
                          transform: `rotate(${rotation}deg)`,
                          filter: enableGlow ? `drop-shadow(0 0 ${glowSize}px ${glowColor})` : 'none',
                          transition: 'filter 0.3s ease, width 0.1s ease, height 0.1s ease'
                        }}
                      >
                        <div className="w-full h-full">
                          <SvgButterfly 
                            variant={detectedAlignment} 
                            seed={detectedSeed} 
                            evolved={isEvolved} 
                            flappingSpeed="normal" 
                            className="w-full h-full"
                          />
                        </div>
                      </div>

                      {/* Brand Pill badge overlay */}
                      {selectedBadge !== 'none' && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/95 text-white border border-[#F59E0B] px-3.5 py-1.5 rounded-full text-[9px] sm:text-[10px] font-sans font-black uppercase tracking-wider shadow-lg flex items-center gap-1 animate-pulse-glow z-10">
                          <BadgeCheck className="w-3 h-3 text-[#F59E0B] shrink-0" />
                          <span>
                            {selectedBadge === 'holder' && 'Karma Butterfly Holder'}
                            {selectedBadge === 'genesis' && 'Genesis Butterfly'}
                            {selectedBadge === 'verified' && 'KarmaScore Verified'}
                          </span>
                        </div>
                      )}

                      {/* Tap to save composite hover-overlay */}
                      {uploadedBaseImg && !isPanning && (
                        <div 
                          onClick={handleDownload}
                          className="absolute inset-0 w-full h-full cursor-pointer z-20 group"
                          title="Tap/Click to save composite"
                        >
                          {/* We can overlay a subtle interactive ring or tooltip on hover */}
                          <div className="absolute inset-0 bg-amber-500/0 hover:bg-amber-500/5 transition-all flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 bg-black/90 border border-[#F59E0B]/50 px-3 py-1.5 rounded-lg text-[9px] font-mono text-[#F59E0B] tracking-wider uppercase shadow-xl transition-all scale-95 group-hover:scale-100">
                              📲 Tap / Click to download
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Preconfigured Cross-Platform Presets Actions footer */}
                <div className="w-full mt-6 space-y-3 pt-4 border-t border-white/5">
                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <button
                      disabled={isGenerating || ((bgType === 'image' || enableSwarmBg) && !uploadedBaseImg)}
                      onClick={handleDownload}
                      className="flex-1 py-3 bg-[#F59E0B] disabled:bg-amber-500/10 disabled:text-slate-500 disabled:cursor-not-allowed text-black rounded-xl text-xs font-sans font-black uppercase tracking-widest flex items-center justify-center gap-1.5 hover:scale-[1.01] transition-all cursor-pointer shadow-lg shadow-amber-500/10 font-extrabold"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Rendering...</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5" />
                          <span>Download Creation</span>
                        </>
                      )}
                    </button>
                  </div>

                  {(uploadedBaseImg || (bgType !== 'image' && !enableSwarmBg)) && (
                    <div className="space-y-2">
                      <span className="text-[8.5px] font-mono text-slate-500 uppercase tracking-widest block text-center">Export Custom Platform Crop Size presets:</span>
                      <div className="grid grid-cols-4 gap-2 text-center text-[9px] font-mono text-slate-300">
                        <button
                          onClick={() => handleLaunchSocialCrop('x-pfp')}
                          className="py-1.5 bg-neutral-900 border border-white/5 hover:border-sky-500/40 rounded hover:text-sky-400 transition"
                        >
                          X Profile
                        </button>
                        <button
                          onClick={() => handleLaunchSocialCrop('x-banner')}
                          className="py-1.5 bg-neutral-900 border border-white/5 hover:border-sky-500/40 rounded hover:text-sky-400 transition"
                        >
                          X Banner
                        </button>
                        <button
                          onClick={() => handleLaunchSocialCrop('tg')}
                          className="py-1.5 bg-neutral-900 border border-white/5 hover:border-cyan-500/40 rounded hover:text-cyan-400 transition"
                        >
                          TG Avatar
                        </button>
                        <button
                          onClick={() => handleLaunchSocialCrop('discord')}
                          className="py-1.5 bg-neutral-900 border border-white/5 hover:border-indigo-500/40 rounded hover:text-indigo-400 transition"
                        >
                          Discord
                        </button>
                      </div>
                    </div>
                  )}
                </div>

              </div>
              
            </div>

            {/* Box 3: Overlay Controllers & badging */}
            {activeTab === 'editor' ? (
              <div className="col-span-12 lg:col-span-5 bg-[#111111]/90 border border-white/10 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <h3 className="text-xs font-mono font-extrabold uppercase text-[#F59E0B] tracking-wider flex items-center gap-1.5">
                    <Sliders className="w-4 h-4" />
                    <span>Fine Tuning Controls</span>
                  </h3>
                  <button
                    onClick={resetOverlayConfigs}
                    className="text-[9.5px] font-mono text-slate-400 hover:text-white underline cursor-pointer"
                  >
                    Reset
                  </button>
                </div>

                {/* Control Sliders */}
                <div className="space-y-4 pt-1">
                  {/* Edit Target Selector */}
                  <div className="space-y-2 border-b border-white/5 pb-3">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">INTERACTION TARGET</span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        onClick={() => setEditMode('butterfly')}
                        className={`py-2 px-3 rounded-xl border font-sans font-extrabold uppercase tracking-wider transition flex items-center justify-center gap-1.5 cursor-pointer ${
                          editMode === 'butterfly'
                            ? 'bg-[#F59E0B]/10 border-[#F59E0B]/50 text-[#F59E0B]'
                            : 'bg-black/20 border-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        <Move className="w-3.5 h-3.5 shrink-0" />
                        <span>🦋 Butterfly</span>
                      </button>
                      <button
                        onClick={() => setEditMode('background')}
                        className={`py-2 px-3 rounded-xl border font-sans font-extrabold uppercase tracking-wider transition flex items-center justify-center gap-1.5 cursor-pointer ${
                          editMode === 'background'
                            ? 'bg-[#F59E0B]/10 border-[#F59E0B]/50 text-[#F59E0B]'
                            : 'bg-black/20 border-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        <Hand className="w-3.5 h-3.5 shrink-0" />
                        <span>🖼️ Background</span>
                      </button>
                    </div>
                    <p className="text-[9.5px] font-mono text-slate-500 text-center leading-normal">
                      💡 Pro-Tip: You can drag, scroll (wheel), or pinch directly on the canvas to move/resize the selected layer!
                    </p>
                  </div>

                  {/* Canvas Background Style selection */}
                  <div className="space-y-2 border-b border-white/5 pb-3">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">CANVAS BACKGROUND BASE</span>
                    <div className="grid grid-cols-3 gap-2 text-[10px] uppercase font-bold">
                      <button
                        onClick={() => setBgType('transparent')}
                        className={`py-1.5 px-2 rounded-lg border text-center transition cursor-pointer ${
                          bgType === 'transparent'
                            ? 'bg-neutral-800 border-white/30 text-white'
                            : 'bg-black/20 border-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        🏁 Transparent
                      </button>
                      <button
                        onClick={() => setBgType('dark')}
                        className={`py-1.5 px-2 rounded-lg border text-center transition cursor-pointer ${
                          bgType === 'dark'
                            ? 'bg-neutral-800 border-white/30 text-white'
                            : 'bg-black/20 border-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        ◼️ Deep Slate
                      </button>
                      <button
                        disabled={!uploadedBaseImg}
                        onClick={() => setBgType('image')}
                        className={`py-1.5 px-2 rounded-lg border text-center transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer ${
                          bgType === 'image'
                            ? 'bg-neutral-800 border-white/30 text-white'
                            : 'bg-black/20 border-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        🖼️ Photo Base
                      </button>
                    </div>
                  </div>

                  {editMode === 'butterfly' ? (
                    <div className="space-y-4">
                      {/* Size slider */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10.5px] font-mono">
                          <span className="text-slate-400 uppercase">BUTTERFLY SIZE</span>
                          <span className="text-white font-bold">{overlayScale}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => setOverlayScale(Math.max(5, overlayScale - 5))}
                            className="p-1 px-2.5 rounded bg-neutral-900 border border-white/5 text-slate-350 hover:text-white text-xs font-mono font-bold cursor-pointer"
                          >
                            -
                          </button>
                          <input
                            type="range"
                            min="5"
                            max="100"
                            value={overlayScale}
                            onChange={(e) => setOverlayScale(parseInt(e.target.value))}
                            className="flex-1 accent-[#F59E0B] cursor-pointer h-1 bg-[#1A1A1A] rounded-lg"
                          />
                          <button 
                            onClick={() => setOverlayScale(Math.min(100, overlayScale + 5))}
                            className="p-1 px-2.5 rounded bg-neutral-900 border border-white/5 text-slate-350 hover:text-white text-xs font-mono font-bold cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Horizontal Margin */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10.5px] font-mono">
                          <span className="text-slate-400 uppercase">HORIZONTAL OFFSET (X)</span>
                          <span className="text-white font-bold">{offsetX}%</span>
                        </div>
                        <input
                          type="range"
                          min="-20"
                          max="90"
                          value={offsetX}
                          onChange={(e) => setOffsetX(parseInt(e.target.value))}
                          className="w-full accent-[#F59E0B] cursor-pointer h-1 bg-[#1A1A1A] rounded-lg"
                        />
                      </div>

                      {/* Vertical Margin */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10.5px] font-mono">
                          <span className="text-slate-400 uppercase">VERTICAL OFFSET (Y)</span>
                          <span className="text-white font-bold">{offsetY}%</span>
                        </div>
                        <input
                          type="range"
                          min="-20"
                          max="90"
                          value={offsetY}
                          onChange={(e) => setOffsetY(parseInt(e.target.value))}
                          className="w-full accent-[#F59E0B] cursor-pointer h-1 bg-[#1A1A1A] rounded-lg"
                        />
                      </div>

                      {/* Rotation */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10.5px] font-mono">
                          <span className="text-slate-400 uppercase">WING TILT (ROTATION)</span>
                          <span className="text-white font-bold">{rotation}°</span>
                        </div>
                        <input
                          type="range"
                          min="-180"
                          max="180"
                          value={rotation}
                          onChange={(e) => setRotation(parseInt(e.target.value))}
                          className="w-full accent-[#F59E0B] cursor-pointer h-1 bg-[#1A1A1A] rounded-lg"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Zoom background */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10.5px] font-mono">
                          <span className="text-slate-400 uppercase">PHOTO ZOOM</span>
                          <span className="text-white font-bold">{baseImgZoom.toFixed(1)}x</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => setBaseImgZoom(Math.max(1.0, parseFloat((baseImgZoom - 0.1).toFixed(2))))}
                            className="p-1 px-2.5 rounded bg-neutral-900 border border-white/5 text-slate-350 hover:text-white text-xs font-mono font-bold cursor-pointer"
                          >
                            -
                          </button>
                          <input
                            type="range"
                            min="1.0"
                            max="4.0"
                            step="0.05"
                            value={baseImgZoom}
                            onChange={(e) => setBaseImgZoom(parseFloat(e.target.value))}
                            className="flex-1 accent-[#F59E0B] cursor-pointer h-1 bg-[#1A1A1A] rounded-lg"
                          />
                          <button 
                            onClick={() => setBaseImgZoom(Math.min(4.0, parseFloat((baseImgZoom + 0.1).toFixed(2))))}
                            className="p-1 px-2.5 rounded bg-neutral-900 border border-white/5 text-slate-350 hover:text-white text-xs font-mono font-bold cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Pan X */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10.5px] font-mono">
                          <span className="text-slate-400 uppercase">PHOTO SHIFT X (PAN)</span>
                          <span className="text-white font-bold">{baseImgPanX}%</span>
                        </div>
                        <input
                          type="range"
                          min="-200"
                          max="200"
                          value={baseImgPanX}
                          onChange={(e) => setBaseImgPanX(parseInt(e.target.value))}
                          className="w-full accent-[#F59E0B] cursor-pointer h-1 bg-[#1A1A1A] rounded-lg"
                        />
                      </div>

                      {/* Pan Y */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10.5px] font-mono">
                          <span className="text-slate-400 uppercase">PHOTO SHIFT Y (PAN)</span>
                          <span className="text-white font-bold">{baseImgPanY}%</span>
                        </div>
                        <input
                          type="range"
                          min="-200"
                          max="200"
                          value={baseImgPanY}
                          onChange={(e) => setBaseImgPanY(parseInt(e.target.value))}
                          className="w-full accent-[#F59E0B] cursor-pointer h-1 bg-[#1A1A1A] rounded-lg"
                        />
                      </div>
                    </div>
                  )}

                  {/* Optional Glow controller */}
                  <div className="pt-2 border-t border-white/5 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={enableGlow}
                          onChange={(e) => setEnableGlow(e.target.checked)}
                          className="rounded border-white/10 text-amber-500 focus:ring-0 cursor-pointer"
                        />
                        <span>Enable Butterfly Halo Glow</span>
                      </label>
                      <div 
                        className="w-4 h-4 rounded-full border border-white/20 transition-all"
                        style={{ backgroundColor: glowColor, boxShadow: `0 0 10px ${glowColor}` }}
                      />
                    </div>

                    {enableGlow && (
                      <div className="space-y-1 bg-black/30 p-2.5 rounded-lg border border-white/5">
                        <div className="flex justify-between text-[9.5px] font-mono">
                          <span className="text-slate-500 uppercase">GLOW INTENSITY</span>
                          <span className="text-slate-300 font-bold">{glowSize}%</span>
                        </div>
                        <input
                          type="range"
                          min="5"
                          max="35"
                          value={glowSize}
                          onChange={(e) => setGlowSize(parseInt(e.target.value))}
                          className="w-full accent-[#F59E0B] cursor-pointer h-1 bg-[#1A1A1A] rounded-lg"
                        />
                        <div className="flex gap-1.5 mt-2 overflow-x-auto justify-between pt-1">
                          {['#F59E0B', '#34d399', '#c084fc', '#10b981', '#fb923c', '#ffffff'].map(c => (
                            <button
                              key={c}
                              onClick={() => setGlowColor(c)}
                              className={`w-4 h-4 rounded-full cursor-pointer transition border ${
                                glowColor === c ? 'border-white scale-110' : 'border-white/10'
                              }`}
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 3D PFP Ring controller */}
                  <div className="pt-2 border-t border-white/5 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={enablePfpRing}
                          onChange={(e) => setEnablePfpRing(e.target.checked)}
                          className="rounded border-white/10 text-amber-500 focus:ring-0 cursor-pointer"
                        />
                        <span>Enable Glowing 3D PFP Ring</span>
                      </label>
                      <div 
                        className="w-4 h-4 rounded-full border border-white/20 transition-all"
                        style={{ backgroundColor: pfpRingColor, boxShadow: `0 0 10px ${pfpRingColor}` }}
                      />
                    </div>

                    {enablePfpRing && (
                      <div className="space-y-3 bg-black/30 p-2.5 rounded-lg border border-white/5">
                        {/* Diameter */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[9.5px] font-mono">
                            <span className="text-slate-500 uppercase">RING DIAMETER (X FIT)</span>
                            <span className="text-slate-300 font-bold">{pfpRingDiameter}%</span>
                          </div>
                          <input
                            type="range"
                            min="50"
                            max="100"
                            value={pfpRingDiameter}
                            onChange={(e) => setPfpRingDiameter(parseInt(e.target.value))}
                            className="w-full accent-[#F59E0B] cursor-pointer h-1 bg-[#1A1A1A] rounded-lg"
                          />
                        </div>

                        {/* Thickness */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[9.5px] font-mono">
                            <span className="text-slate-500 uppercase">RING THICKNESS</span>
                            <span className="text-slate-300 font-bold">{(pfpRingThickness / 10).toFixed(1)}px</span>
                          </div>
                          <input
                            type="range"
                            min="4"
                            max="32"
                            value={pfpRingThickness}
                            onChange={(e) => setPfpRingThickness(parseInt(e.target.value))}
                            className="w-full accent-[#F59E0B] cursor-pointer h-1 bg-[#1A1A1A] rounded-lg"
                          />
                        </div>

                        {/* Glow intensity */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[9.5px] font-mono">
                            <span className="text-slate-500 uppercase">GLOW INTENSITY</span>
                            <span className="text-slate-300 font-bold">{pfpRingGlow}%</span>
                          </div>
                          <input
                            type="range"
                            min="2"
                            max="35"
                            value={pfpRingGlow}
                            onChange={(e) => setPfpRingGlow(parseInt(e.target.value))}
                            className="w-full accent-[#F59E0B] cursor-pointer h-1 bg-[#1A1A1A] rounded-lg"
                          />
                        </div>

                        {/* Color preset selector */}
                        <div className="space-y-1 pt-1">
                          <span className="text-[8.5px] font-mono text-slate-500 uppercase">RING COLOR</span>
                          <div className="flex gap-1.5 overflow-x-auto justify-between pt-0.5">
                            {['#F59E0B', '#fb923c', '#ff4500', '#34d399', '#c084fc', '#ffffff'].map(c => (
                              <button
                                key={c}
                                onClick={() => setPfpRingColor(c)}
                                className={`w-4 h-4 rounded-full cursor-pointer transition border ${
                                  pfpRingColor === c ? 'border-white scale-110' : 'border-[#111]'
                                }`}
                                style={{ backgroundColor: c }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Auto-remove white background tool */}
                  <div className="pt-1.5">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={keyOutBackground}
                        onChange={(e) => setKeyOutBackground(e.target.checked)}
                        className="rounded border-white/10 text-[#F59E0B] focus:ring-0"
                      />
                      <span>Key Out White Backgrounds (For PFP uploads)</span>
                    </label>
                    <p className="text-[9px] font-mono text-slate-500 mt-1 leading-normal pl-5">
                      Check this option if your uploaded custom image has an solid white background you wish to transparentify.
                    </p>
                  </div>

                  {/* Optional Badge picker */}
                  <div className="pt-3 border-t border-white/5 space-y-2">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">CHOOSE BRAND BADGE OVERLAY</span>
                    <div className="grid grid-cols-2 gap-1.5 text-xs">
                      {[
                        { id: 'none', label: 'No Badge' },
                        { id: 'holder', label: '🦋 Karma Holder' },
                        { id: 'genesis', label: '✦ Genesis Pill' },
                        { id: 'verified', label: '✓ Karma Verified' },
                      ].map(b => (
                        <button
                          key={b.id}
                          onClick={() => setSelectedBadge(b.id as any)}
                          className={`py-1.5 px-2.5 rounded-lg border text-left font-sans font-bold text-[10px] uppercase tracking-wider transition ${
                            selectedBadge === b.id 
                              ? 'bg-neutral-800 border-[#F59E0B]/50 text-[#F59E0B]' 
                              : 'bg-black/20 border-white/5 text-slate-400 hover:text-white'
                          }`}
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              /* Box 3: SWARM Theme Controls */
              <div className="col-span-12 lg:col-span-5 bg-[#111111]/90 border border-amber-500/25 rounded-2xl p-5 space-y-6">
                <div className="border-b border-white/5 pb-3">
                  <span className="text-[10px] font-mono text-[#F59E0B] uppercase tracking-[0.15em] font-extrabold flex items-center gap-1.5 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-ping" />
                    <span>SWARM CAMPAIGN</span>
                  </span>
                  <h3 className="text-sm font-sans font-black text-white tracking-tight">
                    SWARM Orange Background Tool
                  </h3>
                  <p className="text-slate-400 text-[11px] mt-1.5 leading-relaxed">
                    Convert any profile image or uploaded NFT into an official orange SWARM campaign PFP. This tool fills the background with the vibrant orange branding, keys out solid white or light backdrops, and layers your unique Karma Butterfly badge beautifully.
                  </p>
                </div>

                {/* SWARM Toggle Card */}
                <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-xl space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white block">SWARM Background Color</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Toggle solid brand orange</span>
                    </div>
                    <button
                      onClick={() => {
                        const nextVal = !enableSwarmBg;
                        setEnableSwarmBg(nextVal);
                        if (nextVal) {
                          // Automatically set up best settings for swarm mode
                          setKeyOutBackground(true);
                          setPfpRingColor('#FFFFFF'); // white contrast ring
                          setSelectedBadge('holder');
                        }
                      }}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-250 ease-in-out focus:outline-none ${
                        enableSwarmBg ? 'bg-[#F59E0B]' : 'bg-[#222223]'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-250 ease-in-out ${
                          enableSwarmBg ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 bg-black/40 p-2.5 rounded-lg border border-white/5">
                    <div className="w-5 h-5 rounded bg-[#F59E0B] shrink-0 border border-white/10" />
                    <div className="text-[10px] font-mono text-slate-300">
                      Active Shade: <span className="text-[#F59E0B] font-bold">#F59E0B (Swarm Orange)</span>
                    </div>
                  </div>
                </div>

                {/* Intelligent Key out settings for PFP/NFT */}
                <div className="space-y-4">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">INTELLIGENT BACKGROUND CROPPING</span>
                  
                  <div className="bg-black/25 p-4 rounded-xl border border-white/5 space-y-4">
                    {/* Toggle Backdrop Crop */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/5">
                      <div>
                        <span className="text-xs font-bold text-white block">Backdrop Removal</span>
                        <span className="text-[9.5px] text-slate-400 block mt-0.5">Crop original background out</span>
                      </div>
                      <button
                        onClick={() => setKeyOutBackground(!keyOutBackground)}
                        className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-250 ease-in-out focus:outline-none ${
                          keyOutBackground ? 'bg-[#F59E0B]' : 'bg-[#222223]'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-250 ease-in-out ${
                            keyOutBackground ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    {keyOutBackground && (
                      <div className="space-y-4 pt-1">
                        {/* 1. Backdrop Crop Mode */}
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Crop Detection Mode</span>
                          <div className="grid grid-cols-2 gap-1.5 text-xs">
                            {[
                              { id: 'auto', label: '🪄 Auto Corner' },
                              { id: 'white', label: '⚪ Crop White' },
                              { id: 'dark', label: '⚫ Crop Dark' },
                              { id: 'chroma', label: '🎨 Color Picker' },
                            ].map(mode => (
                              <button
                                key={mode.id}
                                onClick={() => setSwarmKeyMode(mode.id as any)}
                                className={`py-2 px-2.5 rounded-lg border text-left font-sans font-bold text-[9.5px] uppercase tracking-wider transition cursor-pointer ${
                                  swarmKeyMode === mode.id 
                                    ? 'bg-neutral-800 border-[#F59E0B]/50 text-[#F59E0B]' 
                                    : 'bg-black/20 border-white/5 text-slate-400 hover:text-white'
                                }`}
                              >
                                {mode.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* 2. Custom Chroma color picker */}
                        {swarmKeyMode === 'chroma' && (
                          <div className="space-y-2 bg-black/40 p-3 rounded-lg border border-white/5">
                            <span className="text-[9.5px] font-mono text-slate-400 uppercase tracking-wider block">Target Background Color</span>
                            <div className="flex items-center gap-3">
                              <input
                                type="color"
                                value={swarmChromaColor}
                                onChange={(e) => setSwarmChromaColor(e.target.value)}
                                className="w-8 h-8 rounded border border-white/10 bg-transparent cursor-pointer"
                              />
                              <div className="flex-1">
                                <input
                                  type="text"
                                  value={swarmChromaColor}
                                  onChange={(e) => setSwarmChromaColor(e.target.value)}
                                  className="w-full bg-black/35 border border-white/5 rounded px-2.5 py-1 text-xs text-white font-mono uppercase"
                                />
                              </div>
                            </div>
                            <div className="flex gap-1 pt-1.5 overflow-x-auto">
                              {['#FFFFFF', '#000000', '#00FF00', '#0000FF', '#CCCCCC'].map(preset => (
                                <button
                                  key={preset}
                                  onClick={() => setSwarmChromaColor(preset)}
                                  className={`px-2 py-0.5 text-[8.5px] font-mono rounded border ${
                                    swarmChromaColor.toUpperCase() === preset.toUpperCase()
                                      ? 'bg-neutral-800 border-white/40 text-white'
                                      : 'bg-black/20 border-white/5 text-slate-500 hover:text-slate-300'
                                  }`}
                                >
                                  {preset === '#FFFFFF' ? 'White' : preset === '#000000' ? 'Black' : preset === '#00FF00' ? 'Green' : preset === '#0000FF' ? 'Blue' : 'Grey'}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* 3. Crop Intensity (Tolerance) Slider */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-[10px] font-mono">
                            <span className="text-slate-400 uppercase">Crop Sensitivity (Tolerance)</span>
                            <span className="text-[#F59E0B] font-bold">{swarmTolerance}</span>
                          </div>
                          <input
                            type="range"
                            min="5"
                            max={swarmKeyMode === 'white' || swarmKeyMode === 'dark' ? "250" : "180"}
                            value={swarmTolerance}
                            onChange={(e) => setSwarmTolerance(parseInt(e.target.value))}
                            className="w-full accent-[#F59E0B] cursor-pointer h-1 bg-[#1A1A1A] rounded-lg"
                          />
                          <p className="text-[9px] text-slate-500 font-mono leading-tight pt-1">
                            {swarmKeyMode === 'auto' && "Increase to remove background shades similar to the corners. Decrease to preserve details."}
                            {swarmKeyMode === 'white' && "Higher sensitivity cuts out darker shades of white and light greys."}
                            {swarmKeyMode === 'dark' && "Higher sensitivity cuts out lighter shades of black and dark greys."}
                            {swarmKeyMode === 'chroma' && "Adjust similarity check for custom backdrop color."}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Ring color selector specifically styled for Swarm */}
                  <div className="space-y-2 bg-[#1A1A1A]/40 p-3 rounded-xl border border-white/5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-300 flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={enablePfpRing}
                          onChange={(e) => setEnablePfpRing(e.target.checked)}
                          className="rounded border-white/10 text-[#F59E0B] focus:ring-0 cursor-pointer"
                        />
                        <span>Glowing Ring Framing</span>
                      </label>
                      {enablePfpRing && (
                        <div 
                          className="w-3.5 h-3.5 rounded-full border border-white/20"
                          style={{ backgroundColor: pfpRingColor }}
                        />
                      )}
                    </div>
                    {enablePfpRing && (
                      <div className="grid grid-cols-5 gap-1.5 pt-1.5">
                        {['#FFFFFF', '#F59E0B', '#000000', '#fb923c', '#34d399'].map(c => (
                          <button
                            key={c}
                            onClick={() => setPfpRingColor(c)}
                            className={`py-1 text-[9px] font-mono rounded border text-center font-bold uppercase transition cursor-pointer ${
                              pfpRingColor === c ? 'bg-neutral-800 border-white/50 text-white' : 'bg-black/20 border-white/5 text-slate-400 hover:text-white'
                            }`}
                          >
                            {c === '#FFFFFF' ? 'White' : c === '#F59E0B' ? 'Orange' : c === '#000000' ? 'Black' : c === '#fb923c' ? 'Amber' : 'Teal'}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Easy Quick Actions info */}
                <div className="text-[10px] font-mono text-slate-500 leading-relaxed bg-[#1A1A1A]/40 p-3 rounded-xl border border-white/5">
                  <span className="text-[#F59E0B] font-bold block mb-1">💡 QUICK WORKFLOW:</span>
                  1. Go to the "Attach Canvas File" panel on the left.<br />
                  2. Upload your current profile picture, avatar, or NFT.<br />
                  3. Turn on the "SWARM Background Color" toggle.<br />
                  4. Your avatar background turns orange! Adjust positioning and download!
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Creations Library Tab */
          <div className="bg-[#111111]/90 border border-white/10 rounded-2xl p-6 min-h-[460px]">
            {savedCreations.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {savedCreations.map((item) => (
                  <div 
                    key={item.id} 
                    className="group bg-[#161617] border border-white/5 rounded-xl overflow-hidden relative shadow-md hover:border-amber-500/30 transition-all duration-300"
                  >
                    <div className="aspect-square bg-slate-900 relative">
                      <img src={item.dataUrl} alt={item.name} className="w-full h-full object-cover" />
                      
                      {/* Action hover overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                        <button
                          onClick={(e) => removeSavedCreation(item.id, e)}
                          className="self-end p-1 rounded bg-rose-500/80 text-white hover:bg-rose-500 transition cursor-pointer"
                          title="Delete from library"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href={item.dataUrl}
                          download={`${item.name}_download.png`}
                          className="w-full text-center bg-[#F59E0B] text-black rounded py-1 text-[9px] font-mono uppercase tracking-wider font-extrabold flex items-center justify-center gap-1 transition shrink-0"
                        >
                          <Download className="w-2.5 h-2.5" /> Png
                        </a>
                      </div>
                    </div>
                    
                    <div className="p-2 bg-neutral-900/60 flex flex-col gap-0.5">
                      <p className="text-[10px] font-sans font-bold text-white truncate leading-tight">{item.name}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-[8px] font-mono text-slate-500 block">{item.timestamp}</span>
                        <span className="text-[8px] font-mono text-[#F59E0B] font-bold">SAVED</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 space-y-3">
                <div className="w-16 h-16 bg-neutral-900 border border-white/5 flex items-center justify-center rounded-2xl text-3xl mx-auto shadow-inner">
                  📁
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm tracking-tight uppercase">Creations Ledger Empty</h4>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto mt-1">
                    Your generated and saved profile badges will show up here. Open the Generator to compose your first image preset!
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('editor')}
                  className="py-1.5 px-4 bg-transparent border border-white/10 hover:border-amber-500/30 text-white rounded-lg text-[10px] uppercase font-mono tracking-wider cursor-pointer"
                >
                  Generate Badge Now
                </button>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Social crop export modal with quick steps */}
      {socialModalPreset.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm transition-all">
          <div className="w-full max-w-md bg-[#161617] border border-amber-500/40 rounded-2xl p-6 shadow-[0_20px_50px_rgba(245,158,11,0.2)] relative space-y-4">
            
            <button
              onClick={() => setSocialModalPreset({ open: false, dataUrl: null, platform: 'x-pfp' })}
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <span className="text-[8.5px] font-mono text-[#F59E0B] uppercase tracking-[0.2em] font-extrabold block">Platform crop engine</span>
              <h4 className="text-base font-sans font-black text-white tracking-tight mt-1 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                <span>
                  {socialModalPreset.platform === 'x-pfp' && 'X (Twitter) Profile Layout'}
                  {socialModalPreset.platform === 'x-banner' && 'X (Twitter) Banner Aspect Ratio'}
                  {socialModalPreset.platform === 'tg' && 'Telegram Profile Identity'}
                  {socialModalPreset.platform === 'discord' && 'Discord Avatar Format'}
                </span>
              </h4>
            </div>

            <div className="bg-[#050505] p-3 rounded-xl border border-white/5 flex items-center justify-center">
              <div 
                className={`overflow-hidden max-w-[280px] border border-white/15 bg-slate-950 ${
                  socialModalPreset.platform === 'x-banner' ? 'w-full aspect-[3/1]' : 'aspect-square rounded-full'
                }`}
              >
                {socialModalPreset.dataUrl && (
                  <img 
                    src={socialModalPreset.dataUrl} 
                    alt="Social preset outline" 
                    className="w-full h-full object-cover" 
                  />
                )}
              </div>
            </div>

            {/* Instruction steps */}
            <div className="text-left space-y-1 bg-black/30 p-3 rounded-lg border border-white/5">
              <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block font-extrabold">INSTRUCTIONS</span>
              <p className="text-[10px] text-slate-350 leading-relaxed font-sans">
                {socialModalPreset.platform === 'x-banner' 
                  ? 'Your landscape crop has been fit to 1500x500 pixels. Use this banner on your Twitter page to represent the swarm campaign.'
                  : 'Your profile avatar has been compiled and centered. Download this file to set it directly as your new crypto avatar.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <button
                onClick={() => setSocialModalPreset({ open: false, dataUrl: null, platform: 'x-pfp' })}
                className="py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white border border-white/5 font-sans font-bold uppercase tracking-wider rounded-xl transition text-center cursor-pointer"
              >
                Cancel
              </button>
              {socialModalPreset.dataUrl && (
                <a
                  href={socialModalPreset.dataUrl}
                  download={`karma_${socialModalPreset.platform}_export.png`}
                  onClick={() => setSocialModalPreset({ open: false, dataUrl: null, platform: 'x-pfp' })}
                  className="py-2.5 bg-[#F59E0B] hover:bg-amber-400 text-black font-sans font-black uppercase tracking-widest rounded-xl transition text-center flex items-center justify-center gap-1 cursor-pointer font-extrabold"
                >
                  <Download className="w-3.5 h-3.5" /> Save Image
                </a>
              )}
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
