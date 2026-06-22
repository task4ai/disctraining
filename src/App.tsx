import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  BrainCircuit, 
  Presentation, 
  SlidersHorizontal, 
  TrendingUp, 
  FileText, 
  Download, 
  MapPin, 
  Zap, 
  TrendingDown, 
  Sparkles, 
  Scale, 
  Building2, 
  AlertTriangle, 
  FileSpreadsheet, 
  CheckCircle,
  Clock,
  ExternalLink,
  Copy,
  ChevronDown,
  RefreshCw
} from 'lucide-react';
import { FeasibilityStudy, StartupCostItem, OperatingCostItem, ScaleType, ExchangeRateMode, ScenarioMode } from './types';
import { InteractiveSvgCharts } from './components/InteractiveSvgCharts';
import { PitchDeckSlides } from './components/PitchDeckSlides';
import { ExpertAuditableReview } from './components/ExpertAuditableReview';
import { IntakeForm } from './components/IntakeForm';
import { translations } from './translations';

export default function App() {
  const [studies, setStudies] = useState<FeasibilityStudy[]>([]);
  const [activeStudy, setActiveStudy] = useState<FeasibilityStudy | null>(null);
  const [showIntake, setShowIntake] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ar'>('ar');
  const [activeTab, setActiveTab] = useState<'kpi_model' | 'ai_editor' | 'pitch_deck' | 'audit_board' | 'export_center'>('kpi_model');
  
  // Loading & transactional states
  const [loading, setLoading] = useState(true);
  const [submittingIntake, setSubmittingIntake] = useState(false);
  const [generatingSection, setGeneratingSection] = useState<string | null>(null);
  const [auditing, setAuditing] = useState(false);
  const [exporting, setExporting] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Editable item transient inputs
  const [newStartupItem, setNewStartupItem] = useState('');
  const [newStartupCost, setNewStartupCost] = useState('');
  const [newStartupCategory, setNewStartupCategory] = useState<StartupCostItem['category']>('Equipment');

  const [newOpItem, setNewOpItem] = useState('');
  const [newOpCost, setNewOpCost] = useState('');
  const [newOpPeriod, setNewOpPeriod] = useState<'monthly' | 'annually'>('monthly');
  const [newOpCategory, setNewOpCategory] = useState<OperatingCostItem['category']>('Utilities & Fuel');

  // Trigger temporary floating confirmation toasts
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Fetch all studies on load
  useEffect(() => {
    fetchStudies();
  }, []);

  const fetchStudies = async (selectId?: string) => {
    try {
      setLoading(true);
      const res = await fetch('/api/studies');
      const data = await res.json();
      setStudies(data);
      if (data.length > 0) {
        if (selectId) {
          const selected = data.find((s: FeasibilityStudy) => s.id === selectId);
          setActiveStudy(selected || data[0]);
        } else {
          setActiveStudy(data[0]);
        }
      }
    } catch (e) {
      console.error('Failed to fetch studies:', e);
    } finally {
      setLoading(false);
    }
  };

  // Create new project study via Intake Form
  const handleCreateStudy = async (formData: {
    name: string;
    industry: string;
    city: string;
    scale: ScaleType;
    description: string;
    exchangeRateMode: ExchangeRateMode;
    discountRate: number;
    powerGridBackupRequired: boolean;
  }) => {
    try {
      setSubmittingIntake(true);
      const res = await fetch('/api/studies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      await fetchStudies(data.id);
      setShowIntake(false);
      triggerToast(`Venture model "${formData.name}" successfully created & structured!`);
    } catch (e) {
      console.error('Failed to create study', e);
    } finally {
      setSubmittingIntake(false);
    }
  };

  // Delete project study
  const handleDeleteStudy = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Are you absolutely sure you want to delete this study model? Letger trails will be cleared.')) return;
    try {
      await fetch(`/api/studies/${id}`, { method: 'DELETE' });
      const nextId = studies.find(s => s.id !== id)?.id;
      await fetchStudies(nextId);
      triggerToast('Feasibility project securely deleted from registry.');
    } catch (err) {
      console.error(err);
    }
  };

  // Push updates to study on server (e.g. costs array additions/deletions or scenario toggles)
  const saveStudyUpdates = async (updated: FeasibilityStudy, message?: string) => {
    try {
      const res = await fetch(`/api/studies/${updated.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      const data = await res.json();
      setActiveStudy(data);
      setStudies(prev => prev.map(s => s.id === data.id ? data : s));
      if (message) triggerToast(message);
    } catch (e) {
      console.error('Failed to update study parameters', e);
    }
  };

  // Toggle Scenario dynamically
  const handleScenarioChange = (scen: ScenarioMode) => {
    if (!activeStudy) return;
    const updated = { ...activeStudy, scenario: scen };
    saveStudyUpdates(updated, `Macro economic environment scenario switched to: ${scen.toUpperCase()}`);
  };

  // Toggle exchange rate mode
  const handleRateModeChange = (mode: ExchangeRateMode) => {
    if (!activeStudy) return;
    const updated = { ...activeStudy, exchangeRateMode: mode };
    saveStudyUpdates(updated, `Exchange conversion index altered to: ${mode.toUpperCase()} market.`);
  };

  // Toggle power grid backup check
  const handleGridBackupChange = (checked: boolean) => {
    if (!activeStudy) return;
    const updated = { ...activeStudy, powerGridBackupRequired: checked };
    saveStudyUpdates(updated, checked ? 'Heavy diesel-grid backup cost active.' : 'Main grid line tracking only.');
  };

  // Add customized startup capital item
  const handleAddStartupItem = () => {
    if (!activeStudy || !newStartupItem || !newStartupCost) return;
    const newItem: StartupCostItem = {
      id: `sc-u-${Date.now()}`,
      item: newStartupItem,
      costLYD: Math.round(parseFloat(newStartupCost)),
      category: newStartupCategory
    };

    const updated = {
      ...activeStudy,
      startupCosts: [...activeStudy.startupCosts, newItem]
    };
    
    saveStudyUpdates(updated, `Capital item "${newStartupItem}" added.`);
    setNewStartupItem('');
    setNewStartupCost('');
  };

  // Delete customized startup cost
  const handleDeleteStartupItem = (itemId: string) => {
    if (!activeStudy) return;
    const updated = {
      ...activeStudy,
      startupCosts: activeStudy.startupCosts.filter(c => c.id !== itemId)
    };
    saveStudyUpdates(updated, 'Startup expenditure item deleted.');
  };

  // Add operating cost item
  const handleAddOperatingItem = () => {
    if (!activeStudy || !newOpItem || !newOpCost) return;
    const newItem: OperatingCostItem = {
      id: `oc-u-${Date.now()}`,
      item: newOpItem,
      costLYD: Math.round(parseFloat(newOpCost)),
      period: newOpPeriod,
      category: newOpCategory
    };

    const updated = {
      ...activeStudy,
      operatingCosts: [...activeStudy.operatingCosts, newItem]
    };

    saveStudyUpdates(updated, `Operating expense "${newOpItem}" added.`);
    setNewOpItem('');
    setNewOpCost('');
  };

  // Delete operating cost
  const handleDeleteOperatingItem = (itemId: string) => {
    if (!activeStudy) return;
    const updated = {
      ...activeStudy,
      operatingCosts: activeStudy.operatingCosts.filter(o => o.id !== itemId)
    };
    saveStudyUpdates(updated, 'Operating expenditure item cleared.');
  };

  // Trigger live AI section generation using Gemini backend endpoint
  const handleGenerateSectionText = async (sectionKey: string) => {
    if (!activeStudy) return;
    try {
      setGeneratingSection(sectionKey);
      const res = await fetch(`/api/studies/${activeStudy.id}/generate-section`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sectionKey })
      });
      const data = await res.json();
      setActiveStudy(data);
      setStudies(prev => prev.map(s => s.id === data.id ? data : s));
      triggerToast(`AI Consulting Chapter generated successfully!`);
    } catch (e) {
      console.error('Failed to generate AI study section text:', e);
    } finally {
      setGeneratingSection(null);
    }
  };

  // Trigger live consulting multi-agent jury audit 
  const handleRunAdvisoryAudit = async () => {
    if (!activeStudy) return;
    try {
      setAuditing(true);
      const res = await fetch(`/api/studies/${activeStudy.id}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      setActiveStudy(data);
      setStudies(prev => prev.map(s => s.id === data.id ? data : s));
      triggerToast(`Consulting Board auditing locked successfully! Rating: ${data.confidenceScore}%`);
    } catch (e) {
      console.error('Failed running project audit', e);
    } finally {
      setAuditing(false);
    }
  };

  // Mock document custom export suite
  const executeDocumentExport = (docType: string) => {
    setExporting(docType);
    setTimeout(() => {
      setExporting(null);
      triggerToast(`"${activeStudy?.name}" export process successful! Download ready in local browser cache (${docType.toUpperCase()})`);
      // Trigger native print flow mockup if user chooses printable layout
      if (docType === 'pdf_print') {
        window.print();
      }
    }, 2800);
  };

  // Simple copy report to clipboard
  const copyStudyToClipboard = () => {
    if (!activeStudy) return;
    const textBuffer = `
FEASIBILITY ANALYSIS SUMMARY: ${activeStudy.name.toUpperCase()}
Location: ${activeStudy.city}, Libya | Industry: ${activeStudy.industry} | Scale: ${activeStudy.scale.toUpperCase()}
--------------------------------------------------
Financial Metrics:
Initial CapEx: ${(activeStudy.startupCosts.reduce((acc, c) => acc + c.costLYD, 0)).toLocaleString()} LYD
NPV Projection: ${activeStudy.metrics.npv.toLocaleString()} LYD (Discounted at ${activeStudy.discountRate * 100}%)
IRR: ${activeStudy.metrics.irr}% | Annualized ROI: ${activeStudy.metrics.roi}%
Amortization Period: ${activeStudy.metrics.paybackPeriod} years
Exchange Scheme: ${activeStudy.exchangeRateMode.toUpperCase()} at ${activeStudy.exchangeRate} LYD per USD
--------------------------------------------------
Generated Executive Summary:
${activeStudy.sections.executiveSummary}
    `;
    navigator.clipboard.writeText(textBuffer);
    triggerToast(language === 'ar' ? t.memoCopiedToastText : 'Audit summary copy secure inside local system clipboard.');
  };

  const t = translations[language];

  return (
    <div 
      className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col selection:bg-amber-500 selection:text-slate-950 print:bg-white print:text-black font-sans"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      
      {/* Floating System Notification Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className={`fixed bottom-6 ${language === 'ar' ? 'left-6' : 'right-6'} z-50 bg-[#0f172a] border border-amber-500/40 text-slate-100 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 max-w-sm`}
          >
            <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
            <div className="text-xs font-medium font-sans">{toastMessage}</div>
          </motion.div>
        )}
      </AnimatePresence>
  
      {/* Main Corporate Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 print:hidden shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/10">
            <BrainCircuit className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold font-display tracking-tight text-slate-900 uppercase">
                {t.appTitle}
              </h1>
              <span className="text-[9px] font-mono font-bold bg-[#0f172a] border border-slate-800 text-amber-400 px-1.5 py-0.5 rounded uppercase">
                {t.investmentGrade}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-sans mt-0.5">
              {t.automatedSlogan}
            </p>
          </div>
        </div>
  
        <div className="flex items-center gap-4">
          {/* EN/AR Toggle */}
          <div className="bg-slate-100 p-0.5 rounded-lg border border-slate-200 flex gap-0.5 text-[10px] font-bold font-sans shrink-0">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded transition cursor-pointer ${language === 'en' ? 'bg-[#0f172a] text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              id="btn_lang_en"
            >
              English
            </button>
            <button
              onClick={() => setLanguage('ar')}
              className={`px-2.5 py-1 rounded transition cursor-pointer ${language === 'ar' ? 'bg-[#0f172a] text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              id="btn_lang_ar"
            >
              عربي
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-slate-650 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200">
            <Clock className="w-3.5 h-3.5 text-amber-650" />
            <span>{t.sovereignLedger}</span>
          </div>
          
          <button
            onClick={() => setShowIntake(true)}
            className="px-4 py-2 text-xs font-bold font-sans bg-[#0f172a] hover:bg-slate-800 text-white transition rounded-lg flex items-center gap-1.5 shadow-sm cursor-pointer"
            id="btn_create_new_study"
          >
            <Plus className="w-4 h-4" />
            {t.newVentureStudy}
          </button>
        </div>
      </header>

      {/* Primary Workspace */}
      <div className="flex-1 flex overflow-hidden w-full max-w-[1720px] mx-auto min-h-0 print:block">
        
        {/* Left Side: Feasibility Study Registry Sidebar */}
        <aside className="w-80 border-r border-slate-800 bg-[#0f172a] text-slate-200 p-6 flex flex-col gap-6 shrink-0 md:flex hidden print:hidden min-h-0 overflow-y-auto">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[10px] font-bold font-mono text-slate-400 tracking-wider uppercase">
                {t.activeRegistry}
              </h3>
              <span className="text-[10px] font-mono text-slate-400">
                ({studies.length}) {t.activeCount}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans">
              {t.compareModels}
            </p>
          </div>

          <div className="flex-1 space-y-3.5">
            {studies.map(study => {
              const isActive = activeStudy?.id === study.id;
              const capexHex = study.startupCosts.reduce((acc, c) => acc + c.costLYD, 0);
              return (
                <div
                  key={study.id}
                  onClick={() => setActiveStudy(study)}
                  className={`p-4 rounded-xl border transition cursor-pointer relative group ${
                    isActive 
                      ? 'bg-slate-800 border-amber-500/70 shadow-lg text-white' 
                      : 'border-slate-800 hover:bg-slate-800/50 text-slate-400 hover:text-slate-200'
                  }`}
                  id={`study_card_${study.id}`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-mono text-amber-400 font-bold tracking-wider uppercase">
                      {t.industries[study.industry] || study.industry}
                    </span>
                    <button
                      onClick={(e) => handleDeleteStudy(study.id, e)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-slate-700 text-slate-450 hover:text-rose-400 transition shrink-0"
                      title={language === 'ar' ? 'حذف الدراسة' : 'Delete Study'}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  
                  <h4 className="text-xs font-bold font-sans tracking-tight mt-1 truncate pr-4 text-slate-100">
                    {study.name}
                  </h4>
                  
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-2 font-mono">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    <span>{t.cities[study.city] || study.city}، {language === 'ar' ? 'ليبيا' : 'Libya'}</span>
                  </div>

                  <div className="mt-3.5 pt-3 border-t border-slate-900 flex justify-between items-center text-[10px] font-mono">
                    <div>
                      <span className="text-slate-500 block">{language === 'ar' ? 'رأس المال' : 'CapEx'}</span>
                      <span className="text-slate-300 mt-0.5 block">{capexHex.toLocaleString()} {language === 'ar' ? 'د.ل' : 'LYD'}</span>
                    </div>
                    <div className={language === 'ar' ? 'text-left' : 'text-right'}>
                      <span className="text-slate-500 block">{language === 'ar' ? 'العائد الداخلي' : 'IRR'}</span>
                      <span className="text-amber-400 mt-0.5 block font-bold">{study.metrics.irr}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sourcing credentials advisory */}
          <div className="p-4 bg-slate-800/30 border border-slate-800 rounded-xl space-y-2">
            <h5 className="text-[9px] font-mono font-bold text-slate-300 uppercase tracking-wider">
              {t.dataResolutionTitle}
            </h5>
            <p className="text-[10px] text-slate-450 leading-relaxed font-sans">
              {t.dataResolutionDesc}
            </p>
          </div>
        </aside>

        {/* Right Side: Active Workspace Stage */}
        <main className="flex-1 bg-[#f8fafc] p-6 md:p-8 flex flex-col gap-6 overflow-y-auto min-h-0 print:p-0 print:bg-white text-slate-800">
          
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <RefreshCw className="w-8 h-8 text-amber-500 animate-spin mb-4" />
              <h3 className="text-sm font-semibold text-slate-650 font-mono">{t.loadingLegislative}</h3>
              <p className="text-xs text-slate-500 mt-1 font-sans">{t.compilingRegistries}</p>
            </div>
          ) : showIntake ? (
            /* PROJECT ONBOARDING INTAKE WIZARD STATE */
            <IntakeForm
              onSubmit={handleCreateStudy}
              onCancel={() => setShowIntake(false)}
              submitting={submittingIntake}
              language={language}
            />
          ) : activeStudy ? (
            /* DETAILED STUDY WORKBENCH VIEW */
            <div className="space-y-6">
              
              {/* Active Project Overview Card */}
              <div className="bg-white border border-slate-200/90 p-6 rounded-2xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 print:border-none print:p-0 print:bg-white shadow-sm hover:shadow-md transition">
                <div className="space-y-2 max-w-xl text-start">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-amber-500/10 border border-amber-500/25 text-amber-700 rounded uppercase">
                      {language === 'ar' ? `${t.valueChainSuffix} ${t.industries[activeStudy.industry] || activeStudy.industry}` : `${activeStudy.industry} ${t.valueChainSuffix}`}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-slate-50 border border-slate-200 text-slate-500 rounded uppercase flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {t.cities[activeStudy.city] || activeStudy.city}
                    </span>
                  </div>
                  
                  <h2 className="text-lg md:text-2xl font-bold font-sans tracking-tight text-slate-900 print:text-black">
                    {activeStudy.name}
                  </h2>
                  
                  <p className="text-xs text-slate-500 font-sans leading-relaxed print:text-slate-600">
                    {activeStudy.description}
                  </p>
                </div>

                {/* Macro Economic Quick Adjustments Bar */}
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col sm:flex-row gap-6 shrink-0 print:hidden font-sans">
                  {/* Scenario Planning Toggle */}
                  <div className="space-y-1.5 text-start">
                    <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider block">
                      {t.macroStressScenario}
                    </span>
                    <div className="bg-white p-0.5 rounded-lg border border-slate-200 flex gap-1 text-xs shadow-sm">
                      {(['base', 'optimistic', 'conservative'] as ScenarioMode[]).map(scen => (
                        <button
                          key={scen}
                          onClick={() => handleScenarioChange(scen)}
                          className={`px-2.5 py-1 rounded transition capitalize text-[10px] font-medium cursor-pointer ${
                            activeStudy.scenario === scen 
                              ? 'bg-[#0f172a] text-white font-bold shadow-sm' 
                              : 'text-slate-500 hover:text-slate-800'
                          }`}
                          id={`btn_scen_${scen}`}
                        >
                          {t.scenarios[scen]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Currency regime selection */}
                  <div className="space-y-1.5 text-start">
                    <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider block">
                      {t.exchangeSchemeConversion}
                    </span>
                    <div className="bg-white p-0.5 rounded-lg border border-[#e2e8f0] flex gap-1 text-xs shadow-sm">
                      {(['parallel', 'official'] as ExchangeRateMode[]).map(m => (
                        <button
                          key={m}
                          onClick={() => handleRateModeChange(m)}
                          className={`px-2.5 py-1 rounded transition uppercase text-[10px] font-medium cursor-pointer ${
                            activeStudy.exchangeRateMode === m 
                              ? 'bg-[#0f172a] text-white font-bold shadow-sm' 
                              : 'text-slate-500 hover:text-slate-800'
                          }`}
                          id={`btn_rate_mode_${m}`}
                        >
                          {t.rates[m]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Menu Tabs */}
              <div className="border-b border-slate-200 flex items-center justify-between overflow-x-auto gap-4 py-1.5 scrollbar-thin shrink-0 print:hidden">
                <div className="flex gap-1.5 md:gap-3">
                  <button
                    onClick={() => setActiveTab('kpi_model')}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg font-sans transition flex items-center gap-1.5 ${
                      activeTab === 'kpi_model' 
                        ? 'bg-[#0f172a] text-white border border-[#0f172a] shadow-sm' 
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                    }`}
                    id="tab_kpi_model"
                  >
                    <SlidersHorizontal className="w-4 h-4 text-amber-500" />
                    {t.financialModelingEngine}
                  </button>
                  <button
                    onClick={() => setActiveTab('ai_editor')}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg font-sans transition flex items-center gap-1.5 ${
                      activeTab === 'ai_editor' 
                        ? 'bg-[#0f172a] text-white border border-[#0f172a] shadow-sm' 
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                    }`}
                    id="tab_ai_editor"
                  >
                    <BrainCircuit className="w-4 h-4 text-amber-500" />
                    {t.aiFeasibilitySuite}
                  </button>
                  <button
                    onClick={() => setActiveTab('pitch_deck')}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg font-sans transition flex items-center gap-1.5 ${
                      activeTab === 'pitch_deck' 
                        ? 'bg-[#0f172a] text-white border border-[#0f172a] shadow-sm' 
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                    }`}
                    id="tab_pitch_deck"
                  >
                    <Presentation className="w-4 h-4 text-amber-500" />
                    {t.investorPitchDeck}
                  </button>
                  <button
                    onClick={() => setActiveTab('audit_board')}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg font-sans transition flex items-center gap-1.5 ${
                      activeTab === 'audit_board' 
                        ? 'bg-[#0f172a] text-white border border-[#0f172a] shadow-sm' 
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                    }`}
                    id="tab_audit_board"
                  >
                    <Scale className="w-4 h-4 text-amber-500" />
                    {t.advisoryBoardCritique}
                  </button>
                  <button
                    onClick={() => setActiveTab('export_center')}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg font-sans transition flex items-center gap-1.5 ${
                      activeTab === 'export_center' 
                        ? 'bg-[#0f172a] text-white border border-[#0f172a] shadow-sm' 
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                    }`}
                    id="tab_export_center"
                  >
                    <Download className="w-4 h-4 text-amber-500" />
                    {t.consultingExportCenter}
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={copyStudyToClipboard}
                    className="p-2 border border-slate-200 hover:border-slate-300 bg-white text-slate-500 hover:text-slate-850 transition rounded-lg text-xs flex items-center gap-1 shrink-0 cursor-pointer shadow-sm"
                    title={language === 'ar' ? 'نسخ ملخص التدقيق للتقرير' : 'Copy Report Digest'}
                    id="btn_copy_digest"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">{t.copyMemo}</span>
                  </button>
                </div>
              </div>

              {/* View Screen Stage toggles */}
              <div className="space-y-6">

                {/* TAB 1: FINANCIAL MODELING ENGINE */}
                {activeTab === 'kpi_model' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    {/* Financial KPI Numbers Banner */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 font-mono font-sans text-start">
                      
                      <div className="bg-white border border-slate-200 p-5 rounded-2xl relative overflow-hidden group shadow-sm transition-all duration-250 hover:shadow-md">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/5 rounded-full -translate-y-5 translate-x-5"></div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">{t.initialCapital}</span>
                        <div className="text-lg md:text-2xl font-bold mt-2 text-slate-800 flex items-baseline gap-1 font-display">
                          {(activeStudy.startupCosts.reduce((acc, c) => acc + c.costLYD, 0)).toLocaleString()}
                          <span className="text-xs text-slate-400 font-sans">{language === 'ar' ? 'د.ل' : 'LYD'}</span>
                        </div>
                        <span className="text-[9px] text-slate-500 block mt-1">
                          ≈ $ {Math.round((activeStudy.startupCosts.reduce((acc, c) => acc + c.costLYD, 0)) / activeStudy.exchangeRate).toLocaleString()} {language === 'ar' ? 'دولار' : 'USD'}
                        </span>
                      </div>

                      <div className="bg-white border border-slate-200 p-5 rounded-2xl relative overflow-hidden group shadow-sm transition-all duration-250 hover:shadow-md">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/5 rounded-full -translate-y-5 translate-x-5"></div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">{t.discountedNpv}</span>
                        <div className="text-lg md:text-2xl font-bold mt-2 text-emerald-600 flex items-baseline gap-1 font-display">
                          {activeStudy.metrics.npv.toLocaleString()}
                          <span className="text-xs text-slate-400 font-sans font-medium">{language === 'ar' ? 'د.ل' : 'LYD'}</span>
                        </div>
                        <span className="text-[9px] text-slate-500 block mt-1">{t.discountFactorText} {activeStudy.discountRate * 100}%</span>
                      </div>

                      <div className="bg-white border border-slate-200 p-5 rounded-2xl relative overflow-hidden group shadow-sm transition-all duration-250 hover:shadow-md">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/5 rounded-full -translate-y-5 translate-x-5"></div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">{t.yieldMetricIrr}</span>
                        <div className="text-lg md:text-2xl font-bold mt-2 text-amber-600 flex items-baseline gap-1 font-display">
                          {activeStudy.metrics.irr}%
                        </div>
                        <span className="text-[9px] text-slate-500 block mt-1">{t.annualizedMargin}</span>
                      </div>

                      <div className="bg-white border border-slate-200 p-5 rounded-2xl relative overflow-hidden group shadow-sm transition-all duration-250 hover:shadow-md">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-rose-500/5 rounded-full -translate-y-5 translate-x-5"></div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">{t.breakEvenPayback}</span>
                        <div className="text-lg md:text-2xl font-bold mt-2 text-rose-600 flex items-baseline gap-1 font-display">
                          {activeStudy.metrics.paybackPeriod}
                          <span className="text-xs text-slate-400 font-sans text-rose-500 font-medium">{language === 'ar' ? 'سنوات' : 'Years'}</span>
                        </div>
                        <span className="text-[9px] text-slate-500 block mt-1">{t.fullyAmortizedText}</span>
                      </div>

                    </div>

                    {/* Highly Interactive SVG Charts Display */}
                    <InteractiveSvgCharts 
                      projections={activeStudy.revenueForecast} 
                      startupCosts={activeStudy.startupCosts} 
                      language={language}
                    />

                    {/* Capital Expenditure & Operating Expense Detail Modeling Arrays */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-start">
                      
                      {/* Left: Startup Cost CapEx array config */}
                      <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-6 shadow-sm">
                        <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                          <div>
                            <h3 className="text-sm font-semibold text-slate-800 uppercase font-sans tracking-wide">
                              {language === 'ar' ? 'سجل النفقات الرأسمالية والتأسيسية (CapEx)' : 'Capital Expenditure Registry (CapEx)'}
                            </h3>
                            <p className="text-xs text-slate-500 mt-1 font-sans">
                              {language === 'ar' ? 'تكاليف التأسيس المبدئية ونشر الأصول والمنشآت' : 'Initial investment overhead and asset deployment'}
                            </p>
                          </div>
                          <span className="text-xs font-mono bg-slate-50 px-3 py-1.5 rounded border border-slate-200 text-slate-700">
                            {(activeStudy.startupCosts.reduce((acc, c) => acc + c.costLYD, 0)).toLocaleString()} {language === 'ar' ? 'د.ل' : 'LYD'}
                          </span>
                        </div>

                        {/* Add Item Panel Inline */}
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-slate-50 p-4 border border-slate-200 rounded-lg shadow-inner">
                          <div className="sm:col-span-5 space-y-1">
                            <span className="text-[9px] font-mono text-slate-500 uppercase block font-sans">{language === 'ar' ? 'بيان الأصل / المعدات' : 'Asset Description'}</span>
                            <input
                              type="text"
                              placeholder={language === 'ar' ? 'مثال: محطة فرز وغربلة' : 'e.g. Industrial Sorting Mill'}
                              value={newStartupItem}
                              onChange={e => setNewStartupItem(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500"
                              id="input_new_startup_item"
                            />
                          </div>
                          <div className="sm:col-span-3 space-y-1">
                            <span className="text-[9px] font-mono text-slate-500 uppercase block font-sans">{language === 'ar' ? 'التكلفة بالدينار' : 'Cost (LYD)'}</span>
                            <input
                              type="number"
                              placeholder="e.g. 45000"
                              value={newStartupCost}
                              onChange={e => setNewStartupCost(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 font-mono"
                              id="input_new_startup_cost"
                            />
                          </div>
                          <div className="sm:col-span-3 space-y-1">
                            <span className="text-[9px] font-mono text-slate-500 uppercase block font-sans">{language === 'ar' ? 'الفئة' : 'Category'}</span>
                            <select
                              value={newStartupCategory}
                              onChange={e => setNewStartupCategory(e.target.value as any)}
                              className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none"
                              id="select_new_startup_category"
                            >
                              <option value="Equipment">{language === 'ar' ? 'المعدات والآلات' : 'Equipment'}</option>
                              <option value="Licensing & Legal">{language === 'ar' ? 'التراخيص والقانونية' : 'Licensing'}</option>
                              <option value="Real Estate & Facility">{language === 'ar' ? 'العقارات والمنشأة' : 'Real Estate'}</option>
                              <option value="Working Capital">{language === 'ar' ? 'رأس المال العامل' : 'Working Cap'}</option>
                              <option value="Marketing">{language === 'ar' ? 'التسويق والدعاية' : 'Marketing'}</option>
                              <option value="Generator & Power">{language === 'ar' ? 'المولدات والشبكة' : 'Generator'}</option>
                            </select>
                          </div>
                          <div className="sm:col-span-1 flex items-end">
                            <button
                              type="button"
                              onClick={handleAddStartupItem}
                              className="w-full h-8 flex items-center justify-center bg-[#0f172a] hover:bg-slate-800 text-white rounded transition cursor-pointer font-bold font-sans text-xs"
                              title={language === 'ar' ? 'إضافة أصل' : 'Add Asset'}
                              id="btn_add_startup_item"
                            >
                              <Plus className="w-4 h-4 shrink-0" />
                            </button>
                          </div>
                        </div>

                        {/* Cost list elements */}
                        <div className="space-y-2.5 max-h-[260px] overflow-y-auto">
                          {activeStudy.startupCosts.map((c) => (
                            <div key={c.id} className="flex justify-between items-center p-3 rounded bg-white border border-slate-200 text-xs shadow-sm hover:shadow transition">
                              <div className="space-y-1 text-start">
                                <span className="font-medium text-slate-800 font-sans">{c.item}</span>
                                <span className="text-[9px] font-mono text-slate-400 uppercase block">
                                  {language === 'ar' ? (c.category === 'Equipment' ? 'الآلات والمعدات' : c.category === 'Licensing & Legal' ? 'تراخيص قانونية' : c.category === 'Real Estate & Facility' ? 'أراضي ومنشآت' : c.category === 'Working Capital' ? 'رأس مال تشغيلي' : c.category === 'Generator & Power' ? 'مولدات وطاقة احتياطية' : c.category) : c.category}
                                </span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="font-mono text-slate-700">{c.costLYD.toLocaleString()} {language === 'ar' ? 'د.ل' : 'LYD'}</span>
                                <button
                                  onClick={() => handleDeleteStartupItem(c.id)}
                                  className="text-slate-400 hover:text-rose-600 p-1 rounded hover:bg-slate-50 transition cursor-pointer"
                                  title={language === 'ar' ? 'حذف العنصر' : 'Delete Cost Item'}
                                  id={`btn_delete_startup_item_${c.id}`}
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Power Grid outage checkbox helper specifically inside local context */}
                        <div className="p-4 bg-indigo-50/70 rounded-xl border border-indigo-100 flex justify-between items-center text-xs shadow-sm text-start">
                          <div className="space-y-1">
                            <span className="font-semibold text-slate-800 flex items-center gap-1 font-sans">
                              <Zap className="w-3.5 h-3.5 text-amber-550 shrink-0" />
                              {language === 'ar' ? 'صندوق دعم وتأمين الشبكة الكهربائية الوطنية' : 'Libyan National Power Grid Backup Buffer'}
                            </span>
                            <span className="text-[10px] text-slate-500 block leading-relaxed max-w-sm font-sans">
                              {language === 'ar' 
                                ? 'يخصص خط شراء رأسمالي إجباري لمحطة ديزل ومولد لضمان عدم تعطل دورات التصنيع عند انقطاعات التيار الكهربائي (يوصى به بشدة في ليبيا).'
                                : 'Enforce automated purchase capital reserves for a heavy backup power diesel station generator to handle 8-12 hr daily grid outages.'}
                            </span>
                          </div>
                          <input
                            type="checkbox"
                            checked={activeStudy.powerGridBackupRequired}
                            onChange={e => handleGridBackupChange(e.target.checked)}
                            className="w-4.5 h-4.5 text-[#0f172a] bg-slate-50 rounded border-slate-200 cursor-pointer"
                            id="checkbox_power_grid_backup"
                          />
                        </div>
                      </div>

                      {/* Right: Operating Costs array config */}
                      <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-6 shadow-sm">
                        <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                          <div>
                            <h3 className="text-sm font-semibold text-slate-800 uppercase font-sans tracking-wide">
                              {language === 'ar' ? 'النفقات والالتزامات التشغيلية (OpEx)' : 'Operating Expenditures (OpEx)'}
                            </h3>
                            <p className="text-xs text-slate-500 mt-1 font-sans">
                              {language === 'ar' ? 'المصاريف التشغيلية الدورية المباشرة وعوامل الرواتب والأجور' : 'Requisite continuous working expenses and payroll factors'}
                            </p>
                          </div>
                          <span className="text-xs font-mono bg-slate-50 px-3 py-1.5 rounded border border-slate-200 text-slate-700">
                            {activeStudy.metrics.breakEvenLYD.toLocaleString()} {language === 'ar' ? 'د.ل / سنوي' : 'LYD / Yr'}
                          </span>
                        </div>

                        {/* Add Op cost panel */}
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-slate-50 p-4 border border-slate-200 rounded-lg shadow-inner">
                          <div className="sm:col-span-5 space-y-1">
                            <span className="text-[9px] font-mono text-slate-500 uppercase block font-sans">{language === 'ar' ? 'بيان المصروف' : 'Expense Description'}</span>
                            <input
                              type="text"
                              placeholder={language === 'ar' ? 'مثال: أجور العمالة المباشرة' : 'e.g. Sourcing Diesel Fuel'}
                              value={newOpItem}
                              onChange={e => setNewOpItem(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500"
                              id="input_new_opex_item"
                            />
                          </div>
                          <div className="sm:col-span-2 space-y-1">
                            <span className="text-[9px] font-mono text-slate-500 uppercase block font-sans">{language === 'ar' ? 'التكلفة د.ل' : 'Cost (LYD)'}</span>
                            <input
                              type="number"
                              placeholder="e.g. 500"
                              value={newOpCost}
                              onChange={e => setNewOpCost(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 font-mono"
                              id="input_new_opex_cost"
                            />
                          </div>
                          <div className="sm:col-span-2 space-y-1">
                            <span className="text-[9px] font-mono text-slate-500 uppercase block font-sans">{language === 'ar' ? 'المدى' : 'Period'}</span>
                            <select
                              value={newOpPeriod}
                              onChange={e => setNewOpPeriod(e.target.value as any)}
                              className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none cursor-pointer"
                              id="select_new_opex_period"
                            >
                              <option value="monthly">{language === 'ar' ? 'شهرياً' : 'Monthly'}</option>
                              <option value="annually">{language === 'ar' ? 'سنوياً' : 'Annual'}</option>
                            </select>
                          </div>
                          <div className="sm:col-span-2 space-y-1">
                            <span className="text-[9px] font-mono text-slate-500 uppercase block font-sans">{language === 'ar' ? 'الفئة' : 'Category'}</span>
                            <select
                              value={newOpCategory}
                              onChange={e => setNewOpCategory(e.target.value as any)}
                              className="w-full bg-white border border-slate-200 rounded px-2 text-xs text-slate-800 focus:outline-none cursor-pointer"
                              id="select_new_opex_category"
                            >
                              <option value="Salaries">{language === 'ar' ? 'الرواتب والأجور' : 'Payroll'}</option>
                              <option value="Rent">{language === 'ar' ? 'الإيجار' : 'Rent'}</option>
                              <option value="Utilities & Fuel">{language === 'ar' ? 'الطاقة والمياه والمحروقات' : 'Fuel & Util'}</option>
                              <option value="Maintenance">{language === 'ar' ? 'الصيانة التشغيلية' : 'Maintenance'}</option>
                              <option value="Raw Materials">{language === 'ar' ? 'المواد الخام للتصنيع' : 'Raw Materials'}</option>
                              <option value="Marketing">{language === 'ar' ? 'التسويق والدعاية' : 'Marketing'}</option>
                            </select>
                          </div>
                          <div className="sm:col-span-1 flex items-end">
                            <button
                              type="button"
                              onClick={handleAddOperatingItem}
                              className="w-full h-8 flex items-center justify-center bg-[#0f172a] hover:bg-slate-800 text-white rounded transition cursor-pointer"
                              title={language === 'ar' ? 'إضافة مصروف تشغيلي' : 'Add Expense'}
                              id="btn_add_opex_item"
                            >
                              <Plus className="w-4 h-4 shrink-0" />
                            </button>
                          </div>
                        </div>

                        {/* Expenditures array list */}
                        <div className="space-y-2.5 max-h-[260px] overflow-y-auto">
                          {activeStudy.operatingCosts.map((o) => {
                            const annualVal = o.period === 'monthly' ? o.costLYD * 12 : o.costLYD;
                            return (
                              <div key={o.id} className="flex justify-between items-center p-3 rounded bg-white border border-slate-200 text-xs shadow-sm hover:shadow transition">
                                <div className="space-y-1 text-start">
                                  <span className="font-medium text-slate-800 font-sans">{o.item}</span>
                                  <span className="text-[9px] font-mono text-slate-400 uppercase block">
                                    {language === 'ar' ? (o.category === 'Salaries' ? 'الرواتب والأجور' : o.category === 'Rent' ? 'الإيجار والمنشآت' : o.category === 'Utilities & Fuel' ? 'وقود ومياه ومنافع وطرح أحمال' : o.category === 'Maintenance' ? 'أعمال الصيانة الوقائية' : o.category === 'Raw Materials' ? 'مدخلات ومواد تصنيع خام' : o.category) : o.category} • {language === 'ar' ? (o.period === 'monthly' ? 'شهري' : 'سنوي') : o.period}
                                  </span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="font-mono text-slate-700">
                                    {o.costLYD.toLocaleString()} {language === 'ar' ? 'د.ل' : 'LYD'} <span className="text-[10px] text-slate-400 font-sans">/{language === 'ar' ? (o.period === 'monthly' ? 'شهر' : 'سنة') : (o.period === 'monthly' ? 'mo' : 'yr')}</span>
                                  </span>
                                  <button
                                    onClick={() => handleDeleteOperatingItem(o.id)}
                                    className="text-slate-400 hover:text-rose-650 p-1 rounded hover:bg-slate-50 transition cursor-pointer"
                                    title={language === 'ar' ? 'حذف المصروف' : 'Delete Cost'}
                                    id={`btn_delete_opex_item_${o.id}`}
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Break-even thresholds indicator banner */}
                        <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200/60 flex justify-between items-center text-xs shadow-sm text-start">
                          <span className="font-semibold text-slate-700 font-mono text-[11px] uppercase tracking-wider block font-sans">
                            {language === 'ar' ? 'مستهدف الإيرادات السنوي المقدر لبلوغ نقطة حد التعادل' : 'Calculated Break-Even Revenue Target'}
                          </span>
                          <span className="font-mono font-bold text-amber-700 bg-white px-2.5 py-1 rounded border border-amber-200">
                            {activeStudy.metrics.breakEvenLYD.toLocaleString()} {language === 'ar' ? 'د.ل / سنوياً' : 'LYD / Year'}
                          </span>
                        </div>

                      </div>

                    </div>

                  </motion.div>
                )}
                                {/* TAB 2: AI FEASIBILITY REPORT SUITE (Chapter-by-Chapter) */}
                {activeTab === 'ai_editor' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-sans text-slate-800"
                  >
                    
                    {/* Left: Chapter Selector List */}
                    <div className="lg:col-span-4 space-y-4">
                      <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                        <h4 className="text-xs font-bold font-mono text-slate-650 uppercase tracking-wider mb-2">
                          AI REPORT DRAFTING STEPS
                        </h4>
                        <p className="text-xs text-slate-500 font-sans leading-relaxed">
                          Invoke the server-side Gemini intelligence models to write consulting-grade, highly structured analyses of regional Libyan parameters.
                        </p>
                      </div>

                      <div className="space-y-2">
                        {[
                          { key: 'executiveSummary', label: '1. Executive summary' },
                          { key: 'marketResearch', label: '2. Market Analysis' },
                          { key: 'swotAnalysis', label: '3. SWOT Matrix' },
                          { key: 'pestelAnalysis', label: '4. PESTEL Analysis' },
                          { key: 'porterForces', label: "5. Porter's Five Forces" },
                          { key: 'riskManagement', label: '6. Risk & Mitigations' }
                        ].map((chap) => {
                          const hasText = activeStudy.sections[chap.key as keyof typeof activeStudy.sections]?.length > 50;
                          const isGenerating = generatingSection === chap.key;
                          return (
                            <button
                              key={chap.key}
                              onClick={() => handleGenerateSectionText(chap.key)}
                              disabled={generatingSection !== null}
                              className={`w-full text-left p-4 rounded-xl border transition flex justify-between items-center cursor-pointer ${
                                isGenerating 
                                  ? 'bg-amber-500/10 border-amber-550 text-slate-900 shadow-sm'
                                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-705'
                              }`}
                              id={`btn_gen_${chap.key}`}
                            >
                              <div className="space-y-0.5">
                                <span className="text-xs font-semibold font-sans block text-slate-800">{chap.label}</span>
                                <span className="text-[10px] text-slate-450 block font-mono">
                                  {isGenerating ? 'Writing content...' : (hasText ? 'Completed Study Draft' : 'Draft pending')}
                                </span>
                              </div>
                              <div className="shrink-0">
                                {isGenerating ? (
                                  <RefreshCw className="w-4 h-4 text-amber-600 animate-spin" />
                                ) : (
                                  <Sparkles className={`w-4 h-4 ${hasText ? 'text-amber-550' : 'text-slate-400'}`} />
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right: Master Output Display Frame */}
                    <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 relative flex flex-col min-h-[500px] shadow-sm">
                      
                      <div className="flex justify-between items-center pb-4 border-b border-slate-200 mb-6">
                        <div>
                          <h3 className="text-sm font-bold font-sans text-slate-800 uppercase tracking-wider">
                            ACTIVE ANALYSIS DRAFT PREVIEW
                          </h3>
                          <p className="text-xs text-slate-500 font-sans mt-0.5">Investment Memorandum Section View (Grounding Enabled)</p>
                        </div>
                        <span className="text-xs font-mono font-bold bg-slate-50 px-2 py-1 rounded border border-slate-200 text-amber-650 flex items-center gap-1.5 shrink-0">
                          <BrainCircuit className="w-4 h-4 text-amber-550" />
                          Gemini Pro Active
                        </span>
                      </div>

                      {/* Display content sections elegantly styled as a consulting paper */}
                      <div className="flex-1 space-y-8 max-h-[550px] overflow-y-auto pr-2 text-slate-700 leading-relaxed font-sans text-xs select-text">
                        {['executiveSummary', 'marketResearch', 'swotAnalysis', 'pestelAnalysis', 'porterForces', 'riskManagement'].map((key) => {
                          const text = activeStudy.sections[key as keyof typeof activeStudy.sections] || '';
                          const titles: Record<string, string> = {
                            executiveSummary: 'Executive Summary Briefing',
                            marketResearch: 'Regional Market Intelligence Analysis',
                            swotAnalysis: 'Sovereign SWOT Analysis Matrix',
                            pestelAnalysis: 'Libyan Macroeconomic PESTEL Framework',
                            porterForces: "Competitive Playbook Porter's Five Forces",
                            riskManagement: 'Risk Management Shield & Actionable Mitigations'
                          };

                          return (
                            <div key={key} className="space-y-3 pb-6 border-b border-slate-100 last:border-b-0">
                              <h4 className="text-xs font-bold text-amber-650 uppercase tracking-widest font-mono">
                                {titles[key]}
                              </h4>
                              <div className="prose prose-slate max-w-none text-slate-650">
                                {text.split('\n').map((para, pIdx) => {
                                  if (para.startsWith('###')) {
                                    return <h5 key={pIdx} className="text-[12px] font-bold text-slate-850 mt-4 mb-2">{para.replace('###', '').trim()}</h5>;
                                  } else if (para.startsWith('-')) {
                                    return <li key={pIdx} className="ml-4 list-disc mb-1 text-slate-650">{para.replace('-', '').trim()}</li>;
                                  } else {
                                    return <p key={pIdx} className="mb-3 leading-relaxed text-[11.5px] ">{para}</p>;
                                  }
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Floating citation support block */}
                      <div className="mt-6 pt-4 border-t border-slate-200 flex justify-between items-center text-[10px] font-mono text-slate-400">
                        <span>Citations Index: CBL, Ministry of Economy (2026)</span>
                        <span>Multi-Agent Checked ✓</span>
                      </div>

                    </div>

                  </motion.div>
                )}

                {/* TAB 3: INVESTOR PITCH DECK */}
                {activeTab === 'pitch_deck' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <PitchDeckSlides study={activeStudy} />
                  </motion.div>
                )}

                {/* TAB 4: EXPERT ADVISORY AUDIT PANEL */}
                {activeTab === 'audit_board' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <ExpertAuditableReview 
                      study={activeStudy} 
                      onRunAudit={handleRunAdvisoryAudit}
                      loading={auditing}
                    />
                  </motion.div>
                )}

                {/* TAB 5: DOCUMENT EXPORT CENTER */}
                {activeTab === 'export_center' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                  >
                    
                    {/* PDF Export card */}
                    <div className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col justify-between h-[360px] shadow-sm hover:shadow transition-all duration-200">
                      <div className="space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                          <FileText className="w-6 h-6 text-amber-600" />
                        </div>
                        <h4 className="text-sm font-semibold tracking-wide text-slate-800 uppercase font-sans">
                          Deloitte-Grade PDF Study Report
                        </h4>
                        <p className="text-xs text-slate-500 font-sans leading-relaxed">
                          Produces a formal, beautiful print-friendly PDF comprehensive document. Fits corporate finance templates, formatting calculations, SWOT analysis, and audit trails.
                        </p>
                      </div>

                      <button
                        onClick={() => executeDocumentExport('pdf_print')}
                        disabled={exporting !== null}
                        className="w-full py-2.5 text-xs font-bold font-sans bg-[#0f172a] hover:bg-slate-800 text-white transition rounded-lg flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                        id="btn_export_pdf"
                      >
                        {exporting === 'pdf_print' ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            Compiling PDF Printout...
                          </>
                        ) : (
                          <>
                            <Download className="w-3.5 h-3.5" />
                            Generate & Print PDF Report
                          </>
                        )}
                      </button>
                    </div>

                    {/* Word / Memo Export card */}
                    <div className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col justify-between h-[360px] shadow-sm hover:shadow transition-all duration-200">
                      <div className="space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-550/20">
                          <FileSpreadsheet className="w-6 h-6 text-indigo-550" />
                        </div>
                        <h4 className="text-sm font-semibold tracking-wide text-slate-800 uppercase font-sans">
                          Word Investment Memorandum (.docx)
                        </h4>
                        <p className="text-xs text-slate-505 font-sans leading-relaxed">
                          Exports a fully editable Consulting style memo block containing all structured text segments, tables, raw variables, and scenario multipliers, completely unlocked for text processors.
                        </p>
                      </div>

                      <button
                        onClick={() => executeDocumentExport('docx')}
                        disabled={exporting !== null}
                        className="w-full py-2.5 text-xs font-bold font-sans bg-[#0f172a] hover:bg-slate-800 text-white transition rounded-lg flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                        id="btn_export_docx"
                      >
                        {exporting === 'docx' ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            Formatting Memory file...
                          </>
                        ) : (
                          <>
                            <Download className="w-3.5 h-3.5" />
                            Download .DOCX Memorandums
                          </>
                        )}
                      </button>
                    </div>

                    {/* PowerPoint / Slides Export card */}
                    <div className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col justify-between h-[360px] shadow-sm hover:shadow transition-all duration-200">
                      <div className="space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-550/20">
                          <Presentation className="w-6 h-6 text-emerald-600" />
                        </div>
                        <h4 className="text-sm font-semibold tracking-wide text-slate-800 uppercase font-sans">
                          PowerPoint Pitch Deck Slides (.pptx)
                        </h4>
                        <p className="text-xs text-slate-505 font-sans leading-relaxed">
                          Converts slides shown in the Presenter Tab into an editable presentation deck, configured with custom design templates, color layouts, cash-flow indicators, and summary bullets.
                        </p>
                      </div>

                      <button
                        onClick={() => executeDocumentExport('pptx')}
                        disabled={exporting !== null}
                        className="w-full py-2.5 text-xs font-bold font-sans bg-[#0f172a] hover:bg-slate-800 text-white transition rounded-lg flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                        id="btn_export_pptx"
                      >
                        {exporting === 'pptx' ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            Publishing slides pack...
                          </>
                        ) : (
                          <>
                            <Download className="w-3.5 h-3.5" />
                            Download PowerPoint Slides
                          </>
                        )}
                      </button>
                    </div>

                  </motion.div>
                )}

              </div>

            </div>
          ) : (
            /* FALLBACK IDLE PANEL INCASE OF VACANT DATABASE */
            <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
              <Building2 className="w-16 h-16 text-slate-300 animate-bounce mb-6" />
              <h2 className="text-xl font-bold text-slate-800 font-sans">REGISTRY IS EMPTY</h2>
              <p className="text-xs text-slate-500 mt-2 max-w-md mx-auto">Create a customized, AI-driven venture study inside active memory by clicking &quot;New Venture Study&quot; above.</p>
            </div>
          )}

        </main>
      </div>

      {/* Global Corporate Footer */}
      <footer className="bg-white border-t border-slate-200 px-6 py-4 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-slate-400 print:hidden shrink-0">
        <div className="flex items-center gap-2">
          <span>© 2026 Numo Libyan Feasibility Consulting Platform</span>
          <span>•</span>
          <span>Security Audited</span>
        </div>
        <div className="flex items-center gap-4 mt-2 md:mt-0">
          <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-500" /> Server-Side Models Synced</span>
          <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-amber-500" /> Irradiance Matrices Engaged</span>
        </div>
      </footer>

    </div>
  );
}
