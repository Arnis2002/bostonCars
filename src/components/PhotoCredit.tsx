import React from 'react';
import type { Photo } from '../types/vehicle';
import { photoSourcePage } from '../utils/images';

interface PhotoCreditProps {
  photo: Photo;
  prefix?: string;
  className?: string;
  tone?: 'light' | 'dark';
}

export function PhotoCredit({ photo, prefix = 'Photo', className = '', tone = 'light' }: PhotoCreditProps) {
  const color = tone === 'dark' ? 'text-ivory/70 hover:text-ivory' : 'text-ink-soft hover:text-ink';
  return (
    <p className={`text-xs leading-relaxed ${tone === 'dark' ? 'text-ivory/70' : 'text-ink-soft'} ${className}`}>
      {prefix}: {photo.author}
      {photo.license ? `, ${photo.license}` : ''} ·{' '}
      <a href={photoSourcePage(photo.file)} target="_blank" rel="noreferrer" className={`underline underline-offset-2 ${color}`}>
        Wikimedia Commons
      </a>
    </p>);

}