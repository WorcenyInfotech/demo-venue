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
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 lg:ml-64 min-w-0">
        <AdminHeader title="Hero Banners" subtitle={`${banners.length} banners`} />

        <div className="p-6">
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#2a5245] to-[#4d8b73] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-shadow"
            >
              <Plus size={18} />
              Add Banner
            </button>
          </div>

          {/* Add form modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-serif font-bold text-lg text-gray-900">Add Hero Banner</h3>
                  <button onClick={() => { setShowForm(false); setPreview(null); }} className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200">
                    <X size={16} />
                  </button>
                </div>

                {/* Image upload */}
                <div
                  className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center mb-4 cursor-pointer hover:border-[#2a5245] transition-colors"
                  onClick={() => fileRef.current?.click()}
                >
                  {preview ? (
                    <div className="relative h-36 rounded-lg overflow-hidden">
                      <Image src={preview} alt="Preview" fill className="object-cover" sizes="400px" />
                    </div>
                  ) : (
                    <>
                      <Upload size={24} className="mx-auto mb-2 text-gray-300" />
                      <p className="text-gray-500 text-sm">Click to select banner image</p>
                      <p className="text-gray-400 text-xs mt-1">Recommended: 1920×1080px — max 8MB</p>
                    </>
                  )}
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </div>

                <div className="space-y-3 mb-5">
                  <div>
                    <label className="form-label">Title *</label>
                    <input type="text" placeholder="e.g. Luxury Wedding Venue in Surat" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className="form-input text-sm" />
                  </div>
                  <div>
                    <label className="form-label">Subtitle</label>
                    <textarea rows={2} placeholder="Banner subtitle or description" value={form.subtitle} onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))} className="form-input text-sm resize-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="form-label">CTA Button Text</label>
                      <input type="text" placeholder="e.g. Book Now" value={form.ctaText} onChange={(e) => setForm((f) => ({ ...f, ctaText: e.target.value }))} className="form-input text-sm" />
                    </div>
                    <div>
                      <label className="form-label">CTA Link</label>
                      <input type="text" placeholder="e.g. /contact" value={form.ctaLink} onChange={(e) => setForm((f) => ({ ...f, ctaLink: e.target.value }))} className="form-input text-sm" />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => { setShowForm(false); setPreview(null); }} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors">Cancel</button>
                  <button onClick={handleUpload} disabled={uploading || !preview} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#2a5245] text-white font-semibold text-sm hover:bg-[#1a332b] transition-colors disabled:opacity-50">
                    {uploading ? <><Loader2 size={16} className="animate-spin" />Uploading...</> : <><Upload size={16} />Upload</>}
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {/* Banners list */}
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 animate-pulse flex gap-4">
                  <div className="w-32 h-20 rounded-xl bg-gray-100" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-100 rounded w-48" />
                    <div className="h-3 bg-gray-100 rounded w-64" />
                  </div>
                </div>
              ))}
            </div>
          ) : banners.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <ImageIcon size={40} className="mx-auto mb-3 opacity-30" />
              <p>No banners yet. Add your first hero banner.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {banners.map((banner) => (
                <motion.div
                  key={banner._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`bg-white rounded-2xl border shadow-sm overflow-hidden flex gap-0 transition-all ${
                    banner.isActive ? "border-gray-100" : "border-red-100 opacity-60"
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative w-40 h-24 flex-shrink-0">
                    <Image src={banner.imageUrl} alt={banner.title} fill className="object-cover" sizes="160px" />
                    {!banner.isActive && (
                      <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                        <span className="text-red-600 text-xs font-bold bg-white/80 px-2 py-0.5 rounded">Hidden</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 p-4 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm truncate">{banner.title}</h3>
                        {banner.subtitle && (
                          <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{banner.subtitle}</p>
                        )}
                        {banner.ctaText && (
                          <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#c6a94c]/10 text-[#c6a94c] text-xs font-medium">
                            CTA: {banner.ctaText}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button
                          onClick={() => toggleActive(banner._id, banner.isActive)}
                          className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"
                          title={banner.isActive ? "Hide" : "Show"}
                        >
                          {banner.isActive ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                        <button
                          onClick={() => deleteBanner(banner._id)}
                          className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-100 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
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
