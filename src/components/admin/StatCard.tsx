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
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center`}>
          <Icon size={22} className={color} />
        </div>
        {trend && (
          <div
            className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
              trend.value >= 0
                ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-600"
            }`}
          >
            {trend.value >= 0 ? (
              <TrendingUp size={12} />
            ) : (
              <TrendingDown size={12} />
            )}
            {Math.abs(trend.value)}%
          </div>
        )}
      </div>
      <div className="font-serif font-bold text-3xl text-gray-900 mb-1">
        {value}
        {suffix}
      </div>
      <div className="text-gray-500 text-sm">{title}</div>
      {trend && (
        <div className="text-gray-400 text-xs mt-1">{trend.label}</div>
      )}
    </div>
  );
}
