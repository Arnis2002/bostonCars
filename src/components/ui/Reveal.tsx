import React from 'react';
import { motion } from 'framer-motion';
import { sectionReveal } from '../../utils/motion';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div {...sectionReveal} transition={{ ...sectionReveal.transition, delay }} className={className}>
      {children}
    </motion.div>);

}