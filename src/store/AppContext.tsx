import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import {
  DEFAULT_ACHIEVEMENTS,
  DEFAULT_BUDGETS,
  DEFAULT_CHAT_MESSAGES,
  DEFAULT_GROWTH_EVENTS,
  DEFAULT_PORTFOLIO,
  DEFAULT_PRODUCTS,
  DEFAULT_PROFILE,
  DEFAULT_SCENARIO_TASKS,
  DEFAULT_SAVINGS_GOALS,
  DEFAULT_TOPICS,
  DEFAULT_TRANSACTIONS,
} from '../data/mock';
import type {
  Achievement,
  AlertItem,
  BudgetItem,
  ChatMessage,
  GrowthEvent,
  InvestmentProduct,
  LearningTopic,
  PortfolioAllocation,
  RiskOverview,
  ScenarioTask,
  SavingsGoal,
  Transaction,
  UserProfile,
} from '../types';
import {
  adjustBudgetsByIncome,
  buildAdvisorReply,
  calculateRiskOverview,
  calculateSavingsProgress,
  createAssistantMessage,
  detectRiskAlerts,
  generateAiSuggestions,
  recommendProducts,
  sumByType,
} from '../utils/finance';
import { DEMO_MODE_KEY, STORAGE_KEY, readStorage, writeStorage } from '../utils/storage';

interface DemoState {
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
  scenarioTasks: ScenarioTask[];
  dismissedAlertIds: string[];
  demoMode: boolean;
}

interface DemoContextValue extends DemoState {
  monthlySummary: ReturnType<typeof sumByType>;
  savingsProgress: number;
  aiSuggestions: string[];
  riskAlerts: AlertItem[];
  recommendedProducts: InvestmentProduct[];
  riskOverview: RiskOverview;
  monthlyTrend: Array<{ label: string; spend: number; save: number }>;
  enterDemo: () => void;
  dismissAlert: (alertId: string) => void;
  addChatMessage: (question: string) => void;
  updateBudget: (category: BudgetItem['category'], budget: number) => void;
  updateSavingsGoal: (goalId: string, changes: Partial<SavingsGoal>) => void;
  updateTopicProgress: (topicId: string, progress: number) => void;
  updatePortfolioAllocation: (allocationId: string, ratio: number) => void;
  startScenarioTask: (taskId: string) => void;
  completeScenarioTask: (taskId: string) => void;
  simulateIncomeBoost: () => void;
  unlockAchievement: (achievementId: string) => void;
  addGrowthEvent: (title: string, description: string, points: number) => void;
  resetDemo: () => void;
}

const DemoContext = createContext<DemoContextValue | null>(null);

