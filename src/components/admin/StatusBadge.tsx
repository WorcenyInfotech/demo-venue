import { getStatusColor } from "@/utils/helpers";

interface StatusBadgeProps {
  status: string;
}

const STATUS_LABELS: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  confirmed: "Confirmed",
  cancelled: "Cancelled",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const colors = getStatusColor(status);
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${colors.bg} ${colors.text} ${colors.border}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${
        status === "new" ? "bg-blue-500" :
        status === "contacted" ? "bg-yellow-500" :
        status === "confirmed" ? "bg-green-500" :
        "bg-red-500"
      }`} />
      {STATUS_LABELS[status] || status}
    </span>
  );
}
