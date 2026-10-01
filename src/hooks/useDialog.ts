import { RefObject, useEffect, useRef } from 'react';

const FOCUSABLE =
'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Escape to close, focus trap, initial focus, scroll lock and focus restore for dialogs and drawers. */
export function useDialog(open: boolean, onClose: () => void, ref: RefObject<HTMLElement>) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusables = () =>
    Array.from(ref.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []).filter((el) => el.getClientRects().length > 0);

    const frame = requestAnimationFrame(() => {
      const target = ref.current?.querySelector<HTMLElement>('[data-autofocus]') ?? focusables()[0] ?? ref.current;
      target?.focus();
    });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab') return;
      const els = focusables();
      if (!els.length) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open, ref]);
}