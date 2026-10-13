import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
type Props = { id:string; label:string; value:string; onChange:(value:string)=>void; minLength?:number; autoComplete?:string; disabled?:boolean };
export const PasswordField: React.FC<Props> = ({id,label,value,onChange,minLength,autoComplete,disabled}) => {
  const [visible,setVisible]=useState(false);
  return <div><label htmlFor={id} className="text-xs font-semibold">{label}</label><div className="relative mt-1">
    <input id={id} type={visible?'text':'password'} required minLength={minLength} maxLength={128} autoComplete={autoComplete} disabled={disabled} value={value} onChange={e=>onChange(e.target.value)} className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-3.5 pr-12 text-sm disabled:opacity-50" />
    <button type="button" disabled={disabled} aria-label={`${visible?'Hide':'Show'} ${label.toLowerCase()}`} aria-pressed={visible} onClick={()=>setVisible(v=>!v)} className="absolute right-1 top-1 bottom-1 w-10 flex items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2">
      {visible?<EyeOff aria-hidden="true" className="h-4 w-4"/>:<Eye aria-hidden="true" className="h-4 w-4"/>}
    </button>
  </div></div>;
};
