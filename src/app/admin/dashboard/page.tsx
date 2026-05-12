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
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          trend: { value: 12, label: "vs last month" },
        },
        {
          title: "New Inquiries",
          value: stats.newInquiries,
          icon: TrendingUp,
          color: "text-[#c6a94c]",
          bgColor: "bg-amber-50",
          trend: { value: 8, label: "awaiting response" },
        },
        {
          title: "Contacted",
          value: stats.contactedInquiries,
          icon: Phone,
          color: "text-purple-600",
          bgColor: "bg-purple-50",
        },
        {
          title: "Confirmed",
          value: stats.confirmedInquiries,
          icon: CheckCircle2,
          color: "text-[#2a5245]",
          bgColor: "bg-green-50",
          trend: { value: 5, label: "bookings secured" },
        },
        {
          title: "Gallery Images",
          value: stats.totalGalleryImages,
          icon: Images,
          color: "text-pink-600",
          bgColor: "bg-pink-50",
        },
        {
          title: "Testimonials",
          value: stats.totalTestimonials,
          icon: Star,
          color: "text-orange-600",
          bgColor: "bg-orange-50",
        },
      ]
    : [];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      {/* Main content */}
      <div className="flex-1 lg:ml-64 min-w-0">
        <AdminHeader
          title="Dashboard"
          subtitle="Welcome back! Here's what's happening at Green Land Farm."
        />

        <div className="p-6 space-y-8">
          {/* Stat cards */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 animate-pulse">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 mb-4" />
                  <div className="h-8 bg-gray-100 rounded mb-2 w-16" />
                  <div className="h-4 bg-gray-100 rounded w-24" />
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
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

          {/* Quick actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "View All Inquiries", href: "/admin/inquiries", icon: MessageSquare, color: "bg-blue-500" },
              { label: "Manage Gallery", href: "/admin/gallery", icon: Images, color: "bg-pink-500" },
              { label: "Testimonials", href: "/admin/testimonials", icon: Star, color: "bg-amber-500" },
              { label: "Manage Banners", href: "/admin/banners", icon: Calendar, color: "bg-[#2a5245]" },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all group"
                >
                  <div className={`w-9 h-9 rounded-lg ${action.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={16} className="text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{action.label}</span>
                  <ArrowRight size={14} className="ml-auto text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all" />
                </Link>
              );
            })}
          </div>

          {/* Recent inquiries */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-50">
              <div>
                <h2 className="font-serif font-bold text-lg text-gray-900">Recent Inquiries</h2>
                <p className="text-gray-400 text-sm mt-0.5">Latest 5 inquiries received</p>
              </div>
              <Link
                href="/admin/inquiries"
                className="flex items-center gap-1.5 text-sm font-semibold text-[#2a5245] hover:text-[#c6a94c] transition-colors"
              >
                View All
                <ArrowRight size={14} />
              </Link>
            </div>

            {loading ? (
              <div className="p-6 space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4 animate-pulse">
                    <div className="w-10 h-10 rounded-full bg-gray-100" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-100 rounded w-32" />
                      <div className="h-3 bg-gray-100 rounded w-48" />
                    </div>
                    <div className="h-6 bg-gray-100 rounded-full w-20" />
                  </div>
                ))}
              </div>
            ) : stats?.recentInquiries.length === 0 ? (
              <div className="p-12 text-center text-gray-400">
                <MessageSquare size={32} className="mx-auto mb-3 opacity-30" />
                <p>No inquiries yet</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {stats?.recentInquiries.map((inquiry) => (
                  <div key={inquiry._id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2a5245] to-[#4d8b73] flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">
                        {inquiry.name?.charAt(0)?.toUpperCase() || "?"}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-gray-900 text-sm truncate">
                          {inquiry.name}
                        </span>
                        <span className="text-gray-300">·</span>
                        <span className="text-gray-500 text-xs">{inquiry.eventType}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-400 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Phone size={11} />
                          {inquiry.mobile}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={11} />
                          {formatDate(inquiry.functionDate)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} />
                          {formatDate(inquiry.createdAt)}
                        </span>
                      </div>
                    </div>

                    {/* Status */}
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
