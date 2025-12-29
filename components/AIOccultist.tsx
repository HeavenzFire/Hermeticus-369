import React, { useState, useEffect, useRef } from 'react';
import { sendHermeticQuery } from '../services/gemini';
import { ChatMessage } from '../types';

interface Props {
  resonanceContext?: string;
}

const AIOccultist: React.FC<Props> = ({ resonanceContext }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'system', content: 'System Initialized. 1577-2025 Bridge Established.', timestamp: Date.now() }
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

    const userMsg: ChatMessage = { role: 'user', content: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const history = messages.map(m => ({ role: m.role, content: m.content }));
    const context = resonanceContext ? `[Current Active Seal: ${resonanceContext}] ` : '';
    
    const responseText = await sendHermeticQuery(context + input, history);

    const aiMsg: ChatMessage = { role: 'model', content: responseText, timestamp: Date.now() };
    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[500px] w-full bg-void border border-gray-800 rounded-lg overflow-hidden shadow-2xl relative">
      {/* Header */}
      <div className="bg-aether p-3 border-b border-gray-800 flex justify-between items-center">
        <h3 className="text-gold font-serif text-sm tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          AI ORACLE // GEMINI-3
        </h3>
        <span className="text-xs font-mono text-gray-500">Latency: 12ms</span>
      </div>

      {/* Terminal Output */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-lg border ${
              msg.role === 'user' 
                ? 'bg-aether border-cyan/30 text-cyan' 
                : msg.role === 'model' 
                ? 'bg-void border-gold/30 text-gold-dim' 
                : 'text-gray-500 italic text-xs'
            }`}>
              {msg.role !== 'system' && <div className="text-[10px] uppercase opacity-50 mb-1">{msg.role === 'user' ? 'Operator' : 'Hermetic Core'}</div>}
              <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-gold text-xs font-mono p-2">
            <span className="animate-spin">⟡</span> CALCULATING RESONANCE...
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
            placeholder="Enter command or ritual inquiry..."
            className="w-full bg-transparent text-gray-300 font-mono text-sm focus:outline-none resize-none h-10"
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            className="px-4 py-1 border border-gold/50 text-gold hover:bg-gold/10 font-serif text-xs uppercase transition-colors"
          >
            Invoke
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIOccultist;