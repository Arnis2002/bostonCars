import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PhoneIcon, MapPinIcon } from 'lucide-react';
import { dealership } from '../../data/dealership';
import { EASE_OUT } from '../../utils/motion';
import { btn, cn, container } from '../../utils/styles';

const HERO_IMAGE = "/89d9e184-6b2c-4980-8542-68f9f548eb59.jpg";
const HEADLINE = ['Your next vehicle is', 'closer than you think.'];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="on-dark relative overflow-hidden bg-navy text-white">
      <div className={cn(container, 'grid items-center gap-8 pb-28 pt-6 sm:pt-10 lg:grid-cols-12 lg:gap-12 lg:pb-36 lg:pt-14')}>
        <div className="lg:col-span-6">
          <div className="flex items-center gap-3">
            <motion.span
              className="h-[3px] w-10 origin-left rounded-full bg-brand"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.4, delay: 0.55, ease: EASE_OUT }}
              aria-hidden />
            
            <motion.p
              className="text-sm font-semibold text-white/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}>
              
              Serving Grove City and Central Ohio since 2014
            </motion.p>
          </div>

          <h1 id="hero-title" className="mt-5 text-[2.35rem] font-bold leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.6rem]">
            {HEADLINE.map((line, i) =>
            <span key={line} className="block overflow-hidden pb-1">
                <motion.span
                className="block"
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.1, ease: EASE_OUT }}>
                
                  {line}
                </motion.span>
              </span>
            )}
          </h1>

          <motion.p
            className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/80 sm:text-lg"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.35, ease: EASE_OUT }}>
            
            Shop pre-owned cars, trucks and SUVs and explore financing options with the Southwest Auto Sale team.
          </motion.p>

          <motion.div
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.42, ease: EASE_OUT }}>
            
            <Link to="/inventory" className={cn(btn.primary, 'h-12 px-6 text-base')}>
              Browse Inventory
            </Link>
            <Link to="/financing" className={cn(btn.white, 'h-12 px-6 text-base')}>
              Get Pre-Qualified
            </Link>
            <a href={dealership.phone.href} className="inline-flex min-h-[48px] items-center justify-center gap-2 px-2 font-semibold text-white hover:text-white/80 sm:justify-start">
              <PhoneIcon className="h-4 w-4" aria-hidden />
              Call Now · {dealership.phone.display}
            </a>
          </motion.div>
        </div>

        <div className="order-first lg:order-none lg:col-span-6">
          <motion.div
            className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-navy-800 lg:aspect-[5/4]"
            initial={{ clipPath: 'inset(0% 0% 0% 35% round 16px)', opacity: 0 }}
            animate={{ clipPath: 'inset(0% 0% 0% 0% round 16px)', opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}>
            
            <motion.img
              src={HERO_IMAGE}
              alt="Sedan, compact SUV, pickup truck and three-row SUV lined up on a Grove City dealership lot"
              className="absolute inset-0 h-full w-full object-cover object-right"
              initial={{ scale: 1.06 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.9, ease: EASE_OUT }}
              loading="eager"
              decoding="async"
              width={1584}
              height={672} />
            
            <div className="absolute inset-0 bg-navy/15" aria-hidden />
            <a
              href={dealership.links.maps}
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-3 left-3 inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-white px-3 text-sm font-semibold text-navy shadow-card">
              
              <MapPinIcon className="h-4 w-4 text-brand" aria-hidden />
              {dealership.address.street}, {dealership.address.city}
            </a>
          </motion.div>
        </div>
      </div>
    </section>);

}