import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HeartIcon, MenuIcon, PhoneIcon } from 'lucide-react';
import { Logo } from './Logo';
import { primaryNav } from '../../data/navigation';
import { dealership } from '../../data/dealership';
import { useGarage } from '../../contexts/GarageContext';
import { useScrolled } from '../../hooks/useScrolled';
import { btn, cn, container } from '../../utils/styles';

interface HeaderProps {
  onOpenMenu: () => void;
  menuOpen: boolean;
}

export function Header({ onOpenMenu, menuOpen }: HeaderProps) {
  const scrolled = useScrolled(40);
  const { savedIds } = useGarage();

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b bg-white/95 backdrop-blur-md transition-[box-shadow,border-color] duration-200',
        scrolled ? 'border-line shadow-header' : 'border-transparent'
      )}>
      
      <div className={cn(container, 'flex items-center gap-4 transition-[height] duration-200 ease-out', scrolled ? 'h-16' : 'h-[72px] lg:h-20')}>
        <Link to="/" className="shrink-0 rounded-lg">
          <Logo compact={scrolled} />
        </Link>

        <nav aria-label="Main" className="ml-4 hidden flex-1 lg:block">
          <ul className="flex items-center gap-0.5">
            {primaryNav.map((item) =>
            <li key={item.to}>
                <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                cn(
                  'relative inline-flex h-11 items-center whitespace-nowrap rounded-md px-2.5 text-[14.5px] font-medium transition-colors duration-150 xl:px-3',
                  isActive ? 'text-navy' : 'text-steel hover:text-navy'
                )
                }>
                
                  {({ isActive }) =>
                <>
                      {item.label}
                      <span
                    className={cn(
                      'absolute inset-x-2.5 bottom-1 h-[2px] origin-left rounded-full bg-brand transition-transform duration-200 ease-out xl:inset-x-3',
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    )}
                    aria-hidden />
                  
                    </>
                }
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <Link
            to="/saved"
            className="relative grid h-11 w-11 place-items-center rounded-lg text-navy transition-colors duration-150 hover:bg-paper"
            aria-label={`Saved vehicles (${savedIds.length})`}>
            
            <HeartIcon className="h-5 w-5" aria-hidden />
            {savedIds.length > 0 &&
            <span className="absolute right-1.5 top-1.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-brand px-1 text-[11px] font-bold text-white tabular">
                {savedIds.length}
              </span>
            }
          </Link>
          <a
            href={dealership.phone.href}
            className="grid h-11 w-11 place-items-center rounded-lg text-navy transition-colors duration-150 hover:bg-paper md:hidden"
            aria-label={`Call ${dealership.phone.display}`}>
            
            <PhoneIcon className="h-5 w-5" aria-hidden />
          </a>
          <Link to="/financing" className={cn(btn.outline, 'hidden xl:inline-flex')}>
            Get Pre-Qualified
          </Link>
          <Link to="/inventory" className={cn(btn.primary, 'hidden sm:inline-flex lg:hidden xl:inline-flex')}>
            Shop Inventory
          </Link>
          <button
            type="button"
            onClick={onOpenMenu}
            className="grid h-11 w-11 place-items-center rounded-lg text-navy transition-colors duration-150 hover:bg-paper lg:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu">
            
            <MenuIcon className="h-6 w-6" aria-hidden />
          </button>
        </div>
      </div>
    </header>);

}