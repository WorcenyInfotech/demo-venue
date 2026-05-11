"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Star, Plus, Trash2, Eye, EyeOff, X, Loader2 } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

interface Testimonial {
  _id: string;
  name: string;
  eventType: string;
  rating: number;
  review: string;
  isActive: boolean;
  createdAt: string;
}

const EVENT_TYPES = [
  "Wedding Ceremony", "Reception", "Engagement", "Sangeet",
  "Destination Wedding", "Corporate Event", "Anniversary",
];

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "", eventType: "Wedding Ceremony", rating: 5, review: "",
  });

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/testimonials");
      const data = await res.json();
      if (data.success) setTestimonials(data.data);
    } catch {
      toast.error("Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTestimonials(); }, []);

  const handleSave = async () => {
    if (!form.name || !form.review) {
      toast.error("Name and review are required");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Testimonial added");
        setTestimonials((prev) => [data.data, ...prev]);
        setShowForm(false);
        setForm({ name: "", eventType: "Wedding Ceremony", rating: 5, review: "" });
      } else {
        toast.error(data.error || "Failed to save");
      }
    } catch {
      toast.error("Failed to save testimonial");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !current }),
      });
      const data = await res.json();
      if (data.success) {
        setTestimonials((prev) => prev.map((t) => t._id === id ? { ...t, isActive: !current } : t));
        toast.success(current ? "Testimonial hidden" : "Testimonial shown");
      }
    } catch {
      toast.error("Failed to update");
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setTestimonials((prev) => prev.filter((t) => t._id !== id));
        toast.success("Testimonial deleted");
      }
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 lg:ml-64 min-w-0">
        <AdminHeader title="Testimonials" subtitle={`${testimonials.length} testimonials`} />

        <div className="p-6">
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1a5c2e] to-[#2d8a4e] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-shadow"
            >
              <Plus size={18} />
              Add Testimonial
            </button>
          </div>

          {/* Add form modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6"
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-serif font-bold text-lg text-gray-900">Add Testimonial</h3>
                  <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200">
                    <X size={16} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="form-label">Couple / Person Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Priya & Rahul Sharma"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="form-input text-sm"
                    />
                  </div>
                  <div>
                    <label className="form-label">Event Type</label>
                    <select
                      value={form.eventType}
                      onChange={(e) => setForm((f) => ({ ...f, eventType: e.target.value }))}
                      className="form-input text-sm"
                    >
                      {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Rating</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, rating: r }))}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            size={24}
                            className={r <= form.rating ? "text-[#c9a84c] fill-[#c9a84c]" : "text-gray-300"}
                          />
                        </button>
                      ))}
                      <span className="text-gray-500 text-sm ml-1">{form.rating}/5</span>
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Review *</label>
                    <textarea
                      rows={4}
                      placeholder="Write the testimonial review..."
                      value={form.review}
                      onChange={(e) => setForm((f) => ({ ...f, review: e.target.value }))}
                      className="form-input text-sm resize-none"
                    />
                    <p className="text-gray-400 text-xs mt-1">{form.review.length}/1000</p>
                  </div>
                </div>

                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => setShowForm(false)}
                    className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#1a5c2e] text-white font-semibold text-sm hover:bg-[#0f3d1e] transition-colors disabled:opacity-50"
                  >
                    {saving ? <><Loader2 size={16} className="animate-spin" />Saving...</> : "Save Testimonial"}
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {/* Testimonials list */}
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 animate-pulse">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-100 rounded w-32" />
                      <div className="h-3 bg-gray-100 rounded w-full" />
                      <div className="h-3 bg-gray-100 rounded w-3/4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <Star size={40} className="mx-auto mb-3 opacity-30" />
              <p>No testimonials yet. Add your first one.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testimonials.map((t) => (
                <motion.div
                  key={t._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`bg-white rounded-2xl p-5 border shadow-sm transition-all ${
                    t.isActive ? "border-gray-100" : "border-red-100 opacity-60"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1a5c2e] to-[#2d8a4e] flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">{t.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                        <div className="text-[#c9a84c] text-xs">{t.eventType}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => toggleActive(t._id, t.isActive)}
                        className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"
                        title={t.isActive ? "Hide" : "Show"}
                      >
                        {t.isActive ? <EyeOff size={13} /> : <Eye size={13} />}
                      </button>
                      <button
                        onClick={() => deleteTestimonial(t._id)}
                        className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-100 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < t.rating ? "text-[#c9a84c] fill-[#c9a84c]" : "text-gray-200"}
                      />
                    ))}
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 italic">
                    &ldquo;{t.review}&rdquo;
                  </p>

                  {!t.isActive && (
                    <div className="mt-2 text-xs text-red-500 font-medium">Hidden from website</div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
