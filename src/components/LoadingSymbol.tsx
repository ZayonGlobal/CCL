import React from 'react';

type Props = { label?: string; inline?: boolean; inverse?: boolean; className?: string };
export const LoadingSymbol: React.FC<Props> = ({ label = 'Loading…', inline = false, inverse = false, className = '' }) => (
  <span role="status" aria-live="polite" className={`ccl-loading-symbol ${inline ? 'ccl-loading-inline' : 'ccl-loading-block'} ${inverse ? 'ccl-loading-inverse' : ''} ${className}`}>
    <span aria-hidden="true" className="ccl-loading-art">
      <img className="ccl-loading-motion" src="/brand/ccl-loader.gif" width="183" height="379" alt="" />
      <img className="ccl-loading-still" src="/brand/ccl-symbol.png" width="183" height="379" alt="" />
    </span>
    <span className={inline ? 'sr-only' : 'ccl-loading-label'}>{label}</span>
  </span>
);
