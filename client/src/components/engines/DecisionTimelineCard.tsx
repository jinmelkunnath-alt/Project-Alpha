import React, { useState } from 'react';
import type { DecisionMemoryRecord, TimelineEvent } from '../../services/engines/types';
import {
  getStoredDecisionMemory,
  appendTimelineEvent,
} from '../../services/engines/decisionMemoryEngine';
import { IconClock, IconCheck, IconAlert, IconShieldCheck, IconActivity } from '../icons';

interface DecisionTimelineCardProps {
  initialRecord?: DecisionMemoryRecord;
}

export default function DecisionTimelineCard({
  initialRecord,
}: DecisionTimelineCardProps) {
  const [record, setRecord] = useState<DecisionMemoryRecord>(
    () => initialRecord || getStoredDecisionMemory()
  );

  function formatTimelineDate(isoString: string): { dayMonth: string; time: string } {
    try {
      const d = new Date(isoString);
      const dayMonth = d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }).toUpperCase();
      const time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return { dayMonth, time };
    } catch {
      return { dayMonth: '17 SEP', time: '12:00' };
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
              <IconClock size={15} />
            </span>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Decision Memory & Timeline
            </h3>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-mono font-bold text-slate-700">
              Immutable Ledger
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Full audit history preserving baseline assumptions, research milestones, monitoring tripwires, and reassessments.
          </p>
        </div>

        {/* Delta Tag: Original vs Current */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-600">
            Original: <strong className="text-slate-900">{record.originalConvictionScore}% ({record.originalVerdict})</strong>
          </div>
          <span className="text-slate-400">&rarr;</span>
          <div className="rounded-lg border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-indigo-900">
            Current: <strong className="text-indigo-700">{record.currentConvictionScore}% ({record.currentVerdict})</strong>
          </div>
        </div>
      </div>

      {/* Baseline Decision Immutable Quote Box */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 mb-6">
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">
          <span>ORIGINAL MANDATE PRESERVED</span>
          <span>Logged: {formatTimelineDate(record.createdAt).dayMonth} {formatTimelineDate(record.createdAt).time}</span>
        </div>
        <p className="text-xs font-semibold text-slate-800 leading-relaxed">
          "{record.originalDecision}"
        </p>

        {/* Assumptions Checklist */}
        <div className="mt-3 pt-3 border-t border-slate-200/80">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
            Tracked Structural Assumptions ({record.assumptions.length})
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {record.assumptions.map((asm) => (
              <div
                key={asm.id}
                className="flex items-start gap-2 rounded-lg border border-slate-200/70 bg-white p-2"
              >
                <span
                  className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase ${
                    asm.status === 'HELD'
                      ? 'bg-emerald-100 text-emerald-800'
                      : asm.status === 'FAILED'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {asm.status}
                </span>
                <span className="text-slate-700 text-[11px] leading-snug">{asm.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Visual Chronological Timeline */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-[11px] sm:before:left-[15px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200">
        {record.timeline.map((evt, idx) => {
          const { dayMonth, time } = formatTimelineDate(evt.timestamp);
          const isLatest = idx === record.timeline.length - 1;

          return (
            <div key={evt.id} className="relative group">
              {/* Timeline Bullet Node */}
              <div
                className={`absolute -left-[23px] sm:-left-[27px] top-1 h-6 w-6 rounded-full border-2 bg-white flex items-center justify-center transition-all ${
                  isLatest
                    ? 'border-indigo-600 ring-4 ring-indigo-100 shadow-xs'
                    : 'border-slate-300 group-hover:border-slate-400'
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    evt.badgeColor === 'emerald'
                      ? 'bg-emerald-600'
                      : evt.badgeColor === 'rose'
                      ? 'bg-rose-600'
                      : evt.badgeColor === 'amber'
                      ? 'bg-amber-600'
                      : evt.badgeColor === 'indigo'
                      ? 'bg-indigo-600'
                      : 'bg-slate-500'
                  }`}
                />
              </div>

              {/* Event Content Card */}
              <div className="rounded-xl border border-slate-200/90 bg-slate-50/50 p-3 hover:bg-slate-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-1.5 py-0.5 rounded">
                      {dayMonth}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 tracking-tight">
                      {evt.title}
                    </h4>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400">{time}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {evt.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
