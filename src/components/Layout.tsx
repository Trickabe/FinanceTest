import { Menu, Sparkles, Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

const navigation = [
  { to: '/', label: '仪表盘', description: '资产总览' },
  { to: '/assets', label: '资产管理', description: '预算与储蓄' },
  { to: '/advisor', label: 'AI 财富管家', description: '对话建议' },
  { to: '/learning', label: '学习中心', description: '知识路径' },
  { to: '/growth', label: '成长账户', description: '积分与成就' },
];

export function Layout({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return (
    <div className="min-h-screen bg-radial-grid text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col lg:flex-row">
        <aside className="hidden w-[18.5rem] flex-col border-r border-slate-200/70 bg-slate-950 px-6 py-6 text-white shadow-[8px_0_40px_rgba(15,23,42,0.06)] lg:flex">
          <div className="mb-6 rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-emerald-400 to-lime-300 text-slate-950 shadow-[0_0_40px_rgba(34,197,94,0.2)]">
                <Wallet className="h-6 w-6" />
              </div>
              <div>
                <div className="text-sm font-medium text-cyan-100/80">青财智管</div>
                <div className="text-lg font-semibold text-white">青年成长型金融平台</div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              用 AI 和规则引擎帮助大学生和初入职场青年建立预算、储蓄、投资和信用成长习惯。
            </p>
          </div>

          <nav className="space-y-3">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    'group flex items-center justify-between rounded-2xl border px-4 py-3 transition duration-200',
                    isActive
                      ? 'border-cyan-300/40 bg-white text-slate-950 shadow-[0_12px_30px_rgba(34,197,94,0.16)]'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/15 hover:bg-white/10 hover:text-white',
                  ].join(' ')
                }
              >
                <span>
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs text-slate-400">{item.description}</div>
                </span>
                <Sparkles className="h-4 w-4 text-cyan-400 transition group-hover:text-emerald-400" />
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-cyan-500/15 via-emerald-400/10 to-transparent p-5 text-white shadow-xl">
            <div className="text-sm text-cyan-100/70">本月建议</div>
            <div className="mt-2 text-xl font-semibold">先储蓄，再优化消费</div>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              将工资到账后的 20% 先转入储蓄目标，再分配生活支出，建立青年版财富习惯。
            </p>
          </div>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/70 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.32em] text-cyan-700">QingCai Zhiguan</div>
                <h1 className="text-xl font-semibold text-slate-950 sm:text-2xl">智能成长型金融服务平台 Demo</h1>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen((open) => !open)}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-cyan-200 hover:text-cyan-700 lg:hidden"
              >
                <Menu className="h-4 w-4" />
                菜单
              </button>
            </div>
          </header>

          {mobileMenuOpen ? (
            <div className="border-b border-slate-200/70 bg-white/95 p-4 shadow-lg backdrop-blur-xl lg:hidden">
              <div className="grid gap-2 sm:grid-cols-2">
                {navigation.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      [
                        'rounded-2xl border px-4 py-3 text-sm transition',
                        isActive
                          ? 'border-cyan-200 bg-cyan-50 text-cyan-900'
                          : 'border-slate-200 bg-white text-slate-600',
                      ].join(' ')
                    }
                  >
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-slate-500">{item.description}</div>
                  </NavLink>
                ))}
              </div>
            </div>
          ) : null}

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
