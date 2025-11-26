import { GoogleGenAI } from "@google/genai";
import { ArtStyle, ArtStyleConfig } from "../types";
import { ART_STYLES } from "../constants";

const extractBase64Data = (dataUrl: string): string => {
  return dataUrl.split(',')[1] || dataUrl;
};

const extractMimeType = (dataUrl: string): string => {
  const match = dataUrl.match(/^data:(.*);base64,/);
  return match ? match[1] : 'image/jpeg';
};

/**
 * Constructs a professional-grade prompt based on the style definition and intensity.
 * This is exposed so the UI can show a preview.
 */
export const constructPrompt = (style: ArtStyle, intensity: number): string => {
  const config = ART_STYLES[style];
  
  const intensityMap = (val: number) => {
    if (val < 30) return "subtle influence, retaining original structure";
    if (val < 70) return "balanced transformation";
    return "overwhelming, complete stylistic overhaul";
  };

  return `
Professional Artistic Restyling Task:
Target Style: ${config.label}

Detailed Technical Specifications:
- Lighting: ${config.lighting}
- Color Palette: ${config.palette}
- Atmosphere/Vibe: ${config.vibe}
- Texture/Medium: ${config.texture}
- Effect Intensity: ${intensityMap(intensity)} (${intensity}%)

Instructions:
Redraw the input image following the specifications above. 
Keep the main subject composition recognizable but completely re-render it using the described artistic medium and lighting.
  `.trim();
};

export const generateArtisticImage = async (
  imageBase64: string,
  style: ArtStyle,
  intensity: number
): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API Key is missing. Please check your environment configuration.");
    }

    const ai = new GoogleGenAI({ apiKey });
    const model = 'gemini-2.5-flash-image';

    const rawBase64 = extractBase64Data(imageBase64);
    const mimeType = extractMimeType(imageBase64);

    // Use the sophisticated prompt builder
    const prompt = constructPrompt(style, intensity) + "\n\nReturn only the processed image.";

    const response = await ai.models.generateContent({
      model,
      contents: {
        parts: [
          {
            inlineData: {
              data: rawBase64,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }

    throw new Error("No image data returned from the model.");

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};