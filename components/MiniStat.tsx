import type { ReactNode } from "react";

export function MiniStat({
  label,
  value,
  icon
}: {
  label: string;
  value: string;
  icon?: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-black/10 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-basalt/70">{label}</p>
        {icon ? <div className="text-saffron">{icon}</div> : null}
      </div>
      <p className="mt-3 text-2xl font-bold text-ink">{value}</p>
    </div>
  );
}
