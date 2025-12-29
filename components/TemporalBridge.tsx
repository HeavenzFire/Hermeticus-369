import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { year: '1577', resonance: 30, stability: 40, label: 'Pseudomonarchia' },
  { year: '1650', resonance: 45, stability: 30, label: 'Transition' },
  { year: '1750', resonance: 20, stability: 60, label: 'Enlightenment' },
  { year: '1890', resonance: 60, stability: 40, label: 'Tesla Era' },
  { year: '1945', resonance: 50, stability: 50, label: 'Computing' },
  { year: '1990', resonance: 75, stability: 70, label: 'Internet' },
  { year: '2025', resonance: 95, stability: 20, label: 'Hermeticus' },
];

const TemporalBridge: React.FC = () => {
  return (
    <div className="w-full h-64 bg-aether/50 p-4 rounded-lg border border-gray-800 mt-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold via-cyan to-gold opacity-50" />
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gold font-serif text-sm tracking-widest">TEMPORAL BRIDGE STATUS</h3>
        <span className="text-xs font-mono text-cyan animate-pulse">BRIDGE ACTIVE</span>
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorResonance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorStability" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#c5a059" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#c5a059" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="year" stroke="#475569" tick={{fill: '#475569', fontSize: 10}} />
          <YAxis stroke="#475569" tick={{fill: '#475569', fontSize: 10}} />
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0a0a0c', borderColor: '#c5a059', color: '#fff' }}
            itemStyle={{ fontSize: '12px', fontFamily: 'Fira Code' }}
          />
          <Area 
            type="monotone" 
            dataKey="resonance" 
            stroke="#00f0ff" 
            fillOpacity={1} 
            fill="url(#colorResonance)" 
          />
          <Area 
            type="monotone" 
            dataKey="stability" 
            stroke="#c5a059" 
            fillOpacity={1} 
            fill="url(#colorStability)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemporalBridge;