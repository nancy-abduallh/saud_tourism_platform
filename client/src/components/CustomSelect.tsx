'use client';
import { useState, useRef, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
  value: string | number;
  label: string;
  icon?: ReactNode;
  badge?: string | null;
}

interface CustomSelectProps {
  value: string | number;
  onChange: (value: any) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  theme?: 'dark' | 'light';
  icon?: ReactNode;
  disabled?: boolean;
}

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder = 'اختر...',
  className = '',
  theme = 'dark',
  icon,
  disabled = false,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => String(opt.value) === String(value));

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const isDark = theme === 'dark';

  return (
    <div ref={containerRef} className={`relative w-full text-right ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`group flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm transition-all duration-200 outline-none ${
          isDark
            ? 'border border-white/15 bg-white/5 text-white placeholder-white/40 hover:border-gold-400/60 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20'
            : 'border border-navy-100 bg-white text-navy-900 hover:border-gold-500 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 shadow-sm'
        } ${isOpen ? (isDark ? 'border-gold-400 ring-2 ring-gold-400/20' : 'border-gold-500 ring-2 ring-gold-500/20') : ''} ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2.5 truncate">
          {icon && <span className="text-gold-400 shrink-0">{icon}</span>}
          {selectedOption ? (
            <span className="truncate font-medium">{selectedOption.label}</span>
          ) : (
            <span className={isDark ? 'text-white/40' : 'text-navy-900/40'}>{placeholder}</span>
          )}
        </div>

        <ChevronDown
          size={18}
          className={`shrink-0 transition-transform duration-200 text-gold-400 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={`absolute top-full mt-2 w-full z-50 max-h-64 overflow-y-auto rounded-2xl p-1.5 shadow-2xl backdrop-blur-2xl ${
              isDark
                ? 'border border-gold-500/40 bg-[#091326]/95 text-white shadow-navy-950/90'
                : 'border border-gold-500/40 bg-white/98 text-navy-950 shadow-navy-900/20'
            }`}
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#c9a24b transparent',
            }}
            role="listbox"
          >
            {options.map((opt) => {
              const isSelected = String(opt.value) === String(value);
              return (
                <button
                  key={String(opt.value)}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  role="option"
                  aria-selected={isSelected}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-sm transition-all duration-150 text-right ${
                    isSelected
                      ? isDark
                        ? 'bg-gold-500/25 text-gold-200 font-bold border border-gold-500/40 shadow-sm'
                        : 'bg-gold-50 text-gold-800 font-bold border border-gold-400/50'
                      : isDark
                      ? 'text-white/85 hover:bg-gold-500/15 hover:text-gold-300'
                      : 'text-navy-900 hover:bg-gold-50 hover:text-gold-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    {opt.icon && <span className="shrink-0">{opt.icon}</span>}
                    <span className="truncate">{opt.label}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {opt.badge && (
                      <span className="rounded-full bg-gold-500/20 px-2 py-0.5 text-[10px] font-semibold text-gold-300">
                        {opt.badge}
                      </span>
                    )}
                    {isSelected && <Check size={16} className="text-gold-400" />}
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
