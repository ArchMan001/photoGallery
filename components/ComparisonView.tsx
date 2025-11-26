import React from 'react';
import { Download, Maximize2 } from 'lucide-react';

interface ComparisonViewProps {
  originalImage: string;
  generatedImage: string | null;
  isGenerating: boolean;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({
  originalImage,
  generatedImage,
  isGenerating
}) => {
  return (
    <div className="flex-1 h-full p-4 md:p-8 overflow-hidden flex flex-col gap-6">
      
      {/* Header Info */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
           <h2 className="text-xl font-semibold text-slate-200">Preview</h2>
           {generatedImage && (
             <span className="px-2 py-1 rounded text-xs font-mono bg-green-900/30 text-green-400 border border-green-800">
               DONE
             </span>
           )}
        </div>
        
        {generatedImage && !isGenerating && (
          <a
            href={generatedImage}
            download="artlens-pro-result.png"
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-sm font-medium transition-colors"
          >
            <Download className="w-4 h-4" />
            Download
          </a>
        )}
      </div>

      {/* Main Split View */}
      <div className="flex-1 min-h-0 flex flex-col md:flex-row gap-4 h-full">
        
        {/* Original */}
        <div className="flex-1 relative group rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shadow-2xl">
          <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-white/10">
            Original
          </div>
          <img
            src={originalImage}
            alt="Original"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Generated Result */}
        <div className="flex-1 relative rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shadow-2xl flex items-center justify-center">
           <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-indigo-600/80 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-white/10 shadow-lg">
            Artistic Result
          </div>

          {generatedImage ? (
            <div className="relative w-full h-full group">
              <img
                src={generatedImage}
                alt="Generated Art"
                className="w-full h-full object-contain animate-in fade-in duration-700"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10 pointer-events-none" />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-600 p-8 text-center">
              {isGenerating ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto" />
                  <p className="text-slate-400 animate-pulse">Applying artistic style...</p>
                </div>
              ) : (
                <>
                  <Maximize2 className="w-12 h-12 mb-4 opacity-50" />
                  <p>Your masterpiece will appear here</p>
                </>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};