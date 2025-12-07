import React from 'react';
import { 
  Activity, Zap, Terminal, Network, 
  Sun, Wind, Lock, Globe, BookOpen, AlertTriangle, CheckCircle 
} from 'lucide-react';
import { motion } from 'framer-motion';

const AboutPage = () => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }} 
    animate={{ opacity: 1, y: 0 }} 
    className="max-w-4xl mx-auto pb-32 space-y-16 text-gray-300"
  >
    
    {/* --- TITLE & ABSTRACT --- */}
    <header className="text-center pt-8 border-b border-gray-800 pb-12">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold mb-6">
        <Terminal size={12} /> QUBIC | HACK THE FUTURE 2025
      </div>
      <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
        The AI Earth Protocol
      </h1>
      <p className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed mb-8">
        <span className="text-emerald-400 font-semibold">Infrastructure Arbitrage:</span> Converting Stranded Renewable Energy into Distributed Artificial Intelligence via the Qubic Network.
      </p>
      
      {/* Abstract */}
      <div className="text-left bg-[#0b0f19] p-8 rounded-2xl border-l-4 border-emerald-500 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5"><BookOpen size={120}/></div>
        <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
          <BookOpen size={16} className="text-emerald-500"/> Abstract
        </h3>
        <p className="leading-7 relative z-10">
          The transition to renewable energy is physically constrained by the limitations of the electrical transmission grid. While residential and commercial solar adoption has surged, the <strong>"Duck Curve"</strong> phenomenon results in massive energy curtailment (waste) during peak generation hours. Simultaneously, the Artificial Intelligence industry faces a bottleneck of centralized compute power and energy availability.
          <br/><br/>
          This report introduces the <strong>AI Earth Protocol</strong>, a decentralized system built on the <strong>Qubic Blockchain</strong> that converts excess solar energy into "Useful Proof of Work" (UPoW) for AI training. By analyzing global solar irradiance data and residential load profiles, we demonstrate that the average solar-equipped home generates 3-5kW of "stranded" power daily during peak hours. We propose a solution that utilizes "Infrastructure Arbitrage"—transmitting low-bandwidth AI training data via WiFi instead of transmitting high-voltage electricity via copper cables—to monetize this waste. This system essentially turns sunlight into intelligence, creating a distributed, solar-powered supercomputer that scales infinitely without requiring new grid infrastructure.
        </p>
      </div>
    </header>

    {/* --- CHAPTER 1 --- */}
    <section className="space-y-6">
      <h2 className="text-3xl font-bold text-white flex items-center gap-3">
        <span className="text-gray-600 font-mono text-xl">01.</span> The Convergence of Crises: Why The Grid Fails
      </h2>
      
      <div className="glass-card p-8 rounded-2xl space-y-6">
        <h3 className="text-xl font-bold text-white">1.1 The Global Energy Data Analysis</h3>
        <p>
          To understand why the AI Earth Protocol is necessary, we must first validate the "Excess Energy" hypothesis using universal data. A common misconception is that a home uses all the energy it generates. This is false due to <strong>temporal mismatch</strong>.
        </p>

        <div className="bg-black/30 p-6 rounded-xl border border-gray-800">
          <h4 className="text-emerald-400 font-bold mb-4 text-sm uppercase">Solar Generation vs. Consumption Profiles</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3"><span className="text-gray-500">•</span> <span><strong>Average System Size:</strong> The typical residential solar installation is 5kW to 6kW.</span></li>
            <li className="flex gap-3"><span className="text-gray-500">•</span> <span><strong>Peak Generation:</strong> At "Solar Noon" (12:00 PM - 2:00 PM), a 5kW system operating at 80% efficiency generates approximately <strong>4,000 Watts</strong> of continuous power.</span></li>
            <li className="flex gap-3"><span className="text-gray-500">•</span> <span><strong>Base Load:</strong> The average modern home has a "Base Load" (idling appliances, fridge, WiFi router) of only <strong>500 to 800 Watts</strong> during the day.</span></li>
          </ul>
          
          <div className="mt-6 p-4 bg-gray-900 rounded border border-gray-700 font-mono text-center text-lg">
            <span className="text-green-400">4000W (Gen)</span> - <span className="text-blue-400">800W (Load)</span> = <span className="text-red-500 font-bold">3200W (Excess)</span>
          </div>
        </div>

        <p>This 3.2kW of excess power is currently handled in two inefficient ways:</p>
        <ol className="list-decimal list-inside space-y-2 ml-4 text-gray-400">
          <li><strong>Export to Grid:</strong> Pushed back, causing grid saturation and voltage spikes. Utilities respond with negative buyback rates (Net Metering 3.0).</li>
          <li><strong>Curtailment:</strong> The inverter automatically "clips" (throws away) the energy to protect circuits.</li>
        </ol>

        <div className="border-t border-gray-800 pt-6">
          <h3 className="text-xl font-bold text-white mb-4">1.2 The Infrastructure Gap: The Physics of Copper</h3>
          <p className="mb-4">Why not just send this energy to a centralized AI data center?</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#0b0f19] p-4 rounded-xl text-center">
              <div className="text-red-400 font-bold mb-1">High Cost</div>
              <div className="text-xs text-gray-500">$1M - $3M per mile for HV Lines</div>
            </div>
            <div className="bg-[#0b0f19] p-4 rounded-xl text-center">
              <div className="text-orange-400 font-bold mb-1">Energy Loss</div>
              <div className="text-xs text-gray-500">8-15% lost as heat (Resistive Loss)</div>
            </div>
            <div className="bg-[#0b0f19] p-4 rounded-xl text-center">
              <div className="text-yellow-400 font-bold mb-1">Time</div>
              <div className="text-xs text-gray-500">7-10 Years for Permitting</div>
            </div>
          </div>
          <p className="mt-4 italic text-center text-emerald-400">
            "We must stop trying to move the electrons to the data center, and start moving the data center to the electrons."
          </p>
        </div>
      </div>
    </section>

    {/* --- CHAPTER 2 --- */}
    <section className="space-y-6">
      <h2 className="text-3xl font-bold text-white flex items-center gap-3">
        <span className="text-gray-600 font-mono text-xl">02.</span> The Solution: Infrastructure Arbitrage
      </h2>

      <div className="glass-card p-8 rounded-2xl space-y-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">2.1 Defining Infrastructure Arbitrage</h3>
          <p>
            Arbitrage usually refers to price. Here, we refer to <strong>Physical Friction</strong>. Moving power has high friction (heavy cables). Moving data has low friction (light pulses). The AI Earth Protocol exploits this by transmitting "Work" (AI Jobs) to the location of the energy.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-4">2.2 Why Qubic? The Technical Necessity</h3>
          <div className="space-y-4">
            <div className="flex gap-4 p-4 bg-red-900/10 border border-red-900/30 rounded-xl">
              <div className="font-bold text-red-400 w-32 shrink-0">Bitcoin</div>
              <div className="text-sm"><strong>The "Useless" Heat.</strong> Converts electricity into heat and lottery tickets (SHA-256). Secure, but produces no secondary product. We cannot justify burning terawatts just to guess random numbers.</div>
            </div>
            <div className="flex gap-4 p-4 bg-blue-900/10 border border-blue-900/30 rounded-xl">
              <div className="font-bold text-blue-400 w-32 shrink-0">Ethereum</div>
              <div className="text-sm"><strong>The "No-Load" Chain.</strong> Proof of Stake (PoS) uses minimal electricity. While eco-friendly, it cannot act as an energy sink for the 3.2kW excess, failing to solve the Duck Curve.</div>
            </div>
            <div className="flex gap-4 p-4 bg-emerald-900/10 border border-emerald-900/30 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.1)]">
              <div className="font-bold text-emerald-400 w-32 shrink-0">Qubic</div>
              <div className="text-sm">
                <strong>Useful Proof of Work (UPoW).</strong> Qubic miners do not solve random hashes. They solve specific matrix operations for <strong>Aigarth</strong> (AI). The efficiency comes from "Bare Metal" C++ code that talks directly to the CPU instruction sets (AVX-512), squeezing maximum intelligence per watt.
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-2">2.3 The Bandwidth Argument</h3>
          <p className="mb-2">A major critique is: <em>"Home WiFi is too slow to train AI."</em> This is true for Monolithic AI, but Qubic uses <strong>Evolutionary Algorithms</strong>.</p>
          <ul className="list-disc list-inside text-gray-400 ml-4">
            <li><strong>Seed:</strong> Network sends a tiny seed (Kilobytes).</li>
            <li><strong>Evolution:</strong> Miner runs billions of permutations locally (consumes 3.2kW).</li>
            <li><strong>Result:</strong> Miner sends back <em>only the winner</em> (Kilobytes).</li>
          </ul>
        </div>
      </div>
    </section>

    {/* --- CHAPTER 3 --- */}
    <section className="space-y-6">
      <h2 className="text-3xl font-bold text-white flex items-center gap-3">
        <span className="text-gray-600 font-mono text-xl">03.</span> Technical Architecture
      </h2>

      <div className="glass-card p-8 rounded-2xl space-y-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">3.1 System Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-[#0b0f19] p-4 rounded-xl border border-gray-800">
              <div className="text-emerald-400 font-bold mb-1">Physical Layer</div>
              <div className="text-xs text-gray-500">Photon-Cortex Unit (PCU). Solar Inverter + Mining Rig.</div>
            </div>
            <div className="bg-[#0b0f19] p-4 rounded-xl border border-gray-800">
              <div className="text-blue-400 font-bold mb-1">Logic Layer</div>
              <div className="text-xs text-gray-500">Helios Liquidity Engine (Smart Contract).</div>
            </div>
            <div className="bg-[#0b0f19] p-4 rounded-xl border border-gray-800">
              <div className="text-purple-400 font-bold mb-1">Network Layer</div>
              <div className="text-xs text-gray-500">WiFi Transport of AI Seeds/Weights.</div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-4">3.2 The "Hierarchy of Watts" Algorithm</h3>
          <p className="mb-4">The code polls the Smart Meter every tick (second) to ensure user trust. It never drains the battery during a blackout.</p>
          
          {/* CODE BLOCK */}
          <div className="bg-[#0d1117] border border-gray-700 rounded-xl overflow-hidden font-mono text-sm shadow-2xl">
            <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex justify-between items-center">
              <span className="text-gray-300 text-xs">helios_engine_logic.cpp</span>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              </div>
            </div>
            <div className="p-6 text-gray-300 overflow-x-auto leading-relaxed">
<pre>
<span className="text-gray-500">// Pseudo-code for Energy Distribution Logic</span>
<span className="text-pink-400">void</span> <span className="text-yellow-300">optimize_energy_flow</span>() {'{'}
    <span className="text-blue-400">float</span> solar_input  = get_solar_generation(); <span className="text-gray-500">// e.g., 4000W</span>
    <span className="text-blue-400">float</span> house_load   = get_house_consumption(); <span className="text-gray-500">// e.g., 800W</span>
    <span className="text-blue-400">float</span> battery_soc  = get_battery_level();     <span className="text-gray-500">// e.g., 85%</span>

    <span className="text-blue-400">float</span> excess_power = solar_input - house_load;

    <span className="text-gray-500">// TIER 1: SURVIVAL (Home Load)</span>
    <span className="text-pink-400">if</span> (excess_power &lt;= 0) {'{'}
        stop_mining_process();
        draw_from_battery(house_load - solar_input);
        <span className="text-pink-400">return</span>;
    {'}'}

    <span className="text-gray-500">// TIER 2: SECURITY (Battery Storage)</span>
    <span className="text-pink-400">if</span> (battery_soc &lt; 100.0) {'{'}
        charge_battery(excess_power);
        log_event(<span className="text-green-300">"Charging Storage"</span>);
    {'}'}
    
    <span className="text-gray-500">// TIER 3: INTELLIGENCE (AI Mining)</span>
    <span className="text-pink-400">else</span> {'{'}
        <span className="text-gray-500">// Battery 100%. Divert 100% excess to AI.</span>
        <span className="text-purple-400">start_mining_aigarth</span>(intensity = excess_power);
    {'}'}
{'}'}
</pre>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-2">3.3 "Follow-the-Sun" Consensus</h3>
          <p>
            Qubic's consensus acts as a global relay.
            <br/>• <strong>08:00 AM (New York):</strong> US Nodes wake up, download "Brain State" from Europe.
            <br/>• <strong>08:00 PM (New York):</strong> US Nodes power down, upload progress.
            <br/>• <strong>08:00 AM (Tokyo):</strong> Asian nodes wake up, download US progress.
            <br/>This creates a planetary supercomputer that migrates westward with the daylight.
          </p>
        </div>
      </div>
    </section>

    {/* --- CHAPTER 4 --- */}
    <section className="space-y-6">
      <h2 className="text-3xl font-bold text-white flex items-center gap-3">
        <span className="text-gray-600 font-mono text-xl">04.</span> Simulation & Financials
      </h2>

      <div className="glass-card p-8 rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4">4.1 Simulated Energy Arbitrage (Day 1)</h3>
        <div className="overflow-hidden rounded-xl border border-gray-800 mb-6">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-800 text-gray-400 font-bold uppercase">
              <tr>
                <th className="p-4">Time</th>
                <th className="p-4">Solar</th>
                <th className="p-4">Load</th>
                <th className="p-4">Excess</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 bg-[#0b0f19]">
              <tr>
                <td className="p-4 text-gray-500">06:00</td>
                <td className="p-4">0 W</td>
                <td className="p-4">400 W</td>
                <td className="p-4 text-red-400">-400 W</td>
                <td className="p-4 text-red-400">Draw Grid/Bat</td>
              </tr>
              <tr>
                <td className="p-4 text-gray-500">09:00</td>
                <td className="p-4">1500 W</td>
                <td className="p-4">600 W</td>
                <td className="p-4 text-blue-400">+900 W</td>
                <td className="p-4 text-blue-400">Charge Bat</td>
              </tr>
              <tr className="bg-emerald-900/10">
                <td className="p-4 text-white">12:00</td>
                <td className="p-4 text-white">4200 W</td>
                <td className="p-4 text-white">500 W</td>
                <td className="p-4 text-emerald-400 font-bold">+3700 W</td>
                <td className="p-4 text-emerald-400 font-bold">MINE AI</td>
              </tr>
              <tr className="bg-emerald-900/10">
                <td className="p-4 text-white">15:00</td>
                <td className="p-4 text-white">3800 W</td>
                <td className="p-4 text-white">600 W</td>
                <td className="p-4 text-emerald-400 font-bold">+3200 W</td>
                <td className="p-4 text-emerald-400 font-bold">MINE AI</td>
              </tr>
              <tr>
                <td className="p-4 text-gray-500">18:00</td>
                <td className="p-4">500 W</td>
                <td className="p-4">1500 W</td>
                <td className="p-4 text-red-400">-1000 W</td>
                <td className="p-4 text-red-400">Draw Bat</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="italic text-gray-400">
          <strong>Analysis:</strong> The simulation shows a "Mining Window" of approx 6 hours (10:00 AM to 4:00 PM), utilizing 18.5 kWh of otherwise stranded energy.
        </p>
      </div>
    </section>

    {/* --- CHAPTER 5 --- */}
    <section className="space-y-6">
      <h2 className="text-3xl font-bold text-white flex items-center gap-3">
        <span className="text-gray-600 font-mono text-xl">05.</span> Viability Analysis
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-3 text-emerald-400">
            <Lock /> <h3 className="font-bold text-white">Hardware Lifespan</h3>
          </div>
          <p className="text-sm">
            <strong>Critique:</strong> Will 100% load degrade the CPU?
            <br/><strong>Mitigation:</strong> Thermal cycling (hot/cold) is worse than steady heat. We ramp up gradually. Also, we target "Zombie Hardware" (depreciated gaming PCs) where replacement cost is negligible compared to UPoW revenue.
          </p>
        </div>
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-3 text-purple-400">
            <Globe /> <h3 className="font-bold text-white">Dust Values</h3>
          </div>
          <p className="text-sm">
            <strong>Critique:</strong> Micro-transactions are useless with gas fees.
            <br/><strong>Solution:</strong> Qubic offers feeless intra-network transfers. This allows the Helios Engine to stream "Dust" (tiny value) continuously without friction.
          </p>
        </div>
      </div>
    </section>

    {/* --- CHAPTER 6 --- */}
    <section className="space-y-6">
      <h2 className="text-3xl font-bold text-white flex items-center gap-3">
        <span className="text-gray-600 font-mono text-xl">06.</span> Scalability: DePIN
      </h2>
      <div className="glass-card p-8 rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4">Strategic Partnership: Solar Installers</h3>
        <p className="mb-6">
          Solar installers (Tesla, SunRun) need a new sales pitch as incentives dry up.
          <br/><strong>The Pitch:</strong> "Buy this solar panel. It comes with an embedded AI Earth chip. It pays for itself 30% faster by selling intelligence to the internet."
        </p>
        <div className="flex items-center gap-4 p-4 bg-blue-900/10 rounded-xl border border-blue-900/30">
          <Wind size={32} className="text-blue-400" />
          <div>
            <h4 className="font-bold text-white">Universal Adapter</h4>
            <p className="text-sm text-gray-400">Hydro dams and Wind farms can use this as a "Price Floor". If grid prices drop to $0.00, turbines switch to mining Qubic instead of stopping.</p>
          </div>
        </div>
      </div>
    </section>

    {/* --- CONCLUSION --- */}
    <section className="space-y-6">
      <h2 className="text-3xl font-bold text-white flex items-center gap-3">
        <span className="text-gray-600 font-mono text-xl">07.</span> Future Roadmap
      </h2>
      <div className="glass-card p-8 rounded-2xl text-center">
        <h3 className="text-xl font-bold text-white mb-4">Phase 2: The Weather Oracle</h3>
        <p className="text-gray-400 mb-8">
          Predictive Logic: If the Oracle predicts a storm tomorrow, the Helios Engine will stop mining <em>today</em>, preserving maximum backup power. This transforms the system into an intelligent energy hedge.
        </p>
        <div className="inline-block p-6 border-t border-gray-800 w-full">
          <p className="text-3xl font-black text-white uppercase tracking-widest leading-normal">
            "Sunlight is the Input.<br/>
            <span className="text-emerald-400">Intelligence is the Output.</span><br/>
            Qubic is the Wire."
          </p>
        </div>
      </div>
    </section>

  </motion.div>
);

export default AboutPage;