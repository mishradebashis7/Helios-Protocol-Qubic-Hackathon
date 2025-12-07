import React from 'react';
import { Sun, Battery, Zap, Settings } from 'lucide-react';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import InfoTooltip from '../components/InfoTooltip'; // <--- Imports the shared tooltip

const Dashboard = ({ simHour, setSimHour, stats }) => {
  const chartData = Array.from({ length: 24 }, (_, i) => {
    let solarVal = (i >= 6 && i <= 18) ? 5000 * Math.sin((i - 6) * Math.PI / 12) : 0;
    let usageVal = (i >= 17 && i <= 22) ? 3500 : 800 + (Math.random() * 200);
    return { 
      time: `${i}:00`, 
      solar: Math.max(0, Math.round(solarVal)), 
      usage: Math.round(usageVal) 
    };
  });

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <header className="flex justify-between items-end border-b border-gray-800 pb-6">
        <div>
            <h2 className="text-4xl font-black text-white flex items-center gap-3">
              Command Center 
              <InfoTooltip title="System Brain" text="Drag the slider below to simulate a full 24-hour energy cycle."/>
            </h2>
            <p className="text-gray-400 mt-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Manual Simulation Mode Active
            </p>
        </div>
        <div className="text-right">
            <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">SIMULATION TIME</p>
            <div className="text-5xl font-mono text-white tracking-tighter">
              {simHour < 10 ? `0${simHour}` : simHour}:00
            </div>
        </div>
      </header>

      <div className={`p-8 rounded-3xl border-2 transition-all duration-500 relative overflow-hidden shadow-2xl ${
          stats.status === 'MINING' ? 'bg-emerald-900/20 border-emerald-500/50 shadow-emerald-500/10' :
          stats.status === 'CHARGING' ? 'bg-blue-900/20 border-blue-500/50 shadow-blue-500/10' :
          'bg-red-900/20 border-red-500/50 shadow-red-500/10'
      }`}>
        <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest border ${
                stats.status === 'MINING' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                stats.status === 'CHARGING' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                'bg-red-500/20 text-red-400 border-red-500/30'
              }`}>
                Current State
              </span>
              <InfoTooltip title="Smart Logic" text="If Battery is full & Sun is shining -> It Mines Crypto. If Sun is down -> It drains battery."/>
            </div>
            
            <h1 className="text-6xl font-black text-white tracking-tight mb-8 drop-shadow-lg">
              {stats.status}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#0b0f19]/80 backdrop-blur p-5 rounded-2xl border border-white/5 hover:border-yellow-500/30 transition-colors group">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Solar Input</p>
                      <Sun className="text-yellow-500 opacity-50 group-hover:opacity-100 transition-opacity" size={18} />
                    </div>
                    <div className="text-3xl font-mono text-white">
                        {Math.round(stats.solar)}<span className="text-sm text-gray-500 ml-1">W</span>
                    </div>
                </div>

                <div className="bg-[#0b0f19]/80 backdrop-blur p-5 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-colors group">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Battery</p>
                      <Battery className="text-blue-500 opacity-50 group-hover:opacity-100 transition-opacity" size={18} />
                    </div>
                    <div className="text-3xl font-mono text-white">
                        {Math.round(stats.battery)}<span className="text-sm text-gray-500 ml-1">%</span>
                    </div>
                    <div className="w-full h-1 bg-gray-700 mt-3 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 transition-all duration-500" style={{width: `${stats.battery}%`}}></div>
                    </div>
                </div>

                <div className="bg-[#0b0f19]/80 backdrop-blur p-5 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-colors group">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Net Energy</p>
                      <Zap className={`opacity-50 group-hover:opacity-100 transition-opacity ${stats.net > 0 ? 'text-emerald-500' : 'text-red-500'}`} size={18} />
                    </div>
                    <div className={`text-3xl font-mono ${stats.net > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {stats.net > 0 ? '+' : ''}{Math.round(stats.net)}<span className="text-sm text-gray-500 ml-1">W</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="glass-card p-8 rounded-3xl border border-gray-800">
        <div className="flex justify-between mb-6">
            <label className="font-bold text-white flex items-center gap-3 text-lg">
                <div className="p-2 bg-gray-800 rounded-lg"><Settings size={20} className="text-gray-400"/></div>
                Time Controller
                <InfoTooltip title="The Demo Slider" text="Drag this to 12:00 (Noon) to show the judges how the system auto-activates."/>
            </label>
        </div>
        
        <input 
            type="range" 
            min="0" max="23" 
            value={simHour} 
            onChange={(e) => setSimHour(parseInt(e.target.value))}
            className="w-full h-6 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400 transition-all"
        />
        
        <div className="flex justify-between text-[10px] text-gray-500 mt-4 font-mono font-bold uppercase tracking-widest">
            <span className="text-blue-400">Night</span>
            <span className="text-yellow-400">Noon (Solar Peak)</span>
            <span className="text-blue-400">Night</span>
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl h-[350px] border border-gray-800 relative">
        <div className="flex justify-between items-center mb-6">
           <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
             Daily Energy Projection
             <InfoTooltip title="The Duck Curve" text="The Orange line is Solar Power. The Blue line is Usage."/>
           </h3>
        </div>
        
        <ResponsiveContainer width="100%" height="85%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorSolar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#eab308" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Tooltip 
              contentStyle={{backgroundColor: '#0b0f19', borderColor: '#374151', borderRadius: '12px'}}
              itemStyle={{color: '#fff', fontSize: '12px', fontFamily: 'monospace'}}
            />
            <Area type="monotone" dataKey="solar" name="Solar Gen" stroke="#eab308" strokeWidth={3} fillOpacity={1} fill="url(#colorSolar)" />
            <Area type="monotone" dataKey="usage" name="Home Load" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorUsage)" />
            <line x1={`${(simHour/23) * 100}%`} y1="0" x2={`${(simHour/23) * 100}%`} y2="100%" stroke="#10b981" strokeDasharray="3 3" />
          </AreaChart>
        </ResponsiveContainer>
        <div className="absolute bottom-2 text-emerald-500 font-mono text-xs font-bold pointer-events-none" style={{left: `${(simHour/23) * 92}%`}}>
          NOW
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;