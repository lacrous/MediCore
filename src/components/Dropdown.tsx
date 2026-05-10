import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropdownContext } from '@/context/DropdownContext';

interface DropdownProps {
  id: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'left' | 'right';
  width?: number;
}

export default function Dropdown({ id, trigger, children, align = 'right', width = 160 }: DropdownProps) {
  const { openDropdownId, openDropdown, closeAll } = useDropdownContext();
  const isOpen = openDropdownId === id;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        if (isOpen) closeAll();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, closeAll]);

  const handleTriggerClick = () => {
    openDropdown(id);
  };

  return (
    <div ref={containerRef} className="relative inline-block">
      <div onClick={handleTriggerClick} className="cursor-pointer">
        {trigger}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute z-50 mt-2 shadow-mc-dropdown dark:shadow-mc-dropdown-dark"
            style={{
              [align]: 0,
              width: width === 0 ? 'auto' : width,
              minWidth: width,
              backgroundColor: 'var(--mc-surface-elevated)',
              border: '1px solid var(--mc-border)',
              borderRadius: 8,
              overflow: 'hidden',
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
