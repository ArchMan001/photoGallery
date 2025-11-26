import React, { useState, useCallback } from 'react';
import { ArtStyle, ProcessingState } from './types';
import { ControlPanel } from './components/ControlPanel';
import { ImageUploader } from './components/ImageUploader';
import { ComparisonView } from './components/ComparisonView';
import { generateArtisticImage } from './services/geminiService';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  
  const [selectedStyle, setSelectedStyle] = useState<ArtStyle>(ArtStyle.CYBERPUNK);
  const [intensity, setIntensity] = useState<number>(75);
  
  const [processingState, setProcessingState] = useState<ProcessingState>({
    isGenerating: false,
    progress: 0,
    error: null,
  });

  const handleImageSelected = useCallback((base64: string) => {
    setOriginalImage(base64);
    setGeneratedImage(null);
    setProcessingState(prev => ({ ...prev, error: null }));
  }, []);

  const handleReset = useCallback(() => {
    setOriginalImage(null);
    setGeneratedImage(null);
    setProcessingState({ isGenerating: false, progress: 0, error: null });
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!originalImage) return;

    setProcessingState({ isGenerating: true, progress: 10, error: null });
    
    try {
      // Small artificial delay to show starting state smoothly if API is instant
      await new Promise(resolve => setTimeout(resolve, 500)); 
      
      const resultBase64 = await generateArtisticImage(originalImage, selectedStyle, intensity);
      
      setGeneratedImage(resultBase64);
      setProcessingState({ isGenerating: false, progress: 100, error: null });
    } catch (err: any) {
      console.error(err);
      setProcessingState({ 
        isGenerating: false, 
        progress: 0, 
        error: err.message || "Failed to generate image. Please try again." 
      });
    }
  }, [originalImage, selectedStyle, intensity]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-950 text-slate-200 overflow-hidden">
      
      {/* Sidebar Control Panel */}
      <ControlPanel
        selectedStyle={selectedStyle}
        intensity={intensity}
        isGenerating={processingState.isGenerating}
        onStyleChange={setSelectedStyle}
        onIntensityChange={setIntensity}
        onGenerate={handleGenerate}
        onReset={handleReset}
        hasImage={!!originalImage}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-950 relative">
        
        {/* Error Notification */}
        {processingState.error && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-red-500/90 text-white px-6 py-3 rounded-lg shadow-xl backdrop-blur-md flex items-center animate-in slide-in-from-top-4">
            <span>{processingState.error}</span>
            <button 
              onClick={() => setProcessingState(prev => ({...prev, error: null}))}
              className="ml-4 hover:bg-white/20 rounded p-1"
            >
              ✕
            </button>
          </div>
        )}

        {/* Dynamic View Switch: Uploader or Comparison */}
        {!originalImage ? (
          <div className="flex-1 p-8 md:p-16 flex items-center justify-center">
            <div className="w-full max-w-2xl h-[500px]">
              <ImageUploader onImageSelected={handleImageSelected} />
            </div>
          </div>
        ) : (
          <ComparisonView
            originalImage={originalImage}
            generatedImage={generatedImage}
            isGenerating={processingState.isGenerating}
          />
        )}
      </main>
    </div>
  );
};

export default App;