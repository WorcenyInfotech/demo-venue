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

  useEffect(() => { fetchImages(); }, []);

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
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 lg:ml-64 min-w-0">
        <AdminHeader title="Gallery" subtitle={`${images.length} images`} />

        <div className="p-6">
          {/* Upload button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setShowUpload(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1a5c2e] to-[#2d8a4e] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-shadow"
            >
              <Plus size={18} />
              Upload Image
            </button>
          </div>

          {/* Upload modal */}
          {showUpload && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6"
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-serif font-bold text-lg text-gray-900">Upload Image</h3>
                  <button onClick={() => { setShowUpload(false); setPreview(null); }} className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200">
                    <X size={16} />
                  </button>
                </div>

                {/* Drop zone */}
                <div
                  className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center mb-4 cursor-pointer hover:border-[#1a5c2e] transition-colors"
                  onClick={() => fileRef.current?.click()}
                >
                  {preview ? (
                    <div className="relative h-40 rounded-lg overflow-hidden">
                      <Image src={preview} alt="Preview" fill className="object-cover" sizes="400px" />
                    </div>
                  ) : (
                    <>
                      <Upload size={28} className="mx-auto mb-2 text-gray-300" />
                      <p className="text-gray-500 text-sm">Click to select image</p>
                      <p className="text-gray-400 text-xs mt-1">JPG, PNG, WebP — max 5MB</p>
                    </>
                  )}
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </div>

                <div className="space-y-3 mb-5">
                  <div>
                    <label className="form-label">Title *</label>
                    <input
                      type="text"
                      placeholder="e.g. Grand Wedding Ceremony"
                      value={form.title}
                      onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                      className="form-input text-sm"
                    />
                  </div>
                  <div>
                    <label className="form-label">Category *</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                      className="form-input text-sm"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c} className="capitalize">{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Alt Text</label>
                    <input
                      type="text"
                      placeholder="Describe the image for accessibility"
                      value={form.alt}
                      onChange={(e) => setForm((f) => ({ ...f, alt: e.target.value }))}
                      className="form-input text-sm"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => { setShowUpload(false); setPreview(null); }}
                    className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpload}
                    disabled={uploading || !preview}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#1a5c2e] text-white font-semibold text-sm hover:bg-[#0f3d1e] transition-colors disabled:opacity-50"
                  >
                    {uploading ? <><Loader2 size={16} className="animate-spin" />Uploading...</> : <><Upload size={16} />Upload</>}
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {/* Gallery grid */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-xl bg-gray-100 animate-pulse" />
              ))}
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <Images size={40} className="mx-auto mb-3 opacity-30" />
              <p>No images yet. Upload your first image.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((img) => (
                <motion.div
                  key={img._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`group relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    img.isActive ? "border-transparent" : "border-red-200 opacity-60"
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={img.alt || img.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-200 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => toggleActive(img._id, img.isActive)}
                      className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-gray-700 hover:bg-white transition-colors"
                      title={img.isActive ? "Hide" : "Show"}
                    >
                      {img.isActive ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                    <button
                      onClick={() => deleteImage(img._id)}
                      className="w-9 h-9 rounded-full bg-red-500/90 flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                  {/* Category badge */}
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-black/50 text-white text-[10px] font-medium capitalize">
                    {img.category}
                  </div>
                  {!img.isActive && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-medium">
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
