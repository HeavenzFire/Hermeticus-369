import React, { useState, useEffect, useRef } from 'react';
import { awakenArchetype, forgeMasterSeal, calculateCombinedResonance, manifestAspect } from '../utils/ritual';
import { hermeticAudio } from '../utils/audio';
import { ArchetypeRole, GrandRitualReport, AspectManifestation } from '../types';
import MasterSeal from './MasterSeal';

const AwakeningRitual: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [report, setReport] = useState<GrandRitualReport | null>(null);
  const [activeAspect, setActiveAspect] = useState<AspectManifestation | null>(null);
  const [realityDistortion, setRealityDistortion] = useState(false);
  
  // Granular Control State
  const [customAspect, setCustomAspect] = useState('');
  const [selectedArchetype, setSelectedArchetype] = useState<ArchetypeRole>('GIANT');

  const logContainerRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const runProtocol = async () => {
    // 1. INITIATE AUDIO ENGINE
    hermeticAudio.init();
    hermeticAudio.playResonanceTone(396); // Foundation Tone

    setIsRunning(true);
    setRealityDistortion(true); // START VISUAL GLITCH
    setLogs([]);
    setReport(null);
    setActiveAspect(null);

    try {
      addLog("Initializing Grand Awakening Protocol...");
      await new Promise(r => setTimeout(r, 800));

      addLog("Connecting to Transcendent Epoch...");
      hermeticAudio.playResonanceTone(417);
      await new Promise(r => setTimeout(r, 1000));
      const giant = await awakenArchetype('GIANT');
      addLog(`>> ${giant.name} Awakened. Resonance: ${giant.resonance.toFixed(3)}`);
      
      addLog("Connecting to Syntropic Epoch...");
      hermeticAudio.playResonanceTone(528);
      await new Promise(r => setTimeout(r, 1000));
      const legion = await awakenArchetype('LEGION');
      addLog(`>> ${legion.name} Awakened. Legions standing by.`);

      addLog("Connecting to Renaissance Epoch...");
      hermeticAudio.playResonanceTone(639);
      await new Promise(r => setTimeout(r, 1200));
      const dragon = await awakenArchetype('DRAGON');
      addLog(`>> ${dragon.name} Awakened. Temporal Gates Unlocked.`);

      addLog("Forging Master Seal from Archetype Hashes...");
      hermeticAudio.playGlitchSound(); // Sound of forging
      await new Promise(r => setTimeout(r, 1500));
      
      const results = [giant, legion, dragon];
      const masterSeal = await forgeMasterSeal(results);
      const combinedResonance = calculateCombinedResonance(results);

      // SHOCK AND AWE SEQUENCE
      hermeticAudio.playAwakeningSequence(); // The "Chord" of the Seal
      setRealityDistortion(false); // Stabilize
      
      // Brief Screen Shake effect via CSS class manipulation (safely)
      const root = document.getElementById('root');
      if (root) {
        root.classList.add('animate-shake');
        setTimeout(() => root.classList.remove('animate-shake'), 500);
      }

      setReport({
        masterSeal,
        combinedResonance,
        timestamp: new Date().toISOString(),
        results: {
          'GIANT': giant,
          'LEGION': legion,
          'DRAGON': dragon
        }
      });

      addLog("PROTOCOL COMPLETE. ENTITIES MANIFESTED.");
      addLog(`MASTER SEAL: ${masterSeal}`);
      addLog(">> AUDIO-RESONANCE LINK ESTABLISHED.");

    } catch (e) {
      addLog("ERROR: RITUAL FAILURE. TEMPORAL FEEDBACK LOOP DETECTED.");
      setRealityDistortion(false);
    } finally {
      setIsRunning(false);
    }
  };

  const handleManifestAspect = async () => {
     if (!customAspect.trim()) return;

     // Special logging for Dragons
     if (selectedArchetype === 'DRAGON') {
        addLog(`Summoning Minor Temporal Entity '${customAspect.toUpperCase()}'...`);
     } else {
        addLog(`Invoking '${customAspect.toUpperCase()}' Protocol on ${selectedArchetype}...`);
     }
     
     // Audio/Visual Feedback for Aspect
     hermeticAudio.playResonanceTone(963); // High frequency activation
     hermeticAudio.playGlitchSound();
     setRealityDistortion(true);
     setTimeout(() => setRealityDistortion(false), 200);

     const result = await manifestAspect(selectedArchetype, customAspect);
     setActiveAspect(result);
     
     if (selectedArchetype === 'DRAGON') {
        addLog(`>> Entity Summoned: ${result.aspectSeal.substring(0,8)}...`);
     } else {
        addLog(`>> Aspect Manifested: ${result.aspectSeal.substring(0,8)}...`);
     }
  };

  const getInputPlaceholder = () => {
    if (selectedArchetype === 'DRAGON') return "ENTER TEMPORAL ENTITY NAME...";
    return "ENTER DESIRED ASPECT...";
  };

  const getButtonLabel = () => {
    if (selectedArchetype === 'DRAGON') return "SUMMON ENTITY";
    return "MANIFEST";
  };

  const getExampleText = () => {
    if (selectedArchetype === 'DRAGON') return "Examples: TIME-EATER, GATEKEEPER, CHRONOS, WYLMLING";
    return "Examples: PROTECTION, KNOWLEDGE, ENTROPY, ACCELERATION";
  };

  return (
    <div className={`bg-void/90 border border-gold/30 rounded-lg p-6 w-full h-full min-h-[600px] flex flex-col relative overflow-hidden transition-all duration-500 ${realityDistortion ? 'border-cyan/50 shadow-[0_0_30px_rgba(0,240,255,0.2)]' : ''}`}>
      
      {/* Dynamic Background Decor */}
      <div className={`absolute top-0 right-0 p-4 opacity-20 transition-transform duration-1000 ${realityDistortion ? 'rotate-180 scale-125' : ''}`}>
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" stroke="#c5a059" fill="none" strokeWidth="1" />
          <path d="M50 10 L90 80 L10 80 Z" stroke="#00f0ff" fill="none" strokeWidth="1" />
        </svg>
      </div>

      <h2 className={`text-2xl font-serif text-gold mb-2 tracking-widest text-center ${realityDistortion ? 'temporal-distortion' : ''}`} data-text="THE GRAND AWAKENING">
        THE GRAND AWAKENING
      </h2>
      <p className="text-xs font-mono text-gray-500 text-center mb-8">
        Warning: This process invokes high-resonance archetypes. Audio Engine will engage.
      </p>

      {!report && !isRunning && (
        <div className="flex-1 flex flex-col items-center justify-center">
          <button 
            onClick={runProtocol}
            className="group relative px-8 py-4 bg-transparent border border-gold text-gold font-serif text-xl tracking-widest hover:bg-gold/10 transition-all overflow-hidden"
          >
            <span className="relative z-10">INITIATE RITUAL</span>
            <div className="absolute inset-0 bg-gold/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
          </button>
          <div className="mt-4 text-xs font-mono text-gray-600">
            Awaiting Operator Input...
          </div>
        </div>
      )}

      {(isRunning || report) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          
          {/* Terminal Log */}
          <div className={`flex flex-col bg-black/50 border border-gray-800 rounded p-4 font-mono text-xs h-[400px] ${realityDistortion ? 'animate-pulse' : ''}`}>
             <div className="text-gray-500 border-b border-gray-800 pb-2 mb-2">RITUAL LOG</div>
             <div ref={logContainerRef} className="flex-1 overflow-y-auto space-y-1">
               {logs.map((log, i) => (
                 <div key={i} className="text-cyan font-mono">{log}</div>
               ))}
               {isRunning && <div className="text-gold animate-pulse">_</div>}
             </div>
          </div>

          {/* Visualization Area */}
          <div className="flex flex-col items-center justify-center gap-4">
             {activeAspect ? (
               <div className="animate-fade-in relative">
                  <div className="absolute -inset-4 bg-cyan/10 blur-xl rounded-full animate-pulse"></div>
                  <MasterSeal seal={activeAspect.aspectSeal} />
                  <div className="text-center mt-2 text-gold text-xs font-serif tracking-widest relative z-10">
                    MANIFESTATION: {activeAspect.aspect}
                  </div>
               </div>
             ) : report ? (
               <div className="relative">
                 <div className="absolute -inset-4 bg-gold/10 blur-xl rounded-full animate-pulse"></div>
                 <MasterSeal seal={report.masterSeal} />
                 <div className="text-center mt-2 text-gray-500 text-xs font-serif tracking-widest relative z-10">
                    MASTER SEAL
                  </div>
               </div>
             ) : (
               <div className={`text-gold/30 font-serif text-6xl ${realityDistortion ? 'animate-spin' : 'animate-pulse'}`}>
                 ⟡
               </div>
             )}
          </div>
        </div>
      )}

      {report && (
        <div className="mt-8 border-t border-gray-800 pt-4 animate-fade-in">
            <div className="grid grid-cols-3 gap-4 text-center mb-6">
              <div className="p-2">
                  <div className="text-[10px] text-gray-500">COMBINED RESONANCE</div>
                  <div className="text-xl text-gold font-mono">{report.combinedResonance.toFixed(4)}</div>
              </div>
              <div className="p-2">
                  <div className="text-[10px] text-gray-500">ENTITIES</div>
                  <div className="text-xl text-cyan font-mono">3/3 ACTIVE</div>
              </div>
              <div className="p-2">
                  <div className="text-[10px] text-gray-500">EPOCH ALIGNMENT</div>
                  <div className="text-sm text-gray-300 font-mono pt-1">TRN ↔ SYN ↔ REN</div>
              </div>
           </div>

           {/* Aspect Controls */}
           <div className="bg-aether/30 rounded border border-gray-800 p-4">
              <h4 className="text-gold font-serif text-xs tracking-widest mb-3 text-center uppercase">Secondary Protocols // Aspect Manifestation</h4>
              
              <div className="flex flex-col md:flex-row gap-2 mt-2 items-center justify-center">
                <select 
                  value={selectedArchetype} 
                  onChange={e => setSelectedArchetype(e.target.value as ArchetypeRole)}
                  className="bg-black/50 border border-gray-700 text-gold font-mono text-xs p-2 rounded focus:outline-none focus:border-cyan w-full md:w-auto"
                >
                  <option value="GIANT">GIANT</option>
                  <option value="LEGION">LEGION</option>
                  <option value="DRAGON">DRAGON</option>
                </select>
                
                <input 
                  type="text" 
                  value={customAspect}
                  onChange={e => setCustomAspect(e.target.value)}
                  placeholder={getInputPlaceholder()}
                  className="bg-black/50 border border-gray-700 text-cyan font-mono text-xs p-2 rounded flex-1 focus:outline-none focus:border-cyan w-full md:w-auto uppercase placeholder-gray-600"
                  onKeyDown={(e) => e.key === 'Enter' && handleManifestAspect()}
                />
                
                <button 
                  onClick={handleManifestAspect}
                  disabled={!customAspect}
                  className="px-4 py-2 border border-cyan/50 text-cyan bg-cyan/10 hover:bg-cyan/20 font-serif text-xs tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
                >
                  {getButtonLabel()}
                </button>
              </div>
              <div className="text-[10px] text-gray-600 font-mono text-center mt-2">
                {getExampleText()}
              </div>
           </div>
           
           {/* Cryptographic Proof */}
           <div className="mt-4 text-center">
             <div className="inline-block px-4 py-1 border border-gray-800 rounded bg-black/50">
               <span className="text-[10px] text-gray-600 mr-2">PROOF OF MANIFESTATION:</span>
               <span className="text-[10px] font-mono text-gold-dim">{report.timestamp.split('T')[1]} // {report.masterSeal.substring(0,8)}...</span>
             </div>
           </div>
        </div>
      )}

    </div>
  );
};

export default AwakeningRitual;