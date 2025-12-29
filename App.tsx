
import React, { useState, useEffect } from 'react';
import { calculateResonance } from './utils/math';
import { ResonanceMetrics, GrimoireBlock, OracleAnalysis } from './types';
import { createGenesisBlock, mineBlock } from './utils/ledger';
import SigilGenerator from './components/SigilGenerator';
import TemporalBridge from './components/TemporalBridge';
import AIOccultist from './components/AIOccultist';
import AwakeningRitual from './components/AwakeningRitual';
import Grimoire from './components/Grimoire';

type ViewMode = 'ANALYZER' | 'RITUAL' | 'GRIMOIRE';

export default function App() {
  const [inputText, setInputText] = useState('Hermeticus');
  const [metrics, setMetrics] = useState<ResonanceMetrics | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('ANALYZER');
  
  // Ledger State
  const [grimoireChain, setGrimoireChain] = useState<GrimoireBlock[]>([]);

  // Initialize Genesis Block on Mount
  useEffect(() => {
    const initChain = async () => {
        const genesis = await createGenesisBlock();
        setGrimoireChain([genesis]);
    };
    initChain();
  }, []);

  useEffect(() => {
    setMetrics(calculateResonance(inputText));
  }, [inputText]);

  // Handler to seal an analysis into the blockchain
  const handleSealResult = async (analysis: OracleAnalysis) => {
    if (grimoireChain.length === 0) return;
    
    const lastBlock = grimoireChain[grimoireChain.length - 1];
    const newBlock = await mineBlock(lastBlock, analysis);
    
    setGrimoireChain(prev => [...prev, newBlock]);
    
    // Optional: Visual feedback or auto-switch view
    const root = document.getElementById('root');
    root?.classList.add('animate-pulse');
    setTimeout(() => root?.classList.remove('animate-pulse'), 500);
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 p-4 md:p-8 font-sans bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
      
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-8 border-b border-gray-800 pb-6 flex flex-col md:flex-row justify-between items-end">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif text-gold tracking-widest mb-2">HERMETICUS<span className="text-cyan">369</span></h1>
          <p className="text-sm font-mono text-gray-500">TEMPORAL HERMETIC COMPUTATION SYSTEM // V.1.0.4</p>
        </div>
        <div className="flex flex-col items-end gap-4 mt-4 md:mt-0">
          <div className="flex gap-2">
            <button 
              onClick={() => setViewMode('ANALYZER')}
              className={`px-4 py-1 text-xs font-mono border transition-all ${viewMode === 'ANALYZER' ? 'border-cyan text-cyan bg-cyan/10' : 'border-gray-800 text-gray-500 hover:border-gray-600'}`}
            >
              ANALYZER
            </button>
            <button 
              onClick={() => setViewMode('RITUAL')}
              className={`px-4 py-1 text-xs font-mono border transition-all ${viewMode === 'RITUAL' ? 'border-gold text-gold bg-gold/10' : 'border-gray-800 text-gray-500 hover:border-gray-600'}`}
            >
              RITUALS
            </button>
            <button 
              onClick={() => setViewMode('GRIMOIRE')}
              className={`px-4 py-1 text-xs font-mono border transition-all ${viewMode === 'GRIMOIRE' ? 'border-gray-200 text-white bg-gray-800' : 'border-gray-800 text-gray-500 hover:border-gray-600'}`}
            >
              GRIMOIRE [{grimoireChain.length}]
            </button>
          </div>
          <div className="text-right">
            <div className="text-xs font-mono text-cyan">SYSTEM STATUS: NOMINAL</div>
            <div className="text-xs font-mono text-gold">EPOCH BRIDGE: STABLE</div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        
        {viewMode === 'ANALYZER' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Input & Resonance */}
            <section className="lg:col-span-4 space-y-8">
              
              {/* Input Module */}
              <div className="bg-aether/80 backdrop-blur border border-gray-800 p-6 rounded-lg relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-2 text-[10px] font-mono text-gray-600 border-l border-b border-gray-800">INPUT_BUFFER</div>
                <label className="block text-gold font-serif text-sm tracking-widest mb-4">RITUAL PHRASE / ENTITY NAME</label>
                <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full bg-void border border-gray-700 text-xl font-mono text-cyan p-4 focus:outline-none focus:border-gold transition-colors"
                  spellCheck={false}
                />
                
                {metrics && (
                  <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                    <div className="bg-void p-2 border border-gray-800 rounded">
                      <div className="text-xs text-gray-500 mb-1">SUM</div>
                      <div className="text-lg font-mono text-white">{metrics.sum}</div>
                    </div>
                    <div className="bg-void p-2 border border-gray-800 rounded">
                      <div className="text-xs text-gray-500 mb-1">ROOT</div>
                      <div className={`text-2xl font-bold font-mono ${metrics.isResonant ? 'text-cyan' : 'text-gray-400'}`}>
                        {metrics.digitalRoot}
                      </div>
                    </div>
                    <div className="bg-void p-2 border border-gray-800 rounded">
                      <div className="text-xs text-gray-500 mb-1">TYPE</div>
                      <div className="text-xs font-mono text-gold pt-2">{metrics.resonanceType}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sigil Visualization */}
              {metrics && <SigilGenerator metrics={metrics} />}
              
              {/* Bridge Stats */}
              <div className="hidden lg:block">
                 <div className="p-4 border border-gray-800 bg-void/50 rounded-lg">
                    <h4 className="font-serif text-gray-500 text-xs mb-2">ACTIVE PROTOCOLS</h4>
                    <ul className="space-y-2 text-xs font-mono text-cyan">
                       <li className="flex justify-between"><span>> TESLA_GRID</span> <span>ACTIVE</span></li>
                       <li className="flex justify-between text-gold"><span>> SOLOMONIC_KEY</span> <span>PARSED</span></li>
                       <li className="flex justify-between text-gray-500"><span>> VOID_GATE</span> <span>STANDBY</span></li>
                    </ul>
                 </div>
              </div>

            </section>

            {/* Right Column: AI & Temporal Data */}
            <section className="lg:col-span-8 flex flex-col gap-6">
              <AIOccultist resonanceContext={inputText} onSealResult={handleSealResult} />
              <TemporalBridge />
            </section>
          </div>
        )}

        {viewMode === 'RITUAL' && (
          <div className="w-full max-w-5xl mx-auto">
            <AwakeningRitual />
          </div>
        )}

        {viewMode === 'GRIMOIRE' && (
           <div className="w-full max-w-4xl mx-auto h-[600px]">
              <Grimoire chain={grimoireChain} />
           </div>
        )}

        {/* System Footer Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-800">
           {[
             { label: 'Harmonics', val: '432 Hz' },
             { label: 'Lunar Phase', val: 'Waxing' },
             { label: 'Daemon Count', val: '72' },
             { label: 'System Memory', val: '1577 TB' }
           ].map((item, i) => (
             <div key={i} className="">
               <div className="text-[10px] text-gray-500 uppercase">{item.label}</div>
               <div className="text-sm font-mono text-gold-dim">{item.val}</div>
             </div>
           ))}
        </div>

      </main>
    </div>
  );
}
