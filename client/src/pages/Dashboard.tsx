import { useState, useRef, useEffect, type FormEvent, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { api, ApiError } from '../api/client';
import type { Decision } from '../types';
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
  IconCheck,
} from '../components/icons';

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

export default function Dashboard() {
  const navigate = useNavigate();
  const { setActiveDecision } = useApp();
  const [value, setValue] = useState('');
  const [searchActive, setSearchActive] = useState(false);
  const [deepAnalysis, setDeepAnalysis] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const recognitionRef = useRef<any>(null);

  // Auto-resize textarea as user types
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  }, [value]);

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

  async function startDecision(text: string) {
    const title = text.trim();
    if (!title) return;

    const local: Decision = {
      id: crypto.randomUUID(),
      title,
      description: null,
      status: 'analyzing',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    try {
      const { decision } = await api.createDecision({ title });
      setActiveDecision(decision);
      navigate(`/decision/${decision.id}/analyze`);
    } catch (err) {
      if (err instanceof ApiError && err.status !== 503) {
        // Fallback to local
      }
      setActiveDecision(local);
      navigate(`/decision/${local.id}/analyze`);
    }
  }

  function handleSend() {
    startDecision(value);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handlePresetClick(preset: PresetOption) {
    setValue(preset.prompt);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }

  return (
    <div className="relative flex min-h-[calc(100vh-2rem)] flex-col items-center justify-center px-4 pb-24 pt-16 sm:px-8">
      {/* Center Hero Content Container */}
      <div className="w-full max-w-3xl flex flex-col items-center">
        {/* Subtle Minimal Brand Label matching reference */}
        <p className="text-[11px] sm:text-xs font-semibold tracking-[0.4em] text-alpha-faint uppercase text-center mb-3 select-none">
          PROJECT ALPHA
        </p>

        {/* Main Headline */}
        <h1 className="text-center text-4xl sm:text-5xl lg:text-[3.35rem] font-bold leading-[1.14] tracking-tight text-white">
          What decision are you
          <br />
          <span className="text-[#38e8ba] drop-shadow-[0_0_30px_rgba(56,232,186,0.35)]">
            trying to make?
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-4 max-w-xl text-center text-xs sm:text-sm leading-relaxed text-alpha-muted">
          Alpha investigates the evidence, challenges assumptions,
          <br className="hidden sm:inline" /> and stress-tests your decision before you commit.
        </p>

        {/* Executive Decision Input Capsule */}
        <div className="glass-capsule relative mt-8 w-full p-4 sm:p-5">
          {/* File Attachment Previews */}
          {attachedFiles.length > 0 && (
            <div className="mb-2.5 flex flex-wrap gap-2">
              {attachedFiles.map((file, idx) => (
                <span
                  key={file.name + idx}
                  className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300 backdrop-blur-md"
                >
                  <IconPaperclip size={11} />
                  <span className="max-w-[140px] truncate">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="ml-0.5 text-emerald-400/80 hover:text-white"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Text Area */}
          <textarea
            ref={textareaRef}
            id="decision-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
            placeholder="Describe your decision, upload evidence, or ask anything..."
            className="w-full resize-none bg-transparent px-2 text-sm sm:text-base leading-relaxed text-white placeholder:text-alpha-faint/80 focus:outline-none"
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
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.04] pt-3">
            {/* Left Tools */}
            <div className="relative flex flex-wrap items-center gap-1.5">
              {/* '+' Action Button */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowPlusMenu(!showPlusMenu)}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-alpha-muted transition-colors hover:border-white/20 hover:text-white"
                  aria-label="Add options"
                >
                  <IconPlus size={13} />
                </button>

                {showPlusMenu && (
                  <div className="absolute left-0 bottom-full mb-2 w-52 rounded-xl border border-white/10 bg-[#0b0f14]/95 p-2 text-xs shadow-2xl backdrop-blur-xl z-50">
                    <button
                      type="button"
                      onClick={() => {
                        setShowPlusMenu(false);
                        fileInputRef.current?.click();
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded text-alpha-muted hover:bg-white/[0.06] hover:text-white flex items-center gap-2"
                    >
                      <IconPaperclip size={13} />
                      <span>Upload Pitch Deck / Memo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowPlusMenu(false);
                        setValue((v) => `${v}\n[Constraint]: Budget under $2M, 6 month runway.`);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded text-alpha-muted hover:bg-white/[0.06] hover:text-white flex items-center gap-2"
                    >
                      <span>⚡</span>
                      <span>Add Hard Constraints</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Search Toggle Pill */}
              <button
                type="button"
                onClick={() => setSearchActive(!searchActive)}
                className={`glass-pill ${searchActive ? 'glass-pill-active' : ''}`}
              >
                <IconSearch size={12} className={searchActive ? 'text-emerald-400' : 'text-alpha-muted'} />
                <span>Search</span>
              </button>

              {/* Deep Analysis Toggle Pill (active state matching screenshot) */}
              <button
                type="button"
                onClick={() => setDeepAnalysis(!deepAnalysis)}
                className={`glass-pill ${deepAnalysis ? 'glass-pill-active' : ''}`}
              >
                <IconGlobe size={12} className={deepAnalysis ? 'text-emerald-400' : 'text-alpha-muted'} />
                <span>Deep Analysis</span>
                {deepAnalysis && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />}
              </button>

              {/* Attach Pill */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="glass-pill"
              >
                <IconPaperclip size={12} />
                <span>Attach</span>
              </button>
            </div>

            {/* Right Tools: Mic & Send Arrow */}
            <div className="flex items-center gap-2.5">
              {/* Microphone Voice Button */}
              <button
                type="button"
                onClick={toggleVoiceInput}
                className={`flex h-9 w-9 items-center justify-center rounded-full transition-all ${
                  isListening
                    ? 'border border-red-500/50 bg-red-500/20 text-red-400 ring-4 ring-red-500/20'
                    : 'text-alpha-muted hover:bg-white/[0.06] hover:text-white'
                }`}
                title={isListening ? 'Listening... click to stop' : 'Click to speak'}
                aria-label="Voice input"
              >
                <IconMicrophone size={17} />
              </button>

              {/* Circular Emerald Send Button (Up Arrow) */}
              <button
                type="button"
                onClick={handleSend}
                disabled={!value.trim()}
                className="group flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400 text-[#04130d] shadow-[0_0_22px_rgba(52,211,153,0.5)] transition-all duration-200 hover:scale-105 hover:bg-emerald-300 hover:shadow-[0_0_30px_rgba(52,211,153,0.7)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 disabled:shadow-none"
                aria-label="Send decision"
              >
                <IconArrowUp size={17} className="transition-transform group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 5 Preset Decision Suggestion Cards */}
        <div className="mt-6 grid w-full grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
          {PRESETS.map((preset) => {
            const Icon = preset.icon;
            return (
              <button
                key={preset.title}
                type="button"
                onClick={() => handlePresetClick(preset)}
                className="glass-card group flex flex-col justify-between p-3.5 text-left"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20 transition-transform group-hover:scale-110 group-hover:bg-emerald-500/20">
                  <Icon size={15} />
                </span>
                <p className="mt-3 whitespace-pre-line text-xs font-medium leading-snug text-white/90 group-hover:text-white">
                  {preset.title}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Down Chevron Indicator */}
      <div className="mt-10 flex flex-col items-center">
        <button
          type="button"
          onClick={() => setShowGuide(!showGuide)}
          className="flex h-8 w-8 items-center justify-center rounded-full text-alpha-faint transition-all hover:text-white hover:bg-white/[0.04]"
          aria-label="More information"
        >
          <IconChevronDown size={18} className={`transition-transform duration-300 ${showGuide ? 'rotate-180 text-emerald-400' : ''}`} />
        </button>

        {/* Expandable Intelligence Architecture Drawer */}
        {showGuide && (
          <div className="mt-3 w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0a0e13]/90 p-5 backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
              The 6-Stage Alpha Decision Pipeline
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-alpha-muted mt-3">
              <div className="border border-white/5 bg-white/[0.02] p-2.5 rounded-xl">
                <p className="text-white font-semibold">1. Context Intake</p>
                <p className="text-[11px] mt-1 text-alpha-faint">Extracts hidden premises and risk variables.</p>
              </div>
              <div className="border border-white/5 bg-white/[0.02] p-2.5 rounded-xl">
                <p className="text-white font-semibold">2. Adversarial Red Team</p>
                <p className="text-[11px] mt-1 text-alpha-faint">Simulates opposition attacks against confirmation bias.</p>
              </div>
              <div className="border border-white/5 bg-white/[0.02] p-2.5 rounded-xl">
                <p className="text-white font-semibold">3. Scenario Simulation</p>
                <p className="text-[11px] mt-1 text-alpha-faint">10,000 Monte Carlo iterations & black swan stress tests.</p>
              </div>
              <div className="border border-white/5 bg-white/[0.02] p-2.5 rounded-xl">
                <p className="text-white font-semibold">4. Breaking Points</p>
                <p className="text-[11px] mt-1 text-alpha-faint">Identifies failure triggers and sensitivity thresholds.</p>
              </div>
              <div className="border border-white/5 bg-white/[0.02] p-2.5 rounded-xl">
                <p className="text-white font-semibold">5. Structured Verdict</p>
                <p className="text-[11px] mt-1 text-alpha-faint">Executive verdict with clear GO / NO-GO recommendations.</p>
              </div>
              <div className="border border-white/5 bg-white/[0.02] p-2.5 rounded-xl">
                <p className="text-white font-semibold">6. 24/7 Monitoring</p>
                <p className="text-[11px] mt-1 text-alpha-faint">Continuous real-world tracking post-commitment.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Center Tagline (Official brand lockup statement) */}
      <div className="pointer-events-none fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3.5 text-[8.5px] sm:text-[9.5px] font-semibold uppercase tracking-[0.32em] text-white/40 select-none whitespace-nowrap">
        <span>POWERED BY CURIOSITY</span>
        <span className="h-3 w-[1px] bg-white/20" />
        <span>DRIVEN BY EVIDENCE</span>
      </div>

      {/* Bottom-Right Floating 24/7 Status Card (Positioned in front of the mountain beacon) */}
      <div className="fixed bottom-6 right-6 hidden w-[220px] rounded-2xl border border-white/10 bg-[#080d12]/85 p-3.5 shadow-2xl backdrop-blur-xl xl:block z-20 transition-all hover:border-emerald-500/40 hover:shadow-[0_0_25px_-5px_rgba(52,211,153,0.3)]">
        <div className="flex items-start gap-2.5">
          <span className="relative flex h-2 w-2 mt-1 shrink-0">
            <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <p className="text-[11px] leading-relaxed text-alpha-muted">
            Your decisions deserve a second opinion. Alpha is here 24/7.
          </p>
        </div>
      </div>
    </div>
  );
}
