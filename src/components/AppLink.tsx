import React from 'react';
import { useApp, AppView } from '../context/AppContext';
import { pathFor } from '../services/routes';

type AppLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  view: AppView;
  id?: string;
  /** Runs before navigating, e.g. to close a menu. */
  onNavigate?: () => void;
};

/**
 * A real link to a CCL page. Normal clicks navigate inside the app;
 * Ctrl/Cmd/middle-click open the page in a new tab like any other link,
 * and search engines can follow the href.
 */
export const AppLink: React.FC<AppLinkProps> = ({ view, id, onNavigate, onClick, children, ...rest }) => {
  const { navigateWithParam } = useApp();
  return (
    <a
      {...rest}
      href={pathFor(view, id)}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        onNavigate?.();
        navigateWithParam(view, id);
      }}
    >
      {children}
    </a>
  );
};
