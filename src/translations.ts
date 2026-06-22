export interface TranslationDict {
  appTitle: string;
  investmentGrade: string;
  automatedSlogan: string;
  sovereignLedger: string;
  newVentureStudy: string;
  activeRegistry: string;
  activeCount: string;
  compareModels: string;
  dataResolutionTitle: string;
  dataResolutionDesc: string;
  valueChainSuffix: string;
  macroStressScenario: string;
  exchangeSchemeConversion: string;
  financialModelingEngine: string;
  aiFeasibilitySuite: string;
  investorPitchDeck: string;
  advisoryBoardCritique: string;
  consultingExportCenter: string;
  copyMemo: string;
  initialCapital: string;
  discountedNpv: string;
  yieldMetricIrr: string;
  breakEvenPayback: string;
  loadingLegislative: string;
  compilingRegistries: string;
  calculatedUsdApprox: string;
  discountFactorText: string;
  annualizedMargin: string;
  fullyAmortizedText: string;
  deleteConfirmText: string;
  deletedToastText: string;
  createdToastText: string;
  scenChangedToastText: string;
  rateChangedToastText: string;
  powerBackupToastOn: string;
  powerBackupToastOff: string;
  memoCopiedToastText: string;
  
  // Tabs & Views
  scenarios: {
    base: string;
    optimistic: string;
    conservative: string;
  };
  rates: {
    parallel: string;
    official: string;
  };
  scales: {
    micro: string;
    sme: string;
    enterprise: string;
  };
  cities: Record<string, string>;
  industries: Record<string, string>;
  
  // Onboarding Form
  onboardingTitle: string;
  onboardingDesc: string;
  stepCountText: string;
  prevBtn: string;
  nextBtn: string;
  submitBtn: string;
  cancelBtn: string;
  projectNameLabel: string;
  projectNamePlaceholder: string;
  industryLabel: string;
  projectScaleLabel: string;
  cityLabel: string;
  geoContextTitle: string;
  spatialLocationTitle: string;
  exemptionBlockTitle: string;
  exemptionBlockDesc: string;
  currencyRegimeTitle: string;
  valuationExchangeLabel: string;
  utilityRiskLabel: string;
  utilityRiskDesc: string;
  discountRateLabel: string;
  discountRateHelper: string;
  projectBriefLabel: string;
  projectBriefPlaceholder: string;
  onboardingSummaryTitle: string;
  onboardingSummaryDesc: string;
  
  // Cities insights
  cityInsights: Record<string, string>;
}

