import { AlertTriangle, ShieldCheck, X } from 'lucide-react';

import type { AlertItem } from '../types';

const iconMap = {
  info: <ShieldCheck className="h-5 w-5 text-cyan-600" />,
  warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
  danger: <AlertTriangle className="h-5 w-5 text-rose-500" />,
};

export function RiskAlertModal({ alert, onClose }: { alert: AlertItem; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 py-8 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-[2rem] border border-white/60 bg-white p-6 shadow-2xl shadow-slate-950/20">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">{iconMap[alert.severity]}</div>
            <div>
              <div className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">风险预警</div>
              <h2 className="text-xl font-semibold text-slate-900">{alert.title}</h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="关闭预警"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-4 leading-7 text-slate-600">{alert.description}</p>

        <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
          <div className="font-medium text-slate-900">系统建议</div>
          <div className="mt-1 leading-6">
            先降低高频消费和借贷类支出，再把腾出来的资金转入储蓄目标，避免现金流持续紧张。
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400">{alert.createdAt}</div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-cyan-700"
          >
            我知道了
          </button>
        </div>
      </div>
    </div>
  );
}
