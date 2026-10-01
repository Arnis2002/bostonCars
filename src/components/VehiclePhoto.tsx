import React, { useState } from 'react';
import { ImageOffIcon } from 'lucide-react';
import type { Photo } from '../types/vehicle';
import { photoUrl } from '../utils/images';

interface VehiclePhotoProps {
  photo: Photo | undefined;
  sizes: string;
  className?: string;
  priority?: boolean;
  widths?: number[];
}

export function VehiclePhoto({ photo, sizes, className = '', priority = false, widths = [480, 800, 1200, 1600] }: VehiclePhotoProps) {
  const [failed, setFailed] = useState(false);

  if (!photo || failed) {
    return (
      <div className={`flex flex-col items-center justify-center gap-2 bg-line/50 text-ink-soft ${className}`}>
        <ImageOffIcon className="h-6 w-6" aria-hidden="true" />
        <span className="text-sm">Photo unavailable</span>
      </div>);

  }

  return (
    <img
      src={photoUrl(photo.file, 1200)}
      srcSet={widths.map((w) => `${photoUrl(photo.file, w)} ${w}w`).join(', ')}
      sizes={sizes}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      className={className} />);


}