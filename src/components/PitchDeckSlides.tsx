import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FeasibilityStudy } from '../types';
import { ChevronLeft, ChevronRight, Presentation, Award, TrendingUp, ShieldAlert, CheckCircle } from 'lucide-react';

interface SlideProps {
  study: FeasibilityStudy;
}

export function PitchDeckSlides({ study }: SlideProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Strategic Executive Overview",
      subtitle: "Capital Investment Opportunity Briefing",
      icon: <Award className="w-8 h-8 text-amber-600 animate-pulse" />,
      content: (
        <div className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h4 className="text-xl font-bold font-sans text-slate-900">{study.name}</h4>
            <p className="text-sm text-slate-500 mt-1 font-sans">Primary municipal deployment site: {study.city}, Libya</p>
          </div>
          <p className="text-sm text-slate-655 leading-relaxed max-w-2xl bg-slate-50 p-4 border border-slate-200 rounded-xl font-sans">
            {study.sections.executiveSummary ? study.sections.executiveSummary.substring(0, 320) + '...' : 'Awaiting comprehensive AI report generation...'}
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4 font-mono">
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-center">
              <span className="text-[10px] text-slate-500 block uppercase font-sans font-bold">Sector Class</span>
              <span className="text-xs font-semibold text-amber-605 mt-1 block font-mono">{study.industry}</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-center">
              <span className="text-[10px] text-slate-500 block uppercase font-sans font-bold">Project Scale</span>
              <span className="text-xs font-semibold text-indigo-600 mt-1 block font-mono">{study.scale.toUpperCase()}</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-center">
              <span className="text-[10px] text-slate-500 block uppercase font-sans font-bold">Currency Base</span>
              <span className="text-xs font-semibold text-emerald-600 mt-1 block font-mono">LYD ({study.exchangeRateMode === 'official' ? 'Official' : 'Parallel'})</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-center">
              <span className="text-[10px] text-slate-500 block uppercase font-sans font-bold">Initial CapEx</span>
              <span className="text-xs font-semibold text-slate-800 mt-1 block font-mono">{(study.startupCosts.reduce((acc, c) => acc + c.costLYD, 0)).toLocaleString()} LYD</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Market Capture & Competitor Arbitrage",
      subtitle: "Securing commanding early-mover positioning",
      icon: <TrendingUp className="w-8 h-8 text-indigo-600" />,
      content: (
        <div className="space-y-6">
          <p className="text-sm text-slate-655 leading-relaxed bg-slate-50 p-4 border border-slate-200 rounded-xl font-sans">
            {study.sections.marketResearch ? study.sections.marketResearch.substring(0, 320) + '...' : 'Awaiting market intelligence generation...'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-slate-50 p-4 border border-slate-200 rounded-xl">
              <h5 className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2 font-sans">Core Demographics Target</h5>
              <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4 font-sans">
                <li>Urban client expansion channels inside metropolitan {study.city} and adjacent trade arteries.</li>
                <li>Commercial buyers demanding high cleanliness, certified consistent quality, and cash-on-delivery options.</li>
                <li>Agrarian or B2B distributors currently constrained by low-hygiene seasonal suppliers.</li>
              </ul>
            </div>
            <div className="bg-slate-50 p-4 border border-slate-200 rounded-xl">
              <h5 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2 font-sans">Primary Value Differentiation</h5>
              <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4 font-sans">
                <li>Automated quality filtration standards, yielding 30% price premium potential.</li>
                <li>Continuous Year-round supply schedules guaranteed by dedicated local energy infrastructure backing.</li>
                <li>Professionalized logistics chains bypassing old informal broker-dominated routes.</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Project Economics & Cash Flow Resilience",
      subtitle: "Stress-tested investment metrics under current parallel-rate regime",
      icon: <TrendingUp className="w-8 h-8 text-emerald-650" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center shadow-inner relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full -translate-y-6 translate-x-6"></div>
              <span className="text-[10px] text-slate-500 block uppercase tracking-wider font-bold font-sans">Internal Return (IRR)</span>
              <span className="text-2xl font-bold text-emerald-600 mt-2 block font-mono">{study.metrics.irr}%</span>
              <span className="text-[8px] text-slate-400 mt-1 block font-sans">Stress-tested target CapEx</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center shadow-inner relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full -translate-y-6 translate-x-6"></div>
              <span className="text-[10px] text-slate-500 block uppercase tracking-wider font-bold font-sans">Net Present Value (NPV)</span>
              <span className="text-2xl font-bold text-amber-650 mt-2 block font-mono">{study.metrics.npv.toLocaleString()} LYD</span>
              <span className="text-[8px] text-slate-400 mt-1 block font-sans">At {study.discountRate * 100}% Discount multiplier</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center shadow-inner relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full -translate-y-6 translate-x-6"></div>
              <span className="text-[10px] text-slate-500 block uppercase tracking-wider font-bold font-sans">ROI Multiplier</span>
              <span className="text-2xl font-bold text-indigo-600 mt-2 block font-mono">{study.metrics.roi}%</span>
              <span className="text-[8px] text-slate-400 mt-1 block font-sans">Annualized margin yield</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center shadow-inner relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full -translate-y-6 translate-x-6"></div>
              <span className="text-[10px] text-slate-500 block uppercase tracking-wider font-bold font-sans">Payback Timeline</span>
              <span className="text-2xl font-bold text-rose-600 mt-2 block font-mono">{study.metrics.paybackPeriod} Years</span>
              <span className="text-[8px] text-slate-400 mt-1 block font-sans">Fully amortized duration</span>
            </div>
          </div>
          <div className="bg-slate-50 p-4 border border-slate-200 rounded-xl mt-2">
            <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-mono">5-Year Net Profit Flow Forecast</h5>
            <div className="flex justify-between items-end h-16 px-12 pt-4">
              {study.revenueForecast.map((yr, idx) => (
                <div key={idx} className="flex flex-col items-center flex-1">
                  <div className="w-full bg-emerald-500/10 border-t-2 border-emerald-500 rounded-t" style={{ height: `${Math.max((yr.netProfitLYD / (study.metrics.npv || 100000)) * 40, 10)}px` }}></div>
                  <span className="text-[9px] font-mono text-slate-500 mt-2">Y{yr.year}: {Math.round(yr.netProfitLYD / 1000)}k</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Risk Control & Business Continuity",
      subtitle: "Shielding operations against domestic microeconomic hazards",
      icon: <ShieldAlert className="w-8 h-8 text-rose-600" />,
      content: (
        <div className="space-y-6">
          <p className="text-xs text-slate-500 font-sans">
            A core criteria for investment viability in Libya includes defensive strategies securing supply and infrastructure lines.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 border border-slate-200 rounded-xl flex flex-col justify-between">
              <div>
                <h5 className="text-xs font-bold text-rose-605 uppercase tracking-wider mb-1 font-mono">Power Infrastructure</h5>
                <p className="text-[11px] text-slate-650 leading-relaxed mt-2 font-sans">
                  Sudden national shedding triggers electrical damage and cycle loss. We implement automatic transfer heavy switches.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-mono mt-4">
                <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Generator Buffer Added</span>
              </div>
            </div>
            <div className="bg-slate-50 p-4 border border-slate-200 rounded-xl flex flex-col justify-between">
              <div>
                <h5 className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1 font-mono">Exchange Operations</h5>
                <p className="text-[11px] text-slate-650 leading-relaxed mt-2 font-sans">
                  Foreign parts acquisition risks capital shrinkage. We insulate budgets by translating imports at parallel custom models.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-mono mt-4">
                <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Indexed at {study.exchangeRate} LYD</span>
              </div>
            </div>
            <div className="bg-slate-50 p-4 border border-slate-200 rounded-xl flex flex-col justify-between">
              <div>
                <h5 className="text-xs font-bold text-amber-605 uppercase tracking-wider mb-1 font-mono">Logistical Delays</h5>
                <p className="text-[11px] text-slate-650 leading-relaxed mt-2 font-sans">
                  Coastal dock processing cycles carry uncertainty. We absorb blockades by storing up 6-month key raw reserves on-site.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-mono mt-4">
                <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                <span>6mo Supply Reserved</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm relative">
      {/* Slide Top bar */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Presentation className="w-5 h-5 text-amber-650" />
          <span className="text-xs font-bold tracking-widest text-slate-800 uppercase font-mono">
            INVESTOR SLIDE DECK VIEW
          </span>
        </div>
        <div className="flex gap-2">
          {slides.map((_, idx) => (
            <span 
              key={idx} 
              className={`w-2 h-2 rounded-full block transition-colors duration-300 ${
                currentSlide === idx ? 'bg-[#0f172a]' : 'bg-slate-200'
              }`}
            ></span>
          ))}
        </div>
      </div>

      {/* Slide Stage */}
      <div className="p-8 md:p-12 min-h-[400px] flex flex-col justify-between bg-white">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl shrink-0">
                {slides[currentSlide].icon}
              </div>
              <div>
                <h3 className="text-xl font-extrabold font-sans tracking-tight text-slate-900">
                  {slides[currentSlide].title}
                </h3>
                <p className="text-xs text-slate-500 font-sans mt-0.5">
                  {slides[currentSlide].subtitle}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              {slides[currentSlide].content}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Presenter Footer & Controls */}
        <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-[10px] font-mono text-slate-400 uppercase text-center sm:text-left">
            CONFIDENTIAL • FOR PRIVATE INVESTMENT COMMITTEE USE ONLY
          </span>
          
          <div className="flex items-center gap-4">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`p-2 rounded-lg border transition cursor-pointer ${
                currentSlide === 0 
                  ? 'border-slate-105 text-slate-300 bg-white cursor-not-allowed' 
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50 bg-white shadow-sm'
              }`}
              id="btn_prev_slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs text-slate-500 font-mono">
              {currentSlide + 1} / {slides.length}
            </span>
            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className={`p-2 rounded-lg border transition cursor-pointer ${
                currentSlide === slides.length - 1 
                  ? 'border-slate-105 text-slate-300 bg-white cursor-not-allowed' 
                  : 'border-slate-205 text-slate-700 hover:bg-slate-50 bg-white shadow-sm'
              }`}
              id="btn_next_slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
