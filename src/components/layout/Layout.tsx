import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { DemoBar } from './DemoBar';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { CompareTray } from '../vehicles/CompareTray';
import { CompareDialog } from '../vehicles/CompareDialog';

export function Layout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const t = window.setTimeout(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' });
      }, 60);
      return () => window.clearTimeout(t);
    }
    window.scrollTo(0, 0);
    return undefined;
  }, [pathname, hash]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-ivory">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[80] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-ivory">
        Skip to content
      </a>
      <DemoBar />
      <SiteHeader />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <CompareTray />
      <CompareDialog />
    </div>);

}