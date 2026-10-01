import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, ExpandIcon } from 'lucide-react';
import { ImageLightbox } from './ImageLightbox';
import { EASE_OUT } from '../../utils/motion';
import { cn } from '../../utils/styles';
import type { VehicleImage } from '../../types/vehicle';

interface VehicleGalleryProps {
  images: VehicleImage[];
  title: string;
}

export function VehicleGallery({ images, title }: VehicleGalleryProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [lightbox, setLightbox] = useState(false);
  const count = images.length;

  const go = (delta: number) => {
    setDirection(delta > 0 ? 1 : -1);
    setIndex((i) => (i + delta + count) % count);
  };

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-paper sm:aspect-[16/10]" aria-roledescription="carousel" aria-label={`${title} photos`}>
        <AnimatePresence initial={false}>
          <motion.img
            key={index}
            src={images[index].src}
            alt={images[index].alt}
            initial={{ opacity: 0, x: direction * 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1);else
              if (info.offset.x > 60) go(-1);
            }}
            onDoubleClick={() => setLightbox(true)}
            draggable={false}
            loading={index === 0 ? 'eager' : 'lazy'}
            className="absolute inset-0 h-full w-full cursor-grab select-none object-cover active:cursor-grabbing" />
          
        </AnimatePresence>

        {count > 1 &&
        <>
            <button
            type="button"
            onClick={() => go(-1)}
            className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-navy shadow-card transition-colors duration-150 hover:bg-white"
            aria-label="Previous photo">
            
              <ChevronLeftIcon className="h-5 w-5" aria-hidden />
            </button>
            <button
            type="button"
            onClick={() => go(1)}
            className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-navy shadow-card transition-colors duration-150 hover:bg-white"
            aria-label="Next photo">
            
              <ChevronRightIcon className="h-5 w-5" aria-hidden />
            </button>
          </>
        }

        <span className="absolute bottom-3 left-3 rounded-md bg-ink/75 px-2.5 py-1 text-sm font-medium text-white tabular" aria-live="polite">
          {index + 1} / {count}
        </span>
        <button
          type="button"
          onClick={() => setLightbox(true)}
          className="absolute bottom-3 right-3 inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-white/95 px-3 text-sm font-semibold text-navy shadow-card hover:bg-white">
          
          <ExpandIcon className="h-4 w-4" aria-hidden />
          Full screen
        </button>
      </div>

      <ul className="mt-3 grid grid-cols-5 gap-2">
        {images.map((img, i) =>
        <li key={img.src + i}>
            <button
            type="button"
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
            aria-label={`View photo ${i + 1} of ${count}`}
            aria-current={i === index}
            className={cn(
              'block aspect-[4/3] w-full overflow-hidden rounded-lg ring-2 ring-offset-2 transition-[box-shadow,opacity] duration-150',
              i === index ? 'ring-navy' : 'opacity-75 ring-transparent hover:opacity-100'
            )}>
            
              <img src={img.src} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          </li>
        )}
      </ul>

      <ImageLightbox open={lightbox} onClose={() => setLightbox(false)} images={images} index={index} onIndex={setIndex} title={title} />
    </div>);

}