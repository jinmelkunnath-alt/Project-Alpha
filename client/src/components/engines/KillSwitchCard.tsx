import React, { useState } from 'react';
import type { KillSwitchRule } from '../../services/engines/types';
import { SAMPLE_KILL_SWITCH_RULES } from '../../services/engines/killSwitchEngine';
import { IconAlert, IconShieldCheck, IconActivity } from '../icons';

interface KillSwitchCardProps {
  initialRules?: KillSwitchRule[];
  onTriggerAction?: (rule: KillSwitchRule) => void;
}

export default function KillSwitchCard({
  initialRules = SAMPLE_KILL_SWITCH_RULES,
  onTriggerAction,
}: KillSwitchCardProps) {
  const [rules, setRules] = useState<KillSwitchRule[]>(initialRules);

  function handleTestTrip(id: string) {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isTripped: !r.isTripped } : r))
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-50 text-rose-700 border border-rose-200">
              <IconAlert size={15} />
            </span>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Kill-Switch Engine & Tripwire Rules
            </h3>
            <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-rose-800">
              Active Safeguards
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Automated, non-negotiable circuit breakers that force execution halts before systemic insolvency or catastrophic loss.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-mono text-slate-700">
            <strong>{rules.length}</strong> Monitored Tripwires
          </span>
        </div>
      </div>

      {/* Kill-Switch Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rules.map((rule) => {
          const isCritical = rule.severity === 'CRITICAL';
          const isTripped = rule.isTripped;

          return (
            <div
              key={rule.id}
              className={`rounded-xl border p-4 transition-all ${
                isTripped
                  ? 'border-rose-400 bg-rose-50/70 shadow-md ring-2 ring-rose-300'
                  : isCritical
                  ? 'border-rose-200 bg-rose-50/20'
                  : 'border-slate-200 bg-slate-50/40 hover:bg-slate-50'
              }`}
            >
              {/* Card Header: Title & Badges */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="font-mono text-xs font-bold text-slate-900">
                  {rule.title}
                </span>

                <div className="flex items-center gap-1.5">
                  <span
                    className={`rounded px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase ${
                      isCritical
                        ? 'bg-rose-100 text-rose-800 border border-rose-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}
                  >
                    {rule.severity} IMPACT
                  </span>
                  {rule.monitoringLinked && (
                    <span className="rounded bg-indigo-50 text-indigo-700 border border-indigo-200 px-1.5 py-0.5 text-[9px] font-mono">
                      24/7 Linked
                    </span>
                  )}
                </div>
              </div>

              {/* Exact Spec Layout: Condition, Trigger, Impact, Recommended Action */}
              <div className="space-y-2 text-xs">
                {/* Condition */}
                <div className="rounded-lg bg-white/90 p-2.5 border border-slate-200/80">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    Condition
                  </span>
                  <p className="text-slate-800 font-semibold mt-0.5 leading-snug">
                    {rule.condition}
                  </p>
                </div>

                {/* Metrics Proximity Bar */}
                <div className="flex items-center justify-between text-[11px] font-mono bg-white/70 px-2.5 py-1.5 rounded border border-slate-200/60">
                  <span className="text-slate-500">Observed: <strong>{rule.currentObservedValue}</strong></span>
                  <span className="text-slate-400">&rarr;</span>
                  <span className="text-rose-700 font-bold">Limit: {rule.thresholdValue}</span>
                </div>

                {/* Trigger & Recommended Action */}
                <div className="rounded-lg bg-white/90 p-2.5 border border-slate-200/80">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Trigger:
                    </span>
                    <span className="rounded bg-slate-900 text-white px-2 py-0.2 text-[10px] font-mono font-bold">
                      {rule.trigger}
                    </span>
                  </div>
                  <p className="text-slate-700 text-[11px] leading-relaxed">
                    <strong className="text-slate-900">Recommended Action:</strong> {rule.recommendedAction}
                  </p>
                </div>
              </div>

              {/* Footer action to test trip simulation */}
              <div className="mt-3 pt-2.5 border-t border-slate-200/70 flex items-center justify-between text-[11px]">
                <span className={`font-mono font-semibold ${isTripped ? 'text-rose-700 animate-pulse' : 'text-slate-500'}`}>
                  Status: {isTripped ? '🚨 TRIPPED - EXECUTE CONTINGENCY' : '● Operational (Normal)'}
                </span>

                <button
                  type="button"
                  onClick={() => handleTestTrip(rule.id)}
                  className="text-[10px] font-mono text-slate-500 hover:text-slate-800 underline cursor-pointer"
                >
                  {isTripped ? 'Reset Tripwire' : 'Test Trip Simulation'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
