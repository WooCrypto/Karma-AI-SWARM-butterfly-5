export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  badge: 'Light' | 'Shadow' | 'Nexus';
  twitter?: string;
  github?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface RoadmapPhase {
  phase: string;
  title: string;
  timeline: string;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  milestones: string[];
}

export interface WalletAnalysis {
  address: string;
  score: number; // 0 to 100
  alignment: 'Light' | 'Shadow' | 'Nexus';
  archetype: string;
  scannedCount: number;
  lightPoints: {
    builders: number;
    teachers: number;
    helpers: number;
  };
  shadowPoints: {
    survivals: number;
    adaptations: number;
    exposures: number;
  };
  karmaLevel: number;
  butterflyId: string;
  network?: 'EVM' | 'Solana' | 'Hedera' | 'PulsePay';
}
