import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

import { useDemo } from '../store/AppContext';

export function LoginPage() {
  const { enterDemo } = useDemo();

  return (
    <div className="min-h-screen bg-radial-grid px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
        <section className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/60 bg-white/80 px-4 py-2 text-sm font-medium text-cyan-800 shadow-[0_10px_30px_rgba(14,165,233,0.12)] backdrop-blur">
            <Sparkles className="h-4 w-4" />
            青年群体智能金融体验 Demo
          </div>

          <div className="space-y-5">
            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
              从“会消费”到“会规划财富”的青年成长平台。
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              面向大学生和初入职场青年，通过 AI 规则引擎、模拟数据和可视化仪表盘，帮助你完成预算管理、储蓄规划、理财学习与风险识别。
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={enterDemo}
              className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:bg-cyan-700"
            >
              进入 Demo 空间
              <ArrowRight className="h-4 w-4" />
            </button>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-5 py-3 text-sm text-slate-600 backdrop-blur">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              模拟数据已准备好，可直接体验
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ['预算管理', '自动识别超支并给出纠偏建议'],
              ['AI 财富管家', '基于规则的问答与风险提示'],
              ['成长账户', '积分、成就和学习进度可视化'],
            ].map(([title, description]) => (
              <div key={title} className="glass-card p-5">
                <div className="text-base font-semibold text-slate-900">{title}</div>
                <div className="mt-2 text-sm leading-6 text-slate-500">{description}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="glass-card relative overflow-hidden p-6 sm:p-8">
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-br from-cyan-500/15 via-emerald-400/10 to-transparent" />
          <div className="relative space-y-5">
            <div className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">
              Demo Preview
            </div>
            <div className="rounded-[2rem] bg-slate-950 p-5 text-white shadow-2xl shadow-cyan-950/20">
              <div className="text-sm text-slate-400">今日财富体检</div>
              <div className="mt-2 text-3xl font-semibold">82 分</div>
              <div className="mt-4 grid gap-3 text-sm text-slate-200 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/5 p-4">
                  月收入
                  <div className="mt-1 text-2xl font-semibold">¥8,200</div>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  储蓄目标达成
                  <div className="mt-1 text-2xl font-semibold">58%</div>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  风险等级
                  <div className="mt-1 text-2xl font-semibold text-amber-300">中</div>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  成长积分
                  <div className="mt-1 text-2xl font-semibold text-cyan-300">860</div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.75rem] bg-white p-5 shadow-[0_15px_40px_rgba(15,23,42,0.08)]">
                <div className="text-sm font-medium text-slate-500">智能建议</div>
                <div className="mt-2 text-base font-semibold text-slate-900">餐饮超支 20%</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">建议下周减少外出就餐，优先使用周预算和自动储蓄转账。</p>
              </div>
              <div className="rounded-[1.75rem] bg-gradient-to-br from-emerald-500 to-cyan-500 p-5 text-white shadow-[0_15px_40px_rgba(14,165,233,0.2)]">
                <div className="text-sm font-medium text-white/80">财富规划</div>
                <div className="mt-2 text-base font-semibold">从今天开始自动管理钱流</div>
                <p className="mt-2 text-sm leading-6 text-white/90">用数据和规则代替情绪消费，让每一笔支出更有方向。</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
