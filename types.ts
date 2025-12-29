
export interface ResonanceMetrics {
  input: string;
  numericSequence: number[];
  sum: number;
  digitalRoot: number;
  isResonant: boolean; // True if root is 3, 6, or 9
  resonanceType: 'Tesla' | 'Standard' | 'Void';
}

export enum Epoch {
  RENAISSANCE = '1577_CE',
  MODERN = '2025_CE'
}

export interface OracleAnalysis {
  architect: string; // The Engineering View
  mystic: string;    // The Esoteric View
  void: string;      // The Entropic View
  divergence: number; // 0.0 to 1.0 (Variance between models)
  synthesis: string; // The computed consensus
}

export interface ChatMessage {
  role: 'user' | 'system' | 'model';
  content: string | OracleAnalysis; // Content can now be structured data
  timestamp: number;
  type?: 'text' | 'analysis';
}

export interface TemporalNode {
  id: string;
  epoch: string;
  intensity: number;
  stability: number;
}

export type ArchetypeRole = 'GIANT' | 'LEGION' | 'DRAGON';

export interface ArchetypeResult {
  name: string;
  role: string;
  resonance: number;
  seal: string;
  epoch: string;
  status: 'SLEEPING' | 'AWAKENING' | 'AWAKENED';
}

export interface AspectManifestation {
  aspect: string;
  originArchetype: ArchetypeRole;
  aspectSeal: string;
  aspectResonance: number;
}

export interface GrandRitualReport {
  masterSeal: string;
  combinedResonance: number;
  timestamp: string;
  results: Record<ArchetypeRole, ArchetypeResult>;
}

export interface GrimoireBlock {
  index: number;
  timestamp: number;
  previousHash: string;
  hash: string;
  data: OracleAnalysis;
  sealType: 'GENESIS' | 'HERMETIC_SEAL';
}
