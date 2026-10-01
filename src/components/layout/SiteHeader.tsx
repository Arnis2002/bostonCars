import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { HeartIcon, MapPinIcon, MenuIcon, PhoneIcon, XIcon } from 'lucide-react';
import { Dialog } from '../Dialog';
import { dealership, addressLine } from '../../data/dealership';
import { useGarage } from '../../contexts/GarageContext';
import { container } from '../../utils/styles';

export const navItems = [
{ to: '/inventory', label: 'Inventory' },
{ to: '/sell-or-trade', label: 'Sell or Trade' },
{ to: '/financing', label: 'Financing' },
{ to: '/about', label: 'About & Visit' }];


export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { savedIds } = useGarage();
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location.pathname, location.search]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ivory">
      <div className={`${container} flex h-16 items-center justify-between gap-6 lg:h-[72px]`}>
        <Link to="/" className="flex flex-col leading-none" aria-label="Boston Foreign Motor, home">
          <span className="font-serif text-[21px] font-medium tracking-[-0.01em] sm:text-[23px]">Boston Foreign Motor</span>
          <span className="mt-1 text-[11px] text-ink-soft">Pre-owned imports · Allston</span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {navItems.map((item) =>
            <li key={item.to}>
                <NavLink
                to={item.to}
                className={({ isActive }) =>
                `relative py-2 text-[15px] transition-colors duration-150 ${
                isActive ? 'text-ink after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-ink' : 'text-ink-soft hover:text-ink'}`

                }>
                
                  {item.label}
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            to="/inventory?saved=1"
            className="inline-flex h-11 items-center gap-1.5 rounded px-2.5 text-sm text-ink-soft transition-colors duration-150 hover:text-ink"
            aria-label={`Saved vehicles, ${savedIds.length}`}>
            
            <HeartIcon className="h-[18px] w-[18px]" aria-hidden="true" />
            <span className="tnum">{savedIds.length}</span>
          </Link>
          <a
            href={dealership.phoneHref}
            className="hidden h-11 items-center gap-2 rounded border border-line-strong px-3.5 text-sm font-medium transition-colors duration-150 hover:border-ink sm:inline-flex">
            
            <PhoneIcon className="h-4 w-4" aria-hidden="true" />
            <span className="tnum">{dealership.phoneDisplay}</span>
          </a>
          <a
            href={dealership.phoneHref}
            className="inline-flex h-11 w-11 items-center justify-center rounded sm:hidden"
            aria-label={`Call sales at ${dealership.phoneDisplay}`}>
            
            <PhoneIcon className="h-5 w-5" aria-hidden="true" />
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded lg:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}>
            
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      <Dialog open={menuOpen} onClose={() => setMenuOpen(false)} labelledBy="mobile-menu-title" variant="drawer-right" panelClassName="flex h-full w-full max-w-sm flex-col bg-ivory">
        <div className="flex h-16 items-center justify-between border-b border-line px-5">
          <p id="mobile-menu-title" className="font-serif text-xl">Menu</p>
          <button type="button" onClick={() => setMenuOpen(false)} className="inline-flex h-11 w-11 items-center justify-center rounded" aria-label="Close menu">
            <XIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-4">
          <ul>
            <li>
              <NavLink to="/" end className="flex h-14 items-center border-b border-line font-serif text-2xl">Home</NavLink>
            </li>
            {navItems.map((item) =>
            <li key={item.to}>
                <NavLink to={item.to} className={({ isActive }) => `flex h-14 items-center border-b border-line font-serif text-2xl ${isActive ? 'text-forest' : ''}`}>
                  {item.label}
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
        <div className="space-y-3 border-t border-line px-5 py-5">
          <a href={dealership.phoneHref} className="flex h-12 items-center justify-center gap-2 rounded bg-forest text-[15px] font-medium text-ivory">
            <PhoneIcon className="h-4 w-4" aria-hidden="true" /> Call sales {dealership.phoneDisplay}
          </a>
          <a href={dealership.directionsUrl} target="_blank" rel="noreferrer" className="flex items-start gap-2 text-sm text-ink-soft">
            <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{addressLine} · Directions</span>
          </a>
        </div>
      </Dialog>
    </header>);

}