import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { processSteps } from '../../data/homeContent';
import { EASE_OUT } from '../../utils/motion';
import { container } from '../../utils/styles';

export function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="bg-white py-16 lg:py-24">
      <div className={container}>
        <SectionHeading id="how-title" title="How buying with us works" description="A straightforward process from first click to driving home." />
        <ol className="relative mt-12 grid gap-10 lg:grid-cols-4 lg:gap-8">
          <motion.span
            aria-hidden
            className="absolute left-5 top-5 hidden h-[2px] w-[calc(100%-2.5rem)] origin-left bg-line lg:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: EASE_OUT }} />
          
          <span aria-hidden className="absolute bottom-5 left-[19px] top-5 w-[2px] bg-line lg:hidden" />
          {processSteps.map((step, i) => {
            const action = step.action;
            const linkClass = 'mt-3 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-navy hover:text-brand-dark';
            return (
              <motion.li
                key={step.title}
                className="relative grid grid-cols-[40px_1fr] gap-4 lg:block"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: EASE_OUT }}>
                
                <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full bg-navy text-[15px] font-bold text-white ring-4 ring-white tabular">
                  {i + 1}
                </span>
                <div className="lg:mt-5">
                  <h3 className="text-lg font-bold leading-snug text-navy">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{step.text}</p>
                  {action.to ?
                  <Link to={action.to} className={linkClass}>
                      {action.label}
                      <ArrowRightIcon className="h-4 w-4" aria-hidden />
                    </Link> :

                  <a href={action.href} className={linkClass} {...action.href?.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {}}>
                      {action.label}
                      <ArrowRightIcon className="h-4 w-4" aria-hidden />
                    </a>
                  }
                </div>
              </motion.li>);

          })}
        </ol>
      </div>
    </section>);

}