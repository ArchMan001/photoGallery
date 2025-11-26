import React, { useMemo } from 'react';
import { ArtStyle } from '../types';
import { ART_STYLES } from '../constants';
import { Wand2, Sliders, Palette, RefreshCcw, Terminal } from 'lucide-react';
import { constructPrompt } from '../services/geminiService';

interface ControlPanelProps {
  selectedStyle: ArtStyle;
  intensity: number;
  isGenerating: boolean;
  onStyleChange: (style: ArtStyle) => void;
  onIntensityChange: (val: number) => void;
  onGenerate: () => void;
  onReset: () => void;
  hasImage: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  selectedStyle,
  intensity,
  isGenerating,
  onStyleChange,
  onIntensityChange,
  onGenerate,
  onReset,
  hasImage
}) => {
  
  // Real-time calculation of the prompt for preview
  const promptPreview = useMemo(() => {
    return constructPrompt(selectedStyle, intensity);
  }, [selectedStyle, intensity]);

  return (
    <div className="bg-slate-800 border-r border-slate-700 w-full md:w-96 flex flex-col h-full overflow-hidden">
      <div className="p-6 border-b border-slate-700 shrink-0">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-2">
          <Wand2 className="text-indigo-400 w-6 h-6" />
          ArtLens Pro
        </h1>
        <p className="text-slate-400 text-sm mt-1">AI-Powered Artistic Transformation</p>
      </div>

      <div className="p-6 space-y-8 flex-1 overflow-y-auto custom-scrollbar">
        {/* Style Selector */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-200 font-medium">
            <Palette className="w-4 h-4" />
            <span>Art Style</span>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {Object.values(ART_STYLES).map((styleConfig) => (
              <button
                key={styleConfig.id}
                onClick={() => onStyleChange(styleConfig.id)}
                className={`text-left px-4 py-3 rounded-lg border transition-all duration-200 group relative overflow-hidden
                  ${selectedStyle === styleConfig.id 
                    ? 'border-indigo-500 bg-slate-700/50 shadow-lg shadow-indigo-900/20' 
                    : 'border-slate-700 hover:border-slate-600 bg-slate-800 hover:bg-slate-750'
                  }`}
              >
                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${styleConfig.color} opacity-0 transition-opacity duration-200 ${selectedStyle === styleConfig.id ? 'opacity-100' : ''}`} />
                <span className={`block font-medium ${selectedStyle === styleConfig.id ? 'text-indigo-300' : 'text-slate-300'}`}>
                  {styleConfig.label}
                </span>
                <span className="text-xs text-slate-500 mt-1 block leading-relaxed line-clamp-2">
                  {styleConfig.description}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Intensity Slider */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-slate-200 font-medium">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4" />
              <span>Intensity</span>
            </div>
            <span className="text-indigo-400 font-mono text-sm">{intensity}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={intensity}
            onChange={(e) => onIntensityChange(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400"
          />
          <div className="flex justify-between text-xs text-slate-500 font-mono">
            <span>Subtle</span>
            <span>Balanced</span>
            <span>Extreme</span>
          </div>
        </div>

        {/* Prompt Preview */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-slate-200 font-medium">
            <Terminal className="w-4 h-4" />
            <span>Prompt Logic Preview</span>
          </div>
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-3">
             <textarea 
               readOnly
               value={promptPreview}
               className="w-full h-32 bg-transparent text-xs font-mono text-slate-400 resize-none focus:outline-none custom-scrollbar"
             />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 border-t border-slate-700 space-y-3 bg-slate-800 z-10 shrink-0">
        <button
          onClick={onGenerate}
          disabled={!hasImage || isGenerating}
          className={`w-full py-3.5 rounded-lg font-semibold text-white shadow-lg flex items-center justify-center gap-2 transition-all duration-300
            ${!hasImage 
              ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
              : isGenerating 
                ? 'bg-indigo-600/80 cursor-wait' 
                : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-indigo-900/50'
            }`}
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Creating Art...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              <span>Generate</span>
            </>
          )}
        </button>
        
        {hasImage && (
          <button
            onClick={onReset}
            disabled={isGenerating}
            className="w-full py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCcw className="w-4 h-4" />
            Start Over
          </button>
        )}
      </div>
    </div>
  );
};