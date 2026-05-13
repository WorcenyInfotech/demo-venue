"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  Search,
  Filter,
  Trash2,
  Phone,
  Mail,
  Calendar,
  Users,
  MessageSquare,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import StatusBadge from "@/components/admin/StatusBadge";
import { formatDate } from "@/utils/helpers";

interface Inquiry {
  _id: string;
  name: string;
  mobile: string;
  email: string;
  eventType: string;
  guestCount: string;
  functionDate: string;
  message: string;
  status: "new" | "contacted" | "confirmed" | "cancelled";
  createdAt: string;
}

const STATUS_OPTIONS = [
  { value: "all", label: "All Inquiries" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "confirmed", label: "Confirmed" },
  { value: "cancelled", label: "Cancelled" },
];

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "15",
        status: statusFilter,
        search,
      });
      const res = await fetch(`/api/admin/inquiries?${params}`);
      const data = await res.json();
      if (data.success) {
        setInquiries(data.data.inquiries);
        setTotalPages(data.data.pagination.pages);
        setTotal(data.data.pagination.total);
      }
    } catch {
      toast.error("Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, search]);

  useEffect(() => {
    const timer = setTimeout(fetchInquiries, 300);
    return () => clearTimeout(timer);
  }, [fetchInquiries]);

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        setInquiries((prev) =>
          prev.map((inq) => (inq._id === id ? { ...inq, status: status as Inquiry["status"] } : inq))
        );
        if (selectedInquiry?._id === id) {
          setSelectedInquiry((prev) => (prev ? { ...prev, status: status as Inquiry["status"] } : null));
        }
        toast.success("Status updated");
      }
    } catch {
      toast.error("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setInquiries((prev) => prev.filter((inq) => inq._id !== id));
        if (selectedInquiry?._id === id) setSelectedInquiry(null);
        toast.success("Inquiry deleted");
        setTotal((t) => t - 1);
      }
    } catch {
      toast.error("Failed to delete inquiry");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-cream/30">
      <AdminSidebar />

      <div className="pt-16 lg:pl-64 lg:pt-0">
        <AdminHeader title="Inquiries" subtitle={`${total} total inquiries`} />

        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl border border-rose-gold/15 bg-white/95 px-4 py-2.5 shadow-sm">
              <Search size={16} className="shrink-0 text-rose-gold" />
              <input
                type="text"
                placeholder="Search by name, email, or mobile..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="min-w-0 flex-1 border-0 bg-transparent text-sm text-ink outline-none placeholder:text-ink/45"
              />
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-rose-gold/15 bg-white/95 px-3 py-2 shadow-sm">
              <Filter size={14} className="text-rose-gold" />
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="border-0 bg-transparent text-sm font-medium text-ink outline-none"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={fetchInquiries}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-gold/20 bg-white px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-blush/50"
            >
              <RefreshCw size={14} className="text-rose-gold" />
              Refresh
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-5">
            <div className="lg:col-span-2">
              {loading ? (
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex animate-pulse gap-3 rounded-2xl border border-rose-gold/10 bg-white/80 p-4">
                      <div className="h-10 w-10 rounded-full bg-blush" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-[70%] rounded bg-blush" />
                        <div className="h-3 w-[45%] rounded bg-blush/70" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : inquiries.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-rose-gold/25 bg-white/80 py-16 text-center">
                  <MessageSquare size={32} className="text-rose-gold/40" />
                  <p className="mt-3 text-sm font-medium text-ink/60">No inquiries found</p>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    {inquiries.map((inquiry) => (
                      <motion.div
                        key={inquiry._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => setSelectedInquiry(inquiry)}
                        className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${
                          selectedInquiry?._id === inquiry._id
                            ? "border-rose-gold/40 bg-blush/60 shadow-md"
                            : "border-rose-gold/10 bg-white/95 hover:border-rose-gold/25 hover:bg-blush/30"
                        }`}
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-gold to-rose-gold-deep font-display text-sm font-semibold text-white">
                          <span>{inquiry.name?.charAt(0)?.toUpperCase() || "?"}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="truncate font-semibold text-ink">{inquiry.name}</span>
                            <span className="truncate text-xs text-ink/55">{inquiry.eventType}</span>
                          </div>
                          <div className="mt-0.5 text-xs text-ink/50">
                            <span>{inquiry.mobile}</span>
                            <span className="mx-1.5">·</span>
                            <span>{formatDate(inquiry.createdAt)}</span>
                          </div>
                        </div>
                        <StatusBadge status={inquiry.status} />
                      </motion.div>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="mt-4 flex items-center justify-between rounded-2xl border border-rose-gold/10 bg-white/90 px-4 py-3">
                      <span className="text-xs font-medium text-ink/60">
                        Page {page} of {totalPages}
                      </span>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setPage((p) => Math.max(1, p - 1))}
                          disabled={page === 1}
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-rose-gold/15 bg-cream text-ink transition enabled:hover:bg-blush disabled:opacity-40"
                        >
                          <ChevronLeft size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                          disabled={page === totalPages}
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-rose-gold/15 bg-cream text-ink transition enabled:hover:bg-blush disabled:opacity-40"
                        >
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="rounded-2xl border border-rose-gold/12 bg-white/95 shadow-sm lg:col-span-3">
              {!selectedInquiry ? (
                <div className="flex min-h-[320px] flex-col items-center justify-center p-8 text-center">
                  <MessageSquare size={36} className="text-rose-gold/35" />
                  <p className="mt-4 text-sm font-medium text-ink/60">Select an inquiry to view details</p>
                </div>
              ) : (
                <div className="flex flex-col">
                  <div className="flex items-start justify-between gap-3 border-b border-rose-gold/10 p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-gold to-rose-gold-deep font-display text-lg font-semibold text-white">
                        <span>{selectedInquiry.name?.charAt(0)?.toUpperCase()}</span>
                      </div>
                      <div>
                        <div className="font-display text-lg font-semibold text-ink">{selectedInquiry.name}</div>
                        <div className="mt-1">
                          <StatusBadge status={selectedInquiry.status} />
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteInquiry(selectedInquiry._id)}
                      disabled={deletingId === selectedInquiry._id}
                      title="Delete inquiry"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-700 transition hover:bg-red-100 disabled:opacity-50"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="divide-y divide-rose-gold/10 p-6">
                    {[
                      { icon: Phone, label: "Mobile", value: selectedInquiry.mobile },
                      { icon: Mail, label: "Email", value: selectedInquiry.email },
                      { icon: Calendar, label: "Event Type", value: selectedInquiry.eventType },
                      { icon: Calendar, label: "Function Date", value: formatDate(selectedInquiry.functionDate) },
                      { icon: Users, label: "Guest Count", value: selectedInquiry.guestCount },
                      { icon: Calendar, label: "Received", value: formatDate(selectedInquiry.createdAt) },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex gap-3 py-3 first:pt-0 last:pb-0">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blush text-rose-gold">
                          <Icon size={13} />
                        </div>
                        <div>
                          <div className="text-[11px] font-semibold uppercase tracking-wider text-rose-gold">{label}</div>
                          <div className="text-sm text-ink">{value}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedInquiry.message && (
                    <div className="border-t border-rose-gold/10 px-6 py-5">
                      <div className="text-xs font-semibold uppercase tracking-wider text-rose-gold">Message</div>
                      <p className="mt-2 text-sm leading-relaxed text-ink/80">{selectedInquiry.message}</p>
                    </div>
                  )}

                  <div className="border-t border-rose-gold/10 px-6 py-5">
                    <div className="text-xs font-semibold uppercase tracking-wider text-rose-gold">Update Status</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(["new", "contacted", "confirmed", "cancelled"] as const).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => updateStatus(selectedInquiry._id, s)}
                          disabled={selectedInquiry.status === s || updatingId === selectedInquiry._id}
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition ${
                            selectedInquiry.status === s
                              ? "bg-rose-gold text-white shadow-sm"
                              : "border border-rose-gold/20 bg-cream text-ink/80 hover:border-rose-gold/40 hover:bg-blush"
                          } disabled:opacity-50`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 border-t border-rose-gold/10 p-6">
                    <a
                      href={`tel:${selectedInquiry.mobile}`}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-rose-gold px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-rose-gold-deep sm:flex-none"
                    >
                      <Phone size={13} />
                      Call
                    </a>
                    <a
                      href={`mailto:${selectedInquiry.email}`}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-rose-gold/25 bg-white px-4 py-2.5 text-xs font-semibold text-ink transition hover:bg-blush sm:flex-none"
                    >
                      <Mail size={13} />
                      Email
                    </a>
                    <a
                      href={`https://wa.me/91${selectedInquiry.mobile}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-rose-gold/25 bg-blush/50 px-4 py-2.5 text-xs font-semibold text-ink transition hover:bg-blush sm:flex-none"
                    >
                      WA
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
