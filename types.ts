export enum ArtStyle {
  CYBERPUNK = 'Cyberpunk',
  POLLOCK = 'Jackson Pollock',
  JOKER = 'The Joker',
  MINIMALIST = 'Minimalist',
}

export interface ArtStyleConfig {
  id: ArtStyle;
  label: string;
  description: string;
  // Detailed artistic dimensions
  lighting: string;
  palette: string;
  vibe: string;
  texture: string;
  color: string; // UI gradient color
}

export interface ProcessingState {
  isGenerating: boolean;
  progress: number; // 0-100
  error: string | null;
}

export interface AppState {
  originalImage: string | null; // Base64
  generatedImage: string | null; // Base64
  selectedStyle: ArtStyle;
  intensity: number; // 0-100
}