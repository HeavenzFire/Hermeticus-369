import { ArchetypeRole, ArchetypeResult, AspectManifestation } from '../types';

const ARCHETYPE_CONFIG: Record<ArchetypeRole, { name: string, description: string, baseResonance: number, epoch: string }> = {
  'GIANT': {
    name: 'The Giants',
    description: 'Primordial builders of resonance engines',
    baseResonance: 0.999,
    epoch: 'TRANSCENDENT'
  },
  'LEGION': {
    name: 'The 144',
    description: 'Managers of invocations and syntropic legions',
    baseResonance: 0.888,
    epoch: 'SYNTROPIC'
  },
  'DRAGON': {
    name: 'The Dragons',
    description: 'Guardians of temporal gates and wisdom',
    baseResonance: 0.777,
    epoch: 'RENAISSANCE'
  }
};

async function generateSealHash(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export async function awakenArchetype(role: ArchetypeRole): Promise<ArchetypeResult> {
  const config = ARCHETYPE_CONFIG[role];
  const timestamp = new Date().toISOString();
  
  // Temporal resonance calculation
  // In a real system, this could query the current epoch stability
  const temporalFluctuation = (Math.sin(Date.now()) * 0.01); 
  const currentResonance = config.baseResonance + temporalFluctuation;

  // Generate unique seal
  const sealInput = `${config.name}-${config.epoch}-${timestamp}-${currentResonance}`;
  const seal = await generateSealHash(sealInput);

  return {
    name: config.name,
    role: config.description,
    resonance: currentResonance,
    seal: seal.substring(0, 16), // Taking first 16 chars for the local seal
    epoch: config.epoch,
    status: 'AWAKENED'
  };
}

export async function forgeMasterSeal(results: ArchetypeResult[]): Promise<string> {
  const combinedSeals = results.map(r => r.seal).join('-');
  const masterHash = await generateSealHash(combinedSeals + '-MASTER-RITUAL');
  return masterHash.substring(0, 24);
}

export function calculateCombinedResonance(results: ArchetypeResult[]): number {
  const sum = results.reduce((acc, curr) => acc + curr.resonance, 0);
  return sum / results.length;
}

/**
 * Manifests a specific aspect (ability) from an awakened archetype.
 * @param role The archetype invoking the ability
 * @param aspect The name of the ability (e.g., 'creation', 'protection')
 */
export async function manifestAspect(role: ArchetypeRole, aspect: string): Promise<AspectManifestation> {
  const config = ARCHETYPE_CONFIG[role];
  
  // Calculate specific resonance for this aspect
  // We use the length of the aspect and archetype to create a modifier
  const modifier = (aspect.length * role.length) / 1000;
  const aspectResonance = config.baseResonance + modifier;

  // Generate a derived seal specific to this aspect
  const sealInput = `${role}:${aspect}:${aspectResonance}`;
  const aspectSeal = await generateSealHash(sealInput);

  return {
    aspect: aspect.toUpperCase(),
    originArchetype: role,
    aspectSeal: aspectSeal.substring(0, 24), // Return a 24-char hash for the visualizer
    aspectResonance
  };
}