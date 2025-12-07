import React from 'react';
import { ShieldCheck, Share2, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import InfoTooltip from '../components/InfoTooltip';

// Add 'userWallet' to props
const WalletView = ({ balance, pending, onClaim, userWallet }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
    <header>
      <h2 className="text-3xl font-bold text-white flex items-center">
        Digital Assets
        <InfoTooltip title="Your Wallet" text="The Qubic tokens you earn from mining are stored here."/>
      </h2>
      <p className="text-gray-400">Manage your earnings and staking.</p>
    </header>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Wallet Card */}
      <div className="h-64 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-900 p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
        <div className="absolute -right-12 -top-12 opacity-20"><ShieldCheck size={200} /></div>
        <div className="relative z-10 flex justify-between">
          <div>
            <p className="text-emerald-100 font-medium mb-1">Total Balance</p>
            <h3 className="text-5xl font-bold text-white tracking-tight">{balance.toLocaleString()}</h3>
            <span className="text-emerald-200 text-sm">QUBIC TOKENS</span>
          </div>
          <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl h-fit cursor-pointer hover:bg-white/20"><Share2 color="white" /></div>
        </div>
        
        <div className="relative z-10">
          <p className="text-emerald-200 text-[10px] font-bold uppercase mb-1">Connected Wallet</p>
          {/* DISPLAY THE REAL INPUT HERE */}
          <div className="font-mono text-emerald-100 bg-black/20 p-2 rounded w-fit text-sm border border-white/10 truncate max-w-full">
            {userWallet || "0x71C...9B2A"}
          </div>
        </div>
      </div>

      <div className="glass-card rounded-3xl p-8 flex flex-col justify-center items-center text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700">
           <Zap className="text-yellow-400" fill="currentColor" />
        </div>
        <div>
           <p className="text-gray-400 font-bold uppercase text-xs tracking-wider">Unclaimed Rewards</p>
           <h3 className="text-4xl font-bold text-white mt-2">+{pending.toFixed(4)}</h3>
        </div>
        <button 
          onClick={onClaim}
          className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors"
        >
          Claim to Wallet
        </button>
      </div>
    </div>
  </motion.div>
);

export default WalletView;