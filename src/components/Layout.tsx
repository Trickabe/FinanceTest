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
        <aside className="hidden w-80 flex-col border-r border-white/60 bg-white/50 px-6 py-6 backdrop-blur-xl lg:flex">
          <div className="glass-card mb-6 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-500 to-emerald-400 text-white shadow-glow">
                <Wallet className="h-6 w-6" />
              </div>
              <div>
                <div className="text-sm font-medium text-slate-500">青财智管</div>
                <div className="text-lg font-semibold">青年成长型金融平台</div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
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
                    'flex items-center justify-between rounded-2xl border px-4 py-3 transition duration-200',
                    isActive
                      ? 'border-cyan-200 bg-cyan-50 text-cyan-900 shadow-[0_10px_25px_rgba(14,165,233,0.12)]'
                      : 'border-transparent bg-white/70 text-slate-600 hover:border-slate-200 hover:bg-white',
                  ].join(' ')
                }
              >
                <span>
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs text-slate-500">{item.description}</div>
                </span>
                <Sparkles className="h-4 w-4 text-emerald-500" />
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900 p-5 text-white shadow-xl">
            <div className="text-sm opacity-80">本月建议</div>
            <div className="mt-2 text-xl font-semibold">先储蓄，再优化消费</div>
            <p className="mt-3 text-sm leading-6 text-slate-200">
              将工资到账后的 20% 先转入储蓄目标，再分配生活支出，建立青年版财富习惯。
            </p>
          </div>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-white/60 bg-white/55 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.32em] text-cyan-700">QingCai Zhiguan</div>
                <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">智能成长型金融服务平台 Demo</h1>
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
            <div className="border-b border-white/60 bg-white/85 p-4 shadow-lg backdrop-blur-xl lg:hidden">
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
