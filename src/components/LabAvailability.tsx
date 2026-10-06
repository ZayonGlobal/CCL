import React from 'react';
import { LockKeyhole } from 'lucide-react';

export const isLabOpen = (id: string) => id === 'ai-foundations';

export const LabAvailability: React.FC<{ id: string; name?: string }> = ({ id, name }) => isLabOpen(id) ? null : (
  <div aria-label={`${name || 'Lab'} — Coming soon`} className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 rounded-[inherit] bg-black/45 backdrop-blur-[4px] text-center p-6 cursor-not-allowed">
    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/15 shadow-lg">
      <LockKeyhole aria-hidden="true" className="h-8 w-8" style={{ color: '#ffffff' }} strokeWidth={1.6} />
    </div>
    <span className="text-sm font-semibold tracking-wide" style={{ color: '#ffffff' }}>Coming soon</span>
  </div>
);
