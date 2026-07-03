import { Award, BadgeCheck, ChartNoAxesCombined, CreditCard } from 'lucide-react';

import { MetricCard } from '../components/MetricCard';
import { ProgressBar } from '../components/ProgressBar';
import { useDemo } from '../store/AppContext';

export function GrowthPage() {
  const { profile, achievements, growthEvents, learningTopics, savingsProgress, simulateIncomeBoost, resetDemo } = useDemo();

  const unlockedCount = achievements.filter((item) => item.unlocked).length;
  const averageLearning = Math.round(learningTopics.reduce((sum, topic) => sum + topic.progress, 0) / learningTopics.length);
  const nextLevelTarget = 1000;
  const nextLevelProgress = Math.round((profile.growthPoints / nextLevelTarget) * 100);

  return (
    <div className="space-y-6 animate-[fadeIn_0.45s_ease-out]">
      <section className="glass-card p-6 sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">青年成长账户</h2>
            <p className="mt-2 max-w-3xl text-base leading-7 text-slate-600">
              通过信用成长积分、成就系统和行为记录，把理性消费、储蓄和学习转化为可见的成长资产。
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={simulateIncomeBoost}
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700"
            >
              模拟收入增长
            </button>
            <button
              type="button"
              onClick={resetDemo}
              className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-cyan-200 hover:text-cyan-700"
            >
              重置演示数据
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-4">
        <MetricCard title="成长积分" value={`${profile.growthPoints}`} hint={profile.level} accent="bg-cyan-50 text-cyan-800" />
        <MetricCard title="已解锁成就" value={`${unlockedCount}`} hint="来自学习与消费行为" accent="bg-emerald-50 text-emerald-700" />
        <MetricCard title="学习均分" value={`${averageLearning}%`} hint="主题平均掌握度" accent="bg-amber-50 text-amber-700" />
        <MetricCard title="储蓄达成率" value={`${savingsProgress}%`} hint="目标储蓄完成情况" accent="bg-slate-100 text-slate-700" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="glass-card p-6">
          <div className="flex items-center gap-3">
            <ChartNoAxesCombined className="h-5 w-5 text-cyan-500" />
            <div>
              <h3 className="section-title">成长进度</h3>
              <p className="section-subtitle mt-1">距离下一等级还差一些积分。</p>
            </div>
          </div>

          <div className="mt-5 rounded-[1.75rem] bg-slate-950 p-5 text-white">
            <div className="text-sm text-slate-400">当前等级</div>
            <div className="mt-2 text-3xl font-semibold">{profile.level}</div>
            <div className="mt-3 text-sm text-slate-300">信用成长积分：{profile.growthPoints} / {nextLevelTarget}</div>
            <div className="mt-4">
              <ProgressBar value={nextLevelProgress} label="升级进度" tone="from-cyan-500 to-emerald-500" />
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {[
              ['理性消费', '按预算消费、减少冲动购物', 82],
              ['储蓄习惯', '按月自动转入储蓄目标', 67],
              ['学习习惯', '完成金融知识路径', averageLearning],
              ['信用习惯', '按时还款、控制借贷', 74],
            ].map(([title, description, value]) => (
              <div key={title as string} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-medium text-slate-900">{title as string}</div>
                    <div className="text-sm text-slate-500">{description as string}</div>
                  </div>
                  <div className="text-sm font-semibold text-slate-700">{value as number}%</div>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500" style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6">
            <div className="flex items-center gap-3">
              <Award className="h-5 w-5 text-amber-500" />
              <div>
                <h3 className="section-title">成就系统</h3>
                <p className="section-subtitle mt-1">完成特定目标即可解锁成就。</p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={[
                    'rounded-[1.6rem] border p-4 shadow-sm',
                    achievement.unlocked ? 'border-emerald-100 bg-emerald-50/70' : 'border-slate-100 bg-white',
                  ].join(' ')}
                >
                  <div className="flex items-center gap-3">
                    <div className={['flex h-10 w-10 items-center justify-center rounded-2xl', achievement.unlocked ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'].join(' ')}>
                      <BadgeCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">{achievement.title}</div>
                      <div className="text-sm text-slate-500">{achievement.description}</div>
                    </div>
                  </div>
                  <div className="mt-4 text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
                    {achievement.unlocked ? '已解锁' : '待完成'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-cyan-500" />
              <div>
                <h3 className="section-title">成长记录</h3>
                <p className="section-subtitle mt-1">记录储蓄、学习和理性消费行为。</p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {growthEvents.map((event) => (
                <div key={event.id} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-medium text-slate-900">{event.title}</div>
                    <div className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">+{event.points} 分</div>
                  </div>
                  <div className="mt-1 text-sm leading-6 text-slate-500">{event.description}</div>
                  <div className="mt-2 text-xs text-slate-400">{event.createdAt}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
