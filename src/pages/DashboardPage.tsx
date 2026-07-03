import { ArrowUpRight, BadgeCheck, BellRing, BrainCircuit, TrendingUp } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { MetricCard } from '../components/MetricCard';
import { ProgressBar } from '../components/ProgressBar';
import { useDemo } from '../store/AppContext';
import { calculateSavingsProgress, formatCurrency, getCategoryTotals } from '../utils/finance';

export function DashboardPage() {
  const {
    profile,
    monthlySummary,
    savingsGoals,
    monthlyTrend,
    transactions,
    learningTopics,
    aiSuggestions,
    riskAlerts,
    savingsProgress,
  } = useDemo();

  const categoryData = getCategoryTotals(transactions);
  const totalAssets = profile.currentAssets + monthlySummary.income - monthlySummary.expense;
  const spendingRate = Math.round((monthlySummary.expense / profile.monthlyIncome) * 100);
  const remainingIncome = monthlySummary.income - monthlySummary.expense;

  return (
    <div className="space-y-6 animate-[fadeIn_0.45s_ease-out]">
      <section className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="glass-card overflow-hidden p-6 sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-800">
            <BrainCircuit className="h-3.5 w-3.5" />
            AI 财富总览
          </div>
          <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                你好，{profile.name}，你的财富成长正在进入加速期。
              </h2>
              <p className="text-base leading-7 text-slate-600">
                当前月收入 {formatCurrency(profile.monthlyIncome)}，系统已根据你的消费行为自动生成预算调整、储蓄建议和风险提示。
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="chip bg-cyan-50 text-cyan-800">风险偏好：{profile.riskPreference}</div>
                <div className="chip bg-emerald-50 text-emerald-700">成长积分：{profile.growthPoints}</div>
                <div className="chip bg-slate-100 text-slate-600">信用分：{profile.creditScore}</div>
              </div>
            </div>

            <div className="rounded-[2rem] bg-slate-950 p-5 text-white shadow-2xl shadow-cyan-950/15 lg:w-72">
              <div className="text-sm text-slate-400">总资产</div>
              <div className="mt-2 text-4xl font-semibold">{formatCurrency(totalAssets)}</div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-200">
                <div className="rounded-2xl bg-white/5 p-3">
                  月结余
                  <div className="mt-1 text-lg font-semibold text-emerald-300">{formatCurrency(remainingIncome)}</div>
                </div>
                <div className="rounded-2xl bg-white/5 p-3">
                  月支出
                  <div className="mt-1 text-lg font-semibold text-amber-300">{formatCurrency(monthlySummary.expense)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <MetricCard
            title="总资产"
            value={formatCurrency(totalAssets)}
            hint="资产由现金、收入与模拟持仓综合得出"
            accent="bg-cyan-50 text-cyan-800"
          />
          <MetricCard
            title="储蓄进度"
            value={`${savingsProgress}%`}
            hint="目标储蓄进度"
            accent="bg-emerald-50 text-emerald-700"
          />
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <MetricCard
          title="月收入"
          value={formatCurrency(monthlySummary.income)}
          hint="最近一个月收入合计"
          accent="bg-cyan-50 text-cyan-800"
        />
        <MetricCard
          title="月支出"
          value={formatCurrency(monthlySummary.expense)}
          hint={`消费率 ${spendingRate}%`}
          accent="bg-amber-50 text-amber-700"
        />
        <MetricCard
          title="月结余"
          value={formatCurrency(monthlySummary.income - monthlySummary.expense)}
          hint="可用于储蓄和投资"
          accent="bg-emerald-50 text-emerald-700"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="section-title">最近消费分析</h3>
              <p className="section-subtitle mt-1">按分类展示本月支出分布与趋势。</p>
            </div>
            <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              共 {categoryData.length} 类消费
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="h-80 rounded-[1.75rem] bg-slate-50/80 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={96} paddingAngle={4}>
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={['#0ea5e9', '#14b8a6', '#22c55e', '#f59e0b', '#6366f1', '#ef4444'][index % 6]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="h-80 rounded-[1.75rem] bg-slate-50/80 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend />
                  <Bar dataKey="spend" fill="#0ea5e9" radius={[10, 10, 0, 0]} name="消费" />
                  <Bar dataKey="save" fill="#22c55e" radius={[10, 10, 0, 0]} name="储蓄" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="section-title">智能提醒卡片</h3>
                <p className="section-subtitle mt-1">AI 会根据消费和储蓄状态动态给出建议。</p>
              </div>
              <BellRing className="h-5 w-5 text-amber-500" />
            </div>

            <div className="mt-5 space-y-3">
              {aiSuggestions.map((item) => (
                <div key={item} className="rounded-2xl border border-cyan-100 bg-cyan-50/70 p-4 text-sm leading-6 text-cyan-950">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="section-title">风险提示</h3>
                <p className="section-subtitle mt-1">系统检测到的异常模式。</p>
              </div>
              <BadgeCheck className="h-5 w-5 text-emerald-500" />
            </div>
            <div className="mt-5 space-y-3">
              {riskAlerts.length > 0 ? (
                riskAlerts.slice(0, 2).map((alert) => (
                  <div key={alert.id} className="rounded-2xl border border-rose-100 bg-rose-50/70 p-4">
                    <div className="font-medium text-rose-800">{alert.title}</div>
                    <div className="mt-1 text-sm leading-6 text-rose-700">{alert.description}</div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 text-sm text-emerald-700">
                  当前未发现明显风险，保持现有消费习惯即可。
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="section-title">储蓄目标</h3>
              <p className="section-subtitle mt-1">跟踪旅行、购机等目标的积累情况。</p>
            </div>
            <TrendingUp className="h-5 w-5 text-cyan-500" />
          </div>
          <div className="mt-5 space-y-5">
            {savingsGoals.map((goal) => {
              const progress = Math.round((goal.saved / goal.target) * 100);
              return (
                <div key={goal.id} className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-medium text-slate-900">{goal.name}</div>
                      <div className="text-sm text-slate-500">{goal.tag} · 截止 {goal.deadline}</div>
                    </div>
                    <div className="text-sm font-semibold text-slate-900">{progress}%</div>
                  </div>
                  <div className="mt-4">
                    <ProgressBar value={progress} label="储蓄进度" />
                  </div>
                  <div className="mt-3 text-sm text-slate-500">
                    已存 {formatCurrency(goal.saved)} / 目标 {formatCurrency(goal.target)}，建议月存 {formatCurrency(goal.monthlyPlan)}。
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="section-title">学习进度</h3>
              <p className="section-subtitle mt-1">金融知识学习中心完成情况。</p>
            </div>
            <ArrowUpRight className="h-5 w-5 text-emerald-500" />
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {learningTopics.map((topic) => (
              <div key={topic.id} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                <div className="font-medium text-slate-900">{topic.title}</div>
                <div className="mt-1 text-sm leading-6 text-slate-500">{topic.summary}</div>
                <div className="mt-4">
                  <ProgressBar value={topic.progress} label="掌握度" tone="from-emerald-500 to-cyan-500" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl bg-gradient-to-r from-slate-950 to-cyan-900 p-5 text-white">
            <div className="text-sm text-cyan-100">AI 结论</div>
            <div className="mt-2 text-lg font-semibold">当前最值得补强的主题是基金入门与预算分层。</div>
            <div className="mt-2 text-sm leading-6 text-cyan-50/90">
              先把可支配现金结构稳定住，再逐步提高投资比例，会更适合青年阶段的财富起步方式。
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
