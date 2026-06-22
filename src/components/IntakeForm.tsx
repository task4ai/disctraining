import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScaleType, ExchangeRateMode } from '../types';
import { Sparkles, ArrowRight, ArrowLeft, Building2, MapPin, Landmark, LibraryBig, AlertTriangle } from 'lucide-react';

interface IntakeProps {
  onSubmit: (data: {
    name: string;
    industry: string;
    city: string;
    scale: ScaleType;
    description: string;
    exchangeRateMode: ExchangeRateMode;
    discountRate: number;
    powerGridBackupRequired: boolean;
  }) => Promise<void>;
  onCancel: () => void;
  submitting: boolean;
}

export function IntakeForm({ onSubmit, onCancel, submitting }: IntakeProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('Agriculture');
  const [city, setCity] = useState('Tripoli');
  const [scale, setScale] = useState<ScaleType>('sme');
  const [description, setDescription] = useState('');
  const [exchangeRateMode, setExchangeRateMode] = useState<ExchangeRateMode>('parallel');
  const [discountRate, setDiscountRate] = useState(0.12);
  const [powerGridBackupRequired, setPowerGridBackupRequired] = useState(true);

  const stepsCount = 4;

  const nextStep = () => {
    if (step < stepsCount) setStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description) return;
    onSubmit({
      name,
      industry,
      city,
      scale,
      description,
      exchangeRateMode,
      discountRate,
      powerGridBackupRequired
    });
  };

  // Localized City Parameters guide
  const getCityInsight = (selectedCity: string) => {
    switch (selectedCity) {
      case 'Tripoli': return 'Capital metropolis. Maximum consumer addressability, high density of retail distribution, but intense competition.';
      case 'Benghazi': return 'Major commercial hub. Rapid economic development, substantial infrastructure zoning, with supportive trade chambers.';
      case 'Misrata': return 'Industrial powerhouse. Access to the Free Zone, tax privileges, premier deep seaport, with excellent shipping lanes.';
      case 'Sabha': return 'Fezzan capital. Optimal solar photovoltaic zenith rating, extensive agricultural aquifers, but remote logistical supply routes.';
      case 'Gharyan': return 'Hilly region. Highly strategic agricultural climate, supreme premium organic olive orchards, famous clay minerals.';
      case 'Tobruk': return 'Strategic eastern coast. Access to Tobruk port, close maritime shipping proximity to Egypt, stable water desalination hubs.';
      case 'Kufra': return 'Southeastern desert oasis. Outstanding freshwater fossil aquifers, highly productive wheat and alfalfa circles, remote border trade networks.';
      case 'Al-Khoms': return 'Coastal trade center. Home to Al-Khoms port and cement factory clusters, with immediate maritime security zones.';
      default: return 'Favorable regional trade and zoning regulations apply.';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md max-w-3xl mx-auto">
      {/* Quiz Progress header */}
      <div className="bg-slate-50 p-6 border-b border-slate-200 flex justify-between items-center">
        <div>
          <h3 className="text-sm font-bold tracking-wide text-slate-800 uppercase font-sans flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-550" />
            INVESTMENT PROPOSAL INTAKE WIZARD
          </h3>
          <p className="text-xs text-slate-500 mt-1 font-sans">
            Specify baseline operating parameters for localized Libyan economy modeling
          </p>
        </div>
        <div className="text-xs font-mono text-slate-650 bg-white border border-slate-200 px-3 py-1 rounded-md">
          Step {step} of {stepsCount}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <AnimatePresence mode="wait">
          {/* STEP 1: IDENTITY & SECTOR */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="space-y-5"
            >
              <div className="flex items-center gap-3 mb-2 text-amber-600">
                <Building2 className="w-5 h-5" />
                <h4 className="text-sm font-bold font-sans uppercase tracking-wider text-slate-800">
                  Venture Identity & Sector Class
                </h4>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 block uppercase tracking-wider font-mono">
                  Proposed Business or Project Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Al-Ahli Concrete Block Factory or Misrata Cold Storage"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-550 focus:ring-1 focus:ring-amber-550 font-sans shadow-inner"
                  id="intake_project_name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 block uppercase tracking-wider font-mono">
                    Industry Sector Focus
                  </label>
                  <select
                    value={industry}
                    onChange={e => setIndustry(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-amber-550 font-sans"
                    id="intake_sector_select"
                  >
                    <option value="Agriculture">Agriculture & Agritech</option>
                    <option value="Manufacturing">Manufacturing & Heavy Industry</option>
                    <option value="Technology">Technology & Digital Services</option>
                    <option value="Solar & Energy">Solar, Power & Clean Energy</option>
                    <option value="Water Desalination">Infrastructure & Desalination</option>
                    <option value="Retail & Services">B2B/B2C Services & Retail</option>
                    <option value="Healthcare">Healthcare & Specialized Pharma</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 block uppercase tracking-wider font-mono">
                    Project Scale
                  </label>
                  <div className="grid grid-cols-3 gap-2 bg-slate-50 p-1 rounded-lg border border-slate-200 text-xs">
                    {(['micro', 'sme', 'enterprise'] as ScaleType[]).map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setScale(s)}
                        className={`py-1.5 rounded-md transition font-medium capitalize cursor-pointer ${
                          scale === s ? 'bg-[#0f172a] text-white font-bold' : 'text-slate-500 hover:text-slate-800'
                        }`}
                        id={`btn_scale_${s}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: LOCATION & GEOGRAPHY */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="space-y-5"
            >
              <div className="flex items-center gap-3 mb-2 text-indigo-600">
                <MapPin className="w-5 h-5" />
                <h4 className="text-sm font-bold font-sans uppercase tracking-wider text-slate-800">
                  Spatial Location & localized Zoning
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 block uppercase tracking-wider font-mono">
                    Target Libyan Municipality
                  </label>
                  <select
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-amber-550 font-sans"
                    id="intake_city_select"
                  >
                    <option value="Tripoli">Tripoli (طرابلس)</option>
                    <option value="Benghazi">Benghazi (بنغازي)</option>
                    <option value="Misrata">Misrata (مصراتة)</option>
                    <option value="Sabha">Sabha (سبها)</option>
                    <option value="Gharyan">Gharyan (غريان)</option>
                    <option value="Tobruk">Tobruk (طبرق)</option>
                    <option value="Kufra">Kufra (الكفرة)</option>
                    <option value="Al-Khoms">Al-Khoms (الخمس)</option>
                  </select>
                </div>

                <div className="bg-slate-50 p-4 border border-slate-200 rounded-xl flex flex-col justify-center">
                  <h5 className="text-[10px] font-bold text-slate-450 uppercase tracking-wider">
                    Geographical Context Insight:
                  </h5>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed mt-1.5">
                    {getCityInsight(city)}
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3 mt-4">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-600 leading-relaxed font-sans">
                  <strong>Standard Agricultural & Industrial Exemption:</strong> Under Libyan Investment codes (Law No. 9), registered private development capital located inside regional zoning boards is granted a 100% exemption on corporate tax liabilities and custom import tariffs. Our models auto-apply these incentives.
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: FINANCIAL COMPLIANCE REGIMES */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="space-y-5"
            >
              <div className="flex items-center gap-3 mb-2 text-emerald-600">
                <Landmark className="w-5 h-5" />
                <h4 className="text-sm font-bold font-sans uppercase tracking-wider text-slate-800">
                  Currency Regime & Utility Buffering
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 block uppercase tracking-wider font-mono flex justify-between">
                    <span>Valuation Exchange Scheme</span>
                    <span className="text-[9px] text-amber-600 lowercase">(Libyan Parallel Arbitrage)</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2 bg-slate-50 p-1 rounded-lg border border-slate-200 text-xs text-center font-mono">
                    <button
                      type="button"
                      onClick={() => setExchangeRateMode('parallel')}
                      className={`py-2 rounded transition cursor-pointer ${
                        exchangeRateMode === 'parallel' ? 'bg-amber-500/10 border border-amber-500/30 text-amber-700 font-bold' : 'text-slate-400 hover:text-slate-600'
                      }`}
                      id="btn_rate_parallel"
                    >
                      Parallel (~7.20 LYD/$)
                    </button>
                    <button
                      type="button"
                      onClick={() => setExchangeRateMode('official')}
                      className={`py-2 rounded transition cursor-pointer ${
                        exchangeRateMode === 'official' ? 'bg-amber-500/10 border border-amber-500/30 text-amber-700 font-bold' : 'text-slate-400 hover:text-slate-600'
                      }`}
                      id="btn_rate_official"
                    >
                      Official (~4.82 LYD/$)
                    </button>
                  </div>
                  <span className="text-[10px] text-slate-500 leading-relaxed block mt-1.5 font-sans">
                    Parallel rate reflects the real procurement cost of capital assets imported from international suppliers.
                  </span>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 block uppercase tracking-wider font-mono">
                    Utility Grid Outage Backup
                  </label>
                  <label className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 flex items-center justify-between cursor-pointer hover:border-slate-300 transition">
                    <div className="flex flex-col pr-4">
                      <span className="text-xs font-semibold text-slate-800">Dedicated Power Generator</span>
                      <span className="text-[10px] text-slate-500 mt-1">Factor in heavy diesel back-up CapEx (Highly recommended in Libya)</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={powerGridBackupRequired}
                      onChange={e => setPowerGridBackupRequired(e.target.checked)}
                      className="w-4.5 h-4.5 text-[#0f172a] rounded border-slate-300 bg-white"
                      id="intake_grid_backup"
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                  <span>Target Discount Hurdles (Risk factor)</span>
                  <span className="font-mono text-amber-600 font-bold">{Math.round(discountRate * 100)}% Discount rate</span>
                </div>
                <input
                   type="range"
                   min="0.08"
                   max="0.20"
                   step="0.01"
                   value={discountRate}
                   onChange={e => setDiscountRate(parseFloat(e.target.value))}
                   className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#0f172a]"
                   id="intake_discount_slider"
                />
                <span className="text-[10px] text-slate-500 block leading-relaxed font-sans">
                  Traditional Libyan agricultural loans require a 10%-12% hurdle multiplier; high-uncertainty industrial/deep tech ranges from 14%-18%.
                </span>
              </div>
            </motion.div>
          )}

          {/* STEP 4: DETAILED PLAN & OBJECTIVES */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 mb-2 text-purple-600">
                <LibraryBig className="w-5 h-5" />
                <h4 className="text-sm font-bold font-sans uppercase tracking-wider text-slate-800">
                  Project Description & Value Statement
                </h4>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 block uppercase tracking-wider font-mono flex justify-between">
                  <span>Describe the business concept and goals</span>
                  <span className="text-[10px] text-purple-600 font-mono">(Provides context for RAG report generation)</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Detail what the business will make, how raw supplies will be sourced, pricing strategies, target consumer profiles, and how regional electricity or logistics obstacles are neutralized."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-xs text-slate-800 placeholder-slate-450 focus:outline-none focus:border-amber-550 focus:ring-1 focus:ring-amber-550 leading-relaxed font-sans shadow-inner"
                  id="intake_project_description"
                />
              </div>

              <div className="bg-slate-50 p-4 border border-slate-200 rounded-xl text-xs leading-relaxed text-slate-500 font-sans">
                <strong>Consulting-Grade Output:</strong> Your text is ingested by our server-side LLM framework to generate exhaustive SWOT, PESTEL, and Porter&apos;s models customized to your location&apos;s parameters. Minimum 60 words recommended for high-quality investment summaries.
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Controls & Navigation slider */}
        <div className="pt-6 border-t border-slate-200 flex justify-between items-center">
          <button
            type="button"
            onClick={step === 1 ? onCancel : prevStep}
            className="px-4 py-2 text-xs font-semibold font-sans hover:text-slate-800 text-slate-500 transition flex items-center gap-1 cursor-pointer"
            id="btn_intake_back"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {step === 1 ? 'Cancel' : 'Prev Step'}
          </button>

          {step < stepsCount ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={step === 1 && !name}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#0f172a] hover:bg-slate-800 transition rounded-lg flex items-center gap-1 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              id="btn_intake_next"
            >
              Next Step
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting || !description || !name}
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#0f172a] hover:bg-slate-800 transition rounded-lg flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              id="btn_intake_submit"
            >
              {submitting ? 'Creating Investment Study...' : 'Generate Feasibility Report'}
              <Sparkles className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
