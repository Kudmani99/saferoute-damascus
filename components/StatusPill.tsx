import type { RouteStatus } from "@/lib/data";

const styles: Record<RouteStatus, string> = {
  "On time": "bg-mint/12 text-mint ring-mint/20",
  Delayed: "bg-clay/12 text-clay ring-clay/20",
  Completed: "bg-basalt/10 text-basalt ring-basalt/20"
};

export function StatusPill({ status }: { status: RouteStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${styles[status]}`}>
      {status}
    </span>
  );
}
