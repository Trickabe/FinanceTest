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
    <div className="glass-card flex h-full flex-col justify-between p-5">
      <div className="text-sm text-slate-500">{title}</div>
      <div className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">{value}</div>
      <div className={`mt-4 inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium ${accent}`}>{hint}</div>
    </div>
  );
}
