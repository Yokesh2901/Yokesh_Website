import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundManager } from '../../utils/audio';

export const AudioController: React.FC = () => {
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());

  const handleToggle = () => {
    const unmuted = soundManager.toggleMute();
    setIsMuted(!unmuted);
  };

  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-slate-200/80 bg-white/70 hover:bg-white hover:border-slate-300 text-slate-600 hover:text-slate-900 transition-all text-xs font-mono-tech shadow-xs backdrop-blur-md"
      title={isMuted ? "Enable Sound" : "Mute Sound"}
      data-cursor={isMuted ? "SOUND:OFF" : "SOUND:ON"}
    >
      {isMuted ? (
        <>
          <VolumeX className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline text-[10px] text-slate-500">SOUND OFF</span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
          <span className="hidden sm:inline text-[10px] text-indigo-700 font-medium">SOUND ON</span>
        </>
      )}
    </button>
  );
};
