import { LoadingSymbol } from './LoadingSymbol';
import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { askCclAssistant, AssistantMessage } from '../services/cclAssistant';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';

export const AssistantDrawer: React.FC = () => {
  const { isAssistantOpen, setIsAssistantOpen, navigateWithParam } = useApp();

  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 'init_1',
      role: 'assistant',
      content:
        'Peace to you! I am the CCL Learning Assistant. I can point you to the right lessons, guides and tools, and share practical tips for prompting and checking AI work. (Note: I am purely an educational tool to assist your craft—not a pastoral counselor or spiritual authority!) What are you looking to create or learn today?',
      timestamp: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  if (!isAssistantOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const promptText = (textToSend || input).trim();
    if (!promptText || isLoading) return;

    const userMsg: AssistantMessage = {
      id: `usr_${Date.now()}`,
      role: 'user',
      content: promptText,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await askCclAssistant(promptText, messages);
      const botMsg: AssistantMessage = {
        id: `bot_${Date.now()}`,
        role: 'assistant',
        content: response.text,
        timestamp: 'Just now',
        suggestedAction: response.action,
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot_${Date.now()}`,
          role: 'assistant',
          content:
            'I encountered a temporary connection issue. However, you can explore the prompt library or check our course catalog directly!',
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const starterPrompts = [
    'How do I write a clearer prompt?',
    'How should I check Scripture in AI drafts?',
    'Where do I start learning?',
    'How can our church media team use AI?',
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs">
      <div className="flex h-full w-full max-w-md flex-col border-l border-gray-200 bg-white shadow-2xl text-zinc-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 bg-white">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-black text-white">
              <MessageCircle className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-zinc-950 font-sans">CCL Learning Assistant</span>
                <span className="text-[9px] font-mono uppercase bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-semibold">
                  Online
                </span>
              </div>
              <p className="text-[11px] text-zinc-500">Craft, Prompting & Workflow Guidance</p>
            </div>
          </div>
          <button
            onClick={() => setIsAssistantOpen(false)}
            className="rounded-full p-1.5 text-zinc-400 hover:text-black hover:bg-zinc-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Ethical boundary reminder banner */}
        <div className="flex items-center gap-2 border-b border-gray-100 bg-[#f9fafb] px-4 py-2 text-[10px] text-zinc-600">
          <ShieldCheck className="h-3.5 w-3.5 text-zinc-900 shrink-0" />
          <span>Assists practical skill development · Never replaces pastoral discernment</span>
        </div>

        {/* Message Thread */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 text-xs leading-relaxed ${
                m.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.role === 'assistant' && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-800 mt-0.5">
                  <Bot className="h-3.5 w-3.5" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 shadow-2xs space-y-2 ${
                  m.role === 'user'
                    ? 'bg-black text-white font-medium'
                    : 'bg-[#f4f4f6] text-zinc-800'
                }`}
              >
                <div className="whitespace-pre-wrap">{m.content}</div>

                {m.suggestedAction && (
                  <button
                    onClick={() => {
                      if (m.suggestedAction?.paramId) {
                        navigateWithParam(
                          m.suggestedAction.view as any,
                          m.suggestedAction.paramId
                        );
                      }
                      setIsAssistantOpen(false);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white text-zinc-900 px-3 py-1.5 text-[11px] font-semibold hover:bg-zinc-100 transition-colors border border-gray-200 mt-1 shadow-2xs"
                  >
                    <span>{m.suggestedAction.label}</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 text-xs justify-start">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-800">
                <Bot className="h-3.5 w-3.5" />
              </div>
              <div className="rounded-2xl bg-[#f4f4f6] p-3 flex items-center gap-2 text-zinc-500">
                <LoadingSymbol inline label="Consulting CCL curriculum…" />
                <span>Finding the right place…</span>
              </div>
            </div>
          )}
        </div>

        {/* Starter Prompts chips */}
        <div className="p-3 border-t border-gray-100 bg-[#f9fafb] space-y-1.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold block px-1">
            Quick Inquiries:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {starterPrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSend(p)}
                className="text-[11px] rounded-full border border-gray-200 bg-white hover:bg-zinc-100 text-zinc-700 px-3 py-1 transition-colors text-left truncate max-w-full"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Message Input Box */}
        <div className="p-3 bg-white border-t border-gray-100">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about AI tools, courses, prompts..."
              className="flex-1 rounded-full border border-gray-200 bg-[#f9fafb] px-4 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-black"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white hover:bg-zinc-800 disabled:opacity-40 transition-colors shrink-0 shadow-2xs"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

