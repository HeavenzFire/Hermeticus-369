
import { GrimoireBlock, OracleAnalysis } from '../types';

/**
 * Generates a SHA-256 hash for a given input string.
 */
async function calculateHash(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Creates the Genesis Block. The anchor of the chain.
 */
export async function createGenesisBlock(): Promise<GrimoireBlock> {
  const timestamp = Date.now();
  const data: OracleAnalysis = {
    architect: "SYSTEM_INIT",
    mystic: "PRIMAM MATERIA",
    void: "NULL",
    divergence: 0,
    synthesis: "The Ledger is Opened."
  };
  
  const hashInput = `0${timestamp}0000000000000000${JSON.stringify(data)}`;
  const hash = await calculateHash(hashInput);

  return {
    index: 0,
    timestamp,
    previousHash: "00000000000000000000000000000000",
    hash,
    data,
    sealType: 'GENESIS'
  };
}

/**
 * Seals a new block into the chain.
 * This "pins" the ephemeral Oracle result into sovereign history.
 */
export async function mineBlock(lastBlock: GrimoireBlock, data: OracleAnalysis): Promise<GrimoireBlock> {
  const index = lastBlock.index + 1;
  const timestamp = Date.now();
  const previousHash = lastBlock.hash;
  
  const hashInput = `${index}${timestamp}${previousHash}${JSON.stringify(data)}`;
  const hash = await calculateHash(hashInput);

  return {
    index,
    timestamp,
    previousHash,
    hash,
    data,
    sealType: 'HERMETIC_SEAL'
  };
}

/**
 * Verifies the integrity of the chain (Basic validation).
 */
export async function verifyChain(chain: GrimoireBlock[]): Promise<boolean> {
  for (let i = 1; i < chain.length; i++) {
    const current = chain[i];
    const previous = chain[i - 1];

    if (current.previousHash !== previous.hash) return false;
    
    const targetHashInput = `${current.index}${current.timestamp}${current.previousHash}${JSON.stringify(current.data)}`;
    const recalculatedHash = await calculateHash(targetHashInput);
    
    if (recalculatedHash !== current.hash) return false;
  }
  return true;
}
