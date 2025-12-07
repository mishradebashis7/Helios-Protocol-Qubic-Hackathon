import React from 'react';
import { Activity, Cpu, Wallet, ShoppingCart, BookOpen, Zap, LogOut } from 'lucide-react';

const Sidebar = ({ activeTab, setTab, onLogout }) => {
  const menu = [
    { id: 'dashboard', icon: <Activity size={20} />, label: 'Command Center' },
    { id: 'mining', icon: <Cpu size={20} />, label: 'Neural Node' },
    { id: 'market', icon: <ShoppingCart size={20} />, label: 'Model Market' },
    { id: 'wallet', icon: <Wallet size={20} />, label: 'Assets' },
    { id: 'about', icon: <BookOpen size={20} />, label: 'Whitepaper' },
  ];

  return (
    <div className="w-64 h-screen bg-[#0b0f19] border-r border-gray-800 flex flex-col p-4 fixed left-0 top-0">
      <div className="flex items-center gap-3 px-2 mb-10 mt-2">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <Zap className="text-white" fill="white" size={20} />
        </div>
        <div>
          <h1 className="font-bold text-xl tracking-tight text-white">HELIOS</h1>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">Protocol V2.4</p>
        </div>
      </div>
      
      <div className="space-y-1 flex-1">
        {menu.map(item => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === item.id 
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
              : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            {item.icon}
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-auto pt-4 border-t border-gray-800 space-y-4">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium text-sm">Disconnect</span>
        </button>

        <div className="p-4 glass-card rounded-xl border border-gray-800">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs font-mono text-emerald-400 font-bold">NODE ONLINE</span>
          </div>
          <div className="text-[10px] text-gray-500">Tick: {Math.floor(Date.now()/1000)}</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;