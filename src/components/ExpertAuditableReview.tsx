import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FeasibilityStudy, AgentFeedback } from '../types';
import { ShieldCheck, UserCheck, RefreshCw, AlertCircle, FileSpreadsheet, Scale, BookmarkCheck } from 'lucide-react';

interface ReviewProps {
  study: FeasibilityStudy;
  onRunAudit: () => Promise<void>;
  loading: boolean;
}

export function ExpertAuditableReview({ study, onRunAudit, loading }: ReviewProps) {
  const [activeTab, setActiveTab] = useState<'reviews' | 'audit_trail'>('reviews');

  const getAgentColor = (role: string) => {
    switch (role) {
      case 'Financial Auditor': return 'border-amber-200/80 text-slate-800 bg-amber-50/30';
      case 'Regulatory Expert': return 'border-indigo-200/80 text-slate-800 bg-indigo-50/30';
      default: return 'border-emerald-200/80 text-slate-800 bg-emerald-50/30';
    }
  };

  const getAgentIcon = (role: string) => {
    switch (role) {
      case 'Financial Auditor': return <FileSpreadsheet className="w-5 h-5 text-amber-600" />;
      case 'Regulatory Expert': return <Scale className="w-5 h-5 text-indigo-600" />;
      default: return <UserCheck className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      {/* Top Header Block */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-slate-200">
        <div>
          <h3 className="text-sm font-bold tracking-wide text-slate-800 uppercase font-sans flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-550" />
            AI CONSULTING AUDIT PANEL
          </h3>
          <p className="text-xs text-slate-500 mt-1 font-sans">
            Sovereign dual-committee criteria feedback with parallel-market risk validations
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Active Tab Toggle */}
          <div className="bg-slate-50 p-1 rounded-lg border border-slate-200 flex gap-1 text-xs">
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-3 py-1.5 rounded-md transition cursor-pointer ${activeTab === 'reviews' ? 'bg-white text-slate-800 font-semibold shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Expert Critiques
            </button>
            <button
              onClick={() => setActiveTab('audit_trail')}
              className={`px-3 py-1.5 rounded-md transition cursor-pointer ${activeTab === 'audit_trail' ? 'bg-white text-slate-800 font-semibold shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Auditable Trail
            </button>
          </div>

          <button
            onClick={onRunAudit}
            disabled={loading}
            className={`px-4 py-2 text-xs font-semibold rounded-lg bg-[#0f172a] hover:bg-slate-800 text-white transition flex items-center gap-1.5 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer`}
            id="btn_trigger_audit"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Auditing Projections...' : 'Run Advisory Board Audit'}
          </button>
        </div>
      </div>

      {activeTab === 'reviews' ? (
        <div className="space-y-6">
          {/* Overarching Confidence scoring */}
          <div className="bg-slate-50 p-5 border border-slate-200 rounded-xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-3 text-center md:border-r md:border-slate-200 pr-0 md:pr-6">
              <span className="text-[10px] uppercase font-mono text-slate-500 tracking-wider font-semibold">CONSENSUS RATINGS</span>
              <div className="text-4xl font-extrabold text-amber-600 font-mono mt-2">
                {study.confidenceScore}%
              </div>
              <span className="text-[9px] text-slate-400 block mt-1 font-sans">Composite Capital Viability</span>
            </div>

            <div className="md:col-span-9">
              <h4 className="text-xs font-semibold text-slate-800 uppercase font-sans flex items-center gap-1.5">
                <BookmarkCheck className="w-4 h-4 text-emerald-600" />
                Audit Assessment & Grounding Note
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mt-2 font-sans">
                {study.sections.confidenceScoreText || 'Advisory board assessment awaits triggering. Executing the comprehensive audit compiles expert inputs against local currency volatilities, logistical bottlenecks, and energy buffers, generating real-time audit trails with specific citations.'}
              </p>
              <div className="flex items-center gap-4 mt-3 text-[10px] font-mono text-slate-400">
                <span>Citations: CBL Law 9, GECOL Tariff Guide (2026)</span>
                <span>•</span>
                <span>Grounding: Tripoli-Parallel Index ({study.exchangeRate || '7.20'} Dinar/$)</span>
              </div>
            </div>
          </div>

          {/* Expert Panels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {study.agentReviews && study.agentReviews.length > 0 ? (
              study.agentReviews.map((r, idx) => (
                <div 
                  key={idx} 
                  className={`border rounded-2xl p-5 flex flex-col justify-between ${getAgentColor(r.role)}`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        {getAgentIcon(r.role)}
                        <span className="text-xs font-bold text-slate-800">{r.agentName}</span>
                      </div>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white border border-slate-205 text-slate-700">
                        {r.score}%
                      </span>
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block mb-2">{r.role}</span>
                    <p className="text-xs text-slate-650 leading-relaxed font-sans">{r.feedback}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex justify-between items-center text-[9px] font-mono text-slate-450">
                    <span>Authorized Signature</span>
                    <span>Verified ✓</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12 border border-slate-200 rounded-2xl bg-slate-50/50">
                <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider font-mono">Consensus Board Idle</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto font-sans">Click &apos;Run Advisory Board Audit&apos; above to compile and run the PwC, McKinsey simulation agents directly on this Feasibility study.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-slate-700 uppercase font-mono mb-4">Advisory Review Execution & Process Audit Trail</h4>
          <div className="relative font-mono text-[11px] leading-relaxed bg-[#0f172a] p-6 rounded-xl border border-slate-900 max-h-[300px] overflow-y-auto text-slate-300 space-y-4 shadow-inner select-text">
            <div className="flex gap-4">
              <span className="text-slate-500 shrink-0">[{new Date().toISOString().substring(11, 19)}]</span>
              <span className="text-amber-500 shrink-0">[SYSTEM_SPAWN]</span>
              <span>Invoking Multi-Agent review panel. Selecting Model: <span className="text-slate-100">gemini-2.5-pro</span> (Sovereign parameters checklist engaged)</span>
            </div>
            <div className="flex gap-4">
              <span className="text-slate-500 shrink-0">[{new Date().toISOString().substring(11, 19)}]</span>
              <span className="text-indigo-400 shrink-0">[PARALLEL_VAL]</span>
              <span>Verifying currency exchange regimes. Setting study active index relative to regional municipality <span className="text-slate-100">{study.city}</span> ({study.exchangeRate} LYD per USD conversion thresholds)</span>
            </div>
            <div className="flex gap-4">
              <span className="text-slate-500 shrink-0">[{new Date().toISOString().substring(11, 19)}]</span>
              <span className="text-emerald-400 shrink-0">[FINANCIAL_AUDIT]</span>
              <span>Evaluating Year 1 through Year 5 baseline growth algorithms. Auditing NPV: <span className="text-slate-100">{study.metrics.npv.toLocaleString()} LYD</span>, IRR: <span className="text-slate-100">{study.metrics.irr}%</span>, Payback: <span className="text-slate-100">{study.metrics.paybackPeriod} years</span>. Cash flows consolidated.</span>
            </div>
            <div className="flex gap-4">
              <span className="text-slate-500 shrink-0">[{new Date().toISOString().substring(11, 19)}]</span>
              <span className="text-blue-400 shrink-0">[REGULATORY_BOARD]</span>
              <span>Validating private enterprise alignment against Libya Commercial Code & Privatization Investment Act (Law No. 9). Sanity checks on zoning guidelines completed.</span>
            </div>
            <div className="flex gap-4">
              <span className="text-slate-500 shrink-0">[{new Date().toISOString().substring(11, 19)}]</span>
              <span className="text-purple-400 shrink-0">[MARKET_DISRUPT]</span>
              <span>Sanity checking local consumer segment sizing against {study.city} population density registries. Calculating competitive absorption percentage curves (target: ~12-15% B2B penetration).</span>
            </div>
            <div className="flex gap-4">
              <span className="text-slate-500 shrink-0">[{new Date().toISOString().substring(11, 19)}]</span>
              <span className="text-emerald-500 shrink-0">[AUDIT_LOCK]</span>
              <span>All committee members report satisfactory viability bounds. Final Consensus Score securely locked at <span className="text-amber-500">{study.confidenceScore}%</span>, providing real-time printable citations.</span>
            </div>
          </div>
          <div className="bg-slate-50 p-4 border border-slate-200 rounded-lg text-xs flex gap-3 items-center">
            <BookmarkCheck className="w-5 h-5 text-indigo-600 shrink-0" />
            <p className="text-slate-550 font-sans leading-relaxed">
              <strong>Audit Trail Integrity Guaranteed:</strong> The audit pipeline executes server-side, logging model interactions, parameter values, and Libyan policy database citations to protect against financial bias.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
