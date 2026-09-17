import React, { useState } from 'react';
import type { EvidenceItem, EvidenceConflict, EvidenceStatus } from '../../services/engines/types';
import {
  SAMPLE_EVIDENCE_REPOSITORY,
  SAMPLE_EVIDENCE_CONFLICTS,
  calculateEvidenceHealth,
} from '../../services/engines/evidenceEngine';
import { IconDocument, IconShieldCheck, IconAlert, IconGlobe } from '../icons';

interface EvidenceProvenanceCardProps {
  evidenceList?: EvidenceItem[];
  conflictsList?: EvidenceConflict[];
}

export default function EvidenceProvenanceCard({
  evidenceList = SAMPLE_EVIDENCE_REPOSITORY,
  conflictsList = SAMPLE_EVIDENCE_CONFLICTS,
}: EvidenceProvenanceCardProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'verified' | 'conflicts'>('all');
  const [selectedConflict, setSelectedConflict] = useState<string | null>(conflictsList[0]?.id || null);

  const health = calculateEvidenceHealth(evidenceList);

  const filteredEvidence =
    activeTab === 'verified'
      ? evidenceList.filter((e) => e.status === 'VERIFIED')
      : evidenceList;

  function renderStatusBadge(status: EvidenceStatus) {
    switch (status) {
      case 'VERIFIED':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold font-mono text-emerald-800 border border-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
            VERIFIED
          </span>
        );
      case 'AI-DERIVED':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-bold font-mono text-indigo-800 border border-indigo-200">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
            AI-DERIVED
          </span>
        );
      case 'USER-PROVIDED':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold font-mono text-blue-800 border border-blue-200">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            USER-PROVIDED
          </span>
        );
      case 'UNVERIFIED':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold font-mono text-slate-700 border border-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
            UNVERIFIED
          </span>
        );
      case 'CONTRADICTED':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-[10px] font-bold font-mono text-rose-800 border border-rose-300 animate-pulse">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-600" />
            CONTRADICTED
          </span>
        );
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
              <IconDocument size={15} />
            </span>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Evidence Provenance & Conflict Engine
            </h3>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-mono font-bold text-slate-700">
              Zero Ungrounded Claims
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Every researched premise retains rigorous provenance, timestamping, verification status, and conflict arbitration.
          </p>
        </div>

        {/* Health Summary Badges */}
        <div className="flex items-center gap-2">
          <span className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-mono font-medium text-slate-700">
            <strong className="text-emerald-700">{health.verifiedCount}</strong> Verified
          </span>
          <span className="rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1 text-[11px] font-mono font-medium text-rose-800">
            <strong>{conflictsList.length}</strong> Conflicts Detected
          </span>
        </div>
      </div>

      {/* Navigation Filter Tabs */}
      <div className="flex items-center gap-1.5 border-b border-slate-100 pb-3 mb-4 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`rounded-lg px-3 py-1.5 transition-all cursor-pointer ${
            activeTab === 'all'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          All Provenance Records ({evidenceList.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('verified')}
          className={`rounded-lg px-3 py-1.5 transition-all cursor-pointer ${
            activeTab === 'verified'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Verified Ground Truths ({health.verifiedCount})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('conflicts')}
          className={`rounded-lg px-3 py-1.5 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'conflicts'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-amber-800 bg-amber-50 hover:bg-amber-100'
          }`}
        >
          <IconAlert size={12} />
          <span>Conflict Detection Subroutines ({conflictsList.length})</span>
        </button>
      </div>

      {/* TAB CONTENT: CONFLICT DETECTION SUBROUTINES */}
      {activeTab === 'conflicts' ? (
        <div className="space-y-4">
          {conflictsList.map((conflict) => {
            const isUnresolved = conflict.status === 'UNRESOLVED';

            return (
              <div
                key={conflict.id}
                className={`rounded-xl border p-4 transition-all ${
                  isUnresolved
                    ? 'border-rose-300 bg-rose-50/30'
                    : 'border-amber-300 bg-amber-50/25'
                }`}
              >
                {/* Conflict Status Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider ${
                        isUnresolved
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : 'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}
                    >
                      {conflict.status}
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      Parameter: {conflict.parameterName}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-rose-700 font-semibold">
                    Uncertainty Penalty: -{conflict.uncertaintyPenaltyPoints} pts
                  </span>
                </div>

                {/* Side-by-Side Sources A vs B Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  {/* Source A */}
                  <div className="rounded-lg border border-slate-200 bg-white p-3">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-bold text-slate-800">SOURCE A</span>
                      <span className="font-mono text-[10px] text-slate-400">{conflict.sourceA.date || 'Undated'}</span>
                    </div>
                    <p className="text-xs font-semibold text-emerald-800 mb-1">
                      {conflict.sourceA.source}
                    </p>
                    <blockquote className="text-xs text-slate-700 italic border-l-2 border-slate-300 pl-2 my-1.5">
                      "{conflict.sourceA.claim}"
                    </blockquote>
                    <p className="text-[10px] text-slate-500 mt-1">
                      <strong>Methodology:</strong> {conflict.sourceA.methodology || 'Observational sample'}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-slate-400">Credibility Weight:</span>
                      <span className="font-bold text-slate-700">
                        {Math.round(conflict.sourceA.credibilityScore * 100)}%
                      </span>
                    </div>
                  </div>

                  {/* Source B */}
                  <div className="rounded-lg border border-slate-200 bg-white p-3">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-bold text-slate-800">SOURCE B</span>
                      <span className="font-mono text-[10px] text-slate-400">{conflict.sourceB.date || 'Undated'}</span>
                    </div>
                    <p className="text-xs font-semibold text-indigo-800 mb-1">
                      {conflict.sourceB.source}
                    </p>
                    <blockquote className="text-xs text-slate-700 italic border-l-2 border-slate-300 pl-2 my-1.5">
                      "{conflict.sourceB.claim}"
                    </blockquote>
                    <p className="text-[10px] text-slate-500 mt-1">
                      <strong>Methodology:</strong> {conflict.sourceB.methodology || 'Secondary estimate'}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-slate-400">Credibility Weight:</span>
                      <span className="font-bold text-slate-700">
                        {Math.round(conflict.sourceB.credibilityScore * 100)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Alpha Arbitration / Divergence Reasoning */}
                <div className="rounded-lg border border-slate-200/90 bg-white/95 p-3 text-xs leading-relaxed text-slate-700">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1 text-[11px] uppercase tracking-wider">
                    <span>Alpha Arbitration Engine</span>
                    {conflict.alphaPreferredSource ? (
                      <span className="text-emerald-700 font-mono">
                        [Prefers Source {conflict.alphaPreferredSource}]
                      </span>
                    ) : (
                      <span className="text-rose-700 font-mono">[Arbitration Suspended - Insoluble Divergence]</span>
                    )}
                  </div>
                  <p className="mb-1 text-slate-600">{conflict.divergenceAnalysis}</p>
                  <p className="text-slate-800 font-medium">{conflict.resolutionReasoning}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TAB CONTENT: CITATIONS TABLE */
        <div className="divide-y divide-slate-100">
          {filteredEvidence.map((item) => (
            <div key={item.id} className="py-3.5 first:pt-0 last:pb-0">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  {renderStatusBadge(item.status)}
                  <span className="text-xs font-bold text-slate-900">{item.source}</span>
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-emerald-600 hover:underline flex items-center gap-0.5"
                    >
                      <IconGlobe size={10} />
                      <span>Link</span>
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400">
                  {item.publishedDate && <span>Pub: {item.publishedDate}</span>}
                  <span>Retrieved: {item.retrievalDate}</span>
                </div>
              </div>

              <p className="text-xs font-medium text-slate-800 mb-1">
                {item.sourceTitle}
              </p>

              <blockquote className="text-xs text-slate-600 italic bg-slate-50 rounded-lg p-2 border-l-2 border-emerald-500 my-1.5">
                "{item.extractedClaim}"
              </blockquote>

              {item.verificationNotes && (
                <p className="text-[10px] text-slate-500 font-mono mt-1">
                  <strong>Verification Audit:</strong> {item.verificationNotes}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
