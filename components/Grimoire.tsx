
import React from 'react';
import { GrimoireBlock } from '../types';

interface Props {
  chain: GrimoireBlock[];
}

const Grimoire: React.FC<Props> = ({ chain }) => {
  return (
    <div className="w-full h-full bg-void/90 p-6 border border-gray-800 rounded-lg flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <h1 className="text-9xl font-serif text-gold">LIBER</h1>
      </div>
      
      <div className="flex justify-between items-end mb-8 border-b border-gray-800 pb-4 z-10">
        <div>
           <h2 className="text-2xl font-serif text-gold tracking-widest">THE IMMUTABLE GRIMOIRE</h2>
           <p className="text-xs font-mono text-gray-500">SOVEREIGN INFRASTRUCTURE // CHAIN_LENGTH: {chain.length}</p>
        </div>
        <div className="text-right">
           <div className="text-[10px] font-mono text-cyan">INTEGRITY: VERIFIED</div>
           <div className="text-[10px] font-mono text-gray-500">LATEST HASH: {chain[chain.length - 1]?.hash.substring(0, 8)}...</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-8 z-10 custom-scrollbar">
        {chain.map((block, i) => (
          <div key={block.hash} className="relative group">
            {/* Connector Line */}
            {i < chain.length - 1 && (
              <div className="absolute left-4 top-full h-8 w-px bg-gray-800 group-hover:bg-gold/50 transition-colors"></div>
            )}
            
            <div className={`p-4 rounded border transition-all duration-300 ${
                block.sealType === 'GENESIS' 
                ? 'bg-gold/5 border-gold/30' 
                : 'bg-aether border-gray-800 hover:border-gold/50'
            }`}>
              
              {/* Block Header */}
              <div className="flex justify-between items-center mb-3">
                 <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold font-mono ${
                        block.sealType === 'GENESIS' ? 'bg-gold text-black' : 'bg-gray-800 text-gray-400'
                    }`}>
                        {block.index}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-500 uppercase">TIMESTAMP</span>
                        <span className="text-xs font-mono text-gray-300">{new Date(block.timestamp).toLocaleTimeString()}</span>
                    </div>
                 </div>
                 <div className="text-right flex flex-col items-end">
                    <span className="text-[10px] text-gray-500 uppercase">BLOCK HASH</span>
                    <span className="text-xs font-mono text-cyan break-all">{block.hash.substring(0, 16)}...</span>
                 </div>
              </div>

              {/* Payload */}
              <div className="pl-11">
                 <div className="text-[10px] text-gray-500 mb-1">PREV_HASH: <span className="font-mono text-gray-600">{block.previousHash.substring(0, 16)}...</span></div>
                 
                 <div className="mt-3 p-3 bg-black/40 rounded border border-gray-800/50">
                    {block.sealType === 'GENESIS' ? (
                        <div className="text-gold font-serif text-sm tracking-widest text-center py-2">
                            {block.data.synthesis}
                        </div>
                    ) : (
                        <div className="space-y-2">
                             <div className="flex justify-between items-center border-b border-gray-800 pb-1 mb-1">
                                 <span className="text-[10px] text-gray-400">SYNTHESIS</span>
                                 <span className={`text-[10px] font-mono ${block.data.divergence > 0.5 ? 'text-crimson' : 'text-cyan'}`}>
                                     VAR: {(block.data.divergence * 100).toFixed(0)}%
                                 </span>
                             </div>
                             <p className="text-sm font-serif text-gray-200">{block.data.synthesis}</p>
                             <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-gray-800/50">
                                 <div className="text-[9px] text-cyan opacity-70 truncate" title={block.data.architect}>ARCH: {block.data.architect}</div>
                                 <div className="text-[9px] text-gold opacity-70 truncate" title={block.data.mystic}>MYS: {block.data.mystic}</div>
                                 <div className="text-[9px] text-gray-500 opacity-70 truncate" title={block.data.void}>VOID: {block.data.void}</div>
                             </div>
                        </div>
                    )}
                 </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grimoire;
