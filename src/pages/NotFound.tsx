import React from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { btn, container } from '../utils/styles';

export function NotFound() {
  usePageMeta('Page not found', 'This page could not be found.');
  return (
    <div className={`${container} py-24`}>
      <h1 className="font-serif text-5xl">That page isn’t here.</h1>
      <p className="mt-4 max-w-lg text-[17px] text-ink-soft">The link may be old. Try the inventory, or head back to the home page.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/inventory" className={btn.primary}>Browse inventory</Link>
        <Link to="/" className={btn.secondary}>Home</Link>
      </div>
    </div>);

}