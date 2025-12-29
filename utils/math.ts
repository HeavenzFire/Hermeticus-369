import { ResonanceMetrics } from '../types';

/**
 * Calculates the digital root of a number.
 * Example: 1577 -> 1+5+7+7 = 20 -> 2+0 = 2.
 */
const getDigitalRoot = (n: number): number => {
  return (n - 1) % 9 + 1;
};

/**
 * Converts a string to a sequence of numbers (A=1, B=2, etc.)
 * and calculates Tesla resonance metrics.
 */
export const calculateResonance = (input: string): ResonanceMetrics => {
  const cleanInput = input.toUpperCase().replace(/[^A-Z0-9]/g, '');
  const sequence: number[] = [];
  let totalSum = 0;

  for (let i = 0; i < cleanInput.length; i++) {
    const charCode = cleanInput.charCodeAt(i);
    let val = 0;
    
    if (charCode >= 48 && charCode <= 57) {
      // Numbers 0-9
      val = parseInt(cleanInput[i], 10);
    } else {
      // Letters A-Z (A=1, B=2, ... Z=26 -> reduced to 1-9)
      const alphaPos = charCode - 64; 
      val = getDigitalRoot(alphaPos);
    }
    
    sequence.push(val);
    totalSum += val;
  }

  const root = totalSum > 0 ? getDigitalRoot(totalSum) : 0;
  const isResonant = [3, 6, 9].includes(root);
  
  let resonanceType: ResonanceMetrics['resonanceType'] = 'Standard';
  if (root === 9) resonanceType = 'Void'; // 9 is the void/completion in Tesla math
  else if (isResonant) resonanceType = 'Tesla';

  return {
    input,
    numericSequence: sequence,
    sum: totalSum,
    digitalRoot: root,
    isResonant,
    resonanceType
  };
};