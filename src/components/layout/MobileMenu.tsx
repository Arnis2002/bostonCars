import React, { useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NavLink, Link } from 'react-router-dom';
import { XIcon, PhoneIcon, NavigationIcon, MailIcon } from 'lucide-react';
import { Logo } from './Logo';
import { HoursList } from '../location/HoursList';
import { primaryNav } from '../../data/navigation';
import { dealership } from '../../data/dealership';
import { useDialog } from '../../hooks/useDialog';
import { EASE_OUT } from '../../utils/motion';
import { btn, cn } from '../../utils/styles';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const ref = useRef<HTMLDivElement>(null);
  useDialog(open, onClose, ref);

  return (
    <AnimatePresence>
      {open &&
      <div className="fixed inset-0 z-[60] lg:hidden">
          <motion.div
          className="absolute inset-0 bg-navy/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          aria-hidden />
        
          <motion.div
          ref={ref}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%', transition: { duration: 0.2, ease: EASE_OUT } }}
          transition={{ duration: 0.28, ease: EASE_OUT }}
          className="absolute inset-y-0 right-0 flex w-[min(88vw,380px)] flex-col bg-white shadow-lift">
          
            <div className="flex h-[72px] items-center justify-between border-b border-line px-5">
              <Logo compact />
              <button type="button" onClick={onClose} className="-mr-2 grid h-11 w-11 place-items-center rounded-lg text-navy hover:bg-paper" aria-label="Close menu">
                <XIcon className="h-6 w-6" aria-hidden />
              </button>
            </div>
            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-3">
              <ul>
                {primaryNav.map((item) =>
              <li key={item.to}>
                    <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  onClick={onClose}
                  className={({ isActive }) =>
                  cn('flex min-h-[48px] items-center rounded-lg px-3 text-[17px] font-semibold', isActive ? 'bg-paper text-navy' : 'text-steel hover:bg-paper')
                  }>
                  
                      {item.label}
                    </NavLink>
                  </li>
              )}
                <li>
                  <NavLink to="/saved" onClick={onClose} className="flex min-h-[48px] items-center rounded-lg px-3 text-[17px] font-semibold text-steel hover:bg-paper">
                    Saved Vehicles
                  </NavLink>
                </li>
              </ul>
              <div className="mt-4 grid gap-2 px-1">
                <Link to="/inventory" onClick={onClose} className={btn.primary}>
                  Shop Inventory
                </Link>
                <Link to="/financing" onClick={onClose} className={btn.outline}>
                  Get Pre-Qualified
                </Link>
              </div>
              <div className="mt-6 space-y-1 border-t border-line px-1 pt-5">
                <a href={dealership.phone.href} className="flex min-h-[44px] items-center gap-3 font-semibold text-navy">
                  <PhoneIcon className="h-5 w-5 text-brand" aria-hidden />
                  {dealership.phone.display}
                </a>
                <a href={dealership.links.directions} target="_blank" rel="noreferrer" className="flex min-h-[44px] items-center gap-3 text-steel">
                  <NavigationIcon className="h-5 w-5 text-brand" aria-hidden />
                  {dealership.address.street}, {dealership.address.city}
                </a>
                <a href={`mailto:${dealership.email}`} className="flex min-h-[44px] items-center gap-3 break-all text-steel">
                  <MailIcon className="h-5 w-5 shrink-0 text-brand" aria-hidden />
                  {dealership.email}
                </a>
                <HoursList className="pt-3 text-sm" />
              </div>
            </nav>
          </motion.div>
        </div>
      }
    </AnimatePresence>);

}