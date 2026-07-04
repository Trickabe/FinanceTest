export function MetricCard({
  title,
  value,
  hint,
  accent,
}: {
  title: string;
  value: string;
  hint: string;
  accent: string;
}) {
  return (
    <div className="glass-card relative flex h-full flex-col justify-between overflow-hidden p-5">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-500 via-emerald-400 to-lime-300" />
      <div className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">{title}</div>
      <div className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">{value}</div>
      <div className={`mt-4 inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium ${accent}`}>{hint}</div>
    </div>
  );
}
