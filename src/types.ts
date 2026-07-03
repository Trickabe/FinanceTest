export type TransactionCategory = '餐饮' | '交通' | '娱乐' | '学习' | '购物' | '房租' | '借贷' | '其他';
export type RiskLevel = '低' | '中' | '高';
export type InvestmentStyle = '保守' | '稳健' | '平衡' | '积极';
export type MessageRole = 'user' | 'assistant';
export type AlertSeverity = 'info' | 'warning' | 'danger';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: TransactionCategory;
  date: string;
  type: 'income' | 'expense';
}

export interface BudgetItem {
  category: TransactionCategory;
  budget: number;
  spent: number;
}

export interface SavingsGoal {
  id: string;
  name: string;
  target: number;
  saved: number;
  monthlyPlan: number;
  deadline: string;
  tag: string;
}

export interface InvestmentProduct {
  id: string;
  name: string;
  expectedYield: string;
  riskLevel: RiskLevel;
  minAmount: number;
  description: string;
}

export interface LearningTopic {
  id: string;
  title: string;
  summary: string;
  progress: number;
  lessons: string[];
}

export interface GrowthEvent {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  points: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: string;
}

export interface AlertItem {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  createdAt: string;
  actionLabel?: string;
}

export interface PortfolioAllocation {
  id: string;
  name: string;
  ratio: number;
  color: string;
}

export interface UserProfile {
  name: string;
  age: number;
  occupation: string;
  monthlyIncome: number;
  currentAssets: number;
  monthlyExpenseTarget: number;
  savingsTarget: number;
  riskPreference: InvestmentStyle;
  creditScore: number;
  growthPoints: number;
  level: string;
}

export interface DemoSnapshot {
  profile: UserProfile;
  transactions: Transaction[];
  budgets: BudgetItem[];
  savingsGoals: SavingsGoal[];
  investmentProducts: InvestmentProduct[];
  learningTopics: LearningTopic[];
  growthEvents: GrowthEvent[];
  achievements: Achievement[];
  chatMessages: ChatMessage[];
  portfolio: PortfolioAllocation[];
}
