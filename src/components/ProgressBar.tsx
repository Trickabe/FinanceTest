export function ProgressBar({ value, label, tone = 'from-cyan-500 to-emerald-500' }: { value: number; label: string; tone?: string }) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="text-slate-500">{safeValue}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full bg-gradient-to-r ${tone}`} style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  );
}
