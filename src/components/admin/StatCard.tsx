import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  trend?: { value: number; label: string };
  suffix?: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
  bgColor,
  trend,
  suffix = "",
}: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-rose-gold/12 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-rose-gold/25 hover:shadow-md">
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-rose-gold/40 to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className="flex items-start justify-between gap-3">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${bgColor} ${color}`}>
          <Icon size={22} />
        </div>
        {trend && (
          <div
            className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
              trend.value >= 0 ? "bg-blush text-rose-gold-deep" : "bg-red-50 text-red-700"
            }`}
          >
            {trend.value >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {Math.abs(trend.value)}%
          </div>
        )}
      </div>
      <div className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink">
        {value}
        {suffix}
      </div>
      <div className="mt-1 text-sm font-medium text-ink/60">{title}</div>
      {trend && <div className="mt-2 text-xs text-ink/45">{trend.label}</div>}
    </div>
  );
}
