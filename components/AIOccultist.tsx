
import React, { useState, useEffect, useRef } from 'react';
import { sendHermeticQuery } from '../services/gemini';
import { ChatMessage, OracleAnalysis } from '../types';

interface Props {
  resonanceContext?: string;
  onSealResult: (analysis: OracleAnalysis) => void;
}

const AIOccultist: React.FC<Props> = ({ resonanceContext, onSealResult }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'system', content: 'Interferometer Online. Measuring Semantic Variance.', timestamp: Date.now(), type: 'text' }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // User Message
    const userMsg: ChatMessage = { 
        role: 'user', 
        content: input, 
        timestamp: Date.now(), 
        type: 'text' 
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const context = resonanceContext ? `[Target: ${resonanceContext}] ` : '';
    
    // Execute Triangulation
    const analysis = await sendHermeticQuery(context + input);

    // System Response (Structured)
    const aiMsg: ChatMessage = { 
        role: 'model', 
        content: analysis, 
        timestamp: Date.now(),
        type: 'analysis'
    };
    
    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Helper to render the Analysis Card
  const renderAnalysis = (data: OracleAnalysis) => {
    const variancePercent = Math.round(data.divergence * 100);
    const stabilityColor = variancePercent > 80 ? 'text-crimson' : variancePercent > 40 ? 'text-gold' : 'text-cyan';
    const barColor = variancePercent > 80 ? 'bg-crimson' : variancePercent > 40 ? 'bg-gold' : 'bg-cyan';

    return (
        <div className="flex flex-col gap-3 w-full animate-fade-in">
            {/* Header / Divergence Meter */}
            <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-2">
                <span className="text-[10px] font-serif text-gray-500 tracking-widest">TRIANGULATION COMPLETE</span>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-600">VARIANCE:</span>
                    <span className={`text-xs font-mono font-bold ${stabilityColor}`}>{variancePercent}%</span>
                </div>
            </div>

            {/* Variance Bar */}
            <div className="w-full h-1 bg-gray-900 rounded-full overflow-hidden mb-2">
                <div 
                    className={`h-full ${barColor} transition-all duration-1000`} 
                    style={{ width: `${variancePercent}%` }}
                />
            </div>

            {/* The Three Perspectives */}
            <div className="grid grid-cols-1 gap-2 text-xs font-mono">
                {/* Architect */}
                <div className="p-2 border-l-2 border-cyan bg-cyan/5">
                    <div className="text-[10px] text-cyan mb-1 opacity-70">THE ARCHITECT [2025]</div>
                    <div className="text-gray-300 leading-relaxed">{data.architect}</div>
                </div>

                {/* Mystic */}
                <div className="p-2 border-l-2 border-gold bg-gold/5">
                    <div className="text-[10px] text-gold mb-1 opacity-70">THE MYSTIC [1577]</div>
                    <div className="text-gray-300 leading-relaxed italic">{data.mystic}</div>
                </div>

                {/* Void */}
                <div className="p-2 border-l-2 border-gray-600 bg-gray-800/20">
                    <div className="text-[10px] text-gray-500 mb-1 opacity-70">THE VOID [NULL]</div>
                    <div className="text-gray-500 leading-relaxed">{data.void}</div>
                </div>
            </div>

            {/* Synthesis & Actions */}
            <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 p-2 border border-gray-800 rounded bg-black/40 text-center">
                    <span className="text-[10px] text-gray-500 uppercase mr-2">Synthesis:</span>
                    <span className="text-gray-200 text-xs">{data.synthesis}</span>
                </div>
                <button 
                  onClick={() => onSealResult(data)}
                  className="px-3 py-2 bg-gold/10 border border-gold/50 text-gold hover:bg-gold/20 text-[10px] font-serif tracking-widest uppercase transition-colors whitespace-nowrap"
                  title="Pin this result to the Immutable Grimoire"
                >
                  SEAL RECORD
                </button>
            </div>
        </div>
    );
  };

  return (
    <div className="flex flex-col h-[500px] w-full bg-void border border-gray-800 rounded-lg overflow-hidden shadow-2xl relative">
      {/* Header */}
      <div className="bg-aether p-3 border-b border-gray-800 flex justify-between items-center">
        <h3 className="text-gold font-serif text-sm tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan animate-pulse"></span>
          ORACLE INTERFEROMETER
        </h3>
        <span className="text-xs font-mono text-gray-500">MODE: TRIANGULATION</span>
      </div>

      {/* Terminal Output */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 font-mono text-sm custom-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[95%] lg:max-w-[85%] rounded-lg ${
              msg.role === 'user' 
                ? 'p-3 border bg-aether border-cyan/30 text-cyan' 
                : msg.type === 'analysis'
                ? 'bg-transparent w-full'
                : 'p-3 text-gray-500 italic text-xs'
            }`}>
              {msg.role === 'user' && <div className="text-right">{msg.content as string}</div>}
              
              {msg.role === 'model' && msg.type === 'analysis' && (
                  renderAnalysis(msg.content as OracleAnalysis)
              )}
              
              {msg.role === 'system' && <div>{msg.content as string}</div>}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex flex-col items-center justify-center p-8 gap-3 opacity-50">
             <div className="flex gap-1">
                <div className="w-2 h-2 bg-cyan rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
             </div>
             <div className="text-xs font-mono text-gold tracking-widest">CALCULATING VARIANCE</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-aether border-t border-gray-800">
        <div className="flex gap-2">
          <span className="text-gold font-mono pt-2">{'>'}</span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Inject Subject for Triangulation..."
            className="w-full bg-transparent text-gray-300 font-mono text-sm focus:outline-none resize-none h-10"
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            className="px-4 py-1 border border-gold/50 text-gold hover:bg-gold/10 font-serif text-xs uppercase transition-colors"
          >
            Measure
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIOccultist;
