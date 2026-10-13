import React from 'react';
export const BrandLogo: React.FC<{className?:string;inverse?:boolean}> = ({className='w-40',inverse=false}) => (
  <img src="/brand/ccl-logo.png" alt="Christian Creator Lab" width={1105} height={378} className={`ccl-brand-logo ${inverse?'ccl-brand-inverse':''} block h-auto max-w-full shrink-0 object-contain ${className}`} />
);
