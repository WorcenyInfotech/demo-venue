"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  Search, Filter, Trash2, Phone, Mail, Calendar,
  Users, MessageSquare, RefreshCw, ChevronLeft, ChevronRight,
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
          setSelectedInquiry((prev) => prev ? { ...prev, status: status as Inquiry["status"] } : null);
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
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 lg:ml-64 min-w-0">
        <AdminHeader
          title="Inquiries"
          subtitle={`${total} total inquiries`}
        />

        <div className="p-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by name, email, or mobile..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="form-input pl-10 text-sm"
              />
            </div>
            <div className="relative">
              <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                className="form-input pl-9 pr-8 text-sm w-full sm:w-44"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <button
              onClick={fetchInquiries}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <RefreshCw size={14} />
              Refresh
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Inquiry list */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {loading ? (
                <div className="p-6 space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 animate-pulse">
                      <div className="w-10 h-10 rounded-full bg-gray-100" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-100 rounded w-32" />
                        <div className="h-3 bg-gray-100 rounded w-48" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : inquiries.length === 0 ? (
                <div className="p-12 text-center text-gray-400">
                  <MessageSquare size={32} className="mx-auto mb-3 opacity-30" />
                  <p>No inquiries found</p>
                </div>
              ) : (
                <>
                  <div className="divide-y divide-gray-50">
                    {inquiries.map((inquiry) => (
                      <motion.div
                        key={inquiry._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                          selectedInquiry?._id === inquiry._id ? "bg-green-50 border-l-2 border-[#2a5245]" : ""
                        }`}
                        onClick={() => setSelectedInquiry(inquiry)}
                      >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2a5245] to-[#4d8b73] flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm">
                            {inquiry.name?.charAt(0)?.toUpperCase() || "?"}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-gray-900 text-sm">{inquiry.name}</span>
                            <span className="text-gray-400 text-xs">{inquiry.eventType}</span>
                          </div>
                          <div className="text-gray-400 text-xs mt-0.5 flex items-center gap-2">
                            <span>{inquiry.mobile}</span>
                            <span>·</span>
                            <span>{formatDate(inquiry.createdAt)}</span>
                          </div>
                        </div>
                        <StatusBadge status={inquiry.status} />
                      </motion.div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between p-4 border-t border-gray-50">
                      <span className="text-gray-400 text-xs">
                        Page {page} of {totalPages}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setPage((p) => Math.max(1, p - 1))}
                          disabled={page === 1}
                          className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                          <ChevronLeft size={14} />
                        </button>
                        <button
                          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                          disabled={page === totalPages}
                          className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Detail panel */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {!selectedInquiry ? (
                <div className="p-8 text-center text-gray-400 h-full flex flex-col items-center justify-center">
                  <MessageSquare size={32} className="mb-3 opacity-30" />
                  <p className="text-sm">Select an inquiry to view details</p>
                </div>
              ) : (
                <div className="p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2a5245] to-[#4d8b73] flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {selectedInquiry.name?.charAt(0)?.toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{selectedInquiry.name}</div>
                        <StatusBadge status={selectedInquiry.status} />
                      </div>
                    </div>
                    <button
                      onClick={() => deleteInquiry(selectedInquiry._id)}
                      disabled={deletingId === selectedInquiry._id}
                      className="w-8 h-8 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-red-500 hover:bg-red-100 transition-colors disabled:opacity-50"
                      title="Delete inquiry"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 mb-5">
                    {[
                      { icon: Phone, label: "Mobile", value: selectedInquiry.mobile },
                      { icon: Mail, label: "Email", value: selectedInquiry.email },
                      { icon: Calendar, label: "Event Type", value: selectedInquiry.eventType },
                      { icon: Calendar, label: "Function Date", value: formatDate(selectedInquiry.functionDate) },
                      { icon: Users, label: "Guest Count", value: selectedInquiry.guestCount },
                      { icon: Calendar, label: "Received", value: formatDate(selectedInquiry.createdAt) },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-start gap-3 text-sm">
                        <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon size={13} className="text-gray-400" />
                        </div>
                        <div>
                          <div className="text-gray-400 text-xs">{label}</div>
                          <div className="text-gray-800 font-medium">{value}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message */}
                  {selectedInquiry.message && (
                    <div className="mb-5 p-3 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="text-gray-400 text-xs mb-1">Message</div>
                      <p className="text-gray-700 text-sm leading-relaxed">{selectedInquiry.message}</p>
                    </div>
                  )}

                  {/* Status update */}
                  <div>
                    <div className="text-gray-500 text-xs font-medium mb-2">Update Status</div>
                    <div className="grid grid-cols-2 gap-2">
                      {["new", "contacted", "confirmed", "cancelled"].map((s) => (
                        <button
                          key={s}
                          onClick={() => updateStatus(selectedInquiry._id, s)}
                          disabled={selectedInquiry.status === s || updatingId === selectedInquiry._id}
                          className={`py-2 px-3 rounded-lg text-xs font-semibold capitalize transition-all border ${
                            selectedInquiry.status === s
                              ? "bg-[#2a5245] text-white border-[#2a5245]"
                              : "bg-white text-gray-600 border-gray-200 hover:border-[#2a5245] hover:text-[#2a5245]"
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quick actions */}
                  <div className="mt-4 flex gap-2">
                    <a
                      href={`tel:${selectedInquiry.mobile}`}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-[#2a5245] text-white text-xs font-semibold hover:bg-[#1a332b] transition-colors"
                    >
                      <Phone size={13} />
                      Call
                    </a>
                    <a
                      href={`mailto:${selectedInquiry.email}`}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-[#c6a94c] text-[#1a332b] text-xs font-semibold hover:bg-[#dcc875] transition-colors"
                    >
                      <Mail size={13} />
                      Email
                    </a>
                    <a
                      href={`https://wa.me/91${selectedInquiry.mobile}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-[#25D366] text-white text-xs font-semibold hover:bg-[#1da851] transition-colors"
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
