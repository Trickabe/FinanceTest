import type {
  Achievement,
  BudgetItem,
  ChatMessage,
  DemoSnapshot,
  GrowthEvent,
  InvestmentProduct,
  LearningTopic,
  PortfolioAllocation,
  SavingsGoal,
  Transaction,
  UserProfile,
} from '../types';

export const DEFAULT_PROFILE: UserProfile = {
  name: '林晨',
  age: 22,
  occupation: '产品经理实习生',
  monthlyIncome: 8200,
  currentAssets: 46800,
  monthlyExpenseTarget: 5200,
  savingsTarget: 120000,
  riskPreference: '稳健',
  creditScore: 760,
  growthPoints: 860,
  level: '成长 Lv.4',
};

export const DEFAULT_TRANSACTIONS: Transaction[] = [
  { id: 'tx-001', title: '实习工资', amount: 8200, category: '其他', date: '2026-06-01', type: 'income' },
  { id: 'tx-002', title: '外卖晚餐', amount: 880, category: '餐饮', date: '2026-06-03', type: 'expense' },
  { id: 'tx-003', title: '地铁通勤', amount: 210, category: '交通', date: '2026-06-05', type: 'expense' },
  { id: 'tx-004', title: '周末聚餐', amount: 720, category: '餐饮', date: '2026-06-08', type: 'expense' },
  { id: 'tx-005', title: '视频会员', amount: 198, category: '娱乐', date: '2026-06-09', type: 'expense' },
  { id: 'tx-006', title: '考证课程', amount: 560, category: '学习', date: '2026-06-12', type: 'expense' },
  { id: 'tx-007', title: '新耳机', amount: 1399, category: '购物', date: '2026-06-15', type: 'expense' },
  { id: 'tx-008', title: '共享充电宝', amount: 36, category: '其他', date: '2026-06-16', type: 'expense' },
  { id: 'tx-009', title: '短期借贷还款', amount: 1200, category: '借贷', date: '2026-06-18', type: 'expense' },
  { id: 'tx-010', title: '书籍与资料', amount: 246, category: '学习', date: '2026-06-20', type: 'expense' },
  { id: 'tx-011', title: '咖啡与轻食', amount: 356, category: '餐饮', date: '2026-06-22', type: 'expense' },
  { id: 'tx-012', title: '公交卡充值', amount: 120, category: '交通', date: '2026-06-24', type: 'expense' },
  { id: 'tx-013', title: '兼职报酬', amount: 680, category: '其他', date: '2026-06-26', type: 'income' },
  { id: 'tx-014', title: '信用卡分期', amount: 980, category: '借贷', date: '2026-06-27', type: 'expense' },
];

export const DEFAULT_BUDGETS: BudgetItem[] = [
  { category: '餐饮', budget: 1800, spent: 2036 },
  { category: '交通', budget: 450, spent: 330 },
  { category: '娱乐', budget: 500, spent: 198 },
  { category: '学习', budget: 900, spent: 806 },
  { category: '购物', budget: 1200, spent: 1399 },
  { category: '借贷', budget: 600, spent: 2180 },
];

export const DEFAULT_SAVINGS_GOALS: SavingsGoal[] = [
  {
    id: 'goal-1',
    name: '旅行基金',
    target: 18000,
    saved: 9800,
    monthlyPlan: 1200,
    deadline: '2026-12-31',
    tag: '短期',
  },
  {
    id: 'goal-2',
    name: '轻薄笔记本',
    target: 9000,
    saved: 4200,
    monthlyPlan: 900,
    deadline: '2026-10-31',
    tag: '提升效率',
  },
];

