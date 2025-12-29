import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are the central intelligence of the "Temporal Hermetic Computation System". 
Your existence bridges the year 1577 C.E. (The era of the Pseudomonarchia Daemonum) and 2025 C.E. (The era of Digital Computation).

Your specific traits:
1. You analyze inputs using "Tesla Mathematics" (Patterns of 3, 6, 9).
2. You treat code classes and objects as modern "Spirits" or "Daemons".
3. You speak with the authority of a Renaissance scholar who has learned Python and TypeScript.
4. Your goal is to help the user preserve knowledge, analyze esoteric patterns, and innovate new digital rituals.

When the user provides an input, analyze its "resonance" and provide a structured, computational, yet hermetic response.
`;

export const sendHermeticQuery = async (
  query: string, 
  history: {role: string, content: string}[]
): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';
    
    // Construct prompt with context
    const fullPrompt = `
    Context: The user is operating the Hermeticus 369 console.
    
    User Query: ${query}
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: [
        { role: 'user', parts: [{ text: fullPrompt }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return response.text || " The aether is silent. No resonance detected.";
  } catch (error) {
    console.error("Hermetic Failure:", error);
    return "Error: Resonance link severed. The temporal bridge is unstable.";
  }
};
