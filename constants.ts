import { ArtStyle, ArtStyleConfig } from './types';

export const ART_STYLES: Record<ArtStyle, ArtStyleConfig> = {
  [ArtStyle.CYBERPUNK]: {
    id: ArtStyle.CYBERPUNK,
    label: 'Cyberpunk',
    description: 'Neon lights, futuristic tech, high contrast, dystopic atmosphere.',
    lighting: 'Cinematic neon side-lighting, volumetric fog, bioluminescent environmental glow, harsh artificial highlights',
    palette: 'Deep cyan and magenta complementary colors, crushed blacks, iridescent chrome reflections',
    vibe: 'Dystopian, high-tech low-life, rainy urban night, futuristic melancholia',
    texture: 'Wet pavement reflections, glossy synthetic surfaces, digital noise artifacts, rain-slicked metal',
    color: 'from-pink-500 to-cyan-500'
  },
  [ArtStyle.POLLOCK]: {
    id: ArtStyle.POLLOCK,
    label: 'Jackson Pollock',
    description: 'Abstract expressionism, chaotic drip painting, energetic splashes.',
    lighting: 'Flat, even studio lighting to emphasize texture and depth of paint layers',
    palette: 'Chaotic mix of industrial enamels, beige canvas raw background, vibrant primary splatters',
    vibe: 'Manic energy, non-representational, subconscious expression, rhythmic chaos',
    texture: 'Thick impasto, poured paint, complex fractal patterns, layered drips, visceral physical strokes',
    color: 'from-yellow-500 to-red-600'
  },
  [ArtStyle.JOKER]: {
    id: ArtStyle.JOKER,
    label: 'The Joker',
    description: 'Manic energy, vibrant green and purple, chaotic psychological vibe.',
    lighting: 'Dramatic theatrical spotlighting, high-contrast chiaroscuro, unsettling shadows, harsh overhead fluorescent',
    palette: 'Sickly green and royal purple, washed-out skin tones, desaturated urban greys',
    vibe: 'Psychological thriller, manic, distorted reality, society in decay, unstable and tense',
    texture: 'Coarse 35mm film grain, gritty cinematic realism, sweat and grease, smeared makeup texture',
    color: 'from-purple-600 to-green-500'
  },
  [ArtStyle.MINIMALIST]: {
    id: ArtStyle.MINIMALIST,
    label: 'Minimalist',
    description: 'Clean lines, flat colors, negative space, simple geometry.',
    lighting: 'Soft diffused global illumination, minimal shadows, high-key exposure',
    palette: 'Monochromatic or pastel duotone, matte finish, pure white negative space',
    vibe: 'Serene, organized, reductionist, clarity, modern elegance',
    texture: 'Smooth vector-like surfaces, lack of noise, flat paper texture, crisp edges',
    color: 'from-gray-200 to-gray-400'
  }
};