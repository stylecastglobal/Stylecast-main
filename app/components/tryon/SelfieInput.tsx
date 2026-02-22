'use client';

import { useRef } from 'react';
import { Camera, Upload, X } from 'lucide-react';

interface SelfieInputProps {
  prompt: string;
  onSelfieReady: (url: string) => void;
  onClose: () => void;
}

export default function SelfieInput({ prompt, onSelfieReady, onClose }: SelfieInputProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onSelfieReady(url);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full">
        <X className="w-5 h-5" />
      </button>

      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
        <Camera className="w-10 h-10 text-gray-400" />
      </div>

      <div className="text-center">
        <h3 className="text-xl font-bold text-[#111] mb-2">Take a Selfie</h3>
        <p className="text-sm text-gray-500 max-w-xs">{prompt}</p>
      </div>

      <div className="flex gap-3 w-full max-w-xs">
        <button
          onClick={() => fileRef.current?.click()}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-black text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-all"
        >
          <Upload className="w-4 h-4" />
          Upload
        </button>
        <button
          onClick={() => cameraRef.current?.click()}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-xl text-sm font-bold text-[#111] hover:bg-gray-50 transition-all"
        >
          <Camera className="w-4 h-4" />
          Take Photo
        </button>
      </div>

      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      <input ref={cameraRef} type="file" accept="image/*" capture="user" onChange={handleFile} className="hidden" />
    </div>
  );
}
