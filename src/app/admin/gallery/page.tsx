"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  Upload, Trash2, Eye, EyeOff, Plus, X, Loader2, Images,
} from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

interface GalleryImage {
  _id: string;
  url: string;
  title: string;
  category: string;
  alt: string;
  isActive: boolean;
  createdAt: string;
}

const CATEGORIES = ["wedding", "reception", "engagement", "decoration", "venue"];

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", category: "wedding", alt: "" });
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/gallery");
      const data = await res.json();
      if (data.success) setImages(data.data);
    } catch {
      toast.error("Failed to load gallery");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    queueMicrotask(() => {
      void fetchImages();
    });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be under 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!preview || !form.title || !form.category) {
      toast.error("Please fill all required fields and select an image");
      return;
    }
    setUploading(true);
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageData: preview, ...form }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Image uploaded successfully");
        setImages((prev) => [data.data, ...prev]);
        setShowUpload(false);
        setPreview(null);
        setForm({ title: "", category: "wedding", alt: "" });
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
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !current }),
      });
      const data = await res.json();
      if (data.success) {
        setImages((prev) => prev.map((img) => img._id === id ? { ...img, isActive: !current } : img));
        toast.success(current ? "Image hidden" : "Image shown");
      }
    } catch {
      toast.error("Failed to update image");
    }
  };

  const deleteImage = async (id: string) => {
    if (!confirm("Delete this image? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setImages((prev) => prev.filter((img) => img._id !== id));
        toast.success("Image deleted");
      }
    } catch {
      toast.error("Failed to delete image");
    }
  };

  return (
    <div className="min-h-screen bg-cream/30">
      <AdminSidebar />

      <div className="pt-16 lg:pl-64 lg:pt-0">
        <AdminHeader title="Gallery" subtitle={`${images.length} images`} />

        <div className="px-4 py-6 sm:px-6 lg:px-8">
          {/* Upload button */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              <button className="whitespace-nowrap rounded-full bg-rose-gold px-4 py-1.5 text-sm font-medium text-white shadow-sm">All</button>
              {CATEGORIES.map(c => (
                <button key={c} className="whitespace-nowrap rounded-full border border-rose-gold/20 bg-white px-4 py-1.5 text-sm font-medium text-ink/70 transition hover:bg-blush capitalize">{c}</button>
              ))}
            </div>
            <button
              onClick={() => setShowUpload(true)}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-rose-gold px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-gold-deep"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Upload Image</span>
            </button>
          </div>

          {/* Upload modal */}
          {showUpload && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-luxury"
              >
                <div className="flex items-center justify-between border-b border-rose-gold/10 bg-cream/50 px-6 py-4">
                  <h3 className="font-display text-lg font-semibold text-ink">Upload Image</h3>
                  <button onClick={() => { setShowUpload(false); setPreview(null); }} className="text-ink/50 hover:text-rose-gold">
                    <X size={20} />
                  </button>
                </div>

                <div className="p-6">
                  {/* Drop zone */}
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
                        <p className="mt-3 text-sm font-medium text-ink">Click to select image</p>
                        <p className="mt-1 text-xs text-ink/50">JPG, PNG, WebP — max 5MB</p>
                      </div>
                    )}
                    <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-ink">Title *</label>
                      <input
                        type="text"
                        placeholder="e.g. Grand Wedding Ceremony"
                        value={form.title}
                        onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                        className="w-full rounded-xl border border-rose-gold/20 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/20"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-ink">Category *</label>
                      <select
                        value={form.category}
                        onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                        className="w-full rounded-xl border border-rose-gold/20 bg-white px-4 py-2.5 text-sm capitalize outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/20"
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-ink">Alt Text</label>
                      <input
                        type="text"
                        placeholder="Describe the image for accessibility"
                        value={form.alt}
                        onChange={(e) => setForm((f) => ({ ...f, alt: e.target.value }))}
                        className="w-full rounded-xl border border-rose-gold/20 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/20"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-rose-gold/10 bg-cream/50 px-6 py-4">
                  <button
                    onClick={() => { setShowUpload(false); setPreview(null); }}
                    className="rounded-xl px-4 py-2 text-sm font-semibold text-ink/70 hover:text-ink"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpload}
                    disabled={uploading || !preview}
                    className="flex items-center gap-2 rounded-xl bg-rose-gold px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-gold-deep disabled:opacity-60"
                  >
                    {uploading ? <><Loader2 size={16} className="animate-spin" />Uploading...</> : <><Upload size={16} />Upload</>}
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {/* Gallery grid */}
          {loading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="aspect-square animate-pulse rounded-2xl bg-blush/60" />
              ))}
            </div>
          ) : images.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-rose-gold/25 bg-white/80 py-20 text-center">
              <Images size={48} className="text-rose-gold/40" />
              <p className="mt-4 text-sm font-medium text-ink/60">No images yet. Upload your first image.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
              {images.map((img) => (
                <motion.div
                  key={img._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`group relative aspect-square overflow-hidden rounded-2xl bg-cream shadow-sm transition hover:shadow-md ${img.isActive ? "" : "opacity-75 grayscale-[50%]"}`}
                >
                  <Image
                    src={img.url}
                    alt={img.alt || img.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-b from-ink/40 via-transparent to-ink/60 p-3 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => toggleActive(img._id, img.isActive)}
                        title={img.isActive ? "Hide" : "Show"}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-white backdrop-blur-md transition hover:bg-white/40"
                      >
                        {img.isActive ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                      <button
                        onClick={() => deleteImage(img._id)}
                        title="Delete"
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/80 text-white backdrop-blur-md transition hover:bg-red-600"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white line-clamp-1">{img.title}</p>
                    </div>
                  </div>
                  {/* Category badge */}
                  <div className="absolute top-3 left-3 rounded-md bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-rose-gold-deep backdrop-blur-sm">
                    {img.category}
                  </div>
                  {!img.isActive && (
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 rounded-md bg-ink/80 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      Hidden
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
