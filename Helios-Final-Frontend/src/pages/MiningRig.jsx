import React from 'react';
import { Activity, Play, Square, Terminal } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import { motion } from 'framer-motion';
import InfoTooltip from '../components/InfoTooltip';

// Now accepts 'lossData' and 'stats' directly from the Python Backend
const MiningRig = ({ isMining, setIsMining, logs, lossData, stats }) => {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center">
            AI Training Rig
            <InfoTooltip title="Real-Time Connection" text="This graph is NOT a simulation. It visualizes the actual PyTorch training loss coming from your Python backend on Port 8000."/>
          </h2>
          <p className="text-gray-400">Dedicate excess energy to distributed training jobs.</p>
        </div>
        <button
          onClick={() => setIsMining()}
          className={`flex items-center gap-3 px-6 py-3 rounded-xl font-bold transition-all ${
            isMining 
            ? 'bg-red-500/10 text-red-500 border border-red-500/50 hover:bg-red-500/20' 
            : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]'
          }`}
        >
          {isMining ? <Square size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
          {isMining ? "STOP NODE" : "START NODE"}
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
        {/* GRAPH SECTION */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-400 uppercase text-xs flex items-center gap-2"><Activity size={16}/> Live PyTorch Loss</h3>
            {isMining && <span className="text-emerald-400 text-xs font-mono animate-pulse">TRAINING EPOCH #{stats?.epoch || 0}</span>}
          </div>
          <div className="flex-1 w-full bg-black/20 rounded-xl border border-gray-800 relative overflow-hidden">
             {lossData.length > 0 ? (
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={lossData}>
                   <YAxis domain={['auto', 'auto']} hide />
                   <Line 
                     type="monotone" 
                     dataKey="value" 
                     stroke="#10b981" 
                     strokeWidth={3} 
                     dot={false}
                     isAnimationActive={false} // Disable animation for real-time speed
                   />
                 </LineChart>
               </ResponsiveContainer>
             ) : (
               <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-mono">
                 WAITING FOR BACKEND STREAM...
               </div>
             )}
          </div>
        </div>

        {/* TERMINAL SECTION */}
        <div className="glass-card rounded-2xl flex flex-col overflow-hidden bg-[#0a0a0a]">
          <div className="bg-gray-900 px-4 py-3 border-b border-gray-800 flex items-center gap-2">
            <Terminal size={14} className="text-gray-500"/>
            <span className="text-xs font-mono text-gray-400">backend_stream_v2.4.log</span>
          </div>
          <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-2 font-light">
            <div className="text-gray-500">Connecting to ws://127.0.0.1:8000...</div>
            {logs.map((log, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-gray-600">[{log.time}]</span>
                <span className={log.msg.includes('Loss') ? 'text-emerald-400' : 'text-blue-400'}>&gt; {log.msg}</span>
              </div>
            ))}
            {isMining && <div className="animate-pulse text-emerald-500">&gt; _</div>}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MiningRig;