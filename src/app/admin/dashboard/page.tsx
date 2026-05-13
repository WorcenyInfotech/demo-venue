"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare, CheckCircle2, Phone, TrendingUp,
  Images, Star, Calendar, Clock, ArrowRight,
} from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import StatCard from "@/components/admin/StatCard";
import StatusBadge from "@/components/admin/StatusBadge";
import { formatDate } from "@/utils/helpers";
import Link from "next/link";

interface Stats {
  totalInquiries: number;
  newInquiries: number;
  contactedInquiries: number;
  confirmedInquiries: number;
  totalGalleryImages: number;
  totalTestimonials: number;
  recentInquiries: Array<{
    _id: string;
    name: string;
    mobile: string;
    email: string;
    eventType: string;
    functionDate: string;
    guestCount: string;
    status: string;
    createdAt: string;
  }>;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setStats(d.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const statCards = stats
    ? [
        {
          title: "Total Inquiries",
          value: stats.totalInquiries,
          icon: MessageSquare,
          color: "text-rose-gold-deep",
          bgColor: "bg-blush",
          trend: { value: 12, label: "vs last month" },
        },
        {
          title: "New Inquiries",
          value: stats.newInquiries,
          icon: TrendingUp,
          color: "text-rose-gold",
          bgColor: "bg-blush",
          trend: { value: 8, label: "awaiting response" },
        },
        {
          title: "Contacted",
          value: stats.contactedInquiries,
          icon: Phone,
          color: "text-rose-gold-muted",
          bgColor: "bg-cream",
        },
        {
          title: "Confirmed",
          value: stats.confirmedInquiries,
          icon: CheckCircle2,
          color: "text-rose-gold-deep",
          bgColor: "bg-rose-gold/15",
          trend: { value: 5, label: "bookings secured" },
        },
        {
          title: "Gallery Images",
          value: stats.totalGalleryImages,
          icon: Images,
          color: "text-rose-gold",
          bgColor: "bg-blush",
        },
        {
          title: "Testimonials",
          value: stats.totalTestimonials,
          icon: Star,
          color: "text-rose-gold-deep",
          bgColor: "bg-cream",
        },
      ]
    : [];

  return (
    <div className="min-h-screen bg-cream/30">
      <AdminSidebar />

      <div className="lg:pl-64 pt-16 lg:pt-0">
        <AdminHeader
          title="Dashboard"
          subtitle="Welcome back! Here's what's happening at Green Land Farm."
        />

        <div className="px-4 py-8 sm:px-6 lg:px-10">
          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-2xl border border-rose-gold/10 bg-white/80 p-6 shadow-sm"
                >
                  <div className="h-10 w-10 rounded-xl bg-blush" />
                  <div className="mt-4 h-8 w-24 rounded-lg bg-blush/80" />
                  <div className="mt-2 h-4 w-32 rounded bg-blush/60" />
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {statCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <StatCard {...card} />
                </motion.div>
              ))}
            </motion.div>
          )}

          <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "View All Inquiries", href: "/admin/inquiries", icon: MessageSquare },
              { label: "Manage Gallery", href: "/admin/gallery", icon: Images },
              { label: "Testimonials", href: "/admin/testimonials", icon: Star },
              { label: "Manage Banners", href: "/admin/banners", icon: Calendar },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-rose-gold/12 bg-white/95 px-4 py-4 shadow-sm transition hover:border-rose-gold/30 hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-gold to-rose-gold-deep text-white shadow-sm">
                      <Icon size={16} />
                    </div>
                    <span className="text-sm font-semibold text-ink">{action.label}</span>
                  </div>
                  <ArrowRight size={14} className="text-rose-gold/50 transition group-hover:translate-x-0.5 group-hover:text-rose-gold" />
                </Link>
              );
            })}
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-rose-gold/12 bg-white/95 shadow-sm">
            <div className="flex flex-col gap-4 border-b border-rose-gold/10 bg-blush/30 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-xl font-semibold text-ink">Recent Inquiries</h2>
                <p className="text-sm text-ink/60">Latest 5 inquiries received</p>
              </div>
              <Link
                href="/admin/inquiries"
                className="inline-flex items-center gap-2 text-sm font-semibold text-rose-gold transition hover:text-rose-gold-deep"
              >
                View All
                <ArrowRight size={14} />
              </Link>
            </div>

            {loading ? (
              <div className="divide-y divide-rose-gold/10">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex animate-pulse gap-4 px-6 py-5">
                    <div className="h-11 w-11 rounded-full bg-blush" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-40 rounded bg-blush" />
                      <div className="h-3 w-56 rounded bg-blush/70" />
                    </div>
                    <div className="h-6 w-20 rounded-full bg-blush" />
                  </div>
                ))}
              </div>
            ) : stats?.recentInquiries.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <MessageSquare size={32} className="text-rose-gold/40" />
                <p className="mt-3 text-sm font-medium text-ink/60">No inquiries yet</p>
              </div>
            ) : (
              <div className="divide-y divide-rose-gold/10">
                {stats?.recentInquiries.map((inquiry) => (
                  <div key={inquiry._id} className="flex flex-wrap items-center gap-4 px-6 py-5 transition hover:bg-blush/20">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-gold to-rose-gold-deep font-display text-sm font-semibold text-white">
                      <span>{inquiry.name?.charAt(0)?.toUpperCase() || "?"}</span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 text-sm">
                        <span className="font-semibold text-ink">{inquiry.name}</span>
                        <span className="text-ink/35">·</span>
                        <span className="text-ink/70">{inquiry.eventType}</span>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink/55">
                        <span className="inline-flex items-center gap-1">
                          <Phone size={11} className="text-rose-gold" />
                          {inquiry.mobile}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Calendar size={11} className="text-rose-gold" />
                          {formatDate(inquiry.functionDate)}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock size={11} className="text-rose-gold" />
                          {formatDate(inquiry.createdAt)}
                        </span>
                      </div>
                    </div>

                    <StatusBadge status={inquiry.status} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
