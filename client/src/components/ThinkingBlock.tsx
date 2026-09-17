import { useState, useEffect, useRef } from 'react';
import { ThinkingOrb, type OrbState } from 'thinking-orbs';
import { BorderBeam } from 'border-beam';
import { IconChevronDown, IconSparkle, IconCheck, IconTerminal } from './icons';
import type { ThinkingPhase } from '../services/thinkingEngine';

interface ThinkingBlockProps {
  phases: ThinkingPhase[];
  activePhaseIndex: number;
  orbState: OrbState;
  elapsedMs: number;
  isComplete?: boolean;
}

interface TerminalEntry {
  type: 'cmd' | 'stdout' | 'stderr' | 'ok' | 'warn' | 'sys';
  text: string;
  timestamp: string;
}

function generateBinaryChunk(): string {
  const chars = '01';
  let out = '';
  for (let i = 0; i < 36; i++) {
    out += chars.charAt(Math.floor(Math.random() * chars.length));
    if ((i + 1) % 8 === 0 && i !== 35) out += ' ';
  }
  return out;
}

export default function ThinkingBlock({
  phases,
  activePhaseIndex,
  orbState,
  elapsedMs,
  isComplete = false,
}: ThinkingBlockProps) {
  const [isExpanded, setIsExpanded] = useState(!isComplete);
  const [terminalTab, setTerminalTab] = useState<'cli' | 'logs' | 'matrix'>('cli');
  const [terminalHistory, setTerminalHistory] = useState<TerminalEntry[]>([]);
  const [binaryLines, setBinaryLines] = useState<string[]>([]);
  const [userCmd, setUserCmd] = useState('');
  const terminalRef = useRef<HTMLDivElement | null>(null);

  // Auto-collapse when complete
  useEffect(() => {
    if (isComplete) {
      setIsExpanded(false);
    }
  }, [isComplete]);

  // Stream terminal commands & logs when phase changes
  useEffect(() => {
    const activePhase = phases[activePhaseIndex];
    if (!activePhase) return;

    const timeStr = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const newEntries: TerminalEntry[] = [];

    if (activePhase.terminalCommands && activePhase.terminalCommands.length > 0) {
      activePhase.terminalCommands.forEach((cmd) => {
        newEntries.push({
          type: 'cmd',
          text: `alpha-cli run --phase "${activePhase.title}" --subroutine "${cmd}"`,
          timestamp: timeStr,
        });
      });
    } else {
      newEntries.push({
        type: 'cmd',
        text: `alpha-cli run --phase "${activePhase.title}"`,
        timestamp: timeStr,
      });
    }

    if (activePhase.terminalLogs && activePhase.terminalLogs.length > 0) {
      activePhase.terminalLogs.forEach((log) => {
        const isOk = log.startsWith('[OK]');
        const isWarn = log.startsWith('[WARN]');
        newEntries.push({
          type: isOk ? 'ok' : isWarn ? 'warn' : 'stdout',
          text: log,
          timestamp: timeStr,
        });
      });
    } else {
      newEntries.push({
        type: 'stdout',
        text: `[EXEC] ${activePhase.log}`,
        timestamp: timeStr,
      });
    }

    setTerminalHistory((prev) => [...prev, ...newEntries]);
  }, [activePhaseIndex, phases]);

  // Live binary stream animation during thinking
  useEffect(() => {
    if (isComplete) return;

    const interval = setInterval(() => {
      const prefix = Math.random() > 0.6 ? `[0x${Math.floor(Math.random() * 0xffff).toString(16).padStart(4, '0').toUpperCase()}] ` : '';
      const newLine = `${prefix}${generateBinaryChunk()}`;
      setBinaryLines((prev) => {
        const next = [...prev, newLine];
        return next.length > 10 ? next.slice(next.length - 10) : next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isComplete]);

  // Auto scroll terminal to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHistory, binaryLines, activePhaseIndex]);

  function handleTerminalSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cmd = userCmd.trim();
    if (!cmd) return;

    const timeStr = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const userEntry: TerminalEntry = { type: 'cmd', text: cmd, timestamp: timeStr };

    let reply: TerminalEntry;
    const lower = cmd.toLowerCase();

    if (lower === 'help') {
      reply = { type: 'sys', text: 'Available commands: help | status | phases | clear | inspect | verdict', timestamp: timeStr };
    } else if (lower === 'status') {
      reply = { type: 'ok', text: `[STATUS] Engine State: ${orbState.toUpperCase()} | Active Phase: ${activePhaseIndex + 1}/${phases.length} (${phases[activePhaseIndex]?.title})`, timestamp: timeStr };
    } else if (lower === 'phases') {
      reply = { type: 'stdout', text: `Phases: ${phases.map((p, i) => `[${i + 1}] ${p.title}`).join(' -> ')}`, timestamp: timeStr };
    } else if (lower === 'clear') {
      setTerminalHistory([]);
      setUserCmd('');
      return;
    } else {
      reply = { type: 'stdout', text: `[ALPHA CLI]: Command '${cmd}' received. Telemetry index updated.`, timestamp: timeStr };
    }

    setTerminalHistory((prev) => [...prev, userEntry, reply]);
    setUserCmd('');
  }

  const activePhase = phases[activePhaseIndex] || phases[0];
  const elapsedSec = (elapsedMs / 1000).toFixed(1);

  return (
    <BorderBeam
      size="md"
      colorVariant="colorful"
      theme="light"
      strength={1.0}
      duration={3}
      active={true}
      className="w-full my-4 rounded-2xl shadow-xl transition-all duration-300"
    >
      <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-white">

      {/* Header Bar / Summary Pill */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between px-4 py-3.5 text-left transition-colors hover:bg-slate-50 border-b border-slate-100"
      >
        <div className="flex items-center gap-3">
          {isComplete ? (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 ring-1 ring-emerald-300">
              <IconCheck size={12} />
            </span>
          ) : (
            <span className="relative flex h-2.5 w-2.5">
              <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-600" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-600" />
            </span>
          )}

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <IconSparkle size={12} className={isComplete ? '' : 'animate-pulse text-emerald-600'} />
              {isComplete ? 'Deep Cognitive Deliberation Complete' : `Active Phase: ${activePhase.title}`}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              ({elapsedSec}s)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-500 text-xs">
          <span className="hidden sm:inline text-[11px] text-slate-500 font-mono flex items-center gap-1">
            <IconTerminal size={12} />
            {isExpanded ? 'Minimize Terminal' : 'Open CLI Terminal'}
          </span>
          <IconChevronDown
            size={14}
            className={`transition-transform duration-200 ${isExpanded ? 'rotate-180 text-emerald-600' : ''}`}
          />
        </div>
      </button>

      {/* Expanded Interactive Terminal Core */}
      {isExpanded && (
        <div className="border-t border-slate-100 p-4 sm:p-5 animate-in fade-in slide-in-from-top-2 duration-200 bg-slate-50/50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Left: Prominent Single Thinking Orb & Stage Indicator */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-4 shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-cyan-500/5 pointer-events-none" />
              
              {/* Single Central Thinking Orb */}
              <div className="relative flex items-center justify-center p-2">
                <ThinkingOrb state={orbState} size={64} theme="light" speed={1.1} />
              </div>

              <div className="mt-3 text-center">
                <span className="inline-block rounded-full bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-800 font-mono">
                  STATE: {orbState}
                </span>
                <p className="text-xs font-bold text-slate-900 mt-1.5 leading-snug">
                  {activePhase.title}
                </p>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                  Phase {activePhaseIndex + 1} of {phases.length}
                </p>
              </div>
            </div>

            {/* Right: Full High-Tech CLI Terminal Window */}
            <div className="lg:col-span-8 flex flex-col rounded-xl border border-slate-800 bg-[#070d14] shadow-2xl relative overflow-hidden font-mono">
              {/* macOS / Linux Terminal Window Top Control Bar */}
              <div className="flex items-center justify-between border-b border-slate-800 bg-[#03070c] px-3 py-2">
                <div className="flex items-center gap-2">
                  {/* macOS Dots */}
                  <div className="flex items-center gap-1.5 mr-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80 inline-block" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-400/90 tracking-wide uppercase flex items-center gap-1.5">
                    <IconTerminal size={11} />
                    alpha@deliberation-node: ~/neural-core
                  </span>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 bg-black/40 p-0.5 rounded-lg border border-slate-700 text-[10px]">
                  <button
                    type="button"
                    onClick={() => setTerminalTab('cli')}
                    className={`px-2 py-0.5 rounded ${terminalTab === 'cli' ? 'bg-emerald-500/20 text-emerald-300 font-semibold' : 'text-slate-400 hover:text-white'}`}
                  >
                    CLI Stream
                  </button>
                  <button
                    type="button"
                    onClick={() => setTerminalTab('logs')}
                    className={`px-2 py-0.5 rounded ${terminalTab === 'logs' ? 'bg-emerald-500/20 text-emerald-300 font-semibold' : 'text-slate-400 hover:text-white'}`}
                  >
                    Logs
                  </button>
                  <button
                    type="button"
                    onClick={() => setTerminalTab('matrix')}
                    className={`px-2 py-0.5 rounded ${terminalTab === 'matrix' ? 'bg-emerald-500/20 text-emerald-300 font-semibold' : 'text-slate-400 hover:text-white'}`}
                  >
                    Matrix
                  </button>
                </div>
              </div>

              {/* Terminal Screen Body */}
              <div
                ref={terminalRef}
                className="h-44 overflow-y-auto p-3 text-[11px] leading-relaxed select-text space-y-1.5 scrollbar-thin text-slate-200"
              >
                {terminalTab === 'cli' && (
                  <>
                    <div className="text-slate-400 text-[10px] mb-2 border-b border-slate-800 pb-1">
                      [ALPHA CORE CLI v3.8.4] Type <span className="text-emerald-400">'help'</span> for subroutines or inspect current run.
                    </div>
                    {terminalHistory.map((entry, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-slate-500 text-[9px] select-none pt-0.5">{entry.timestamp}</span>
                        {entry.type === 'cmd' && (
                          <div className="text-emerald-400 font-semibold flex items-center gap-1">
                            <span className="text-cyan-400">alpha@deliberation:~$</span>
                            <span>{entry.text}</span>
                          </div>
                        )}
                        {entry.type === 'stdout' && <div className="text-slate-300 pl-4">{entry.text}</div>}
                        {entry.type === 'ok' && <div className="text-emerald-400 font-semibold pl-4">{entry.text}</div>}
                        {entry.type === 'warn' && <div className="text-amber-300 font-semibold pl-4">{entry.text}</div>}
                        {entry.type === 'sys' && <div className="text-cyan-300 italic pl-4">{entry.text}</div>}
                      </div>
                    ))}

                    {/* Active Prompt Line with Blinking Cursor */}
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-cyan-400 font-semibold">alpha@deliberation:~$</span>
                      <span className="text-emerald-300">{activePhase.title} subroutine running...</span>
                      <span className="h-3.5 w-1.5 bg-emerald-400 animate-pulse" />
                    </div>
                  </>
                )}

                {terminalTab === 'logs' && (
                  <div className="space-y-1 text-emerald-300/90">
                    <p className="text-slate-400 text-[10px] border-b border-slate-800 pb-1">=== TELEMETRY RUN LOGS ===</p>
                    {phases.map((p, i) => (
                      <div key={p.id} className="border-b border-slate-800 py-1">
                        <span className="text-emerald-400 font-bold">[PHASE {i + 1}]: {p.title}</span>
                        <p className="text-slate-300 pl-2 mt-0.5">{p.log}</p>
                      </div>
                    ))}
                  </div>
                )}

                {terminalTab === 'matrix' && (
                  <div className="space-y-0.5 text-emerald-400/90 font-mono text-[10px]">
                    <p className="text-slate-400 text-[10px] border-b border-slate-800 pb-1">=== QUANTUM BINARY MATRIX STREAM ===</p>
                    {binaryLines.map((line, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-emerald-500/50">{'>'}</span>
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Interactive Command Input Footer */}
              <form onSubmit={handleTerminalSubmit} className="border-t border-slate-800 bg-[#03060a] p-2 flex items-center gap-2">
                <span className="text-cyan-400 text-xs font-semibold pl-1">~$</span>
                <input
                  type="text"
                  value={userCmd}
                  onChange={(e) => setUserCmd(e.target.value)}
                  placeholder="Type CLI command (e.g. status, help, phases)..."
                  className="flex-1 bg-transparent text-xs font-mono text-emerald-300 placeholder:text-slate-600 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-semibold hover:bg-emerald-500/30 transition-colors"
                >
                  EXEC
                </button>
              </form>
            </div>
          </div>

          {/* Dynamic Phase Badges */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {phases.map((ph, idx) => {
              const isPast = idx < activePhaseIndex || isComplete;
              const isCurr = idx === activePhaseIndex && !isComplete;

              return (
                <div
                  key={ph.id}
                  className={`rounded-lg border px-2 py-1.5 text-center transition-all flex flex-col justify-between ${
                    isCurr
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold shadow-sm ring-1 ring-emerald-400/30'
                      : isPast
                      ? 'border-slate-200 bg-white text-slate-600'
                      : 'border-slate-200/60 bg-slate-100/50 text-slate-400'
                  }`}
                >
                  <p className="text-[9px] font-mono uppercase tracking-wider text-slate-400">
                    0{idx + 1}
                  </p>
                  <p className="text-[10px] font-semibold leading-tight mt-0.5 break-words line-clamp-2 min-h-[22px] flex items-center justify-center text-center">
                    {ph.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
      </div>
    </BorderBeam>
  );
}
