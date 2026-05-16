"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Eye, EyeOff, Lock, Mail, Loader2, Shield } from "lucide-react";
import { adminLoginSchema, type AdminLoginInput } from "@/lib/validations";

export default function AdminLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminLoginInput>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: AdminLoginInput) => {
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || "Login failed");
        return;
      }

      toast.success("Welcome back!");
      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23B76E79' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-rose-gold/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-blush/60 blur-3xl" />

      <motion.div
        className="relative w-full max-w-md"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="overflow-hidden rounded-2xl border border-rose-gold/15 bg-white/95 shadow-luxury backdrop-blur-md">
          <div className="border-b border-rose-gold/10 bg-gradient-to-r from-blush/80 to-cream px-8 py-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-gold to-rose-gold-deep font-display text-2xl font-bold text-white shadow-glow-rose">
              <span>G</span>
            </div>
            <h1 className="mt-5 font-display text-2xl font-semibold text-ink">Ramayan Farm</h1>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.28em] text-rose-gold">Admin Panel</p>
          </div>

          <div className="px-8 py-8">
            <div className="mb-6 flex items-center gap-2 text-sm font-semibold text-ink">
              <Shield size={18} className="text-rose-gold" />
              <h2>Secure Admin Login</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-ink">Email Address</label>
                <div className="flex items-center gap-3 rounded-2xl border border-rose-gold/20 bg-cream/80 px-4 py-3 focus-within:border-rose-gold focus-within:ring-2 focus-within:ring-rose-gold/20">
                  <Mail size={16} className="text-rose-gold/70" />
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="admin@greenlandfarm.com"
                    autoComplete="email"
                    className="w-full border-0 bg-transparent text-sm text-ink outline-none placeholder:text-ink/40"
                  />
                </div>
                {errors.email && <p className="text-xs font-medium text-rose-gold-deep">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-ink">Password</label>
                <div className="flex items-center gap-3 rounded-2xl border border-rose-gold/20 bg-cream/80 px-4 py-3 focus-within:border-rose-gold focus-within:ring-2 focus-within:ring-rose-gold/20">
                  <Lock size={16} className="text-rose-gold/70" />
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="w-full border-0 bg-transparent text-sm text-ink outline-none placeholder:text-ink/40"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="text-ink/50 transition hover:text-rose-gold"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs font-medium text-rose-gold-deep">{errors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-rose-gold py-3.5 text-sm font-semibold text-white shadow-glow-rose transition hover:bg-rose-gold-deep disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <Lock size={18} />
                    Sign In
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-ink/55">
              This area is restricted to authorized personnel only.
            </p>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
