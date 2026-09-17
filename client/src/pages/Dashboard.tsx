import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import { useApp } from '../context/AppContext';
import {
  IconArrowUp,
  IconMicrophone,
  IconTrendUp,
  IconGlobe,
  IconRupee,
  IconScale,
  IconTarget,
  IconSearch,
  IconPaperclip,
  IconPlus,
  IconChevronDown,
} from '../components/icons';
import { BorderBeam } from 'border-beam';
import type { OrbState } from 'thinking-orbs';
import ChatMessageItem from '../components/ChatMessageItem';
import ThinkingBlock from '../components/ThinkingBlock';
import QuickThinkingAnimation from '../components/QuickThinkingAnimation';
import {
  EXECUTIVE_THINKING_PHASES,
  generateDecisionResponse,
  generateFollowUpResponse,
} from '../services/thinkingEngine';
import { AnimatedShinyButton } from '@/components/eldoraui/animated-shiny-button';

interface PresetOption {
  title: string;
  icon: typeof IconTrendUp;
  prompt: string;
}

const PRESETS: PresetOption[] = [
  {
    title: 'Should we launch\na new product?',
    icon: IconTrendUp,
    prompt: 'Should we launch our enterprise AI decision copilot in Q4, risking cash runway vs gaining first-mover advantage?',
  },
  {
    title: 'Enter a new\nmarket?',
    icon: IconGlobe,
    prompt: 'Should we expand our B2B SaaS platform into the European Union given recent AI Act regulatory compliance burdens?',
  },
  {
    title: 'Invest in this\nopportunity?',
    icon: IconRupee,
    prompt: 'Should we allocate $4.5M in growth capital into specialized in-house inference clusters vs third-party cloud APIs?',
  },
  {
    title: 'Build or buy?',
    icon: IconScale,
    prompt: 'Should we build our own proprietary evaluation framework or acquire a specialized early-stage startup for $8M?',
  },
  {
    title: 'How can we\nreduce risk?',
    icon: IconTarget,
    prompt: 'How can we hedge our single-supplier dependency while scaling production by 150% over the next 12 months?',
  },
];

const FOLLOW_UP_SUGGESTIONS = [
  'What is the catastrophic failure trap here?',
  'Stress-test with a 40% sudden decline in market demand.',
  'How should we structure phased mitigation milestones?',
  'Provide a quantitative downside versus upside payoff table.',
];

