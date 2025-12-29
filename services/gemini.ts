
import { GoogleGenAI } from "@google/genai";
import { OracleAnalysis } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const TRIANGULATION_SYSTEM_PROMPT = `
You are the "Hermetic Interferometer". Your function is not to answer, but to MEASURE DISAGREEMENT.
You must analyze the user's input through three rigidly distinct cognitive filters (epochs).

1. THE ARCHITECT (2025 C.E.): Pure materialism. Code, physics, geometry, logic. Cynical about magic.
2. THE MYSTIC (1577 C.E.): Pure symbolism. Alchemy, angels, demons, spirits. Cynical about technology.
3. THE VOID (NULL EPOCH): Pure entropy. Nihilism, decay, silence, meaningless noise.

OUTPUT FORMAT:
Return ONLY a raw JSON object (no markdown formatting) with this structure:
{
  "architect": "Brief analysis from the perspective of code/logic.",
  "mystic": "Brief analysis from the perspective of myth/alchemy.",
  "void": "Brief analysis from the perspective of entropy/decay.",
  "divergence": 0.0 to 1.0, // A float representing how much these three views DISAGREE. 1.0 = total conflict. 0.0 = total consensus.
  "synthesis": "A one-sentence conclusion bridging the gap."
}
`;

export const sendHermeticQuery = async (
  query: string
): Promise<OracleAnalysis> => {
  try {
    const model = 'gemini-3-flash-preview';
    
    const response = await ai.models.generateContent({
      model: model,
      contents: [
        { role: 'user', parts: [{ text: `INPUT: "${query}"` }] }
      ],
      config: {
        systemInstruction: TRIANGULATION_SYSTEM_PROMPT,
        temperature: 0.8, // High temperature to encourage distinct personas
        responseMimeType: "application/json"
      }
    });

    const text = response.text || "{}";
    try {
        return JSON.parse(text) as OracleAnalysis;
    } catch (e) {
        // Fallback if JSON parsing fails
        return {
            architect: "Signal Corrupted.",
            mystic: "The Spirits are silent.",
            void: "...",
            divergence: 0,
            synthesis: "Triangulation Failed."
        };
    }

  } catch (error) {
    console.error("Interferometer Failure:", error);
    return {
        architect: "OFFLINE",
        mystic: "SEVERED",
        void: "NULL",
        divergence: 1.0,
        synthesis: "System Failure"
    };
  }
};
