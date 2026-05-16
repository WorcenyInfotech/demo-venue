"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Upload, Trash2, Eye, EyeOff, Plus, X, Loader2, ImageIcon } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

interface Banner {
  _id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaText?: string;
  ctaLink?: string;
  isActive: boolean;
  order: number;
  createdAt: string;
}

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "", subtitle: "", ctaText: "", ctaLink: "",
  });
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/banners");
      const data = await res.json();
      if (data.success) setBanners(data.data);
    } catch {
      toast.error("Failed to load banners");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    queueMicrotask(() => {
      void fetchBanners();
    });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      toast.error("File size must be under 8MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!preview || !form.title) {
      toast.error("Please select an image and enter a title");
      return;
    }
    setUploading(true);
    try {
      const res = await fetch("/api/admin/banners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageData: preview, ...form }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Banner added successfully");
        setBanners((prev) => [data.data, ...prev]);
        setShowForm(false);
        setPreview(null);
        setForm({ title: "", subtitle: "", ctaText: "", ctaLink: "" });
        if (fileRef.current) fileRef.current.value = "";
      } else {
        toast.error(data.error || "Upload failed");
      }
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const toggleActive = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`/api/admin/banners/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !current }),
      });
      const data = await res.json();
      if (data.success) {
        setBanners((prev) => prev.map((b) => b._id === id ? { ...b, isActive: !current } : b));
        toast.success(current ? "Banner hidden" : "Banner shown");
      }
    } catch {
      toast.error("Failed to update banner");
    }
  };

  const deleteBanner = async (id: string) => {
    if (!confirm("Delete this banner? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/admin/banners/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setBanners((prev) => prev.filter((b) => b._id !== id));
        toast.success("Banner deleted");
      }
    } catch {
      toast.error("Failed to delete banner");
    }
  };

  return (
    <div className="min-h-screen bg-cream/30">
      <AdminSidebar />

      <div className="pt-16 lg:pl-64 lg:pt-0">
        <AdminHeader title="Hero Banners" subtitle={`${banners.length} banners`} />

        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-ink">Manage Banners</h2>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-rose-gold px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-gold-deep"
            >
              <Plus size={16} />
              Add Banner
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
                  <h3 className="font-display text-lg font-semibold text-ink">Add Hero Banner</h3>
                  <button onClick={() => { setShowForm(false); setPreview(null); }} className="text-ink/50 hover:text-rose-gold">
                    <X size={20} />
                  </button>
                </div>

                <div className="p-6">
                  {/* Image upload */}
                  <div
                    onClick={() => fileRef.current?.click()}
                    className="group relative mb-6 flex h-48 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-rose-gold/30 bg-blush/30 transition hover:border-rose-gold hover:bg-blush/50"
                  >
                    {preview ? (
                      <Image src={preview} alt="Preview" fill className="object-cover" sizes="400px" />
                    ) : (
                      <div className="text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-rose-gold shadow-sm transition-transform group-hover:scale-110">
                          <Upload size={24} />
                        </div>
                        <p className="mt-3 text-sm font-medium text-ink">Click to select banner image</p>
                        <p className="mt-1 text-xs text-ink/50">Recommended: 1920×1080px — max 8MB</p>
                      </div>
                    )}
                    <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-ink">Title *</label>
                      <input type="text" placeholder="e.g. Luxury Wedding Venue in Surat" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className="w-full rounded-xl border border-rose-gold/20 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/20" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-ink">Subtitle</label>
                      <textarea rows={2} placeholder="Banner subtitle or description" value={form.subtitle} onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))} className="w-full rounded-xl border border-rose-gold/20 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/20" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-ink">CTA Button Text</label>
                        <input type="text" placeholder="e.g. Book Now" value={form.ctaText} onChange={(e) => setForm((f) => ({ ...f, ctaText: e.target.value }))} className="w-full rounded-xl border border-rose-gold/20 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/20" />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-ink">CTA Link</label>
                        <input type="text" placeholder="e.g. /contact" value={form.ctaLink} onChange={(e) => setForm((f) => ({ ...f, ctaLink: e.target.value }))} className="w-full rounded-xl border border-rose-gold/20 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/20" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-rose-gold/10 bg-cream/50 px-6 py-4">
                  <button onClick={() => { setShowForm(false); setPreview(null); }} className="rounded-xl px-4 py-2 text-sm font-semibold text-ink/70 hover:text-ink">Cancel</button>
                  <button onClick={handleUpload} disabled={uploading || !preview} className="flex items-center gap-2 rounded-xl bg-rose-gold px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-gold-deep disabled:opacity-60">
                    {uploading ? <><Loader2 size={16} className="animate-spin" />Uploading...</> : <><Upload size={16} />Upload</>}
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {/* Banners list */}
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse overflow-hidden rounded-2xl border border-rose-gold/10 bg-white/80">
                  <div className="h-48 bg-blush" />
                  <div className="p-5">
                    <div className="mb-2 h-5 w-3/4 rounded bg-blush" />
                    <div className="h-4 w-1/2 rounded bg-blush/70" />
                  </div>
                </div>
              ))}
            </div>
          ) : banners.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-rose-gold/25 bg-white/80 py-20 text-center">
              <ImageIcon size={48} className="text-rose-gold/40" />
              <p className="mt-4 text-sm font-medium text-ink/60">No banners yet. Add your first hero banner.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {banners.map((banner) => (
                <motion.div
                  key={banner._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`group relative overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md ${banner.isActive ? "border-rose-gold/15" : "border-ink/10 opacity-75"}`}
                >
                  {/* Thumbnail */}
                  <div className="relative h-48 w-full bg-cream">
                    <Image src={banner.imageUrl} alt={banner.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" />
                    {!banner.isActive && (
                      <div className="absolute top-3 left-3 rounded-md bg-ink/80 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        <span>Hidden</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex flex-col justify-between p-5">
                    <div className="mb-4">
                      <h3 className="font-semibold text-ink line-clamp-1">{banner.title}</h3>
                      {banner.subtitle && (
                        <p className="mt-1 text-sm text-ink/60 line-clamp-2">{banner.subtitle}</p>
                      )}
                      {banner.ctaText && (
                        <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-blush/50 px-2.5 py-1 text-xs font-medium text-rose-gold-deep">
                          CTA: {banner.ctaText}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 border-t border-rose-gold/10 pt-4">
                      <button
                        onClick={() => toggleActive(banner._id, banner.isActive)}
                        title={banner.isActive ? "Hide" : "Show"}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2 text-sm font-medium transition ${banner.isActive ? "bg-cream text-ink/70 hover:bg-blush hover:text-rose-gold-deep" : "bg-rose-gold/10 text-rose-gold hover:bg-rose-gold hover:text-white"}`}
                      >
                        {banner.isActive ? <EyeOff size={16} /> : <Eye size={16} />}
                        {banner.isActive ? "Hide" : "Show"}
                      </button>
                      <button
                        onClick={() => deleteBanner(banner._id)}
                        title="Delete"
                        className="flex h-[38px] w-[38px] items-center justify-center rounded-xl bg-red-50 text-red-600 transition hover:bg-red-100"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
