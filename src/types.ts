export type ScaleType = 'micro' | 'sme' | 'enterprise';
export type ExchangeRateMode = 'official' | 'parallel';
export type ScenarioMode = 'base' | 'optimistic' | 'conservative';

export interface StartupCostItem {
  id: string;
  item: string;
  costLYD: number;
  category: 'Equipment' | 'Licensing & Legal' | 'Real Estate & Facility' | 'Working Capital' | 'Marketing' | 'Contingency' | 'Generator & Power';
}

export interface OperatingCostItem {
  id: string;
  item: string;
  costLYD: number;
  period: 'monthly' | 'annually';
  category: 'Rent' | 'Salaries' | 'Utilities & Fuel' | 'Maintenance' | 'Raw Materials' | 'Marketing' | 'Insurance';
}

export interface YearProjection {
  year: number;
  revenueLYD: number;
  operatingExpensesLYD: number;
  netProfitLYD: number;
}

export interface FinancialMetrics {
  npv: number; // Net Present Value
  irr: number; // Internal Rate of Return
  roi: number; // Return on Investment
  paybackPeriod: number; // Payback Period in years
  breakEvenLYD: number; // Annual revenue needed to break even
}

export interface FeasibilitySections {
  executiveSummary: string;
  marketResearch: string;
  swotAnalysis: string;
  pestelAnalysis: string;
  porterForces: string;
  riskManagement: string;
  confidenceScoreText?: string;
}

export interface AgentFeedback {
  agentName: string;
  role: 'Financial Auditor' | 'Regulatory Expert' | 'Market Strategist';
  score: number; // 0 to 100
  feedback: string;
}

export interface FeasibilityStudy {
  id: string;
  name: string;
  industry: 'Agriculture' | 'Manufacturing' | 'Technology' | 'Solar & Energy' | 'Water Desalination' | 'Retail & Services' | 'Healthcare';
  city: 'Tripoli' | 'Benghazi' | 'Misrata' | 'Sabha' | 'Gharyan' | 'Tobruk' | 'Kufra' | 'Al-Khoms';
  scale: ScaleType;
  description: string;
  exchangeRateMode: ExchangeRateMode;
  exchangeRate: number; // LYD per USD (e.g. 4.80 official vs 7.20 parallel)
  powerGridBackupRequired: boolean; // Whether custom generator/solar power backup cost is needed (common in Libya)
  
  // Financial parameters
  discountRate: number; // typically 10% - 15% in Libya
  initialInvestmentUSD: number;
  
  startupCosts: StartupCostItem[];
  operatingCosts: OperatingCostItem[];
  revenueForecast: YearProjection[];
  metrics: FinancialMetrics;
  
  // AI Generated textual reports
  sections: FeasibilitySections;
  confidenceScore: number; // 0 - 100
  
  // Critique
  agentReviews?: AgentFeedback[];
  
  // Custom scenario adjustment
  scenario: ScenarioMode;
  
  createdAt: string;
}

export interface ScenarioParams {
  officialRate: number;
  parallelRate: number;
  subsidizedFuelCost: number; // LYD per Liter
  unsubsidizedFuelCost: number; // LYD per Liter for generator backup
}
