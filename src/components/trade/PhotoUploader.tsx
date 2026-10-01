import React, { useEffect, useId, useMemo, useState } from 'react';
import { ImagePlusIcon, XIcon, AlertCircleIcon } from 'lucide-react';
import { cn } from '../../utils/styles';

interface PhotoUploaderProps {
  files: File[];
  onChange: (files: File[]) => void;
  max?: number;
}

const MAX_BYTES = 10 * 1024 * 1024;

export function PhotoUploader({ files, onChange, max = 8 }: PhotoUploaderProps) {
  const id = useId();
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const previews = useMemo(() => files.map((f) => URL.createObjectURL(f)), [files]);

  useEffect(() => () => previews.forEach((url) => URL.revokeObjectURL(url)), [previews]);

  const add = (list: FileList | null) => {
    if (!list) return;
    const incoming = Array.from(list);
    const images = incoming.filter((f) => f.type.startsWith('image/'));
    const sized = images.filter((f) => f.size <= MAX_BYTES);
    const room = max - files.length;
    const accepted = sized.slice(0, Math.max(room, 0));
    if (images.length < incoming.length) setError('Only image files can be uploaded.');else
    if (sized.length < images.length) setError('Each photo must be 10 MB or smaller.');else
    if (sized.length > room) setError(`You can add up to ${max} photos.`);else
    setError(null);
    if (accepted.length) onChange([...files, ...accepted]);
  };

  return (
    <div>
      <p className="mb-1.5 flex items-baseline justify-between text-sm font-semibold text-ink">
        Vehicle photos <span className="text-xs font-normal text-muted">Optional · up to {max}</span>
      </p>
      <label
        htmlFor={id}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          add(e.dataTransfer.files);
        }}
        className={cn(
          'flex min-h-[120px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-6 text-center transition-colors duration-150',
          'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand has-[:focus-visible]:ring-offset-2',
          dragging ? 'border-navy bg-paper' : 'border-line hover:border-navy/40'
        )}>
        
        <ImagePlusIcon className="h-7 w-7 text-navy" aria-hidden />
        <span className="text-[15px] font-semibold text-navy">Add photos</span>
        <span className="text-sm text-muted">Exterior, interior, odometer and any damage help us estimate accurately.</span>
        <input id={id} type="file" accept="image/*" multiple className="sr-only" onChange={(e) => add(e.target.files)} />
      </label>
      {error &&
      <p className="mt-1.5 flex items-start gap-1.5 text-sm text-brand-dark" role="alert">
          <AlertCircleIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          {error}
        </p>
      }
      {files.length > 0 &&
      <ul className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
          {files.map((f, i) =>
        <li key={`${f.name}-${i}`} className="relative aspect-square overflow-hidden rounded-lg bg-paper">
              <img src={previews[i]} alt={`Uploaded photo ${i + 1}`} className="h-full w-full object-cover" />
              <button
            type="button"
            onClick={() => onChange(files.filter((_, idx) => idx !== i))}
            className="absolute right-1 top-1 grid h-7 w-7 place-items-center rounded-full bg-ink/80 text-white"
            aria-label={`Remove photo ${i + 1}`}>
            
                <XIcon className="h-4 w-4" aria-hidden />
              </button>
            </li>
        )}
        </ul>
      }
    </div>);

}