import React from 'react';
import { Cpu, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import InfoTooltip from '../components/InfoTooltip';

const Marketplace = () => (
  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
    <header>
      <h2 className="text-3xl font-bold text-white flex items-center">
        AI Model Marketplace
        <InfoTooltip title="Monetization" text="Once the AI models are trained by the network, they are listed here. Revenue from sales is shared with the miners who contributed energy."/>
      </h2>
      <p className="text-gray-400">Download datasets or purchase pre-trained weights.</p>
    </header>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="glass-card rounded-2xl p-6 hover:border-emerald-500/30 transition-all cursor-pointer group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center border border-gray-700">
              <Cpu className="text-gray-400 group-hover:text-emerald-400 transition-colors" />
            </div>
            <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-2 py-1 rounded border border-emerald-500/20">VERIFIED</span>
          </div>
          <h3 className="font-bold text-lg text-white">Llama-3-Quantized-v{item}</h3>
          <p className="text-gray-400 text-sm mt-1 mb-4">Optimized for edge devices. High accuracy on reasoning tasks.</p>
          <div className="flex justify-between items-center border-t border-gray-800 pt-4">
            <div className="font-mono text-white font-bold">2,500 <span className="text-gray-500 text-xs">QUBIC</span></div>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors"><Download size={18} /></button>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

export default Marketplace;