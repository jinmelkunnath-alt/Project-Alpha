import { useState, useEffect } from 'react';
import type { ChatMessage } from '../services/chatStorage';
import ThinkingBlock from './ThinkingBlock';
import { IconAlphaEmblem, IconCheck, IconTrendUp, IconSparkle, IconChevronDown } from './icons';
import { EXECUTIVE_THINKING_PHASES } from '../services/thinkingEngine';
import DecisionVisualReport from './DecisionVisualReport';
import FinancialViabilityCard from './engines/FinancialViabilityCard';
import SensitivityWhatIfCard from './engines/SensitivityWhatIfCard';
import EvidenceProvenanceCard from './engines/EvidenceProvenanceCard';
import ExecutiveBriefCard from './engines/ExecutiveBriefCard';
import ReAnalysisCard from './engines/ReAnalysisCard';

interface ChatMessageItemProps {
  message: ChatMessage;
}

// Track IDs of messages that have already completed typewriter streaming
const streamedMessageIds = new Set<string>();

export default function ChatMessageItem({ message }: ChatMessageItemProps) {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);
  const [showVisualReport, setShowVisualReport] = useState(false);
  const [reportTab, setReportTab] = useState<'brief' | 'curves' | 'finance' | 'whatif' | 'evidence' | 'rerun'>('brief');
  const [thinkingExpanded, setThinkingExpanded] = useState(false);

  // Typewriter streaming state for assistant output
  const [displayedText, setDisplayedText] = useState(() => {
    // If user message, already streamed, or restored from past session (> 3s old), display immediately
    const isRestored = !isUser && message.timestamp && (Date.now() - new Date(message.timestamp).getTime() > 3000);
    if (isUser || streamedMessageIds.has(message.id) || isRestored) {
      streamedMessageIds.add(message.id);
      return message.content;
    }
    return '';
  });
  const [isTyping, setIsTyping] = useState(() => {
    const isRestored = !isUser && message.timestamp && (Date.now() - new Date(message.timestamp).getTime() > 3000);
    return !isUser && !streamedMessageIds.has(message.id) && !isRestored;
  });

  useEffect(() => {
    const isRestored = !isUser && message.timestamp && (Date.now() - new Date(message.timestamp).getTime() > 3000);
    if (isUser || streamedMessageIds.has(message.id) || isRestored) {
      setDisplayedText(message.content);
      setIsTyping(false);
      streamedMessageIds.add(message.id);
      return;
    }

    let currentIndex = 0;
    const fullText = message.content;
    const speedMs = 10;
    const charsPerTick = 5;

    const timer = setInterval(() => {
      currentIndex += charsPerTick;
      if (currentIndex >= fullText.length) {
        setDisplayedText(fullText);
        setIsTyping(false);
        streamedMessageIds.add(message.id);
        clearInterval(timer);
      } else {
        setDisplayedText(fullText.slice(0, currentIndex));
      }
    }, speedMs);

    return () => clearInterval(timer);
  }, [message.id, message.content, isUser, message.timestamp]);

  function handleCopy() {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // Format assistant markdown for light theme — minimalist, serene, psychological hierarchy
  function renderFormattedContent(text: string) {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      if (line.startsWith('### ')) {
        return (
          <h3 key={i} className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight pb-2 mb-3 border-b border-slate-100 first:mt-0">
            {line.replace('### ', '')}
          </h3>
        );
      }
      if (line.startsWith('#### ')) {
        return (
          <div key={i} className="mt-4 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10.5px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50/70 border border-emerald-200/60">
              {line.replace('#### ', '')}
            </span>
          </div>
        );
      }
      if (line.startsWith('* ') || line.startsWith('- ')) {
        const itemText = line.replace(/^[\*\-]\s+/, '');
        return (
          <li key={i} className="ml-4 list-disc text-sm text-slate-700 leading-relaxed pl-1 my-1 marker:text-emerald-600">
            <span dangerouslySetInnerHTML={{ __html: formatInline(itemText) }} />
          </li>
        );
      }
      if (/^\d+\.\s/.test(line)) {
        return (
          <li key={i} className="ml-4 list-decimal text-sm text-slate-700 leading-relaxed pl-1 my-1.5 marker:text-slate-500 marker:font-semibold">
            <span dangerouslySetInnerHTML={{ __html: formatInline(line.replace(/^\d+\.\s+/, '')) }} />
          </li>
        );
      }
      if (!line.trim()) {
        return <div key={i} className="h-2" />;
      }

      // If line contains Bottom Line, highlight it as an executive callout strip
      if (line.includes('**Bottom Line:**')) {
        return (
          <div key={i} className="my-2.5 rounded-xl border border-emerald-200/70 bg-emerald-50/40 p-3 text-sm text-slate-800 leading-relaxed">
            <span dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
          </div>
        );
      }

      return (
        <p key={i} className="text-sm leading-relaxed text-slate-700 my-1.5">
          <span dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
        </p>
      );
    });
  }

  function formatInline(str: string): string {
    return str
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-bold">$1</strong>')
      .replace(/`([^`]+)`/g, '<code class="bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded text-xs font-mono">$1</code>');
  }

  // ── USER BUBBLE ──────────────────────────────────────────────────────────────
  if (isUser) {
    return (
      <div className="flex justify-end my-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
        <div
          className="max-w-2xl rounded-3xl rounded-tr-lg px-5 py-3.5"
          style={{
            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
            boxShadow: '0 4px 20px -4px rgba(5,150,105,0.35), 0 1px 4px rgba(5,150,105,0.2)',
          }}
        >
          <p className="whitespace-pre-wrap text-sm text-white leading-relaxed font-normal">
            {message.content}
          </p>
          <div className="mt-1.5 flex justify-end text-[10px] text-emerald-100/70 font-mono">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    );
  }

  const thoughtTimeSec = ((message.thinkingTimeMs || 18400) / 1000).toFixed(1);

  // ── ASSISTANT BUBBLE ─────────────────────────────────────────────────────────
  return (
    <div className="flex items-start gap-3.5 my-6 max-w-4xl animate-in fade-in slide-in-from-bottom-2 duration-200">
      {/* Alpha Avatar — minimal rounded circle without outer box frame */}
      <IconAlphaEmblem size={32} className="shadow-xs ring-1 ring-emerald-500/25 shrink-0" />

      <div className="flex-1 overflow-hidden min-w-0">
        {/* Compact Thought Indicator (Only shown once completed; active animation happens in Dashboard during generation) */}
        {(message.thinkingLogs && message.thinkingLogs.length > 0 || message.thinkingTimeMs) && (
          <div className="mb-3">
            <button
              type="button"
              onClick={() => setThinkingExpanded(!thinkingExpanded)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200/80 text-[11px] font-medium text-slate-600 transition-colors cursor-pointer"
            >
              <IconSparkle size={12} className="text-emerald-600" />
              <span>Thought for {thoughtTimeSec}s</span>
              <IconChevronDown size={11} className={`text-slate-400 transition-transform ${thinkingExpanded ? 'rotate-180' : ''}`} />
            </button>
            {thinkingExpanded && (
              <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50/90 p-3 text-[11px] font-mono text-slate-600 space-y-1.5 animate-in fade-in duration-150">
                <div className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider mb-1 flex items-center gap-1">
                  <span>Executive Deliberation Telemetry</span>
                  <span className="text-slate-400">({thoughtTimeSec}s elapsed)</span>
                </div>
                {message.thinkingLogs && message.thinkingLogs.length > 0 ? (
                  message.thinkingLogs.map((log, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-emerald-600 font-bold">&gt;</span>
                      <span>{log}</span>
                    </div>
                  ))
                ) : (
                  EXECUTIVE_THINKING_PHASES.map((p, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{p.title} &mdash; <span className="text-slate-500">{p.log}</span></span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* Verdict Badge & Conviction meter */}
        {(message.verdict || message.convictionScore) && (
          <div className="mb-3 flex flex-wrap items-center gap-2.5">
            {message.verdict && (
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider border ${
                  message.verdict === 'GO'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-[0_2px_12px_rgba(5,150,105,0.15)]'
                    : message.verdict === 'CONDITIONAL GO'
                    ? 'bg-cyan-50 text-cyan-800 border-cyan-300 shadow-[0_2px_12px_rgba(6,182,212,0.15)]'
                    : message.verdict === 'CAUTION'
                    ? 'bg-amber-50 text-amber-800 border-amber-300 shadow-[0_2px_12px_rgba(245,158,11,0.15)]'
                    : 'bg-rose-50 text-rose-800 border-rose-300 shadow-[0_2px_12px_rgba(244,63,94,0.15)]'
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                {message.verdict}
              </span>
            )}

            {message.convictionScore && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-xs font-mono text-slate-700">
                <span className="text-slate-500">Conviction:</span>
                <span className="font-bold text-slate-900">{message.convictionScore}%</span>
              </span>
            )}

            <button
              type="button"
              onClick={() => setShowVisualReport(!showVisualReport)}
              className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 shadow-2xs hover:bg-emerald-100 transition-all cursor-pointer"
            >
              <IconTrendUp size={13} className="text-emerald-700" />
              <span>{showVisualReport ? 'Hide Visual Predictions' : '📊 View Predictive Curves & Pie Charts'}</span>
            </button>
          </div>
        )}

        {/* Main Assistant Body — light theme card */}
        <div
          className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm relative"
          style={{
            boxShadow: '0 1px 0 0 rgba(255,255,255,0.9) inset, 0 4px 20px -4px rgba(15,23,42,0.06), 0 12px 40px -8px rgba(15,23,42,0.08)',
          }}
        >
          <div className="prose-sm max-w-none">
            {renderFormattedContent(displayedText)}
          </div>

          {/* Blinking cursor while streaming */}
          {isTyping && (
            <span className="inline-block h-4 w-[3px] rounded-sm bg-emerald-500 animate-pulse ml-1 translate-y-0.5" />
          )}

          {/* Action Toolbar */}
          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-400">
            <span className="font-mono text-[10px] tracking-wider uppercase">
              Project Alpha Engine
              {isTyping && (
                <span className="text-emerald-600 font-semibold ml-2">[Streaming...]</span>
              )}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-600 transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                title="Copy response"
              >
                {copied ? <IconCheck size={11} className="text-emerald-600" /> : null}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Embedded Interactive Graphical Report with Multi-Engine Tabs */}
        {showVisualReport && (
          <div className="mt-4 rounded-3xl border border-slate-200/90 bg-white/95 p-4 sm:p-6 shadow-md animate-in fade-in zoom-in-98 duration-200 space-y-4">
            {/* Tab selector bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-100 scrollbar-none text-xs">
              {[
                { id: 'brief', label: 'Executive Brief', icon: '📋' },
                { id: 'curves', label: 'Predictive Curves', icon: '📊' },
                { id: 'finance', label: 'Financial Viability', icon: '💼' },
                { id: 'whatif', label: 'What-If / Sensitivity', icon: '🎚️' },
                { id: 'evidence', label: 'Evidence & Conflicts', icon: '📑' },
                { id: 'rerun', label: 'Re-Run Alpha', icon: '🔄' },
              ].map((t) => {
                const isActive = reportTab === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setReportTab(t.id as any)}
                    className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-1 font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-2xs'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <span>{t.icon}</span>
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Card Content */}
            {reportTab === 'brief' && <ExecutiveBriefCard />}
            {reportTab === 'curves' && <DecisionVisualReport compact={true} />}
            {reportTab === 'finance' && <FinancialViabilityCard compact={true} />}
            {reportTab === 'whatif' && <SensitivityWhatIfCard baselineScore={message.convictionScore || 78} />}
            {reportTab === 'evidence' && <EvidenceProvenanceCard />}
            {reportTab === 'rerun' && <ReAnalysisCard />}
          </div>
        )}
      </div>
    </div>
  );
}
