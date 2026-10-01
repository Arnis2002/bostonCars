import type { LeadSubmission, LeadType } from '../types/leads';

interface SubmitArgs {
  type: LeadType;
  payload: Record<string, unknown>;
  honeypot?: string;
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Demo lead transport. Nothing leaves the browser. In production this posts to the dealership CRM /
 * lead endpoint, and financing requests are handed to an approved secure finance provider.
 */
export async function submitLead({ type, payload, honeypot }: SubmitArgs): Promise<{id: string;}> {
  await wait(1100);

  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    throw new Error('It looks like you’re offline. Check your connection and try again, or call us at (614) 594-2940.');
  }

  const id = `L-${Date.now().toString(36).toUpperCase()}`;

  // Honeypot filled → silently accept without recording (spam protection placeholder).
  if (honeypot) return { id };

  const submission: LeadSubmission = {
    type,
    payload,
    submittedAt: new Date().toISOString(),
    source: typeof window !== 'undefined' ? window.location.pathname : ''
  };

  try {
    const existing = JSON.parse(sessionStorage.getItem('swas-demo-leads') ?? '[]') as LeadSubmission[];
    sessionStorage.setItem('swas-demo-leads', JSON.stringify([...existing, submission]));
  } catch {

    // Storage unavailable — demo only.
  }
  return { id };
}