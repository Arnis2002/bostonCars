import React from 'react';
import { motion } from 'framer-motion';
import { EASE_OUT } from '../../utils/motion';

export function PageTransition({ children }: {children: React.ReactNode;}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.24, ease: EASE_OUT } }}
      exit={{ opacity: 0, transition: { duration: 0.12 } }}>
      
      {children}
    </motion.div>);

}