export default function Dashboard() {
  const {
    currentSession,
    appendMessageToSession,
    startNewSession,
    activeSessionId,
  } = useApp();

  const [value, setValue] = useState('');
  const [searchActive, setSearchActive] = useState(false);
  const [deepAnalysis, setDeepAnalysis] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  // Dynamic Time-of-Day Greeting (correct for all hours including late night)
  const currentHour = new Date().getHours();
  const timeGreeting =
    currentHour >= 0 && currentHour < 5
      ? 'Burning the midnight oil,'
      : currentHour < 12
        ? 'Good Morning'
        : currentHour < 17
          ? 'Good Afternoon'
          : currentHour < 21
            ? 'Good Evening'
            : 'Burning the midnight oil,';

  // Thinking State & Aura Farming
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingMode, setThinkingMode] = useState<'deep' | 'quick'>('deep');
  const [currentOrbState, setCurrentOrbState] = useState<OrbState>('searching');
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [thinkingElapsedMs, setThinkingElapsedMs] = useState(0);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  const messages = currentSession?.messages || [];
  const hasMessages = messages.length > 0;

  // Auto-resize textarea as user types
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  }, [value]);

  // Auto-scroll to bottom when messages or thinking update
  useEffect(() => {
    if (hasMessages || isThinking) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length, isThinking, activePhaseIndex]);

  // Voice recognition setup (Web Speech API)
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setValue((prev) => (prev ? `${prev} ${transcript}` : transcript));
        }
      };
      recognitionRef.current = recognition;
    }
  }, []);

  function toggleVoiceInput() {
    if (!recognitionRef.current) {
      alert('Voice input is not supported by your current browser.');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error('Speech recognition error:', err);
      }
    }
  }

  function handleFileAttach(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setAttachedFiles((prev) => [...prev, ...filesArray]);
    }
  }

  function removeFile(index: number) {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSendPrompt(textToSend?: string) {
    const promptText = (textToSend ?? value).trim();
    if (!promptText || isThinking) return;

    let targetSessionId = activeSessionId;
    if (!currentSession) {
      const title = promptText.length > 40 ? promptText.slice(0, 38) + '…' : promptText;
      const created = startNewSession(title);
      targetSessionId = created.id;
    } else if (messages.length === 0) {
      const title = promptText.length > 40 ? promptText.slice(0, 38) + '…' : promptText;
      currentSession.title = title;
    }

    // Append User Message
    appendMessageToSession(targetSessionId, {
      role: 'user',
      content: promptText,
    });

    setValue('');
    setAttachedFiles([]);
    setIsThinking(true);
    setThinkingElapsedMs(0);

    const startTime = Date.now();

    // Check if this is the initial deep decision analysis or continuing the chat further
    const existingAssistantCount = messages.filter((m) => m.role === 'assistant').length;
    const isFirstAnalysis = existingAssistantCount === 0;

    if (isFirstAnalysis) {
      // 1. Initial Deep Deliberation (full 7-phase thinking block)
      setThinkingMode('deep');
      setActivePhaseIndex(0);
      const phases = EXECUTIVE_THINKING_PHASES;
      setCurrentOrbState(phases[0].state);

      const intervalTimer = setInterval(() => {
        setThinkingElapsedMs(Date.now() - startTime);
      }, 100);

      let currentStep = 0;
      const phaseInterval = setInterval(() => {
        currentStep++;
        if (currentStep < phases.length) {
          setActivePhaseIndex(currentStep);
          setCurrentOrbState(phases[currentStep].state);
        } else {
          clearInterval(phaseInterval);
          clearInterval(intervalTimer);

          const duration = Date.now() - startTime;
          const analysis = generateDecisionResponse(promptText);

          // Append Initial Deep Assistant Message
          appendMessageToSession(targetSessionId, {
            role: 'assistant',
            content: analysis.content,
            thinkingMode: 'deep',
            thinkingTimeMs: duration,
            thinkingLogs: phases.map((p) => `${p.title}: ${p.log}`),
            verdict: analysis.verdict,
            convictionScore: analysis.convictionScore,
          });

          setIsThinking(false);
        }
      }, 2600);
    } else {
      // 2. Follow-Up Chat Response: Quick modern AI thinking (~2.1s with dummy data stream)
      setThinkingMode('quick');

      const intervalTimer = setInterval(() => {
        setThinkingElapsedMs(Date.now() - startTime);
      }, 100);

      setTimeout(() => {
        clearInterval(intervalTimer);
        const duration = Date.now() - startTime;
        const followUp = generateFollowUpResponse(promptText, currentSession?.title);

        // Append Follow-up Assistant Message
        appendMessageToSession(targetSessionId, {
          role: 'assistant',
          content: followUp.content,
          thinkingMode: 'quick',
          thinkingTimeMs: duration,
          thinkingLogs: followUp.logs,
          convictionScore: followUp.convictionScore,
        });

        setIsThinking(false);
      }, 2100);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendPrompt();
    }
  }

  function handlePresetClick(preset: PresetOption) {
    handleSendPrompt(preset.prompt);
  }

  return (
    <div className="relative flex min-h-[calc(100vh-2rem)] flex-col items-center justify-between px-4 pb-12 pt-6 sm:px-8">
      {/* ========================================================================= */}
      {/* 1. HERO VIEW (Shown when no messages exist in current session)            */}
      {/* ========================================================================= */}
      {!hasMessages && !isThinking ? (
        <div className="relative w-full max-w-3xl flex flex-col items-center my-auto py-12">
          {/* Subtle Animated Background Elements for Hero Page */}
          <div className="pointer-events-none absolute inset-0 -top-20 -bottom-20 overflow-hidden select-none -z-10">
            {/* Emerald Soft Ambient Glow Orb */}
            <div className="animate-ambient-1 absolute -top-12 left-1/2 h-[380px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-br from-emerald-200/35 via-teal-100/25 to-transparent blur-3xl" />
            {/* Cyan Ambient Floating Orb */}
            <div className="animate-ambient-2 absolute top-1/4 -left-28 h-[340px] w-[440px] rounded-full bg-gradient-to-tr from-cyan-200/25 via-emerald-100/20 to-transparent blur-3xl" />
            {/* Indigo/Violet Soft Glow Orb */}
            <div className="animate-ambient-3 absolute top-1/2 -right-28 h-[360px] w-[460px] rounded-full bg-gradient-to-bl from-indigo-100/25 via-emerald-50/25 to-transparent blur-3xl" />
            {/* Gentle Micro-Dots Matrix Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.035]" />
          </div>

          {/* Silk decorative accent line */}
          <div className="flex items-center gap-3 mb-5 select-none silk-title">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-emerald-400/60" />
            <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.45em] text-emerald-700 uppercase">
              PROJECT ALPHA · COGNITIVE OS
            </p>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-emerald-400/60" />
          </div>

          {/* Main Headline — single line, time-aware */}
          <h1 className="silk-title text-center text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] tracking-tight text-slate-900">
            {timeGreeting} Boss,{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Let's Cook.
              </span>
              <span className="absolute bottom-0.5 left-0 h-0.5 w-full rounded-full bg-gradient-to-r from-emerald-400/0 via-emerald-500/60 to-emerald-400/0" />
            </span>
          </h1>

          {/* Compelling action tagline */}
          <p className="silk-tagline mx-auto mt-5 max-w-lg text-center text-sm sm:text-[15px] leading-relaxed text-slate-500 font-medium">
            Your next move is worth millions.{' '}
            <span className="text-slate-800 font-semibold">Don't make it blind.</span>
            {' '}Type your decision below and let Alpha stress-test every assumption before you commit.
          </p>

          {/* Chat Box with BorderBeam — continuously active traveling beam */}
          <BorderBeam
            size="md"
            colorVariant="colorful"
            theme="light"
            strength={1}
            duration={2.8}
            active={true}
            className="w-full mt-8 silk-input shadow-lg"
          >
            <div className="glass-capsule relative w-full p-4 sm:p-5 transition-all focus-within:border-emerald-500 focus-within:shadow-md">
              {/* File Previews */}
              {attachedFiles.length > 0 && (
                <div className="mb-2.5 flex flex-wrap gap-2">
                  {attachedFiles.map((file, idx) => (
                    <span
                      key={file.name + idx}
                      className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-800 backdrop-blur-md"
                    >
                      <IconPaperclip size={11} />
                      <span className="max-w-[140px] truncate">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(idx)}
                        className="ml-0.5 text-emerald-600 hover:text-slate-900"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Textarea */}
              <textarea
                ref={textareaRef}
                id="decision-input"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={2}
                placeholder="Give Alpha the decision, constraints, and stakes. We'll stress-test the reality..."
                className="w-full resize-none bg-transparent px-2 text-sm sm:text-base leading-relaxed text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFileAttach}
              />

              {/* Input Controls Toolbar */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">
                <div className="relative flex flex-wrap items-center gap-1.5">
                  {/* Plus Action Button */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowPlusMenu(!showPlusMenu)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900"
                      aria-label="Add options"
                    >
                      <IconPlus size={13} />
                    </button>

                    {showPlusMenu && (
                      <div className="absolute left-0 bottom-full mb-2 w-56 rounded-xl border border-slate-200 bg-white p-2 text-xs shadow-xl backdrop-blur-xl z-50">
                        <button
                          type="button"
                          onClick={() => {
                            setShowPlusMenu(false);
                            fileInputRef.current?.click();
                          }}
                          className="w-full text-left px-2.5 py-1.5 rounded text-slate-700 hover:bg-slate-100 hover:text-slate-900 flex items-center gap-2"
                        >
                          <IconPaperclip size={13} />
                          <span>Upload Pitch Deck / Memo</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowPlusMenu(false);
                            setValue((v) => `${v}\n[Constraint]: Budget capped at $2M, 6 month runway.`);
                          }}
                          className="w-full text-left px-2.5 py-1.5 rounded text-slate-700 hover:bg-slate-100 hover:text-slate-900 flex items-center gap-2"
                        >
                          <span>⚡</span>
                          <span>Add Hard Constraint</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Search Toggle Pill (Fires Beam effect on chat capsule when active) */}
                  <button
                    type="button"
                    onClick={() => setSearchActive(!searchActive)}
                    className={`glass-pill ${searchActive ? 'glass-pill-active' : ''}`}
                  >
                    <IconSearch size={12} className={searchActive ? 'text-emerald-700' : 'text-slate-500'} />
                    <span>Search Ground Truth</span>
                  </button>

                  {/* Deep Analysis Toggle Pill */}
                  <button
                    type="button"
                    onClick={() => setDeepAnalysis(!deepAnalysis)}
                    className={`glass-pill ${deepAnalysis ? 'glass-pill-active' : ''}`}
                  >
                    <IconGlobe size={12} className={deepAnalysis ? 'text-emerald-700' : 'text-slate-500'} />
                    <span>Adversarial Matrix</span>
                    {deepAnalysis && <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-ping" />}
                  </button>

                  {/* Attach Button */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="glass-pill"
                  >
                    <IconPaperclip size={12} />
                    <span>Attach Data</span>
                  </button>
                </div>

                {/* Right Tools: Mic & Send Arrow */}
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={toggleVoiceInput}
                    className={`flex h-9 w-9 items-center justify-center rounded-full transition-all ${isListening
                      ? 'border border-red-300 bg-red-50 text-red-600 ring-4 ring-red-100'
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    title={isListening ? 'Listening... click to stop' : 'Click to speak'}
                    aria-label="Voice input"
                  >
                    <IconMicrophone size={17} />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSendPrompt()}
                    disabled={!value.trim()}
                    className="group flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm transition-all duration-200 hover:scale-105 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 disabled:shadow-none"
                    aria-label="Send decision"
                  >
                    <IconArrowUp size={17} className="transition-transform group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            </div>
          </BorderBeam>

          {/* 5 Preset Decision Suggestion Cards with Micro-Interactions */}
          <div className="mt-6 grid w-full grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5 silk-presets">
            {PRESETS.map((preset) => {
              const Icon = preset.icon;
              return (
                <button
                  key={preset.title}
                  type="button"
                  onClick={() => handlePresetClick(preset)}
                  className="glass-card group relative flex flex-col justify-between p-3.5 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-emerald-400/80 active:scale-[0.97] cursor-pointer"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 transition-all duration-200 group-hover:scale-110 group-hover:bg-emerald-100 group-hover:text-emerald-800 group-hover:ring-emerald-300">
                    <Icon size={15} />
                  </span>
                  <p className="mt-3 whitespace-pre-line text-xs font-semibold leading-snug text-slate-800 transition-colors group-hover:text-emerald-950">
                    {preset.title}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Intelligence Architecture Drawer Chevron */}
          <div className="mt-8 flex flex-col items-center">
            <button
              type="button"
              onClick={() => setShowGuide(!showGuide)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-all hover:text-slate-900 hover:bg-slate-100"
              aria-label="More information"
            >
              <IconChevronDown size={18} className={`transition-transform duration-300 ${showGuide ? 'rotate-180 text-emerald-600' : ''}`} />
            </button>

            {showGuide && (
              <div className="mt-3 w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-5 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">
                  The 7-Stage Alpha Decision Pipeline
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-600 mt-3">
                  <div className="border border-slate-200 bg-slate-50 p-2.5 rounded-xl">
                    <p className="text-slate-900 font-bold">1. Finding Evidences</p>
                    <p className="text-[11px] mt-1 text-slate-500">Extracts hidden ground truths and empirical signals.</p>
                  </div>
                  <div className="border border-slate-200 bg-slate-50 p-2.5 rounded-xl">
                    <p className="text-slate-900 font-bold">2. Attacking Decisions</p>
                    <p className="text-[11px] mt-1 text-slate-500">Adversarial red-team attacks against confirmation bias.</p>
                  </div>
                  <div className="border border-slate-200 bg-slate-50 p-2.5 rounded-xl">
                    <p className="text-slate-900 font-bold">3. Creating Simulation World</p>
                    <p className="text-[11px] mt-1 text-slate-500">10,000 Monte Carlo multiverse stress test iterations.</p>
                  </div>
                  <div className="border border-slate-200 bg-slate-50 p-2.5 rounded-xl">
                    <p className="text-slate-900 font-bold">4. Checking Probability</p>
                    <p className="text-[11px] mt-1 text-slate-500">Bayesian posterior confidence and asymmetric convexity.</p>
                  </div>
                  <div className="border border-slate-200 bg-slate-50 p-2.5 rounded-xl">
                    <p className="text-slate-900 font-bold">5. Predicting the Future</p>
                    <p className="text-[11px] mt-1 text-slate-500">Second-order ripple effects & horizon forecasting.</p>
                  </div>
                  <div className="border border-slate-200 bg-slate-50 p-2.5 rounded-xl">
                    <p className="text-slate-900 font-bold">6. Finding Risks & Traps</p>
                    <p className="text-[11px] mt-1 text-slate-500">Isolating failure traps and synthesizing executive verdict.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* 2. CONTINUOUS CONVERSATION STREAM (Typical LLM Chat Flow)                */
        /* ========================================================================= */
        <div className="w-full max-w-4xl flex-1 flex flex-col pb-72 sm:pb-80 pt-2">
          {/* Conversation Header */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-emerald-600" />
              <h2 className="text-sm font-bold text-slate-900 truncate max-w-md">
                {currentSession?.title || 'Decision Analysis Session'}
              </h2>
            </div>
            <AnimatedShinyButton
              onClick={() => startNewSession()}
            >
              <IconPlus size={13} />
              <span>Start New Thread</span>
            </AnimatedShinyButton>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 space-y-4">
            {messages.map((msg) => (
              <ChatMessageItem key={msg.id} message={msg} />
            ))}

            {/* In-Flight Thinking: Full 7-Phase Deliberation for Initial vs Modern Quick Thinking for Follow-ups */}
            {isThinking && (
              thinkingMode === 'deep' ? (
                <div className="my-6 max-w-4xl w-full animate-in fade-in slide-in-from-bottom-2 duration-200">
                  <ThinkingBlock
                    phases={EXECUTIVE_THINKING_PHASES}
                    activePhaseIndex={activePhaseIndex}
                    orbState={currentOrbState}
                    elapsedMs={thinkingElapsedMs}
                    isComplete={false}
                  />
                </div>
              ) : (
                <QuickThinkingAnimation elapsedMs={thinkingElapsedMs} />
              )
            )}

            <div ref={chatBottomRef} />
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. PINNED BOTTOM CHAT BAR (When conversation is active)                   */}
      {/* ========================================================================= */}
      {(hasMessages || isThinking) && (
        <div className="fixed bottom-0 left-0 right-0 z-30 flex flex-col items-center bg-gradient-to-t from-slate-50 via-slate-50/95 to-transparent px-4 pb-6 pt-3 pointer-events-auto">
          {/* Quick Follow-up Pills — Single clean scrollable row, zero overlap */}
          {!isThinking && (
            <div className="mb-2 flex items-center gap-2 overflow-x-auto max-w-3xl px-2 py-0.5 scrollbar-none">
              {FOLLOW_UP_SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleSendPrompt(suggestion)}
                  className="whitespace-nowrap rounded-full border border-slate-200/90 bg-white/90 px-3 py-1 text-[11px] font-medium text-slate-600 shadow-2xs backdrop-blur-md transition-all hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-900 cursor-pointer shrink-0"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Chat Box with BorderBeam */}
          <div className="w-full max-w-3xl">
            <BorderBeam
              size="md"
              colorVariant="colorful"
              theme="light"
              strength={1}
              duration={2.8}
              active={true}
              className="w-full shadow-lg"
            >
              <div className="glass-capsule relative w-full p-3 sm:p-4 shadow-xl transition-all focus-within:border-emerald-500">
                {/* File Attachment Previews */}
                {attachedFiles.length > 0 && (
                  <div className="mb-2 flex flex-wrap gap-2">
                    {attachedFiles.map((file, idx) => (
                      <span
                        key={file.name + idx}
                        className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-800 backdrop-blur-md"
                      >
                        <IconPaperclip size={10} />
                        <span className="max-w-[120px] truncate">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(idx)}
                          className="ml-0.5 text-emerald-600 hover:text-slate-900"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                <textarea
                  ref={textareaRef}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isThinking}
                  rows={1}
                  placeholder={isThinking ? 'Alpha is executing deep neural simulations...' : 'Ask a follow-up or challenge an assumption...'}
                  className="w-full resize-none bg-transparent px-2 text-sm leading-relaxed text-slate-900 placeholder:text-slate-400 focus:outline-none disabled:opacity-50"
                />

                <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="glass-pill text-xs"
                      title="Attach documents or data"
                    >
                      <IconPaperclip size={11} />
                      <span className="hidden sm:inline">Attach</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeepAnalysis(!deepAnalysis)}
                      className={`glass-pill text-xs ${deepAnalysis ? 'glass-pill-active' : ''}`}
                    >
                      <IconGlobe size={11} className={deepAnalysis ? 'text-emerald-700' : 'text-slate-500'} />
                      <span className="hidden sm:inline">Adversarial Mode</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={toggleVoiceInput}
                      className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${isListening
                        ? 'border border-red-300 bg-red-50 text-red-600 ring-4 ring-red-100'
                        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      title={isListening ? 'Listening...' : 'Voice input'}
                    >
                      <IconMicrophone size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSendPrompt()}
                      disabled={!value.trim() || isThinking}
                      className="group flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm transition-all hover:scale-105 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 disabled:shadow-none"
                    >
                      <IconArrowUp size={15} className="transition-transform group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            </BorderBeam>
          </div>
        </div>
      )}

      {/* Brand Statement at Bottom (When not chatting) */}
      {!hasMessages && (
        <div className="pointer-events-none fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3.5 text-[8.5px] sm:text-[9.5px] font-bold uppercase tracking-[0.32em] text-slate-400 select-none whitespace-nowrap">
          <span>POWERED BY CURIOSITY</span>
          <span className="h-3 w-[1px] bg-slate-300" />
          <span>DRIVEN BY EVIDENCE</span>
        </div>
      )}

      {/* Bottom-Right Floating 24/7 Status Card (Only when idle) */}
      {!hasMessages && !isThinking && (
        <div className="fixed bottom-6 right-6 hidden xl:block z-20">
          <div className="w-[220px] rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xl backdrop-blur-xl transition-all hover:border-emerald-500">
            <div className="flex items-start gap-2.5">
              <span className="relative flex h-2 w-2 mt-1 shrink-0">
                <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-600" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
              </span>
              <p className="text-[11px] leading-relaxed text-slate-600 font-medium">
                Your decisions deserve a second opinion. Alpha is here 24/7.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

