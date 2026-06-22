import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScaleType, ExchangeRateMode } from '../types';
import { Sparkles, ArrowRight, ArrowLeft, Building2, MapPin, Landmark, LibraryBig, AlertTriangle } from 'lucide-react';
import { translations } from '../translations';

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
  language?: 'en' | 'ar';
}

export function IntakeForm({ onSubmit, onCancel, submitting, language = 'ar' }: IntakeProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('Agriculture');
  const [city, setCity] = useState('Tripoli');
  const [scale, setScale] = useState<ScaleType>('sme');
  const [description, setDescription] = useState('');
  const [exchangeRateMode, setExchangeRateMode] = useState<ExchangeRateMode>('parallel');
  const [discountRate, setDiscountRate] = useState(0.12);
  const [powerGridBackupRequired, setPowerGridBackupRequired] = useState(true);

  const t = translations[language];
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

  const getCityInsight = (selectedCity: string) => {
    return t.cityInsights[selectedCity] || (language === 'ar' ? 'تطبق لوائح الشراكة والتنظيم البلدي المفضلة.' : 'Favorable regional trade and zoning regulations apply.');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md max-w-3xl mx-auto text-start" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Quiz Progress header */}
      <div className="bg-slate-50 p-6 border-b border-slate-200 flex justify-between items-center">
        <div>
          <h3 className="text-sm font-bold tracking-wide text-slate-800 uppercase font-sans flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-550" />
            {t.onboardingTitle}
          </h3>
          <p className="text-xs text-slate-500 mt-1 font-sans">
            {t.onboardingDesc}
          </p>
        </div>
        <div className="text-xs font-mono text-slate-655 bg-white border border-slate-200 px-3 py-1 rounded-md shrink-0">
          {t.stepCountText} {step} / {stepsCount}
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
              <div className="flex items-center gap-3 mb-2 text-amber-605">
                <Building2 className="w-5 h-5 shrink-0" />
                <h4 className="text-sm font-bold font-sans uppercase tracking-wider text-slate-800">
                  {language === 'ar' ? 'هوية المشروع وتصنيف النشاط' : 'Venture Identity & Sector Class'}
                </h4>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 block uppercase tracking-wider font-mono">
                  {t.projectNameLabel}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t.projectNamePlaceholder}
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-550 focus:ring-1 focus:ring-amber-550 font-sans shadow-inner"
                  id="intake_project_name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 block uppercase tracking-wider font-mono">
                    {t.industryLabel}
                  </label>
                  <select
                    value={industry}
                    onChange={e => setIndustry(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-amber-550 font-sans"
                    id="intake_sector_select"
                  >
                    <option value="Agriculture">{t.industries["Agriculture"]}</option>
                    <option value="Manufacturing">{t.industries["Manufacturing"]}</option>
                    <option value="Technology">{t.industries["Technology"]}</option>
                    <option value="Solar & Energy">{t.industries["Solar & Energy"]}</option>
                    <option value="Water Desalination">{t.industries["Water Desalination"]}</option>
                    <option value="Retail & Services">{t.industries["Retail & Services"]}</option>
                    <option value="Healthcare">{t.industries["Healthcare"]}</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 block uppercase tracking-wider font-mono">
                    {t.projectScaleLabel}
                  </label>
                  <div className="grid grid-cols-3 gap-2 bg-slate-50 p-1 rounded-lg border border-slate-200 text-xs">
                    {(['micro', 'sme', 'enterprise'] as ScaleType[]).map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setScale(s)}
                        className={`py-1.5 rounded-md transition font-medium cursor-pointer ${
                          scale === s ? 'bg-[#0f172a] text-white font-bold' : 'text-slate-500 hover:text-slate-800'
                        }`}
                        id={`btn_scale_${s}`}
                      >
                        {t.scales[s]}
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
                <MapPin className="w-5 h-5 shrink-0" />
                <h4 className="text-sm font-bold font-sans uppercase tracking-wider text-slate-800">
                  {t.spatialLocationTitle}
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 block uppercase tracking-wider font-mono">
                    {t.cityLabel}
                  </label>
                  <select
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-amber-550 font-sans"
                    id="intake_city_select"
                  >
                    <option value="Tripoli">{t.cities["Tripoli"]} ({language === 'ar' ? 'طرابلس' : 'Tripoli'})</option>
                    <option value="Benghazi">{t.cities["Benghazi"]} ({language === 'ar' ? 'بنغازي' : 'Benghazi'})</option>
                    <option value="Misrata">{t.cities["Misrata"]} ({language === 'ar' ? 'مصراتة' : 'Misrata'})</option>
                    <option value="Sabha">{t.cities["Sabha"]} ({language === 'ar' ? 'سبها' : 'Sabha'})</option>
                    <option value="Gharyan">{t.cities["Gharyan"]} ({language === 'ar' ? 'غريان' : 'Gharyan'})</option>
                    <option value="Tobruk">{t.cities["Tobruk"]} ({language === 'ar' ? 'طبرق' : 'Tobruk'})</option>
                    <option value="Kufra">{t.cities["Kufra"]} ({language === 'ar' ? 'الكفرة' : 'Kufra'})</option>
                    <option value="Al-Khoms">{t.cities["Al-Khoms"]} ({language === 'ar' ? 'الخمس' : 'Al-Khoms'})</option>
                  </select>
                </div>

                <div className="bg-slate-50 p-4 border border-slate-200 rounded-xl flex flex-col justify-center">
                  <h5 className="text-[10px] font-bold text-slate-450 uppercase tracking-wider">
                    {t.geoContextTitle}:
                  </h5>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed mt-1.5 leading-relaxed">
                    {getCityInsight(city)}
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3 mt-4">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-600 leading-relaxed font-sans">
                  <strong>{t.exemptionBlockTitle}:</strong> {t.exemptionBlockDesc}
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
                <Landmark className="w-5 h-5 shrink-0" />
                <h4 className="text-sm font-bold font-sans uppercase tracking-wider text-slate-800">
                  {t.currencyRegimeTitle}
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 block uppercase tracking-wider font-mono flex justify-between">
                    <span>{t.valuationExchangeLabel}</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2 bg-slate-50 p-1 rounded-lg border border-slate-200 text-xs text-center font-mono">
                    <button
                      type="button"
                      onClick={() => setExchangeRateMode('parallel')}
                      className={`py-2 rounded transition cursor-pointer ${
                        exchangeRateMode === 'parallel' ? 'bg-amber-500/10 border border-amber-550/30 text-amber-700 font-bold' : 'text-slate-400 hover:text-slate-600 bg-white'
                      }`}
                      id="btn_rate_parallel"
                    >
                      {t.rates.parallel} (~7.20 {language === 'ar' ? 'د.ل' : 'LYD'})
                    </button>
                    <button
                      type="button"
                      onClick={() => setExchangeRateMode('official')}
                      className={`py-2 rounded transition cursor-pointer ${
                        exchangeRateMode === 'official' ? 'bg-amber-500/10 border border-amber-550/30 text-amber-700 font-bold' : 'text-slate-400 hover:text-slate-600 bg-white'
                      }`}
                      id="btn_rate_official"
                    >
                      {t.rates.official} (~4.82 {language === 'ar' ? 'د.ل' : 'LYD'})
                    </button>
                  </div>
                  <span className="text-[10px] text-slate-500 leading-relaxed block mt-1.5 font-sans">
                    {language === 'ar' 
                      ? 'يعكس السعر الموازي التكلفة الحقيقية لتوريد خطوط الإنتاج والآلات والمواد الأساسية من الأسواق الدولية.'
                      : 'Parallel rate reflects the real procurement cost of capital assets imported from international suppliers.'}
                  </span>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 block uppercase tracking-wider font-mono">
                    {language === 'ar' ? 'إمدادات وموثوقية الطاقة والكهرباء' : 'Utility Grid Outage Backup'}
                  </label>
                  <label className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 flex items-center justify-between cursor-pointer hover:border-slate-300 transition">
                    <div className="flex flex-col pr-2 text-start">
                      <span className="text-xs font-semibold text-slate-800">{language === 'ar' ? 'مولد كهربائي متكامل مخصص' : 'Dedicated Power Generator'}</span>
                      <span className="text-[10px] text-slate-500 mt-1">{t.utilityRiskDesc}</span>
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
                  <span>{t.discountRateLabel}</span>
                  <span className="font-mono text-amber-600 font-bold">{Math.round(discountRate * 100)}%</span>
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
                  {t.discountRateHelper}
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
                <LibraryBig className="w-5 h-5 shrink-0" />
                <h4 className="text-sm font-bold font-sans uppercase tracking-wider text-slate-800">
                  {t.projectBriefLabel}
                </h4>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 block uppercase tracking-wider font-mono flex justify-between">
                  <span>{t.projectBriefLabel}</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder={t.projectBriefPlaceholder}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-xs text-slate-800 placeholder-slate-450 focus:outline-none focus:border-amber-550 focus:ring-1 focus:ring-amber-550 leading-relaxed font-sans shadow-inner text-start"
                  id="intake_project_description"
                />
              </div>

              <div className="bg-slate-50 p-4 border border-slate-200 rounded-xl text-xs leading-relaxed text-slate-500 font-sans">
                <strong>{t.onboardingSummaryTitle}:</strong> {t.onboardingSummaryDesc}
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
            {step === 1 ? t.cancelBtn : t.prevBtn}
          </button>

          {step < stepsCount ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={step === 1 && !name}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#0f172a] hover:bg-slate-800 transition rounded-lg flex items-center gap-1 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              id="btn_intake_next"
            >
              {t.nextBtn}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting || !description || !name}
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#0f172a] hover:bg-slate-800 transition rounded-lg flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              id="btn_intake_submit"
            >
              {submitting ? (language === 'ar' ? 'جاري بناء النماذج الاستثمارية...' : 'Creating Investment Study...') : t.submitBtn}
              <Sparkles className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
