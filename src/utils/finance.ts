import type {
  AlertItem,
  BudgetItem,
  ChatMessage,
  DemoSnapshot,
  InvestmentProduct,
  LearningTopic,
  PortfolioAllocation,
  RiskOverview,
  SavingsGoal,
  Transaction,
  UserProfile,
} from '../types';

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    maximumFractionDigits: 0,
  }).format(value);
}

export function sumByType(transactions: Transaction[]) {
  return transactions.reduce(
    (acc, item) => {
      if (item.type === 'income') {
        acc.income += item.amount;
      } else {
        acc.expense += item.amount;
      }
      return acc;
    },
    { income: 0, expense: 0 },
  );
}

export function getCategoryTotals(transactions: Transaction[]) {
  const totals = new Map<string, number>();
  transactions
    .filter((item) => item.type === 'expense')
    .forEach((item) => {
      totals.set(item.category, (totals.get(item.category) ?? 0) + item.amount);
    });

  return Array.from(totals.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((left, right) => right.value - left.value);
}

export function calculateSavingsProgress(goals: SavingsGoal[]) {
  const totalTarget = goals.reduce((sum, goal) => sum + goal.target, 0);
  const totalSaved = goals.reduce((sum, goal) => sum + goal.saved, 0);
  return totalTarget === 0 ? 0 : Math.round((totalSaved / totalTarget) * 100);
}

export function generateAiSuggestions(snapshot: DemoSnapshot): string[] {
  const summary = sumByType(snapshot.transactions);
  const diningBudget = snapshot.budgets.find((item) => item.category === '餐饮');
  const borrowBudget = snapshot.budgets.find((item) => item.category === '借贷');
  const learningTopic = snapshot.learningTopics.find((topic) => topic.progress < 70);

  const suggestions: string[] = [];

  if (diningBudget && diningBudget.spent > diningBudget.budget) {
    suggestions.push(
      `检测到您本月餐饮消费超支 ${Math.round(((diningBudget.spent - diningBudget.budget) / diningBudget.budget) * 100)}%，建议下周将外出就餐控制在 3 次以内，并优先使用自带午餐。`,
    );
  }

  if (borrowBudget && borrowBudget.spent > borrowBudget.budget * 2) {
    suggestions.push('借贷类支出明显偏高，建议优先清偿高息分期，并避免继续叠加新的短期借款。');
  }

  if (summary.income - summary.expense < snapshot.profile.monthlyIncome * 0.18) {
    suggestions.push('当前月结余偏低，建议将固定储蓄比例提升到收入的 20% 左右。');
  }

  if (learningTopic) {
    suggestions.push(`你还可以继续学习「${learningTopic.title}」，完成后将获得成长积分加成。`);
  }

  if (snapshot.savingsGoals.some((goal) => goal.saved / goal.target < 0.6)) {
    suggestions.push('储蓄目标进度可进一步提速，建议设置工资到账后自动转入储蓄账户。');
  }

  return suggestions.slice(0, 5);
}

export function detectRiskAlerts(snapshot: DemoSnapshot): AlertItem[] {
  const alerts: AlertItem[] = [];
  const diningBudget = snapshot.budgets.find((item) => item.category === '餐饮');
  const borrowTransactions = snapshot.transactions.filter((item) => item.category === '借贷');
  const savingsProgress = calculateSavingsProgress(snapshot.savingsGoals);

  if (diningBudget && diningBudget.spent > diningBudget.budget) {
    alerts.push({
      id: 'alert-dining',
      title: '餐饮消费超支',
      description: '本月餐饮开支已超过预算，建议减少外卖频率并重新拆分周预算。',
      severity: 'warning',
      createdAt: '刚刚',
      actionLabel: '查看餐饮预算',
    });
  }

  if (borrowTransactions.length >= 2) {
    alerts.push({
      id: 'alert-borrow',
      title: '高频借贷行为',
      description: '系统检测到近期存在多笔借贷或分期支出，这通常意味着现金流压力上升。',
      severity: 'danger',
      createdAt: '今日',
      actionLabel: '优化负债',
    });
  }

  if (savingsProgress < 35) {
    alerts.push({
      id: 'alert-saving',
      title: '储蓄进度偏慢',
      description: '当前储蓄达成率低于建议阈值，建议将非必要消费预算转移到储蓄目标。',
      severity: 'info',
      createdAt: '今日',
      actionLabel: '加速储蓄',
    });
  }

  return alerts;
}

export function recommendProducts(profile: UserProfile, products: InvestmentProduct[]) {
  const orderMap: Record<UserProfile['riskPreference'], string[]> = {
    保守: ['低', '中', '高'],
    稳健: ['低', '中', '高'],
    平衡: ['中', '低', '高'],
    积极: ['高', '中', '低'],
  };

  const order = orderMap[profile.riskPreference];
  return [...products].sort((left, right) => {
    const leftIndex = order.indexOf(left.riskLevel);
    const rightIndex = order.indexOf(right.riskLevel);
    return leftIndex - rightIndex;
  });
}

export function calculateRiskOverview(snapshot: DemoSnapshot): RiskOverview {
  const summary = sumByType(snapshot.transactions);
  const expenseRatio = summary.income === 0 ? 0 : (summary.expense / summary.income) * 100;
  const debtSpent = snapshot.transactions
    .filter((item) => item.type === 'expense' && item.category === '借贷')
    .reduce((sum, item) => sum + item.amount, 0);
  const debtExpenseRatio = summary.expense === 0 ? 0 : Math.round((debtSpent / summary.expense) * 100);
  const creditUtilization = Math.max(15, Math.min(95, Math.round((debtSpent / Math.max(snapshot.profile.monthlyIncome, 1)) * 100 + 18)));
  const savingsProgress = calculateSavingsProgress(snapshot.savingsGoals);

  const cashFlowPressure = Math.max(
    5,
    Math.min(
      100,
      Math.round(expenseRatio * 0.55 + debtExpenseRatio * 0.25 + Math.max(0, 55 - savingsProgress) * 0.4),
    ),
  );

  const riskScore = Math.max(0, Math.min(100, Math.round(100 - (cashFlowPressure * 0.6 + creditUtilization * 0.4))));

  const signals: string[] = [];
  if (expenseRatio > 78) {
    signals.push('本月支出占收入比例偏高，建议把可选消费控制在预算线以内。');
  }
  if (debtExpenseRatio > 24) {
    signals.push('借贷支出占比偏高，建议优先偿还高息账单并避免新增分期。');
  }
  if (savingsProgress < 45) {
    signals.push('储蓄进度偏慢，可考虑工资到账后自动转入目标账户。');
  }
  if (signals.length === 0) {
    signals.push('整体风险可控，建议保持预算纪律并持续学习金融知识。');
  }

  return {
    riskScore,
    cashFlowPressure,
    creditUtilization,
    debtExpenseRatio,
    signals,
  };
}

export function buildAdvisorReply(question: string, snapshot: DemoSnapshot) {
  const lower = question.toLowerCase();
  const summary = sumByType(snapshot.transactions);
  const savingRate = summary.income === 0 ? 0 : Math.round(((summary.income - summary.expense) / summary.income) * 100);
  const diningBudget = snapshot.budgets.find((item) => item.category === '餐饮');
  const borrowBudget = snapshot.budgets.find((item) => item.category === '借贷');

  if (lower.includes('投资') || lower.includes('理财') || lower.includes('开始')) {
    return `如果你想开始投资，我建议先预留 3-6 个月生活备用金，再从低风险产品入手。按你当前的风险偏好「${snapshot.profile.riskPreference}」，更适合先配置灵活存和债券类产品，再用少量资金做定投。`;
  }

  if (lower.includes('预算') || lower.includes('超支') || lower.includes('餐饮')) {
    const diningMessage = diningBudget
      ? `你本月餐饮预算为 ${formatCurrency(diningBudget.budget)}，当前已用 ${formatCurrency(diningBudget.spent)}。`
      : '我已经看到你的餐饮支出较高。';
    return `${diningMessage}建议使用“周预算”而不是“月预算”，这样更容易在中途纠偏。可以先把外卖控制在工作日 2-3 次，把聚餐集中到周末。`;
  }

  if (lower.includes('借贷') || lower.includes('分期') || lower.includes('信用卡')) {
    const borrowMessage = borrowBudget
      ? `你当前借贷类支出已累计 ${formatCurrency(borrowBudget.spent)}，预算只有 ${formatCurrency(borrowBudget.budget)}。`
      : '你近期存在借贷相关支出。';
    return `${borrowMessage}最优先的动作是停止新增分期，把高息负债排在储蓄前面。信用卡建议只用于获得免息期，不要把它当作额外收入。`;
  }

  if (lower.includes('储蓄') || lower.includes('存钱') || lower.includes('目标')) {
    return `你当前月结余大约占收入的 ${savingRate}%，很适合采用“先储蓄后消费”的自动转入方式。可以把工资到账日后 24 小时内的转账设置为固定动作，先完成 ${formatCurrency(snapshot.profile.monthlyIncome * 0.2)} 左右的储蓄。`;
  }

  return `我根据你的消费数据给出一个行动建议：先把高频、低价值支出减半，再把节省出来的金额自动转入储蓄目标。若你愿意，我可以继续帮你拆解到周预算和日预算。`;
}

export function normalizeProgress(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function adjustBudgetsByIncome(budgets: BudgetItem[], previousIncome: number, currentIncome: number) {
  if (previousIncome <= 0) {
    return budgets;
  }

  const ratio = currentIncome / previousIncome;
  return budgets.map((item) => ({
    ...item,
    budget: Math.round(item.budget * ratio),
  }));
}

export function createAssistantMessage(content: string): ChatMessage {
  return {
    id: `msg-${Date.now()}`,
    role: 'assistant',
    content,
    createdAt: new Date().toLocaleString('zh-CN', { hour12: false }),
  };
}