export const translations: Record<'en' | 'ar', TranslationDict> = {
  en: {
    appTitle: "NUMO LIBYAN FEASIBILITY HUB",
    investmentGrade: "INVESTMENT GRADE",
    automatedSlogan: "Automated Financial Modeling & Multi-Model Advisory Auditing",
    sovereignLedger: "2026 Sovereign Ledger Mode",
    newVentureStudy: "New Venture Study",
    activeRegistry: "ACTIVE STUDIES REGISTRY",
    activeCount: "Active",
    compareModels: "Compare models, alter macro parameters, or test scenario limits below",
    dataResolutionTitle: "DATA RESOLUTION STANDARD",
    dataResolutionDesc: "Market size estimators, crop seasonality maps, and power backing weights compile weekly from parallel municipal registries.",
    valueChainSuffix: "Value Chain",
    macroStressScenario: "Macro Stress Scenario",
    exchangeSchemeConversion: "Exchange Scheme Conversion",
    financialModelingEngine: "Financial Modeling Engine",
    aiFeasibilitySuite: "AI Feasibility Report Suite",
    investorPitchDeck: "Investor Pitch Deck",
    advisoryBoardCritique: "Advisory Board Critique",
    consultingExportCenter: "Consulting Export Center",
    copyMemo: "Copy Memo",
    initialCapital: "Initial Capital (CapEx)",
    discountedNpv: "Discounted NPV",
    yieldMetricIrr: "Yield Metric IRR",
    breakEvenPayback: "Break-Even Payback",
    loadingLegislative: "LOADING LEGISLATIVE DATASETS...",
    compilingRegistries: "Compiling municipal investment registries inside active memory container.",
    calculatedUsdApprox: "Calculated USD conversion equivalent:",
    discountFactorText: "At proposed discount weight multiplier",
    annualizedMargin: "Annualized margin compound yield",
    fullyAmortizedText: "Fully amortized payback duration",
    deleteConfirmText: "Are you absolutely sure you want to delete this study model? Ledger trails will be cleared.",
    deletedToastText: "Feasibility project securely deleted from registry.",
    createdToastText: "Venture model successfully created & structured!",
    scenChangedToastText: "Macro Economic Scenario switched to:",
    rateChangedToastText: "Exchange conversion index altered to:",
    powerBackupToastOn: "Heavy diesel-grid backup cost active.",
    powerBackupToastOff: "Main grid line tracking only.",
    memoCopiedToastText: "Audit summary copy secure inside local system clipboard.",
    
    scenarios: {
      base: "Base Case",
      optimistic: "Optimistic",
      conservative: "Conservative"
    },
    rates: {
      parallel: "Parallel Rate",
      official: "Official Rate"
    },
    scales: {
      micro: "Micro-Sized",
      sme: "SME Project",
      enterprise: "Enterprise Scale"
    },
    cities: {
      "Tripoli": "Tripoli",
      "Benghazi": "Benghazi",
      "Misrata": "Misrata",
      "Sabha": "Sabha",
      "Gharyan": "Gharyan",
      "Tobruk": "Tobruk",
      "Kufra": "Kufra",
      "Al-Khoms": "Al-Khoms"
    },
    industries: {
      "Agriculture": "Agriculture & Agritech",
      "Manufacturing": "Manufacturing & Heavy Industry",
      "Technology": "Technology & Digital Services",
      "Solar & Energy": "Solar, Power & Clean Energy",
      "Water Desalination": "Infrastructure & Desalination",
      "Retail & Services": "B2B/B2C Services & Retail",
      "Healthcare": "Healthcare & Specialized Pharma"
    },
    
    onboardingTitle: "INVESTMENT PROPOSAL INTAKE WIZARD",
    onboardingDesc: "Specify baseline operating parameters for localized Libyan economy modeling",
    stepCountText: "Step",
    prevBtn: "Back",
    nextBtn: "Next",
    submitBtn: "Generate Venture",
    cancelBtn: "Cancel",
    projectNameLabel: "Proposed Business or Project Name",
    projectNamePlaceholder: "e.g., Al-Ahli Concrete Block Factory or Misrata Cold Storage",
    industryLabel: "Industry Sector Focus",
    projectScaleLabel: "Project Scale",
    cityLabel: "Target Libyan Municipality",
    geoContextTitle: "Geographical Context Insight",
    spatialLocationTitle: "Spatial Location & Localized Zoning",
    exemptionBlockTitle: "Standard Agricultural & Industrial Exemption",
    exemptionBlockDesc: "Under Libyan Investment codes (Law No. 9), registered private development capital located inside regional zoning boards is granted a 100% exemption on corporate tax liabilities and custom import tariffs. Our models auto-apply these incentives.",
    currencyRegimeTitle: "Currency Regime & Utility Buffering",
    valuationExchangeLabel: "Valuation Exchange Scheme (Parallel Arbitrage)",
    utilityRiskLabel: "Utility Risk Fuel Backing Switch",
    utilityRiskDesc: "Include heavy-duty diesel generator asset lines and permanent fuel buffers to insulate facility from central grid shedding cycles.",
    discountRateLabel: "Proposed Discount Rate / Weighted Cost of Capital (AR)",
    discountRateHelper: "Typically ranges between 10% - 15% to absorb regional micro-volatilities.",
    projectBriefLabel: "Venture Scope & Descriptive Intent",
    projectBriefPlaceholder: "Briefly explain manufacturing limits, target consumers, processing pipelines, or required machinery imports to customize the AI analysis.",
    onboardingSummaryTitle: "Comprehensive Baseline Input Parameters Verified",
    onboardingSummaryDesc: "Verify compliance check matrices before committing to the LLM agent audit. Pushing execute locks sovereign formulas.",
    
    cityInsights: {
      'Tripoli': 'Capital metropolis. Maximum consumer addressability, high density of retail distribution, but intense competition.',
      'Benghazi': 'Major commercial hub. Rapid economic development, substantial infrastructure zoning, with supportive trade chambers.',
      'Misrata': 'Industrial powerhouse. Access to the Free Zone, tax privileges, premier deep seaport, with excellent shipping lanes.',
      'Sabha': 'Fezzan capital. Optimal solar photovoltaic zenith rating, extensive agricultural aquifers, but remote logistical supply routes.',
      'Gharyan': 'Hilly region. Highly strategic agricultural climate, supreme premium organic olive orchards, famous clay minerals.',
      'Tobruk': 'Strategic eastern coast. Access to Tobruk port, close maritime shipping proximity to Egypt, stable water desalination hubs.',
      'Kufra': 'Southeastern desert oasis. Outstanding freshwater fossil aquifers, highly productive wheat and alfalfa circles, remote border trade networks.',
      'Al-Khoms': 'Coastal trade center. Home to Al-Khoms port and cement factory clusters, with immediate maritime security zones.'
    }
  },
  ar: {
    appTitle: "منصة نُمو لدراسات الجدوى الليبية",
    investmentGrade: "تصنيف استثماري معتمد",
    automatedSlogan: "النمذجة المالية الآلية والتدقيق الاستشاري الاستثماري متعدد النماذج",
    sovereignLedger: "نظام السجلات السيادي ٢٠٢٦",
    newVentureStudy: "دراسة مشروع جديد",
    activeRegistry: "سجل المشاريع النشطة",
    activeCount: "نشط",
    compareModels: "قارن بين النماذج، عدّل المؤشرات الكلية أو اختبر حدود السيناريوهات أدناه",
    dataResolutionTitle: "معيار دقة ومصداقية البيانات",
    dataResolutionDesc: "يتم تجميع تقديرات حجم السوق، وخرائط مواسم المحاصيل، وأوزان احتياطي الطاقة أسبوعياً من السجلات المتكاملة للبلديات الليبية.",
    valueChainSuffix: "سلسلة القيمة لـ",
    macroStressScenario: "سيناريو ضغط الاقتصاد الكلي",
    exchangeSchemeConversion: "آلية تحويل سعر الصرف",
    financialModelingEngine: "محرك النمذجة المالية",
    aiFeasibilitySuite: "باقة تقارير الجدوى بالذكاء الاصطناعي",
    investorPitchDeck: "عرض المستثمر التقديمي Slide Deck",
    advisoryBoardCritique: "تقييم اللجنة الاستشارية للمشروع",
    consultingExportCenter: "مركز التصدير الاستشاري",
    copyMemo: "نسخ مذكرة التقرير",
    initialCapital: "رأس المال المبدئي المطلوبة (CapEx)",
    discountedNpv: "صافي القيمة الحالية المخصومة (NPV)",
    yieldMetricIrr: "معدل العائد الداخلي (IRR)",
    breakEvenPayback: "فترة استرداد رأس المال بالسنوات",
    loadingLegislative: "جاري تحميل البيانات التشريعية والبلدية...",
    compilingRegistries: "تجميع سجلات الاستثمار البلدية وتجهيز الحاويات المبرمجة النشطة.",
    calculatedUsdApprox: "القيمة التعادلية المحسوبة بالدولار الأمريكي:",
    discountFactorText: "عند مُعامل مُضاعف الخصم المقترح",
    annualizedMargin: "معدل عائد الهامش السنوي المركب",
    fullyAmortizedText: "فترة الاسترداد المستهلكة بالكامل",
    deleteConfirmText: "هل أنت متأكد تماماً من رغبتك في حذف نموذج دراسة الجدوى هذا؟ سيتم شطب كافّة السجلات التابعة له.",
    deletedToastText: "تم حذف مشروع دراسة الجدوى بأمان من السجل.",
    createdToastText: "تم إنشاء نموذج المشروع وتصنيفه بنجاح!",
    scenChangedToastText: "تم تغيير سيناريو الاقتصاد الكلي بنجاح إلى:",
    rateChangedToastText: "تم تحويل مؤشر سعر الصرف النشط إلى سوق:",
    powerBackupToastOn: "تم تفعيل تكاليف الدعم بمولدات ديزل متكاملة احتياطية.",
    powerBackupToastOff: "تتبع خطوط الشبكة الكهربائية المركزية فقط.",
    memoCopiedToastText: "تم نسخ ملخص التدقيق المالي بأمان إلى الحافظة تلقائياً.",
    
    scenarios: {
      base: "السيناريو الأساسي",
      optimistic: "السيناريو المتفائل",
      conservative: "السيناريو المتحفظ"
    },
    rates: {
      parallel: "السعر الموازي",
      official: "السعر الرسمي"
    },
    scales: {
      micro: "متناهي الصغر",
      sme: "متوسط وصغير (SME)",
      enterprise: "مشاريع كبرى"
    },
    cities: {
      "Tripoli": "طرابلس",
      "Benghazi": "بنغازي",
      "Misrata": "مصراتة",
      "Sabha": "سبها",
      "Gharyan": "غريان",
      "Tobruk": "طبرق",
      "Kufra": "الكفرة",
      "Al-Khoms": "الخمس"
    },
    industries: {
      "Agriculture": "الزراعة والتكنولوجيا الزراعية",
      "Manufacturing": "التصنيع والصناعات الثقيلة",
      "Technology": "الخدمات الرقمية والاتصالات",
      "Solar & Energy": "الطاقة البديلة والنظيفة",
      "Water Desalination": "البنية التحتية وتحلية المياه",
      "Retail & Services": "تجارة التجزئة وخدمات الشركات",
      "Healthcare": "الرعاية الصحية والصناعات الدوائية"
    },
    
    onboardingTitle: "مساعد إدخال وإعداد دراسة الجدوى لشركاء الاستثمار",
    onboardingDesc: "حدد معايير التشغيل الأساسية لنمذجة المشروع بما يتوافق مع طبيعة الاقتصاد الليبي والبلديات المختلفة",
    stepCountText: "الخطوة",
    prevBtn: "السابق",
    nextBtn: "التالي",
    submitBtn: "توليد كشْف الجدوى",
    cancelBtn: "إلغاء",
    projectNameLabel: "اسم الشركة أو المشروع المقترح",
    projectNamePlaceholder: "مثال: مصنع الأهلية للخرسانة الجاهزة بمصراتة أو مخازن التبريد الكبرى",
    industryLabel: "القطاع والنشاط الصناعي",
    projectScaleLabel: "حجم ونطاق المشروع",
    cityLabel: "البلدية المستهدفة لإنشاء المشروع",
    geoContextTitle: "رؤية الميزة الجغرافية والموارد المحلية",
    spatialLocationTitle: "تحديد الموقع الجغرافي ونطاق التصنيف البلدي",
    exemptionBlockTitle: "الاستثناءات والتعويضات الجمركية والاستثمارية القانونية",
    exemptionBlockDesc: "بموجب قانون الاستثمار الليبي (قانون رقم 9)، تمنح المشاريع الأجنبية والوطنية المسجلة داخل النطاق الإقليمي للبلديات إعفاءً بنسبة 100% من الضرائب الجمركية وضريبة أرباح الشركات لتشجيع القطاعات الإنتاجية. يقوم المحرك بتطبيقها.",
    currencyRegimeTitle: "آلية عمل النقد والاستقرار الكهربائي",
    valuationExchangeLabel: "مؤشر سعر الصرف المعتمد للنمذجة (الموازي أو الرسمي)",
    utilityRiskLabel: "مفتاح حماية استقرار المولدات والطاقة الاحتياطية",
    utilityRiskDesc: "أضف أصول مولدات ديزل صناعية متكاملة وميزانية للوقود لتأمين استمرار دورات التصنيع ومنع تعطل الإنتاج بسبب انقطاع التيار الكهربائي العام.",
    discountRateLabel: "سعر الخصم المقترح / المتوسط المرجح لتكلفة رأس المال المالي",
    discountRateHelper: "يتراوح عادةً بين 10% إلى 15% للمشاريع الليبية لامتصاص تقلبات السوق المحلية ومستويات التضخم.",
    projectBriefLabel: "نطاق وهدف فكرة المشروع المقروءة بالكامل",
    projectBriefPlaceholder: "اشرح باختصار طاقات الإنتاج المستهدفة، شرائح المستهلكين، والمعدات المراد تزويد المشروع بها لتخصيص تقرير المستشارين الرقميين والذكاء الاصطناعي.",
    onboardingSummaryTitle: "مراجعة كافّة مدخلات المشروع والتحقق من صحتها",
    onboardingSummaryDesc: "تأكد من توافق معايير امتثال قوانين الاستثمار قبل تمريرها لمستشاري الذكاء الاصطناعي واللجان القطاعية لتوليد المسودات القانونية.",
    
    cityInsights: {
      'Tripoli': 'العاصمة الإدارية الكبرى. أعلى كتلة ومعدل استهلاك بشري، كثافة توزيع تجاري بالتجزئة، ولكن حدة التنافسية مرتفعة للغاية.',
      'Benghazi': 'العاصمة التجارية لشرق البلاد. حركة تطوير تجاري متصاعدة بفضل اللجان الاقتصادية الإقليمية والمناطق الصناعية الجديدة.',
      'Misrata': 'القلب الصناعي لليبيا. تمنح ميزات الاستيراد والتخزين بفضل المنطقة الحرة وميناء مصراتة البحري اللوجستي المتطور.',
      'Sabha': 'أكبر حاضنة بجنوب فزان. ميزات هائلة للطاقة الشمسية مع مساحات واسعة للمشاريع الزراعية ومصادر المياه الجوفية.',
      'Gharyan': 'مرتفعات الجبل الغربي. تمتاز بمناخ زراعي فريد ملائم لزراعات الزيتون واللوز عالي الجودة وصناعة الخزف التراثي الطيني والاستثماري.',
      'Tobruk': 'منطقة الساحل الشرقي الاستراتيجي. واجهة تجارية ونقطة الربط للشراكات اللوجستية المصرية وميناء طبرق البحري العريق.',
      'Kufra': 'واحة الجنوب الشرقي. غنية بأقوى وأعذب منسوب من المياه الجوفية للأحواض النوبية لإنتاج القمح والأعلاف للأسواق المحلية والدولية.',
      'Al-Khoms': 'شريان تصنيعي وساحلي نشط. موطن ميناء الخمس ومجمعات مصانع الإسمنت الحديثة، والخدمات العابرة للمحافظات المجاورة.'
    }
  }
};