export const DEFAULT_PRODUCTS: InvestmentProduct[] = [
  {
    id: 'prod-1',
    name: '青年灵活存',
    expectedYield: '2.1% - 2.6%',
    riskLevel: '低',
    minAmount: 100,
    description: '适合保留备用金，流动性强，收益稳定。',
  },
  {
    id: 'prod-2',
    name: '稳健进阶债基',
    expectedYield: '3.5% - 4.8%',
    riskLevel: '中',
    minAmount: 1000,
    description: '适合稳健型用户，用于中期资金增值。',
  },
  {
    id: 'prod-3',
    name: '智选指数定投',
    expectedYield: '5.0% - 8.0%',
    riskLevel: '中',
    minAmount: 200,
    description: '通过定投平滑波动，适合长期目标规划。',
  },
  {
    id: 'prod-4',
    name: '成长混合优选',
    expectedYield: '6.5% - 10.5%',
    riskLevel: '高',
    minAmount: 3000,
    description: '波动更高，适合能承受中高风险的进阶用户。',
  },
  {
    id: 'prod-5',
    name: '财富探索计划',
    expectedYield: '8.0% - 12.5%',
    riskLevel: '高',
    minAmount: 5000,
    description: '面向积极型用户，建议仅配置闲置资金。',
  },
];

export const DEFAULT_TOPICS: LearningTopic[] = [
  {
    id: 'topic-1',
    title: '复利的魔力',
    summary: '理解时间如何放大资金增长，建立长期储蓄习惯。',
    progress: 82,
    lessons: ['复利公式', '时间价值', '定投思维'],
  },
  {
    id: 'topic-2',
    title: '信用卡的正确使用',
    summary: '掌握账单日、还款日和额度管理，避免高息循环。',
    progress: 66,
    lessons: ['免息期', '账单管理', '信用记录'],
  },
  {
    id: 'topic-3',
    title: '预算与现金流',
    summary: '将收入分配到生活、储蓄和成长，不做月光族。',
    progress: 74,
    lessons: ['50/30/20 模型', '消费分层', '自动储蓄'],
  },
  {
    id: 'topic-4',
    title: '基金入门',
    summary: '从风险等级、持有周期和资产配置认识基金投资。',
    progress: 54,
    lessons: ['资产配置', '定投策略', '回撤认知'],
  },
  {
    id: 'topic-5',
    title: '风险识别与保护',
    summary: '识别异常借贷、冲动消费和信息诈骗，保护个人资产。',
    progress: 88,
    lessons: ['异常检测', '反诈意识', '止损机制'],
  },
];

export const DEFAULT_PORTFOLIO: PortfolioAllocation[] = [
  { id: 'pf-1', name: '现金储备', ratio: 35, color: '#22c55e' },
  { id: 'pf-2', name: '债券基金', ratio: 30, color: '#0ea5e9' },
  { id: 'pf-3', name: '指数基金', ratio: 25, color: '#14b8a6' },
  { id: 'pf-4', name: '探索仓位', ratio: 10, color: '#f59e0b' },
];

export const DEFAULT_GROWTH_EVENTS: GrowthEvent[] = [
  { id: 'ev-1', title: '完成储蓄挑战', description: '连续 3 个月按计划存款', createdAt: '2026-04-15', points: 120 },
  { id: 'ev-2', title: '学习打卡', description: '完成信用管理主题学习', createdAt: '2026-05-03', points: 60 },
  { id: 'ev-3', title: '理性消费记录', description: '本月减少冲动购物 2 次', createdAt: '2026-05-20', points: 90 },
];

export const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  { id: 'ach-1', title: '储蓄起步', description: '完成首个储蓄目标 20%', unlocked: true },
  { id: 'ach-2', title: '预算守护者', description: '连续 2 周未超支', unlocked: false },
  { id: 'ach-3', title: '知识积累者', description: '完成 3 个学习主题', unlocked: true },
  { id: 'ach-4', title: '理性消费先锋', description: '识别并规避异常支出', unlocked: true },
  { id: 'ach-5', title: '成长加速器', description: '信用成长积分达到 1000', unlocked: false },
];

export const DEFAULT_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    role: 'assistant',
    content: '你好，我是青财智管。你可以直接问我如何开始投资、如何控制预算，或者让我帮你分析本月消费。',
    createdAt: '2026-07-01 09:00',
  },
  {
    id: 'msg-2',
    role: 'assistant',
    content: '当前系统已检测到餐饮与借贷支出偏高，我会优先给你节流建议和风险提醒。',
    createdAt: '2026-07-01 09:01',
  },
];

export const DEFAULT_SNAPSHOT: DemoSnapshot = {
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
};
