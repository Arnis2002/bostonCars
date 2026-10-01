import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, ExpandIcon, XIcon } from 'lucide-react';
import type { Vehicle } from '../../types/vehicle';
import { VehiclePhoto } from '../VehiclePhoto';
import { PhotoCredit } from '../PhotoCredit';
import { Dialog } from '../Dialog';
import { vehicleName } from '../../utils/format';

export function Gallery({ vehicle }: {vehicle: Vehicle;}) {
  const photos = vehicle.photos;
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const total = photos.length;
  const current = photos[index];
  const go = (delta: number) => setIndex((i) => (i + delta + total) % total);

  const onLightboxKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(-1);
    }
  };

  const arrow = 'absolute top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded bg-paper/95 text-ink shadow-sm transition-colors duration-150 hover:bg-paper';

  return (
    <section aria-label={`Photos of the ${vehicleName(vehicle)}`}>
      <div className="relative aspect-[4/3] overflow-hidden rounded bg-line/40 sm:aspect-[3/2]">
        <button type="button" onClick={() => setOpen(true)} className="group block h-full w-full" aria-label={`Open photo ${index + 1} of ${total} full screen`}>
          <motion.div key={index} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="h-full w-full">
            <VehiclePhoto photo={current} priority sizes="(min-width: 1024px) 62vw, 100vw" widths={[640, 1000, 1400, 1900]} className="h-full w-full object-cover" />
          </motion.div>
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded bg-ink/80 px-2.5 py-1.5 text-xs font-medium text-ivory">
            <ExpandIcon className="h-3.5 w-3.5" aria-hidden="true" /> {index + 1} / {total}
          </span>
        </button>
        {total > 1 &&
        <>
            <button type="button" onClick={() => go(-1)} className={`${arrow} left-3`} aria-label="Previous photo">
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => go(1)} className={`${arrow} right-3`} aria-label="Next photo">
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </>
        }
      </div>

      {total > 1 &&
      <ul className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6" aria-label="Photo thumbnails">
          {photos.map((p, i) =>
        <li key={p.file}>
              <button
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show photo ${i + 1}`}
            aria-current={i === index}
            className={`block aspect-[4/3] w-full overflow-hidden rounded-sm border-2 transition-opacity duration-150 ${i === index ? 'border-ink' : 'border-transparent opacity-70 hover:opacity-100'}`}>
            
                <VehiclePhoto photo={p} sizes="140px" widths={[240]} className="h-full w-full object-cover" />
              </button>
            </li>
        )}
        </ul>
      }
      <div className="mt-2 flex flex-wrap justify-between gap-x-4 gap-y-1">
        <p className="text-xs text-ink-soft">{vehicle.isSample ? 'Representative photo of this model. Not the listed vehicle.' : 'Dealership photo.'}</p>
        {current && <PhotoCredit photo={current} />}
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} labelledBy="lightbox-title" variant="fullscreen" onKeyDown={onLightboxKey} panelClassName="on-dark flex h-full w-full flex-col text-ivory">
        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
          <p id="lightbox-title" className="text-sm">
            <span className="font-medium">{vehicleName(vehicle)}</span>
            <span className="text-ivory/70 tnum"> · Photo {index + 1} of {total}</span>
          </p>
          <button type="button" data-autofocus onClick={() => setOpen(false)} className="inline-flex h-11 w-11 items-center justify-center rounded hover:bg-ivory/10" aria-label="Close photo viewer">
            <XIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16">
          <motion.div key={index} initial={{ opacity: 0.3 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="flex h-full w-full items-center justify-center">
            <VehiclePhoto photo={current} sizes="100vw" widths={[1000, 1600, 2400]} className="max-h-full max-w-full object-contain" />
          </motion.div>
          {total > 1 &&
          <>
              <button type="button" onClick={() => go(-1)} className="absolute left-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded bg-ivory/10 hover:bg-ivory/20 sm:left-4" aria-label="Previous photo">
                <ChevronLeftIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => go(1)} className="absolute right-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded bg-ivory/10 hover:bg-ivory/20 sm:right-4" aria-label="Next photo">
                <ChevronRightIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </>
          }
        </div>
        <div className="px-4 py-3 text-center sm:px-6">
          {current && <PhotoCredit photo={current} tone="dark" />}
          <p className="mt-1 text-xs text-ivory/60">Use the left and right arrow keys to move between photos. Press Escape to close.</p>
        </div>
      </Dialog>
    </section>);

}