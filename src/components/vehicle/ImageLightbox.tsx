import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from 'lucide-react';
import { useDialog } from '../../hooks/useDialog';
import { cn } from '../../utils/styles';
import type { VehicleImage } from '../../types/vehicle';

interface ImageLightboxProps {
  open: boolean;
  onClose: () => void;
  images: VehicleImage[];
  index: number;
  onIndex: (index: number) => void;
  title: string;
}

export function ImageLightbox({ open, onClose, images, index, onIndex, title }: ImageLightboxProps) {
  const ref = useRef<HTMLDivElement>(null);
  useDialog(open, onClose, ref);
  const count = images.length;
  const go = (delta: number) => onIndex((index + delta + count) % count);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onIndex((index + 1) % count);
      if (e.key === 'ArrowLeft') onIndex((index - 1 + count) % count);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, index, count, onIndex]);

  return (
    <AnimatePresence>
      {open &&
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={`${title} photo viewer`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="on-dark fixed inset-0 z-[75] flex flex-col bg-ink/[0.97] text-white">
        
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <p className="text-sm text-white/80 tabular" aria-live="polite">
              {title} · Photo {index + 1} of {count}
            </p>
            <button type="button" onClick={onClose} className="grid h-11 w-11 place-items-center rounded-lg hover:bg-white/10" aria-label="Close photo viewer">
              <XIcon className="h-6 w-6" aria-hidden />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16">
            <motion.img
            key={index}
            src={images[index].src}
            alt={images[index].alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1);else
              if (info.offset.x > 60) go(-1);
            }}
            draggable={false}
            className="max-h-full max-w-full select-none rounded-lg object-contain" />
          
            <button
            type="button"
            onClick={() => go(-1)}
            className="absolute left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20 sm:left-4"
            aria-label="Previous photo">
            
              <ChevronLeftIcon className="h-6 w-6" aria-hidden />
            </button>
            <button
            type="button"
            onClick={() => go(1)}
            className="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20 sm:right-4"
            aria-label="Next photo">
            
              <ChevronRightIcon className="h-6 w-6" aria-hidden />
            </button>
          </div>

          <ul className="no-scrollbar flex justify-center gap-2 overflow-x-auto px-4 py-4">
            {images.map((img, i) =>
          <li key={img.src + i} className="shrink-0">
                <button
              type="button"
              onClick={() => onIndex(i)}
              aria-label={`View photo ${i + 1} of ${count}`}
              aria-current={i === index}
              className={cn('block h-14 w-20 overflow-hidden rounded-md ring-2 transition-opacity duration-150', i === index ? 'opacity-100 ring-white' : 'opacity-60 ring-transparent hover:opacity-90')}>
              
                  <img src={img.src} alt="" className="h-full w-full object-cover" />
                </button>
              </li>
          )}
          </ul>
        </motion.div>
      }
    </AnimatePresence>);

}