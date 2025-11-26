import React, { useCallback, useState } from 'react';
import { Upload, FileImage, AlertCircle } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelected: (base64: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.match('image.*')) {
      setError('Please upload a valid image file (JPG or PNG).');
      return;
    }
    
    // Simple size check (optional, e.g., < 4MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size too large. Please keep it under 10MB.');
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onImageSelected(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  }, [onImageSelected]);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }, [handleFile]);

  return (
    <div
      className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer h-full min-h-[400px]
        ${isDragging 
          ? 'border-indigo-500 bg-indigo-500/10' 
          : 'border-slate-700 hover:border-slate-500 bg-slate-800/50 hover:bg-slate-800'
        }`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={() => document.getElementById('file-upload')?.click()}
    >
      <input
        id="file-upload"
        type="file"
        accept="image/png, image/jpeg"
        className="hidden"
        onChange={onInputChange}
      />
      
      <div className="w-16 h-16 mb-4 rounded-full bg-slate-700 flex items-center justify-center">
        {isDragging ? (
          <FileImage className="w-8 h-8 text-indigo-400" />
        ) : (
          <Upload className="w-8 h-8 text-slate-400" />
        )}
      </div>

      <h3 className="text-xl font-semibold text-slate-200 mb-2">
        {isDragging ? 'Drop it here!' : 'Upload a photo'}
      </h3>
      <p className="text-slate-400 max-w-xs mx-auto">
        Drag & drop or click to select. Supports JPG and PNG.
      </p>

      {error && (
        <div className="mt-4 flex items-center gap-2 text-red-400 text-sm bg-red-900/20 px-4 py-2 rounded-lg">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  );
};