function getInitialState(): DemoState {
  const stored = readStorage<DemoState | null>(STORAGE_KEY, null);
  if (stored) {
    return {
      ...stored,
      scenarioTasks: stored.scenarioTasks ?? DEFAULT_SCENARIO_TASKS,
      dismissedAlertIds: stored.dismissedAlertIds ?? [],
      demoMode: stored.demoMode ?? false,
    };
  }

  const demoMode = readStorage<boolean>(DEMO_MODE_KEY, false);
  return {
    profile: DEFAULT_PROFILE,
    transactions: DEFAULT_TRANSACTIONS,
    budgets: DEFAULT_BUDGETS,
    savingsGoals: DEFAULT_SAVINGS_GOALS,
    investmentProducts: DEFAULT_PRODUCTS,
    learningTopics: DEFAULT_TOPICS,
    growthEvents: DEFAULT_GROWTH_EVENTS,
    achievements: DEFAULT_ACHIEVEMENTS,
    chatMessages: DEFAULT_CHAT_MESSAGES,
    portfolio: DEFAULT_PORTFOLIO,
    scenarioTasks: DEFAULT_SCENARIO_TASKS,
    dismissedAlertIds: [],
    demoMode,
  };
}

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoState>(getInitialState);

  useEffect(() => {
    writeStorage(STORAGE_KEY, state);
    writeStorage(DEMO_MODE_KEY, state.demoMode);
  }, [state]);

  const monthlySummary = useMemo(() => sumByType(state.transactions), [state.transactions]);
  const savingsProgress = useMemo(() => calculateSavingsProgress(state.savingsGoals), [state.savingsGoals]);
  const aiSuggestions = useMemo(() => generateAiSuggestions({ ...state }), [state]);
  const riskAlerts = useMemo(
    () => detectRiskAlerts({ ...state }).filter((item) => !state.dismissedAlertIds.includes(item.id)),
    [state],
  );
  const recommendedProducts = useMemo(() => recommendProducts(state.profile, state.investmentProducts), [state.profile, state.investmentProducts]);
  const riskOverview = useMemo(() => calculateRiskOverview({ ...state }), [state]);

  const monthlyTrend = useMemo(
    () => [
      { label: '一月', spend: 4300, save: 2100 },
      { label: '二月', spend: 4680, save: 2260 },
      { label: '三月', spend: 4920, save: 2480 },
      { label: '四月', spend: 4520, save: 2780 },
      { label: '五月', spend: 5210, save: 3020 },
      { label: '六月', spend: 4870, save: 3360 },
    ],
    [],
  );

  const updateBudget = (category: BudgetItem['category'], budget: number) => {
    setState((current) => ({
      ...current,
      budgets: current.budgets.map((item) => (item.category === category ? { ...item, budget } : item)),
    }));
  };

  const updateSavingsGoal = (goalId: string, changes: Partial<SavingsGoal>) => {
    setState((current) => ({
      ...current,
      savingsGoals: current.savingsGoals.map((goal) => (goal.id === goalId ? { ...goal, ...changes } : goal)),
    }));
  };

  const updateTopicProgress = (topicId: string, progress: number) => {
    setState((current) => ({
      ...current,
      learningTopics: current.learningTopics.map((topic) =>
        topic.id === topicId ? { ...topic, progress: Math.max(0, Math.min(100, progress)) } : topic,
      ),
    }));
  };

  const updatePortfolioAllocation = (allocationId: string, ratio: number) => {
    setState((current) => ({
      ...current,
      portfolio: current.portfolio.map((allocation) =>
        allocation.id === allocationId ? { ...allocation, ratio: Math.max(0, Math.min(100, ratio)) } : allocation,
      ),
    }));
  };

  const startScenarioTask = (taskId: string) => {
    setState((current) => ({
      ...current,
      scenarioTasks: current.scenarioTasks.map((task) =>
        task.id === taskId && task.status === 'todo' ? { ...task, status: 'in_progress' } : task,
      ),
    }));
  };

  const completeScenarioTask = (taskId: string) => {
    setState((current) => {
      const target = current.scenarioTasks.find((task) => task.id === taskId);
      if (!target || target.status === 'done') {
        return current;
      }

      return {
        ...current,
        scenarioTasks: current.scenarioTasks.map((task) =>
          task.id === taskId ? { ...task, status: 'done' } : task,
        ),
        growthEvents: [
          {
            id: `ev-${Date.now()}`,
            title: `完成情景任务：${target.title}`,
            description: target.goal,
            createdAt: new Date().toLocaleDateString('zh-CN'),
            points: target.rewardPoints,
          },
          ...current.growthEvents,
        ],
        profile: {
          ...current.profile,
          growthPoints: current.profile.growthPoints + target.rewardPoints,
        },
      };
    });
  };

  const dismissAlert = (alertId: string) => {
    setState((current) => ({
      ...current,
      dismissedAlertIds: Array.from(new Set([...current.dismissedAlertIds, alertId])),
    }));
  };

  const enterDemo = () => {
    setState((current) => ({ ...current, demoMode: true }));
  };

  const addChatMessage = (question: string) => {
    const trimmed = question.trim();
    if (!trimmed) {
      return;
    }

    setState((current) => {
      const userMessage: ChatMessage = {
        id: `msg-${Date.now()}-user`,
        role: 'user',
        content: trimmed,
        createdAt: new Date().toLocaleString('zh-CN', { hour12: false }),
      };
      const assistantMessage = createAssistantMessage(buildAdvisorReply(trimmed, current));

      return {
        ...current,
        chatMessages: [...current.chatMessages, userMessage, assistantMessage],
        profile: {
          ...current.profile,
          growthPoints: current.profile.growthPoints + 12,
        },
      };
    });
  };

  const simulateIncomeBoost = () => {
    setState((current) => {
      const previousIncome = current.profile.monthlyIncome;
      const nextIncome = Math.round(previousIncome * 1.08);
      const adjustedBudgets = adjustBudgetsByIncome(current.budgets, previousIncome, nextIncome);

      return {
        ...current,
        profile: {
          ...current.profile,
          monthlyIncome: nextIncome,
          monthlyExpenseTarget: Math.round(current.profile.monthlyExpenseTarget * 1.04),
          growthPoints: current.profile.growthPoints + 25,
          level: nextIncome > 9000 ? '成长 Lv.5' : current.profile.level,
        },
        budgets: adjustedBudgets,
        growthEvents: [
          {
            id: `ev-${Date.now()}`,
            title: '收入增长模拟',
            description: `系统模拟收入提升至 ${nextIncome} 元，并自动重算预算分配。`,
            createdAt: new Date().toLocaleDateString('zh-CN'),
            points: 25,
          },
          ...current.growthEvents,
        ],
      };
    });
  };

  const unlockAchievement = (achievementId: string) => {
    setState((current) => ({
      ...current,
      achievements: current.achievements.map((achievement) =>
        achievement.id === achievementId ? { ...achievement, unlocked: true } : achievement,
      ),
      profile: {
        ...current.profile,
        growthPoints: current.profile.growthPoints + 30,
      },
    }));
  };

  const addGrowthEvent = (title: string, description: string, points: number) => {
    setState((current) => ({
      ...current,
      growthEvents: [
        {
          id: `ev-${Date.now()}`,
          title,
          description,
          createdAt: new Date().toLocaleDateString('zh-CN'),
          points,
        },
        ...current.growthEvents,
      ],
      profile: {
        ...current.profile,
        growthPoints: current.profile.growthPoints + points,
      },
    }));
  };

  const resetDemo = () => {
    setState({
      profile: DEFAULT_PROFILE,
      transactions: DEFAULT_TRANSACTIONS,
      budgets: DEFAULT_BUDGETS,
      savingsGoals: DEFAULT_SAVINGS_GOALS,
      investmentProducts: DEFAULT_PRODUCTS,
      learningTopics: DEFAULT_TOPICS,
      growthEvents: DEFAULT_GROWTH_EVENTS,
      achievements: DEFAULT_ACHIEVEMENTS,
      chatMessages: DEFAULT_CHAT_MESSAGES,
      portfolio: DEFAULT_PORTFOLIO,
      scenarioTasks: DEFAULT_SCENARIO_TASKS,
      dismissedAlertIds: [],
      demoMode: true,
    });
  };

  const value: DemoContextValue = {
    ...state,
    monthlySummary,
    savingsProgress,
    aiSuggestions,
    riskAlerts,
    recommendedProducts,
    riskOverview,
    monthlyTrend,
    enterDemo,
    dismissAlert,
    addChatMessage,
    updateBudget,
    updateSavingsGoal,
    updateTopicProgress,
    updatePortfolioAllocation,
    startScenarioTask,
    completeScenarioTask,
    simulateIncomeBoost,
    unlockAchievement,
    addGrowthEvent,
    resetDemo,
  };

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within DemoProvider');
  }
  return context;
}
