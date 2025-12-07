import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Activity, Cpu, Wallet, ShoppingCart, Settings, 
  Sun, Battery, Zap, ChevronRight, Play, Square, 
  Terminal, ShieldCheck, Download, Share2, Info, BookOpen, 
  Network, LogOut, User, Lock, ArrowRight, Chrome, Wind, Globe 
} from 'lucide-react';
import { AreaChart, Area, Tooltip, ResponsiveContainer, LineChart, Line, YAxis } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

// --- IMPORTS ---
// We import these now instead of defining them in the file!
import Dashboard from './pages/Dashboard';
import InfoTooltip from './components/InfoTooltip';

// --- INTERNAL COMPONENTS (Keep Sidebar & Auth here for simplicity) ---

const Sidebar = ({ activeTab, setTab, onLogout }) => {
  const menu = [
    { id: 'dashboard', icon: <Activity size={20} />, label: 'Command Center' },
    { id: 'mining', icon: <Cpu size={20} />, label: 'Neural Node' },
    { id: 'market', icon: <ShoppingCart size={20} />, label: 'Model Market' },
    { id: 'wallet', icon: <Wallet size={20} />, label: 'Assets' },
    { id: 'about', icon: <BookOpen size={20} />, label: 'Whitepaper' },
  ];
  return (
    <div className="w-64 h-screen bg-[#0b0f19] border-r border-gray-800 flex flex-col p-4 fixed left-0 top-0 z-40">
      <div className="flex items-center gap-3 px-2 mb-10 mt-2">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20"><Zap className="text-white" fill="white" size={20} /></div>
        <div><h1 className="font-bold text-xl tracking-tight text-white">HELIOS</h1><p className="text-[10px] text-gray-400 uppercase tracking-widest">Protocol V2.4</p></div>
      </div>
      <div className="space-y-1 flex-1">
        {menu.map(item => (
          <button key={item.id} onClick={() => setTab(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
            {item.icon}<span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </div>
      <div className="mt-auto pt-4 border-t border-gray-800 space-y-4">
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"><LogOut size={20} /><span className="font-medium text-sm">Disconnect</span></button>
        <div className="p-4 glass-card rounded-xl border border-gray-800"><div className="flex items-center gap-2 mb-2"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div><span className="text-xs font-mono text-emerald-400 font-bold">NODE ONLINE</span></div><div className="text-[10px] text-gray-500">Tick: {Math.floor(Date.now()/1000)}</div></div>
      </div>
    </div>
  );
};

const AuthScreen = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ walletId: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    setTimeout(() => {
      // Register
      if (!isLogin) {
        if (!formData.walletId || !formData.password) { setError("All fields required"); setLoading(false); return; }
        localStorage.setItem('helios_user', JSON.stringify(formData));
        onLogin(formData.walletId); 
        setLoading(false);
        return;
      }
      // Login
      const savedUser = JSON.parse(localStorage.getItem('helios_user'));
      if (savedUser && savedUser.walletId.toLowerCase() === formData.walletId.toLowerCase() && savedUser.password === formData.password) {
        onLogin(savedUser.walletId);
      } else {
        setError("User not found. Try Registering.");
      }
      setLoading(false);
    }, 1000);
  };

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    setTimeout(() => {
      const googleUser = "google_user_882";
      localStorage.setItem('helios_user', JSON.stringify({ walletId: googleUser, password: 'x' }));
      onLogin(googleUser);
      setGoogleLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px]"></div>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md bg-[#0b0f19] border border-gray-800 p-8 rounded-3xl shadow-2xl relative z-10">
        <div className="text-center mb-8"><div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4"><Zap className="text-emerald-400 w-8 h-8" /></div><h1 className="text-3xl font-black text-white">HELIOS <span className="text-emerald-400">NODE</span></h1></div>
        <div className="flex bg-gray-900 p-1 rounded-xl mb-6"><button onClick={() => {setIsLogin(true); setError('')}} className={`flex-1 py-2 text-xs font-bold rounded-lg ${isLogin ? 'bg-gray-800 text-white shadow' : 'text-gray-500'}`}>LOGIN</button><button onClick={() => {setIsLogin(false); setError('')}} className={`flex-1 py-2 text-xs font-bold rounded-lg ${!isLogin ? 'bg-gray-800 text-white shadow' : 'text-gray-500'}`}>REGISTER</button></div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="text-xs font-bold text-gray-400 ml-1 mb-1 block">WALLET ID</label><div className="relative"><User className="absolute left-4 top-3 h-5 w-5 text-gray-500"/><input type="text" className="w-full pl-12 pr-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white outline-none focus:border-emerald-500" placeholder="Username..." value={formData.walletId} onChange={e => setFormData({...formData, walletId: e.target.value})} /></div></div>
          <div><label className="text-xs font-bold text-gray-400 ml-1 mb-1 block">PASSWORD</label><div className="relative"><Lock className="absolute left-4 top-3 h-5 w-5 text-gray-500"/><input type="password" className="w-full pl-12 pr-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white outline-none focus:border-emerald-500" placeholder="••••••" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} /></div></div>
          {error && <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs text-center font-bold animate-pulse">{error}</div>}
          <button disabled={loading} className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-all">{loading ? 'Authenticating...' : (isLogin ? 'ACCESS NODE' : 'INITIALIZE WALLET')} <ArrowRight size={18}/></button>
        </form>
        <div className="relative my-6"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-800"></div></div><div className="relative flex justify-center text-xs uppercase"><span className="bg-[#0b0f19] px-2 text-gray-500">Or continue with</span></div></div>
        <button onClick={handleGoogleLogin} disabled={googleLoading} className="w-full py-3 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors">{googleLoading ? "Connecting..." : <><Chrome size={20} className="text-blue-500" /> Sign in with Google</>}</button>
      </motion.div>
    </div>
  );
};

// --- PAGES (Other pages still internal to avoid breakage) ---

const MiningRig = ({ isMining, setIsMining, logs, lossData, stats }) => (
  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
    <header className="flex justify-between items-center"><div><h2 className="text-3xl font-bold text-white flex items-center">AI Training Rig <InfoTooltip title="Real-Time Connection" text="Visualizes actual PyTorch training loss from Python backend."/></h2><p className="text-gray-400">Dedicate excess energy to distributed training jobs.</p></div><button onClick={setIsMining} className={`flex items-center gap-3 px-6 py-3 rounded-xl font-bold transition-all ${isMining ? 'bg-red-500/10 text-red-500 border border-red-500/50' : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]'}`}>{isMining ? <Square size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />} {isMining ? "STOP NODE" : "START NODE"}</button></header>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]"><div className="lg:col-span-2 glass-card rounded-2xl p-6 flex flex-col"><div className="flex justify-between items-center mb-4"><h3 className="font-bold text-gray-400 uppercase text-xs flex items-center gap-2"><Activity size={16}/> Live PyTorch Loss</h3>{isMining && <span className="text-emerald-400 text-xs font-mono animate-pulse">TRAINING EPOCH #{stats?.epoch || 0}</span>}</div><div className="flex-1 w-full bg-black/20 rounded-xl border border-gray-800 relative overflow-hidden">{lossData && lossData.length > 0 ? (<ResponsiveContainer width="100%" height="100%"><LineChart data={lossData}><YAxis domain={['auto', 'auto']} hide /><Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} dot={false} isAnimationActive={false} /></LineChart></ResponsiveContainer>) : (<div className="absolute inset-0 flex items-center justify-center text-gray-600 font-mono">WAITING FOR BACKEND STREAM...</div>)}</div></div><div className="glass-card rounded-2xl flex flex-col overflow-hidden bg-[#0a0a0a]"><div className="bg-gray-900 px-4 py-3 border-b border-gray-800 flex items-center gap-2"><Terminal size={14} className="text-gray-500"/><span className="text-xs font-mono text-gray-400">backend_stream_v2.4.log</span></div><div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-2 font-light"><div className="text-gray-500">Connecting to ws://127.0.0.1:8000...</div>{logs.map((log, i) => (<div key={i} className="flex gap-2"><span className="text-gray-600">[{log.time}]</span><span className={log.msg.includes('Loss') ? 'text-emerald-400' : 'text-blue-400'}>&gt; {log.msg}</span></div>))}{isMining && <div className="animate-pulse text-emerald-500">&gt; _</div>}</div></div></div>
  </motion.div>
);

const Marketplace = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
    <header><h2 className="text-3xl font-bold text-white flex items-center">AI Model Marketplace <InfoTooltip title="Monetization" text="Trained models are sold here."/></h2><p className="text-gray-400">Download datasets or purchase pre-trained weights.</p></header>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{[1, 2, 3].map((item) => (<div key={item} className="glass-card rounded-2xl p-6 hover:border-emerald-500/30 transition-all cursor-pointer group"><div className="flex justify-between items-start mb-4"><div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center border border-gray-700"><Cpu className="text-gray-400 group-hover:text-emerald-400 transition-colors" /></div><span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-2 py-1 rounded border border-emerald-500/20">VERIFIED</span></div><h3 className="font-bold text-lg text-white">Llama-3-Quantized-v{item}</h3><p className="text-gray-400 text-sm mt-1 mb-4">Optimized for edge devices.</p><div className="flex justify-between items-center border-t border-gray-800 pt-4"><div className="font-mono text-white font-bold">2,500 <span className="text-gray-500 text-xs">QUBIC</span></div><button className="p-2 hover:bg-white/10 rounded-lg transition-colors"><Download size={18} /></button></div></div>))}</div>
  </motion.div>
);

const WalletView = ({ balance, pending, onClaim, userWallet }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
    <header><h2 className="text-3xl font-bold text-white flex items-center">Digital Assets <InfoTooltip title="Wallet" text="View earnings and claim rewards."/></h2><p className="text-gray-400">Manage your earnings.</p></header>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"><div className="h-64 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-900 p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden"><div className="absolute -right-12 -top-12 opacity-20"><ShieldCheck size={200} /></div><div className="relative z-10 flex justify-between"><div><p className="text-emerald-100 font-medium mb-1">Total Balance</p><h3 className="text-5xl font-bold text-white tracking-tight">{balance.toLocaleString()}</h3><span className="text-emerald-200 text-sm">QUBIC TOKENS</span></div><div className="p-3 bg-white/10 backdrop-blur-md rounded-xl h-fit cursor-pointer hover:bg-white/20"><Share2 color="white" /></div></div><div className="relative z-10"><p className="text-emerald-200 text-[10px] font-bold uppercase mb-1">Connected Wallet</p><div className="font-mono text-emerald-100 bg-black/20 p-2 rounded w-fit text-sm border border-white/10 truncate max-w-full">{userWallet || "0x71C...9B2A"}</div></div></div><div className="glass-card rounded-3xl p-8 flex flex-col justify-center items-center text-center space-y-4"><div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700"><Zap className="text-yellow-400" fill="currentColor" /></div><div><p className="text-gray-400 font-bold uppercase text-xs tracking-wider">Unclaimed Rewards</p><h3 className="text-4xl font-bold text-white mt-2">+{pending.toFixed(4)}</h3></div><button onClick={onClaim} className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors">Claim to Wallet</button></div></div>
  </motion.div>
);

const AboutPage = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto pb-32 space-y-16 text-gray-300">
    <header className="text-center pt-8 border-b border-gray-800 pb-12"><div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold mb-6"><Terminal size={12} /> QUBIC | HACK THE FUTURE 2025</div><h1 className="text-5xl font-black text-white mb-6">The AI Earth Protocol</h1><p className="text-xl text-gray-400 font-light max-w-3xl mx-auto">Infrastructure Arbitrage: Converting Stranded Renewable Energy into Distributed Artificial Intelligence.</p></header>
    <section className="space-y-6"><h2 className="text-3xl font-bold text-white flex items-center gap-3"><span className="text-gray-600 font-mono text-xl">01.</span> The Convergence of Crises</h2><div className="glass-card p-8 rounded-2xl space-y-6"><h3 className="text-xl font-bold text-white">1.1 The Global Energy Data Analysis</h3><p>To understand why the AI Earth Protocol is necessary, we must first validate the "Excess Energy" hypothesis using universal data. A common misconception is that a home uses all the energy it generates. This is false due to <strong>temporal mismatch</strong>.</p><div className="bg-black/30 p-6 rounded-xl border border-gray-800"><h4 className="text-emerald-400 font-bold mb-4 text-sm uppercase">Solar Generation vs. Consumption Profiles</h4><ul className="space-y-3 text-sm"><li className="flex gap-3"><span className="text-gray-500">•</span> <span><strong>Peak Generation:</strong> At "Solar Noon", a 5kW system generates ~<strong>4,000W</strong>.</span></li><li className="flex gap-3"><span className="text-gray-500">•</span> <span><strong>Base Load:</strong> The average home uses only <strong>800W</strong>.</span></li></ul><div className="mt-6 p-4 bg-gray-900 rounded border border-gray-700 font-mono text-center text-lg"><span className="text-green-400">4000W (Gen)</span> - <span className="text-blue-400">800W (Load)</span> = <span className="text-red-500 font-bold">3200W (Excess)</span></div></div><p>This 3.2kW of excess power is currently handled in two inefficient ways:</p><ol className="list-decimal list-inside space-y-2 ml-4 text-gray-400"><li><strong>Export to Grid:</strong> Pushed back, causing grid saturation and voltage spikes.</li><li><strong>Curtailment:</strong> The inverter automatically "clips" (throws away) the energy.</li></ol></div></section>
    <section className="space-y-6"><h2 className="text-3xl font-bold text-white flex items-center gap-3"><span className="text-gray-600 font-mono text-xl">02.</span> The Solution: Infrastructure Arbitrage</h2><div className="glass-card p-8 rounded-2xl space-y-8"><div><h3 className="text-xl font-bold text-white mb-2">2.1 Defining Infrastructure Arbitrage</h3><p>Moving power has high friction (heavy cables). Moving data has low friction (light pulses). The AI Earth Protocol exploits this by transmitting "Work" (AI Jobs) to the location of the energy.</p></div><div><h3 className="text-xl font-bold text-white mb-4">2.2 Why Qubic? The Technical Necessity</h3><div className="space-y-4"><div className="flex gap-4 p-4 bg-red-900/10 border border-red-900/30 rounded-xl"><div className="font-bold text-red-400 w-32 shrink-0">Bitcoin</div><div className="text-sm">Converts energy into heat and random numbers. Secure, but no secondary value.</div></div><div className="flex gap-4 p-4 bg-blue-900/10 border border-blue-900/30 rounded-xl"><div className="font-bold text-blue-400 w-32 shrink-0">Ethereum</div><div className="text-sm">Proof of Stake uses minimal electricity. It cannot absorb the 3.2kW excess from a solar roof.</div></div><div className="flex gap-4 p-4 bg-emerald-900/10 border border-emerald-900/30 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.1)]"><div className="font-bold text-emerald-400 w-32 shrink-0">Qubic</div><div className="text-sm"><strong>Useful Proof of Work (UPoW).</strong> Qubic miners do not solve random hashes. They solve specific matrix operations for <strong>Aigarth</strong> (AI).</div></div></div></div></div></section>
    <section className="space-y-6"><h2 className="text-3xl font-bold text-white flex items-center gap-3"><span className="text-gray-600 font-mono text-xl">03.</span> Technical Architecture</h2><div className="glass-card p-8 rounded-2xl space-y-8"><div><h3 className="text-xl font-bold text-white mb-4">3.1 System Overview</h3><div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center"><div className="bg-[#0b0f19] p-4 rounded-xl border border-gray-800"><div className="text-emerald-400 font-bold mb-1">Physical Layer</div><div className="text-xs text-gray-500">Photon-Cortex Unit (PCU). Solar Inverter + Mining Rig.</div></div><div className="bg-[#0b0f19] p-4 rounded-xl border border-gray-800"><div className="text-blue-400 font-bold mb-1">Logic Layer</div><div className="text-xs text-gray-500">Helios Liquidity Engine.</div></div><div className="bg-[#0b0f19] p-4 rounded-xl border border-gray-800"><div className="text-purple-400 font-bold mb-1">Network Layer</div><div className="text-xs text-gray-500">WiFi Transport.</div></div></div></div><div><h3 className="text-xl font-bold text-white mb-4">3.2 The "Hierarchy of Watts" Algorithm</h3><p className="mb-4">The code polls the Smart Meter every tick (second) to ensure user trust. It never drains the battery during a blackout.</p><div className="bg-[#0d1117] border border-gray-700 rounded-xl overflow-hidden font-mono text-sm shadow-2xl"><div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex justify-between items-center"><span className="text-gray-300 text-xs">helios_engine_logic.cpp</span></div><div className="p-6 text-gray-300 overflow-x-auto leading-relaxed"><pre><span className="text-gray-500">// Pseudo-code for Energy Distribution Logic</span><br/><span className="text-pink-400">void</span> <span className="text-yellow-300">optimize_energy_flow</span>() {'{'}<br/>    <span className="text-blue-400">float</span> excess = solar_input - house_load;<br/>    <span className="text-pink-400">if</span> (excess &gt; 0 && battery == 100) {'{'}<br/>        <span className="text-purple-400">start_mining_aigarth</span>(intensity = excess);<br/>    {'}'}<br/>{'}'}</pre></div></div></div></div></section>
    <section className="space-y-6"><h2 className="text-3xl font-bold text-white flex items-center gap-3"><span className="text-gray-600 font-mono text-xl">04.</span> Simulation & Financials</h2><div className="glass-card p-8 rounded-2xl"><h3 className="text-xl font-bold text-white mb-4">4.1 Simulated Energy Arbitrage (Day 1)</h3><div className="overflow-hidden rounded-xl border border-gray-800 mb-6"><table className="w-full text-left text-sm"><thead className="bg-gray-800 text-gray-400 font-bold uppercase"><tr><th className="p-4">Time</th><th className="p-4">Solar</th><th className="p-4">Load</th><th className="p-4">Excess</th><th className="p-4">Action</th></tr></thead><tbody className="divide-y divide-gray-800 bg-[#0b0f19]"><tr><td className="p-4 text-gray-500">06:00</td><td className="p-4">0 W</td><td className="p-4">400 W</td><td className="p-4 text-red-400">-400 W</td><td className="p-4 text-red-400">Draw Grid/Bat</td></tr><tr><td className="p-4 text-gray-500">09:00</td><td className="p-4">1500 W</td><td className="p-4">600 W</td><td className="p-4 text-blue-400">+900 W</td><td className="p-4 text-blue-400">Charge Bat</td></tr><tr className="bg-emerald-900/10"><td className="p-4 text-white">12:00</td><td className="p-4 text-white">4200 W</td><td className="p-4 text-white">500 W</td><td className="p-4 text-emerald-400 font-bold">+3700 W</td><td className="p-4 text-emerald-400 font-bold">MINE AI (UPoW)</td></tr><tr className="bg-emerald-900/10"><td className="p-4 text-white">15:00</td><td className="p-4 text-white">3800 W</td><td className="p-4 text-white">600 W</td><td className="p-4 text-emerald-400 font-bold">+3200 W</td><td className="p-4 text-emerald-400 font-bold">MINE AI (UPoW)</td></tr><tr><td className="p-4 text-gray-500">18:00</td><td className="p-4">500 W</td><td className="p-4">1500 W</td><td className="p-4 text-red-400">-1000 W</td><td className="p-4 text-red-400">Draw Bat</td></tr></tbody></table></div></div></section>
    <section className="space-y-6"><h2 className="text-3xl font-bold text-white flex items-center gap-3"><span className="text-gray-600 font-mono text-xl">05.</span> Scalability & DePIN</h2><div className="glass-card p-8 rounded-2xl"><h3 className="text-xl font-bold text-white mb-4">Strategic Partnership: Solar Installers</h3><p className="mb-6">Solar installers need a new sales pitch as incentives dry up.<br/><strong>The Pitch:</strong> "Buy this solar panel. It comes with an embedded AI Earth chip. It pays for itself 30% faster by selling intelligence to the internet."</p><div className="flex items-center gap-4 p-4 bg-blue-900/10 rounded-xl border border-blue-900/30"><Wind size={32} className="text-blue-400" /><div><h4 className="font-bold text-white">Universal Adapter</h4><p className="text-sm text-gray-400">Hydro dams and Wind farms can use this as a "Price Floor". If grid prices drop to $0.00, turbines switch to mining Qubic instead of stopping.</p></div></div></div></section>
  </motion.div>
);

// --- MAIN APP ---
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userWallet, setUserWallet] = useState("");
  const [activeTab, setTab] = useState('dashboard');
  
  // Backend State
  const [isMining, setIsMining] = useState(false);
  const [balance, setBalance] = useState(12450);
  const [pending, setPending] = useState(0);
  const [lossData, setLossData] = useState([]);
  const [logs, setLogs] = useState([]);
  const [backendStats, setBackendStats] = useState({});

  // Sim State
  const [simHour, setSimHour] = useState(12);
  const [battery, setBattery] = useState(50);

  // Auth Check
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('helios_user');
      if (savedUser) {
        const { walletId } = JSON.parse(savedUser);
        if(walletId) { setUserWallet(walletId); setIsAuthenticated(true); }
      }
    } catch(e) { localStorage.removeItem('helios_user'); }
  }, []);

  const handleLogin = (walletId) => { setUserWallet(walletId); setIsAuthenticated(true); };
  const handleLogout = () => { localStorage.removeItem('helios_user'); setIsAuthenticated(false); setUserWallet(""); };

  // Logic Engine
  const stats = useMemo(() => {
    let s = 0; if (simHour >= 6 && simHour <= 19) s = 5000 * Math.sin((simHour - 6) * Math.PI / 13) * 0.9;
    let l = (simHour >= 17 && simHour <= 22) ? 3500 : 800;
    let net = s - l;
    let status = "IDLE";
    if (net > 0) status = battery < 100 ? "CHARGING" : "MINING";
    else status = "DRAINING";
    return { solar: s, load: l, net, status, battery };
  }, [simHour, battery]);

  // Data Polling
  useEffect(() => {
    if (!isAuthenticated) return;
    const interval = setInterval(async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/status");
        const data = await res.json();
        setBackendStats(data); setIsMining(data.is_mining); setBalance(data.balance); setPending(data.pending);
        if (data.is_mining) {
          setLossData(prev => { const n = [...prev, { value: data.loss }]; if (n.length > 50) n.shift(); return n; });
          const time = new Date().toLocaleTimeString('en-US', {hour12:false});
          setLogs(prev => [{time, msg: `Epoch ${data.epoch} | Loss: ${data.loss.toFixed(6)}`}, ...prev].slice(0, 10));
        }
      } catch (err) {}
    }, 500);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  // Triggers
  useEffect(() => {
    if (!isAuthenticated) return;
    if(stats.status === 'MINING' && !isMining) fetch("http://127.0.0.1:8000/start", { method: "POST" });
    else if (stats.status !== 'MINING' && isMining) fetch("http://127.0.0.1:8000/stop", { method: "POST" });
  }, [stats.status, isAuthenticated]);

  const toggleManual = () => { const action = isMining ? "stop" : "start"; fetch(`http://127.0.0.1:8000/${action}`, { method: "POST" }); };
  const handleClaim = () => { fetch("http://127.0.0.1:8000/claim", { method: "POST" }); };

  if (!isAuthenticated) return <AuthScreen onLogin={handleLogin} />;

  return (
    <div className="bg-[#030712] min-h-screen text-gray-100 font-sans flex overflow-hidden">
      <Sidebar activeTab={activeTab} setTab={setTab} onLogout={handleLogout} />
      <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen relative">
        <div className="max-w-7xl mx-auto mt-4">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && <Dashboard key="dash" simHour={simHour} setSimHour={setSimHour} stats={stats} />}
            {activeTab === 'mining' && <MiningRig key="mine" isMining={isMining} setIsMining={toggleManual} logs={logs} lossData={lossData} stats={backendStats} />}
            {activeTab === 'market' && <Marketplace key="market" />}
            {activeTab === 'wallet' && <WalletView key="wallet" balance={balance} pending={pending} onClaim={handleClaim} userWallet={userWallet} />}
            {activeTab === 'about' && <AboutPage key="about" />}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default App;