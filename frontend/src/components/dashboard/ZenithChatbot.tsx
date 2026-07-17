"use client"
import React, { useState, useRef, useEffect } from 'react';
import weeklyData from '../../data/dashboard_data_weekly.json';

type Message = {
  role: 'user' | 'model';
  content: string;
};

export default function ZenithChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTerminated, setIsTerminated] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Hello Emily! I'm Zenith Intelligence, your Samsung Health AI Coach. Ask me anything about your weekly data, sleep, or stress trends." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || isTerminated) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          context: weeklyData
        })
      });
      
      const data = await response.json();
      
      if (data.isTerminated) {
        setIsTerminated(true);
        setMessages(prev => [...prev, { role: 'model', content: "⚠️ SESSION TERMINATED: " + data.reply }]);
      } else if (data.reply) {
        setMessages(prev => [...prev, { role: 'model', content: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', content: "Sorry, I'm having connection issues." }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: "An error occurred while connecting to Zenith Intelligence." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-[#D1F843] text-black font-bold py-3 px-6 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center gap-2 z-50 font-display"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
        Ask Zenith AI
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 ${isExpanded ? 'w-[800px] h-[80vh]' : 'w-[380px] h-[600px]'} bg-[#1A1A1A] border ${isTerminated ? 'border-red-900' : 'border-gray-800'} rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 transition-all duration-300`}>

      <div className={`border-b p-4 flex justify-between items-center ${isTerminated ? 'bg-red-950 border-red-900' : 'bg-[#0a0a0a] border-gray-800'}`}>
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full ${isTerminated ? 'bg-red-500 text-white' : 'bg-[#D1F843] text-black'} flex items-center justify-center font-bold`}>
            Z
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-sm">Zenith Intelligence</h3>
            <div className={`flex items-center gap-1.5 text-xs ${isTerminated ? 'text-red-400' : 'text-gray-400'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isTerminated ? 'bg-red-500' : 'bg-green-500'}`}></span> {isTerminated ? 'Locked' : 'Online'}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsExpanded(!isExpanded)} className="text-gray-400 hover:text-white transition-colors" title={isExpanded ? "Collapse" : "Expand"}>
            {isExpanded ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7l6-3 5.447 2.724A1 1 0 0121 7.618v10.764a1 1 0 01-1.447.894L15 17l-6 3z"></path></svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg>
            )}
          </button>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors" title="Close">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
      </div>


      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4" data-lenis-prevent>
        {messages.map((msg, i) => (
          <div key={i} className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed ${msg.role === 'user' ? 'bg-[#D1F843] text-black rounded-br-none self-end' : (msg.content.includes('SESSION TERMINATED') ? 'bg-red-900 text-white rounded-bl-none self-start border border-red-500' : 'bg-gray-800 text-white rounded-bl-none self-start')}`}>
            {msg.content}
          </div>
        ))}
        {isLoading && (
          <div className="bg-gray-800 text-white max-w-[85%] rounded-2xl rounded-bl-none self-start p-3 text-sm">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>


      <div className={`p-3 border-t ${isTerminated ? 'border-red-900 bg-red-950' : 'border-gray-800 bg-[#0a0a0a]'}`}>
        <form onSubmit={handleSend} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTerminated}
            placeholder={isTerminated ? "Session locked." : "Ask about your health data..."}
            className={`w-full bg-[#1A1A1A] border ${isTerminated ? 'border-red-500 cursor-not-allowed text-red-500 placeholder-red-700' : 'border-gray-800 text-white focus:border-[#D1F843]'} rounded-full py-2.5 pl-4 pr-10 text-sm focus:outline-none transition-colors`}
          />
          <button type="submit" disabled={!input.trim() || isLoading || isTerminated} className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full ${isTerminated ? 'bg-red-800 text-red-300' : 'bg-[#D1F843] text-black'} disabled:opacity-50 transition-opacity`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
          </button>
        </form>
        <div className="text-center mt-2">
          <span className={`text-[10px] uppercase tracking-wider font-semibold ${isTerminated ? 'text-red-500' : 'text-gray-500'}`}>
            Zenith Intelligence is an AI prototype and does not provide medical diagnoses.
          </span>
        </div>
      </div>
    </div>
  );
}
