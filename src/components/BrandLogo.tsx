import React from 'react';

/** Original CCL artwork, kept on white for legibility in both themes. */
export const BrandLogo: React.FC<{ className?: string }> = ({ className = 'w-40' }) => (
  <img src="/brand/ccl-logo.png" alt="Christian Creator Lab" width={1105} height={378}
    style={{ backgroundColor: "#ffffff", filter: "none" }}
    className={`block h-auto max-w-full shrink-0 object-contain ${className}`} />
);
