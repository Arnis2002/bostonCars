import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { UtilityBar } from './UtilityBar';
import { Header } from './Header';
import { MobileMenu } from './MobileMenu';
import { MobileActionBar } from './MobileActionBar';
import { Footer } from './Footer';
import { CompareTray } from './CompareTray';
import { CookieNotice } from './CookieNotice';

export function SiteLayout({ children }: {children: React.ReactNode;}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    setMenuOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <a
        href="#main"
        className="sr-only z-[90] rounded-lg bg-navy px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-3 focus:top-3">
        
        Skip to main content
      </a>
      <UtilityBar />
      <Header onOpenMenu={() => setMenuOpen(true)} menuOpen={menuOpen} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <Footer />
      <div className="h-16 md:hidden" aria-hidden />
      <MobileActionBar />
      <CompareTray />
      <CookieNotice />
    </div>);

}