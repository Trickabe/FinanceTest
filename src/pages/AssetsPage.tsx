import { CheckCircle2, Coins, Shuffle, TrendingUp } from 'lucide-react';
import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

import { MetricCard } from '../components/MetricCard';
import { ProgressBar } from '../components/ProgressBar';
import { useDemo } from '../store/AppContext';
import { formatCurrency } from '../utils/finance';

export function AssetsPage() {
  const {
    profile,
    budgets,
    savingsGoals,
    recommendedProducts,
    portfolio,
    simulateIncomeBoost,
    updateBudget,
    updateSavingsGoal,
    updatePortfolioAllocation,
  } = useDemo();

  const portfolioData = portfolio.map((item) => ({ ...item }));

  return (
    <div className="space-y-6 animate-[fadeIn_0.45s_ease-out]">
      <section className="glass-card p-6 sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">资产管理详情</h2>
            <p className="mt-2 max-w-3xl text-base leading-7 text-slate-600">
              预算、储蓄、理财和资产配置在这里统一管理，支持模拟收入变化后自动调整分配。
            </p>
          </div>
          <button
            type="button"
            onClick={simulateIncomeBoost}
            className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:bg-cyan-700"
          >
            <Shuffle className="h-4 w-4" />
            模拟收入上涨 8%
          </button>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-4">
        <MetricCard title="月收入" value={formatCurrency(profile.monthlyIncome)} hint="收入变化会触发预算重算" accent="bg-cyan-50 text-cyan-800" />
        <MetricCard title="当前资产" value={formatCurrency(profile.currentAssets)} hint="仅用于 demo 模拟" accent="bg-emerald-50 text-emerald-700" />
        <MetricCard title="风险偏好" value={profile.riskPreference} hint="稳健型更适合分散配置" accent="bg-amber-50 text-amber-700" />
        <MetricCard title="成长积分" value={`${profile.growthPoints}`} hint={profile.level} accent="bg-slate-100 text-slate-700" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="section-title">预算管理</h3>
              <p className="section-subtitle mt-1">支持直接修改预算值并查看超支进度。</p>
            </div>
            <Coins className="h-5 w-5 text-cyan-500" />
          </div>

          <div className="mt-5 space-y-4">
            {budgets.map((item) => {
              const progress = Math.round((item.spent / item.budget) * 100);
              return (
                <div key={item.category} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="font-medium text-slate-900">{item.category}</div>
                      <div className="text-sm text-slate-500">
                        已用 {formatCurrency(item.spent)} / 预算 {formatCurrency(item.budget)}
                      </div>
                    </div>
                    <input
                      type="number"
                      min={0}
                      value={item.budget}
                      onChange={(event) => updateBudget(item.category, Number(event.target.value))}
                      className="w-36 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-cyan-300"
                    />
                  </div>
                  <div className="mt-4">
                    <ProgressBar value={progress} label="预算使用率" />
                  </div>
                  {progress > 100 ? (
                    <div className="mt-3 rounded-2xl bg-rose-50 p-3 text-sm text-rose-700">
                      已超出预算，建议把 {formatCurrency(item.spent - item.budget)} 的非必要消费转移到下个月。
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="section-title">资产配置</h3>
                <p className="section-subtitle mt-1">拖动比例即可模拟组合调整。</p>
              </div>
              <TrendingUp className="h-5 w-5 text-emerald-500" />
            </div>
            <div className="mt-4 h-72 rounded-[1.75rem] bg-slate-50 p-3">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={portfolioData} dataKey="ratio" nameKey="name" innerRadius={56} outerRadius={95} paddingAngle={4}>
                    {portfolioData.map((entry) => (
                      <Cell key={entry.id} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-5 space-y-4">
              {portfolio.map((item) => (
                <div key={item.id} className="space-y-2">
                  <div className="flex items-center justify-between text-sm font-medium text-slate-700">
                    <span>{item.name}</span>
                    <span>{item.ratio}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={item.ratio}
                    onChange={(event) => updatePortfolioAllocation(item.id, Number(event.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-cyan-600"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="section-title">储蓄规划</h3>
                <p className="section-subtitle mt-1">AI 根据目标自动建议月存金额。</p>
              </div>
              <CheckCircle2 className="h-5 w-5 text-cyan-500" />
            </div>

            <div className="mt-5 space-y-4">
              {savingsGoals.map((goal) => {
                const progress = Math.round((goal.saved / goal.target) * 100);
                return (
                  <div key={goal.id} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="font-medium text-slate-900">{goal.name}</div>
                        <div className="text-sm text-slate-500">目标 {formatCurrency(goal.target)} · 月存建议 {formatCurrency(goal.monthlyPlan)}</div>
                      </div>
                      <div className="text-sm text-slate-500">截止 {goal.deadline}</div>
                    </div>
                    <div className="mt-4">
                      <ProgressBar value={progress} label="达成进度" tone="from-emerald-500 to-cyan-500" />
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <input
                        type="number"
                        min={0}
                        value={goal.saved}
                        onChange={(event) => updateSavingsGoal(goal.id, { saved: Number(event.target.value) })}
                        className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-cyan-300"
                      />
                      <input
                        type="number"
                        min={0}
                        value={goal.monthlyPlan}
                        onChange={(event) => updateSavingsGoal(goal.id, { monthlyPlan: Number(event.target.value) })}
                        className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-cyan-300"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="glass-card p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="section-title">理财建议</h3>
            <p className="section-subtitle mt-1">根据风险偏好推荐模拟理财产品。</p>
          </div>
          <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            共 {recommendedProducts.length} 个产品
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {recommendedProducts.map((product) => (
            <div key={product.id} className="rounded-[1.75rem] border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div className="font-semibold text-slate-900">{product.name}</div>
                <div
                  className={[
                    'rounded-full px-3 py-1 text-xs font-semibold',
                    product.riskLevel === '低'
                      ? 'bg-emerald-50 text-emerald-700'
                      : product.riskLevel === '中'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-rose-50 text-rose-700',
                  ].join(' ')}
                >
                  {product.riskLevel}风险
                </div>
              </div>
              <div className="mt-3 text-sm leading-6 text-slate-500">{product.description}</div>
              <div className="mt-4 grid gap-3 text-sm text-slate-600">
                <div className="rounded-2xl bg-slate-50 p-3">预期收益：{product.expectedYield}</div>
                <div className="rounded-2xl bg-slate-50 p-3">起投金额：{formatCurrency(product.minAmount)}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
