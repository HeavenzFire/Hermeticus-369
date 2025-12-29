import { ArchetypeRole, ArchetypeResult, AspectManifestation } from '../types';

// Configuration for the Archetypes
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

// Cryptographic Seal Generator
async function generateSealHash(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// --- CLASS DEFINITIONS ---

/**
 * Base Class representing an Esoteric Entity.
 * Acts as the blueprint for "Computational Spirits".
 */
abstract class EsotericEntity {
  role: ArchetypeRole;
  config: typeof ARCHETYPE_CONFIG[ArchetypeRole];

  constructor(role: ArchetypeRole) {
    this.role = role;
    this.config = ARCHETYPE_CONFIG[role];
  }

  async awaken(): Promise<ArchetypeResult> {
    const timestamp = new Date().toISOString();
    // Temporal resonance calculation
    const temporalFluctuation = (Math.sin(Date.now()) * 0.01); 
    const currentResonance = this.config.baseResonance + temporalFluctuation;

    // Generate unique seal
    const sealInput = `${this.config.name}-${this.config.epoch}-${timestamp}-${currentResonance}`;
    const seal = await generateSealHash(sealInput);

    return {
      name: this.config.name,
      role: this.config.description,
      resonance: currentResonance,
      seal: seal.substring(0, 16), 
      epoch: this.config.epoch,
      status: 'AWAKENED'
    };
  }

  /**
   * The core method for manifesting abilities or entities.
   * To be implemented by specific archetypes.
   */
  abstract manifestAspect(input: string): Promise<AspectManifestation>;
}

class GiantEntity extends EsotericEntity {
  async manifestAspect(aspect: string): Promise<AspectManifestation> {
    const modifier = (aspect.length * 0.001);
    const resonance = this.config.baseResonance + modifier;
    const seal = await generateSealHash(`GIANT:${aspect}:${resonance}:${Date.now()}`);
    
    return {
      aspect: aspect.toUpperCase(),
      originArchetype: 'GIANT',
      aspectSeal: seal.substring(0, 24),
      aspectResonance: resonance
    };
  }
}

class LegionEntity extends EsotericEntity {
  async manifestAspect(aspect: string): Promise<AspectManifestation> {
    const modifier = (aspect.length * 0.002);
    const resonance = this.config.baseResonance + modifier;
    const seal = await generateSealHash(`LEGION:${aspect}:${resonance}:${Date.now()}`);

    return {
      aspect: `LEGION: ${aspect.toUpperCase()}`,
      originArchetype: 'LEGION',
      aspectSeal: seal.substring(0, 24),
      aspectResonance: resonance
    };
  }
}

/**
 * The Dragon Class.
 * Specialized for Temporal Hermetic operations.
 */
class DragonEntity extends EsotericEntity {
  /**
   * Manifests a minor temporal entity bound to the Dragon's epoch.
   * @param entityName The name of the entity to summon (e.g., "Chronos", "Time-Eater")
   */
  async manifestAspect(entityName: string): Promise<AspectManifestation> {
    // Dragons resonate with time flux
    const timeFlux = Math.sin(Date.now() / 1000) * 0.15; // Higher volatility for temporal entities
    const resonance = this.config.baseResonance + timeFlux + (entityName.length * 0.005);
    
    // The seal includes the Epoch to bind the entity
    const sealInput = `DRAGON:${entityName}:${this.config.epoch}:${resonance}:${Date.now()}`;
    const aspectSeal = await generateSealHash(sealInput);

    return {
      aspect: `ENTITY: ${entityName.toUpperCase()}`,
      originArchetype: 'DRAGON',
      aspectSeal: aspectSeal.substring(0, 24),
      aspectResonance: resonance
    };
  }
}

// --- FACTORY & EXPORTS ---

function getEntity(role: ArchetypeRole): EsotericEntity {
  switch (role) {
    case 'GIANT': return new GiantEntity(role);
    case 'LEGION': return new LegionEntity(role);
    case 'DRAGON': return new DragonEntity(role);
  }
}

export async function awakenArchetype(role: ArchetypeRole): Promise<ArchetypeResult> {
  const entity = getEntity(role);
  return entity.awaken();
}

export async function manifestAspect(role: ArchetypeRole, aspect: string): Promise<AspectManifestation> {
  const entity = getEntity(role);
  return entity.manifestAspect(aspect);
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
