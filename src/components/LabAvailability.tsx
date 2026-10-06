import React from 'react';
import { LockKeyhole } from 'lucide-react';

export const isLabOpen = (id: string) => id === 'ai-foundations';

export const LabAvailability: React.FC<{ id: string }> = ({ id }) => isLabOpen(id) ? null : (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">
    <LockKeyhole aria-hidden="true" className="h-3.5 w-3.5" />Coming soon
  </span>
);
