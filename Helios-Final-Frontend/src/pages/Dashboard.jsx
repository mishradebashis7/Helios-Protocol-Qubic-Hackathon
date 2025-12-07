import React, { useState, useEffect, useMemo } from 'react';
import { Sun, Battery, Zap, Settings } from 'lucide-react';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import InfoTooltip from '../components/InfoTooltip';

const Dashboard = ({ onStatusChange }) => {
  // 1. Internal State
  const [simHour, setSimHour] = useState(12);
  const [battery, setBattery] = useState(100); // Default to full for the 12:00 start

  // 2. FIXED: Deterministic Battery Physics
  // This calculates battery level based on the TIME, not by adding/subtracting steps.
  // It guarantees the battery looks right even if you drag the slider fast.
  // 2. FIXED: Financial Simulation Logic (Aligned with Table 4.1)
  useEffect(() => {
    let level = 0;

    if (simHour < 6) {
      // 00:00 - 06:00: Night Idle / Slow Drain
      // Logic: Drains from 50% down to 20% just before sunrise
      level = 50 - (simHour / 6) * 30; 

    } else if (simHour >= 6 && simHour < 11) {
      // 06:00 - 11:00: Rapid Charging Phase
      // Logic: Matches 09:00 "Charge Bat" row. Ramps 20% -> 100%
      level = 20 + ((simHour - 6) / 5) * 80;

    } else if (simHour >= 11 && simHour < 16) {
      // 11:00 - 16:00: Saturation / Mining Phase
      // Logic: Matches 12:00 & 15:00 "MINE AI" rows. 
      // Battery holds at 100% so excess flows to AI.
      level = 100;

    } else {
      // 16:00 - 23:00: Evening Peak Load
      // Logic: Matches 18:00 "Draw Bat" row.
      // Drains from 100% down to 50% as sun sets and usage spikes.
      level = 100 - ((simHour - 16) / 7) * 50;
    }

    setBattery(Math.round(Math.max(0, Math.min(100, level))));
  }, [simHour]);

  // 3. Logic Engine
  const stats = useMemo(() => {
    let s = 0;
    // Solar Curve (Bell shape peaking at noon)
    if (simHour >= 6 && simHour <= 19) {
        s = 5000 * Math.sin((simHour - 6) * Math.PI / 13);
        s = s * (0.9 + Math.random() * 0.1); // Add slight jitter for realism
    }
    // Load Curve (Higher in evening)
    let l = (simHour >= 17 && simHour <= 22) ? 3500 : 800;
    let net = s - l;
    
    // Determine Status
    let status = "IDLE";
    if (net > 0) {
        // If we have excess power, and battery is nearly full (>90%), we mine!
        status = battery > 90 ? "MINING" : "CHARGING";
    } else {
        status = "DRAINING";
    }
    return { solar: s, load: l, net, status, battery };
  }, [simHour, battery]);

  // 4. Signal Parent (App.jsx)
  useEffect(() => {
    if (onStatusChange) {
      onStatusChange(stats.status);
    }
  }, [stats.status]);

  // 5. Chart Data
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
      
      {/* HEADER */}
      <header className="flex justify-between items-end border-b border-gray-800 pb-6">
        <div>
            <h2 className="text-4xl font-black text-white flex items-center gap-3">
              Command Center 
              <InfoTooltip title="System Brain" text="This dashboard visualizes the 'Infrastructure Arbitrage'. It monitors your solar generation vs. home usage to find 'Stranded Energy' (Waste)." />
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

      {/* STATUS CARD */}
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
              <InfoTooltip title="Decision Logic" text="The Smart Contract decides in real-time: If Battery < 90%, charge it. If Battery is full, Mine Qubic. If no sun, drain battery." />
            </div>
            
            <h1 className="text-6xl font-black text-white tracking-tight mb-8 drop-shadow-lg">
              {stats.status}
            </h1>
            
            {/* METRICS GRID */}
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
                    {/* Visual Battery Bar */}
                    <div className="w-full h-1 bg-gray-700 mt-3 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 transition-all duration-300" style={{width: `${stats.battery}%`}}></div>
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

      {/* CONTROLS */}
      <div className="glass-card p-8 rounded-3xl border border-gray-800">
        <div className="flex justify-between mb-6">
            <label className="font-bold text-white flex items-center gap-3 text-lg">
                <div className="p-2 bg-gray-800 rounded-lg"><Settings size={20} className="text-gray-400"/></div>
                Time Controller
                <InfoTooltip title="Demo Control" text="Drag this slider to simulate the passage of a day. Witness the 'Duck Curve' phenomenon where solar peaks at noon (12:00)." />
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
            <span className="text-blue-400">Night (00:00)</span>
            <span className="text-yellow-400">Noon (12:00)</span>
            <span className="text-blue-400">Night (23:00)</span>
        </div>
      </div>

      {/* CHART */}
      <div className="glass-card p-6 rounded-2xl h-[350px] border border-gray-800 relative">
        <div className="flex justify-between items-center mb-6">
           <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
             Daily Energy Projection
             <InfoTooltip title="The Duck Curve" text="The Orange line is Solar Power. The Blue line is Usage. The gap between them is the wasted energy we are capturing for AI." />
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
            
            {/* Visual Indicator of Current Time */}
            <line 
                x1={`${(simHour/23) * 100}%`} 
                y1="0" 
                x2={`${(simHour/23) * 100}%`} 
                y2="100%" 
                stroke="#10b981" 
                strokeWidth={2}
                strokeDasharray="5 5" 
            />
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