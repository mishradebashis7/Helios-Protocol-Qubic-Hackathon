import React, { useState, useEffect, useRef } from 'react';
import { Info } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const InfoTooltip = ({ title, text }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block ml-2 z-50" ref={ref}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`transition-colors duration-200 ${isOpen ? 'text-emerald-400' : 'text-gray-500 hover:text-emerald-400'}`}
      >
        <Info size={16} strokeWidth={2} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }} 
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 p-4 bg-[#111827] border border-gray-700 rounded-xl shadow-2xl z-50"
          >
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#111827] border-l border-t border-gray-700 rotate-45"></div>
            <h4 className="font-bold text-emerald-400 text-xs uppercase mb-2">{title}</h4>
            <p className="text-gray-300 text-xs leading-relaxed">{text}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InfoTooltip;