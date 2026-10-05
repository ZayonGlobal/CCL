import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL?.trim();
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();
export const isBackendConfigured = Boolean(url && key);
export const supabase = isBackendConfigured
  ? createClient(url!, key!, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } })
  : null;

export function backend() {
  if (!supabase) throw new Error('Registration is not open yet. Please try again later.');
  return supabase;
}

export function errorMessage(error: unknown) {
  return error instanceof Error ? error.message
    : typeof error === 'object' && error && 'message' in error ? String(error.message)
    : 'Your changes could not be saved. Please try again.';
}

export function safeUrl(value: string | undefined) {
  if (!value?.trim()) return undefined;
  const url = new URL(value.trim());
  if (!['https:', 'http:'].includes(url.protocol)) throw new Error('Please use an http or https link.');
  return url.href;
}
