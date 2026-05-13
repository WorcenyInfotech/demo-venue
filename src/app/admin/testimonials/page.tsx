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

  useEffect(() => {
    queueMicrotask(() => {
      void fetchTestimonials();
    });
  }, []);

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
    <div className="min-h-screen bg-cream/30">
      <AdminSidebar />

      <div className="pt-16 lg:pl-64 lg:pt-0">
        <AdminHeader title="Testimonials" subtitle={`${testimonials.length} reviews`} />

        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-ink">Manage Testimonials</h2>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-rose-gold px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-gold-deep"
            >
              <Plus size={16} />
              Add Testimonial
            </button>
          </div>

          {/* Add form modal */}
          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-luxury"
              >
                <div className="flex items-center justify-between border-b border-rose-gold/10 bg-cream/50 px-6 py-4">
                  <h3 className="font-display text-lg font-semibold text-ink">Add Testimonial</h3>
                  <button onClick={() => setShowForm(false)} className="text-ink/50 hover:text-rose-gold">
                    <X size={20} />
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-ink">Couple / Person Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Priya & Rahul Sharma"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="w-full rounded-xl border border-rose-gold/20 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-ink">Event Type</label>
                    <select
                      value={form.eventType}
                      onChange={(e) => setForm((f) => ({ ...f, eventType: e.target.value }))}
                      className="w-full rounded-xl border border-rose-gold/20 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/20"
                    >
                      {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-ink">Rating</label>
                    <div className="flex items-center gap-4 rounded-xl border border-rose-gold/20 bg-blush/30 px-4 py-2.5">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((r) => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => setForm((f) => ({ ...f, rating: r }))}
                            className="transition hover:scale-110"
                          >
                            <Star
                              size={24}
                              className={r <= form.rating ? "fill-rose-gold text-rose-gold" : "text-rose-gold/30"}
                            />
                          </button>
                        ))}
                      </div>
                      <span className="text-sm font-medium text-ink/60">{form.rating}/5</span>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-ink">Review *</label>
                    <textarea
                      rows={4}
                      placeholder="Write the testimonial review..."
                      value={form.review}
                      onChange={(e) => setForm((f) => ({ ...f, review: e.target.value }))}
                      className="w-full rounded-xl border border-rose-gold/20 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/20"
                    />
                    <p className="mt-1 text-right text-xs text-ink/50">{form.review.length}/1000</p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-rose-gold/10 bg-cream/50 px-6 py-4">
                  <button
                    onClick={() => setShowForm(false)}
                    className="rounded-xl px-4 py-2 text-sm font-semibold text-ink/70 hover:text-ink"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 rounded-xl bg-rose-gold px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-gold-deep disabled:opacity-60"
                  >
                    {saving ? <><Loader2 size={16} className="animate-spin" />Saving...</> : "Save Testimonial"}
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {/* Testimonials list */}
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-2xl border border-rose-gold/10 bg-white/80 p-6">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-blush" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-3/4 rounded bg-blush" />
                      <div className="h-3 w-1/2 rounded bg-blush/70" />
                      <div className="h-3 w-1/3 rounded bg-blush/50" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : testimonials.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-rose-gold/25 bg-white/80 py-20 text-center">
              <Star size={48} className="text-rose-gold/40" />
              <p className="mt-4 text-sm font-medium text-ink/60">No testimonials yet. Add your first one.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {testimonials.map((t) => (
                <motion.div
                  key={t._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`relative flex flex-col justify-between rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md ${t.isActive ? "border-rose-gold/15" : "border-ink/10 opacity-75"}`}
                >
                  <div>
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-rose-gold to-rose-gold-deep font-display text-lg font-semibold text-white">
                          <span>{t.name.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="font-semibold text-ink">{t.name}</div>
                          <div className="text-xs text-ink/60">{t.eventType}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => toggleActive(t._id, t.isActive)}
                          title={t.isActive ? "Hide" : "Show"}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-cream text-ink/60 transition hover:bg-blush hover:text-rose-gold-deep"
                        >
                          {t.isActive ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                        <button
                          onClick={() => deleteTestimonial(t._id)}
                          title="Delete"
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-100"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="mb-3 flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < t.rating ? "fill-rose-gold text-rose-gold" : "text-rose-gold/20"}
                        />
                      ))}
                    </div>

                    <p className="text-sm italic leading-relaxed text-ink/80">
                      &ldquo;{t.review}&rdquo;
                    </p>
                  </div>

                  {!t.isActive && (
                    <div className="absolute bottom-4 right-4 rounded-md bg-ink/5 px-2 py-1 text-xs font-medium text-ink/50">
                      Hidden from website
                    </div>
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
