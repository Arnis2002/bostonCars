import React from 'react';
import { NavLink, matchPath, useLocation } from 'react-router-dom';
import { CarFrontIcon, HandCoinsIcon, PhoneIcon, NavigationIcon } from 'lucide-react';
import { dealership } from '../../data/dealership';
import { cn } from '../../utils/styles';

const itemBase = 'flex h-16 flex-col items-center justify-center gap-1 text-[12px] font-semibold transition-colors duration-150';

export function MobileActionBar() {
  const { pathname } = useLocation();
  // Vehicle detail pages render their own vehicle-specific sticky actions.
  if (matchPath('/inventory/:slug', pathname)) return null;

  return (
    <nav aria-label="Quick actions" className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white md:hidden">
      <ul className="grid grid-cols-4">
        <li>
          <NavLink to="/inventory" className={({ isActive }) => cn(itemBase, isActive ? 'text-brand' : 'text-navy')}>
            <CarFrontIcon className="h-5 w-5" aria-hidden />
            Inventory
          </NavLink>
        </li>
        <li>
          <NavLink to="/financing" className={({ isActive }) => cn(itemBase, isActive ? 'text-brand' : 'text-navy')}>
            <HandCoinsIcon className="h-5 w-5" aria-hidden />
            Finance
          </NavLink>
        </li>
        <li>
          <a href={dealership.phone.href} className={cn(itemBase, 'bg-brand text-white')} aria-label={`Call ${dealership.phone.display}`}>
            <PhoneIcon className="h-5 w-5" aria-hidden />
            Call
          </a>
        </li>
        <li>
          <a href={dealership.links.directions} target="_blank" rel="noreferrer" className={cn(itemBase, 'text-navy')}>
            <NavigationIcon className="h-5 w-5" aria-hidden />
            Directions
          </a>
        </li>
      </ul>
    </nav>);

}